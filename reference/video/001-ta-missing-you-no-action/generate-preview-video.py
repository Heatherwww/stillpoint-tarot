from __future__ import annotations

import asyncio
import math
import shutil
import subprocess
import wave
from pathlib import Path

import imageio.v2 as imageio
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


HERE = Path(__file__).resolve().parent
FRAME_DIR = HERE / "frames"
CARD_INSERT_DIR = HERE / "card-inserts"
RENDER_DIR = HERE / "render-cache"
VERSION = "v2"
OUT = HERE / f"preview-video-{VERSION}.mp4"
SILENT_OUT = RENDER_DIR / f"preview-video-{VERSION}-silent.mp4"
VOICEOVER_OUT = RENDER_DIR / f"preview-voiceover-{VERSION}.wav"
VOICEOVER_TEXT_OUT = HERE / f"preview-voiceover-{VERSION}.txt"
EDGE_VOICE = "zh-CN-XiaoxiaoNeural"

WIDTH = 1080
HEIGHT = 1920
FPS = 6


SEGMENTS = [
    {
        "id": "opening",
        "kind": "selection",
        "title": "TA 最近有没有想起你？",
        "caption": "凭第一眼选择一个视觉锚点",
        "voice": "这次我们只看一个具体问题：TA 最近有没有想起你？如果有，为什么迟迟没有行动？第一组黑色石头，第二组红线，第三组透明水晶。先不要用逻辑分析，哪一个先抓住你，就听哪一组。",
    },
    {
        "id": "group-1-spread",
        "kind": "spread",
        "visual": CARD_INSERT_DIR / "group-1-spread.png",
        "title": "第一组：黑色石头",
        "caption": "六张牌实抽记录",
        "voice": "第一组，黑色石头。这里的牌不算轻松。高塔逆位、愚者逆位、宝剑三和宝剑九连在一起，我会先说一个诚实的判断：TA 有想起你，但这个想起并不全是甜的。",
    },
    {
        "id": "group-1-key",
        "kind": "key",
        "title": "第一组关键词",
        "caption": "想起是真的，但行动还被旧伤卡住",
        "bullets": [
            "TA 有想起你，但想起并不轻松。",
            "宝剑三指向旧伤、刺痛和未说清的话。",
            "未来三十天更像焦虑、反复想起和试探。",
            "提醒：不要把自己一直放在等待的位置。",
        ],
        "voice": "他没有行动，核心不是完全没感觉，而是一行动就会碰到旧伤、解释和焦虑。未来三十天更像反复想起和试探，不太像成熟稳定地推进。你的重点是把选择权拿回来。",
    },
    {
        "id": "group-2-spread",
        "kind": "spread",
        "visual": CARD_INSERT_DIR / "group-2-spread.png",
        "title": "第二组：红线",
        "caption": "有吸引，也有拉扯",
        "voice": "第二组，红线。这组和第一组不同，它不是完全冷掉。权杖皇后逆位和权杖骑士说明 TA 会被你牵动，也会有突然想靠近的冲动。",
    },
    {
        "id": "group-2-key",
        "kind": "key",
        "title": "第二组关键词",
        "caption": "有牵引，但还没有落地",
        "bullets": [
            "不是完全冷掉，这里有吸引和拉扯。",
            "月亮逆位说明路还没有真正看清。",
            "倒吊人更像悬着、观察、慢慢转念。",
            "看他热完以后，能不能持续往前走。",
        ],
        "voice": "可是月亮逆位和倒吊人说明，没行动不是没火，而是路还没看清。未来三十天，他可能继续悬着、观察、慢慢转念。你要看的不是他热不热，而是热完以后能不能持续。",
    },
    {
        "id": "group-3-spread",
        "kind": "spread",
        "visual": CARD_INSERT_DIR / "group-3-spread.png",
        "title": "第三组：透明水晶",
        "caption": "清醒、克制、现实感很强",
        "voice": "第三组，透明水晶。这组的气质更现实、更克制。宝剑皇后在想起你的位置，我会读成：TA 有想起你，但不是失控式想念，而是清醒地想起。",
    },
    {
        "id": "group-3-key",
        "kind": "key",
        "title": "第三组关键词",
        "caption": "慢慢靠近，但不要替冷静补成深情",
        "bullets": [
            "TA 有想起你，但方式更清醒克制。",
            "不行动：现实节奏失衡，未必能稳定承接。",
            "星币三带来合作、沟通、共同事务入口。",
            "不要自动把克制读成成熟。",
        ],
        "voice": "他没行动，很可能和现实节奏失衡有关。星币三说明未来三十天可能通过工作、共同事务或实际沟通重新靠近。但你不要因为终于说上话了，就自动把冷静补成深情。",
    },
    {
        "id": "closing",
        "kind": "closing",
        "title": "结尾",
        "caption": "观察想念，也观察行动",
        "voice": "这次的三组就先读到这里。大众占卜不是判决书，也不是承诺书。你可以把它当成一面镜子：照见你在这段关系里的感受，也照见对方有没有真正行动的能力。",
    },
]


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("C:/Windows/Fonts/msyhbd.ttc") if bold else Path("C:/Windows/Fonts/msyh.ttc"),
        Path("C:/Windows/Fonts/simhei.ttf"),
        Path("C:/Windows/Fonts/arial.ttf"),
    ]
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


FONT_TITLE = load_font(54, bold=True)
FONT_CAPTION = load_font(42, bold=True)
FONT_SMALL = load_font(28)
FONT_BODY = load_font(36)


def text_width(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont) -> int:
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0]


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont, max_width: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for char in text:
        candidate = current + char
        if current and text_width(draw, candidate, font) > max_width:
            lines.append(current)
            current = char
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def cover_image(path: Path, scale: float = 1.0, y_offset: int = 0) -> Image.Image:
    source = Image.open(path).convert("RGB")
    target_w = int(WIDTH * scale)
    target_h = int(HEIGHT * scale)
    resized = ImageOpsContain(source, target_w, target_h)
    canvas = Image.new("RGB", (WIDTH, HEIGHT), (18, 16, 21))
    x = (WIDTH - resized.width) // 2
    y = (HEIGHT - resized.height) // 2 + y_offset
    canvas.paste(resized, (x, y))
    return canvas


def ImageOpsContain(source: Image.Image, target_w: int, target_h: int) -> Image.Image:
    source_ratio = source.width / source.height
    target_ratio = target_w / target_h
    if source_ratio > target_ratio:
        width = target_w
        height = int(width / source_ratio)
    else:
        height = target_h
        width = int(height * source_ratio)
    return source.resize((width, height), Image.Resampling.LANCZOS)


def draw_overlay(image: Image.Image, title: str, caption: str, progress: float) -> Image.Image:
    image = image.convert("RGBA")
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    draw.rectangle((0, 0, WIDTH, 230), fill=(0, 0, 0, 110))
    draw.rectangle((0, HEIGHT - 300, WIDTH, HEIGHT), fill=(0, 0, 0, 150))
    draw.text((64, 62), title, font=FONT_TITLE, fill=(250, 243, 229, 255))

    lines = wrap_text(draw, caption, FONT_CAPTION, WIDTH - 128)
    y = HEIGHT - 232
    for line in lines[:2]:
        draw.text((64, y), line, font=FONT_CAPTION, fill=(250, 243, 229, 255))
        y += 58

    draw.text((64, HEIGHT - 82), "001 成片样片 v1 · 真人动态层待替换", font=FONT_SMALL, fill=(176, 169, 178, 255))
    draw.rounded_rectangle((64, HEIGHT - 34, WIDTH - 64, HEIGHT - 26), radius=4, fill=(62, 55, 70, 255))
    draw.rounded_rectangle((64, HEIGHT - 34, 64 + int((WIDTH - 128) * progress), HEIGHT - 26), radius=4, fill=(214, 188, 132, 255))
    return Image.alpha_composite(image, overlay).convert("RGB")


def make_background() -> Image.Image:
    image = Image.new("RGB", (WIDTH, HEIGHT), (18, 16, 21))
    draw = ImageDraw.Draw(image)
    for y in range(0, HEIGHT, 26):
        shade = 18 + (y % 104) // 18
        draw.rectangle((0, y, WIDTH, y + 13), fill=(shade, 16, 22))
    draw.rectangle((38, 38, WIDTH - 38, HEIGHT - 38), outline=(66, 56, 68), width=2)
    draw.rectangle((55, 55, WIDTH - 55, HEIGHT - 55), outline=(33, 29, 38), width=2)
    return image


def draw_anchor(draw: ImageDraw.ImageDraw, kind: str, center: tuple[int, int], scale: float = 1.0) -> None:
    x, y = center
    if kind == "stone":
        r = int(54 * scale)
        draw.ellipse((x - r, y - r // 2, x + r, y + r // 2), fill=(24, 25, 29), outline=(103, 106, 117), width=3)
        draw.arc((x - r + 16, y - r // 2 + 9, x + r - 10, y + r // 2 - 7), 190, 338, fill=(75, 79, 90), width=3)
    elif kind == "thread":
        points = []
        for i in range(-90, 91, 9):
            points.append((x + int(i * scale), y + int(20 * scale * math.sin(i / 22))))
        draw.line(points, fill=(199, 59, 63), width=max(3, int(9 * scale)), joint="curve")
        draw.ellipse((x - 15, y - 15, x + 15, y + 15), outline=(235, 111, 108), width=4)
    else:
        pts = [
            (x, y - int(72 * scale)),
            (x + int(52 * scale), y - int(12 * scale)),
            (x + int(32 * scale), y + int(70 * scale)),
            (x - int(36 * scale), y + int(70 * scale)),
            (x - int(54 * scale), y - int(10 * scale)),
        ]
        draw.polygon(pts, fill=(188, 218, 226), outline=(238, 251, 255))
        draw.line((x, y - int(72 * scale), x - int(36 * scale), y + int(70 * scale)), fill=(108, 158, 172), width=3)
        draw.line((x, y - int(72 * scale), x + int(32 * scale), y + int(70 * scale)), fill=(108, 158, 172), width=3)


def draw_card_back(draw: ImageDraw.ImageDraw, x: int, y: int, w: int = 210, h: int = 360) -> None:
    draw.rounded_rectangle((x + 10, y + 12, x + w + 10, y + h + 12), radius=18, fill=(8, 7, 10))
    draw.rounded_rectangle((x, y, x + w, y + h), radius=18, fill=(42, 35, 52), outline=(165, 139, 91), width=4)
    draw.rectangle((x + 28, y + 28, x + w - 28, y + h - 28), outline=(112, 91, 132), width=3)
    draw.ellipse((x + 72, y + h // 2 - 48, x + w - 72, y + h // 2 + 48), outline=(165, 139, 91), width=3)


def draw_centered(draw: ImageDraw.ImageDraw, y: int, text: str, font: ImageFont.ImageFont, fill: tuple[int, int, int]) -> None:
    draw.text(((WIDTH - text_width(draw, text, font)) // 2, y), text, font=font, fill=fill)


def make_selection_frame(progress: float) -> Image.Image:
    image = make_background()
    draw = ImageDraw.Draw(image)
    draw_centered(draw, 150, "TA 最近有没有想起你？", FONT_TITLE, (250, 243, 229))
    draw_centered(draw, 230, "他为什么迟迟没有行动？", FONT_CAPTION, (211, 190, 154))
    draw_centered(draw, 330, "凭第一眼选择，不用关系诊断", FONT_BODY, (184, 178, 185))
    xs = [170, 435, 700]
    labels = [("第一组：黑色石头", "00:50", "stone"), ("第二组：红线", "07:45", "thread"), ("第三组：透明水晶", "14:55", "crystal")]
    for x, (label, time, kind) in zip(xs, labels):
        draw_card_back(draw, x, 540)
        draw_anchor(draw, kind, (x + 105, 1030), scale=1.0)
        draw.text((x - 10, 1138), label, font=FONT_SMALL, fill=(248, 240, 226))
        draw.text((x + 55, 1186), time, font=FONT_SMALL, fill=(211, 190, 154))
    draw.rounded_rectangle((96, 1390, WIDTH - 96, 1600), radius=24, fill=(26, 23, 31), outline=(74, 64, 84), width=2)
    draw_centered(draw, 1448, f"成片样片 {VERSION}", FONT_CAPTION, (248, 240, 226))
    draw_centered(draw, 1520, "真人动态层后续替换，牌面已用站点精确图", FONT_SMALL, (181, 176, 184))
    return draw_progress(image, progress)


def make_key_frame(segment: dict, progress: float) -> Image.Image:
    image = make_background()
    draw = ImageDraw.Draw(image)
    draw.text((76, 125), segment["title"], font=FONT_TITLE, fill=(250, 243, 229))
    draw.rounded_rectangle((76, 300, WIDTH - 76, 535), radius=28, fill=(29, 25, 34), outline=(118, 106, 130), width=3)
    draw.text((118, 365), segment["caption"], font=FONT_CAPTION, fill=(250, 243, 229))
    y = 690
    for bullet in segment["bullets"]:
        draw.ellipse((105, y + 15, 123, y + 33), fill=(214, 188, 132))
        for line in wrap_text(draw, bullet, FONT_BODY, WIDTH - 220):
            draw.text((145, y), line, font=FONT_BODY, fill=(232, 224, 208))
            y += 54
        y += 34
    draw.rounded_rectangle((92, 1518, WIDTH - 92, 1698), radius=24, fill=(24, 22, 29), outline=(72, 63, 80), width=2)
    draw.text((130, 1564), "剪辑提示：这里应切回真人读牌的手、牌和停顿。", font=FONT_SMALL, fill=(181, 176, 184))
    draw.text((130, 1630), "字幕只抓关键句，不要把整段文案都压上屏幕。", font=FONT_SMALL, fill=(181, 176, 184))
    return draw_progress(image, progress)


def make_closing_frame(progress: float) -> Image.Image:
    image = make_background()
    draw = ImageDraw.Draw(image)
    draw_centered(draw, 220, "把它当成镜子", FONT_TITLE, (250, 243, 229))
    draw_centered(draw, 315, "不是判决书，也不是承诺书", FONT_CAPTION, (211, 190, 154))
    draw_anchor(draw, "stone", (270, 650), scale=1.15)
    draw_anchor(draw, "thread", (540, 650), scale=1.15)
    draw_anchor(draw, "crystal", (810, 650), scale=1.15)
    draw_centered(draw, 980, "观察 TA 有没有想起你，", FONT_CAPTION, (250, 243, 229))
    draw_centered(draw, 1060, "也观察 TA 有没有行动能力。", FONT_CAPTION, (250, 243, 229))
    draw_centered(draw, 1435, f"001 成片样片 {VERSION}", FONT_BODY, (181, 176, 184))
    return draw_progress(image, progress)


def draw_progress(image: Image.Image, progress: float) -> Image.Image:
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((64, HEIGHT - 34, WIDTH - 64, HEIGHT - 26), radius=4, fill=(62, 55, 70))
    draw.rounded_rectangle((64, HEIGHT - 34, 64 + int((WIDTH - 128) * progress), HEIGHT - 26), radius=4, fill=(214, 188, 132))
    return image


def synthesize_windows_segment(text: str, out_path: Path) -> None:
    text_path = out_path.with_suffix(".txt")
    ps_path = out_path.with_suffix(".ps1")
    text_path.write_text(text, encoding="utf-8")
    ps_path.write_text(
        f"""
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {{ $s.SelectVoice('Microsoft Huihui Desktop') }} catch {{ }}
$s.Rate = -1
$s.Volume = 95
$s.SetOutputToWaveFile('{str(out_path)}')
$text = Get-Content -Raw -Encoding UTF8 -LiteralPath '{str(text_path)}'
$s.Speak($text)
$s.Dispose()
""",
        encoding="utf-8",
    )
    subprocess.run(
        ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(ps_path)],
        check=True,
        cwd=str(HERE),
    )


async def synthesize_edge_segment(text: str, out_path: Path) -> None:
    import edge_tts

    mp3_path = out_path.with_suffix(".mp3")
    communicate = edge_tts.Communicate(text, EDGE_VOICE, rate="-12%", volume="+0%")
    await communicate.save(str(mp3_path))
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    subprocess.run(
        [
            ffmpeg,
            "-y",
            "-i",
            str(mp3_path),
            "-ar",
            "22050",
            "-ac",
            "1",
            "-sample_fmt",
            "s16",
            str(out_path),
        ],
        check=True,
        cwd=str(HERE),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def synthesize_segment(text: str, out_path: Path) -> None:
    try:
        asyncio.run(synthesize_edge_segment(text, out_path))
    except Exception as exc:
        print(f"edge-tts failed for {out_path.name}, falling back to Windows TTS: {exc}")
        synthesize_windows_segment(text, out_path)


def combine_wavs(paths: list[Path], out_path: Path, silence_seconds: float = 0.35) -> list[float]:
    durations: list[float] = []
    params = None
    frames: list[bytes] = []
    for path in paths:
        with wave.open(str(path), "rb") as src:
            if params is None:
                params = src.getparams()
            elif src.getparams()[:3] != params[:3]:
                raise RuntimeError("All generated voiceover files must share WAV params.")
            data = src.readframes(src.getnframes())
            frames.append(data)
            durations.append(src.getnframes() / src.getframerate())
            silence_frames = int(src.getframerate() * silence_seconds)
            frames.append(b"\x00" * silence_frames * src.getnchannels() * src.getsampwidth())
            durations[-1] += silence_seconds

    if params is None:
        raise RuntimeError("No WAV files generated.")
    with wave.open(str(out_path), "wb") as dst:
        dst.setparams(params)
        for data in frames:
            dst.writeframes(data)
    return durations


def build_voiceover() -> list[float]:
    RENDER_DIR.mkdir(exist_ok=True)
    VOICEOVER_TEXT_OUT.write_text("\n\n".join(segment["voice"] for segment in SEGMENTS), encoding="utf-8")
    wavs = []
    for index, segment in enumerate(SEGMENTS, start=1):
        wav = RENDER_DIR / f"voice-{index:02d}-{segment['id']}-{VERSION}.wav"
        synthesize_segment(segment["voice"], wav)
        wavs.append(wav)
    return combine_wavs(wavs, VOICEOVER_OUT)


def frame_for_segment(segment: dict, global_progress: float) -> Image.Image:
    kind = segment.get("kind")
    if kind == "selection":
        return make_selection_frame(global_progress)
    if kind == "key":
        return make_key_frame(segment, global_progress)
    if kind == "closing":
        return make_closing_frame(global_progress)
    base = cover_image(segment["visual"])
    base = base.filter(ImageFilter.UnsharpMask(radius=1, percent=110, threshold=3))
    return draw_progress(base, global_progress)


def build_video(durations: list[float]) -> None:
    total_frames = sum(max(1, int(duration * FPS)) for duration in durations)
    written = 0
    writer = imageio.get_writer(
        SILENT_OUT,
        fps=FPS,
        codec="libx264",
        quality=8,
        macro_block_size=1,
        output_params=["-pix_fmt", "yuv420p", "-movflags", "+faststart"],
    )
    try:
        for segment, duration in zip(SEGMENTS, durations):
            frame_count = max(1, int(duration * FPS))
            segment_frame = np.asarray(frame_for_segment(segment, written / max(total_frames - 1, 1)))
            for i in range(frame_count):
                writer.append_data(segment_frame)
                written += 1
    finally:
        writer.close()


def mux_audio() -> None:
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    subprocess.run(
        [
            ffmpeg,
            "-y",
            "-i",
            str(SILENT_OUT),
            "-i",
            str(VOICEOVER_OUT),
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "160k",
            "-shortest",
            str(OUT),
        ],
        check=True,
        cwd=str(HERE),
    )


def main() -> None:
    required = [segment["visual"] for segment in SEGMENTS if "visual" in segment]
    missing = [str(path) for path in required if not path.exists()]
    if missing:
        raise FileNotFoundError("Missing visual assets:\n" + "\n".join(missing))

    if RENDER_DIR.exists():
        shutil.rmtree(RENDER_DIR)
    RENDER_DIR.mkdir(exist_ok=True)

    durations = build_voiceover()
    build_video(durations)
    mux_audio()
    print(f"Generated {OUT.relative_to(HERE)}")
    print(f"Duration: {sum(durations):.1f}s")


if __name__ == "__main__":
    main()
