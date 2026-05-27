from __future__ import annotations

import json
import math
import random
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageDraw, ImageFilter, ImageFont


def find_repo_root(start: Path) -> Path:
    for path in (start, *start.parents):
        if (path / "public" / "images" / "cards").exists():
            return path
    raise RuntimeError("Could not find repo root with public/images/cards")


ROOT = find_repo_root(Path(__file__).resolve())
OUT = Path(__file__).resolve().parent
SCENES_DIR = OUT / "scenes"
WIDTH = 1280
HEIGHT = 720


PALETTE = {
    "ink": (20, 18, 20),
    "plum": (49, 34, 45),
    "rose": (185, 119, 126),
    "sage": (122, 139, 118),
    "gold": (212, 180, 112),
    "ivory": (243, 236, 220),
    "muted": (190, 181, 169),
    "shadow": (0, 0, 0, 92),
}


GROUPS = [
    {
        "label": "第一组",
        "label_en": "Group 1",
        "title": "从恢复到行动",
        "title_en": "From Recovery To Movement",
        "cards": ["the-star", "ace-of-pentacles", "eight-of-wands"],
        "lines": [
            ("你不是没准备好，是需要降低噪音。", "You are not unready. You need less noise."),
            ("先把一个小承诺落地，机会会顺着行动变清楚。", "Land one small promise first; the next opening gets clearer through action."),
        ],
    },
    {
        "label": "第二组",
        "label_en": "Group 2",
        "title": "暂停是为了看清",
        "title_en": "Pause To See Clearly",
        "cards": ["two-of-swords", "the-hermit", "three-of-pentacles"],
        "lines": [
            ("现在最重要的不是立刻决定，而是拿回判断。", "The point is not to decide instantly, but to reclaim your judgment."),
            ("向一个可靠的人确认现实，再决定下一步怎么走。", "Check reality with someone steady, then choose the next step."),
        ],
    },
    {
        "label": "第三组",
        "label_en": "Group 3",
        "title": "温柔地换一个版本",
        "title_en": "Change Gently",
        "cards": ["death", "queen-of-cups", "the-sun"],
        "lines": [
            ("旧的方式正在结束，但你不需要用力证明自己。", "An old way is ending; you do not need to prove yourself by force."),
            ("保留柔软，也保留边界，新的明亮会慢慢出来。", "Keep your softness and your boundaries; brightness returns gradually."),
        ],
    },
]


SCENES = [
    {
        "kind": "hero",
        "duration": 5,
        "title": "未来30天，\n你需要看见什么？",
        "subtitle": "What needs your attention\nin the next 30 days?",
    },
    {
        "kind": "pick",
        "duration": 8,
        "title": "三组选牌",
        "subtitle": "Take a breath. Choose 1, 2, or 3.",
    },
    {
        "kind": "pick",
        "duration": 7,
        "title": "闭眼想一个问题",
        "subtitle": "Let the first quiet answer be enough.",
    },
    {"kind": "group", "duration": 8, "group": 0, "line": 0},
    {"kind": "group", "duration": 8, "group": 0, "line": 1},
    {"kind": "group", "duration": 8, "group": 0, "line": 2},
    {"kind": "group", "duration": 8, "group": 1, "line": 0},
    {"kind": "group", "duration": 8, "group": 1, "line": 1},
    {"kind": "group", "duration": 8, "group": 1, "line": 2},
    {"kind": "group", "duration": 8, "group": 2, "line": 0},
    {"kind": "group", "duration": 8, "group": 2, "line": 1},
    {"kind": "group", "duration": 8, "group": 2, "line": 2},
    {
        "kind": "closing",
        "duration": 7,
        "title": "把它当作提醒，不是定论。",
        "subtitle": "Use this as a mirror, not a verdict.",
    },
    {
        "kind": "closing",
        "duration": 5,
        "title": "保存你选中的组，月底回看。",
        "subtitle": "Save your group and revisit it at month-end.",
    },
]


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        Path("C:/Windows/Fonts/msyhbd.ttc" if bold else "C:/Windows/Fonts/msyh.ttc"),
        Path("C:/Windows/Fonts/simhei.ttf"),
        Path("C:/Windows/Fonts/arial.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


FONT_BRAND = load_font(26, bold=True)
FONT_H1 = load_font(64, bold=True)
FONT_H2 = load_font(44, bold=True)
FONT_BODY = load_font(34)
FONT_BODY_BOLD = load_font(34, bold=True)
FONT_SMALL = load_font(22)
FONT_TINY = load_font(18)


def lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)


def base_canvas() -> Image.Image:
    image = Image.new("RGB", (WIDTH, HEIGHT), PALETTE["ink"])
    px = image.load()
    for y in range(HEIGHT):
        t = y / (HEIGHT - 1)
        left = (
            lerp(28, 44, t),
            lerp(25, 31, t),
            lerp(27, 34, t),
        )
        right = (
            lerp(58, 38, t),
            lerp(42, 31, t),
            lerp(46, 40, t),
        )
        for x in range(WIDTH):
            h = x / (WIDTH - 1)
            px[x, y] = (
                lerp(left[0], right[0], h),
                lerp(left[1], right[1], h),
                lerp(left[2], right[2], h),
            )

    draw = ImageDraw.Draw(image)
    rng = random.Random(7)
    for _ in range(180):
        x = rng.randrange(0, WIDTH)
        y = rng.randrange(0, HEIGHT)
        alpha = rng.randrange(22, 70)
        color = tuple(lerp(image.getpixel((x, y))[i], PALETTE["ivory"][i], alpha / 255) for i in range(3))
        draw.point((x, y), fill=color)

    for y in range(40, HEIGHT, 78):
        draw.line((0, y, WIDTH, y + 18), fill=(72, 61, 65), width=1)

    return image.filter(ImageFilter.GaussianBlur(radius=0.15))


def draw_brand(draw: ImageDraw.ImageDraw) -> None:
    draw.text((54, 38), "Stillpoint Tarot", font=FONT_BRAND, fill=PALETTE["ivory"])
    draw.text((54, 72), "三组选牌 Reading", font=FONT_TINY, fill=PALETTE["muted"])


def text_bbox(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0], box[3] - box[1]


def wrap_line(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont, max_width: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for ch in text:
        test = current + ch
        if text_bbox(draw, test, font)[0] <= max_width or not current:
            current = test
        else:
            lines.append(current.rstrip())
            current = ch.lstrip()
    if current:
        lines.append(current.rstrip())
    return lines


def draw_text_block(
    draw: ImageDraw.ImageDraw,
    text: str,
    xy: tuple[int, int],
    font: ImageFont.ImageFont,
    fill: tuple[int, int, int],
    max_width: int,
    line_gap: int = 8,
    align: str = "left",
) -> int:
    x, y = xy
    for raw in text.split("\n"):
        lines = wrap_line(draw, raw, font, max_width) or [""]
        for line in lines:
            w, h = text_bbox(draw, line, font)
            tx = x
            if align == "center":
                tx = x + (max_width - w) // 2
            draw.text((tx, y), line, font=font, fill=fill)
            y += h + line_gap
    return y


def rounded_layer(size: tuple[int, int], radius: int, fill: tuple[int, int, int, int]) -> Image.Image:
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=fill)
    return layer


def paste_with_shadow(base: Image.Image, card: Image.Image, xy: tuple[int, int], radius: int = 18) -> None:
    x, y = xy
    shadow = rounded_layer((card.width + 18, card.height + 18), radius + 4, PALETTE["shadow"])
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    base.paste(shadow, (x - 5, y + 7), shadow)
    base.paste(card, (x, y), card)


def make_card_face(card_id: str, height: int = 300) -> Image.Image:
    path = ROOT / "public" / "images" / "cards" / f"{card_id}.webp"
    card = Image.open(path).convert("RGBA")
    width = round(card.width * height / card.height)
    card = card.resize((width, height), Image.Resampling.LANCZOS)
    mask = Image.new("L", card.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, card.width - 1, card.height - 1), radius=16, fill=255)
    out = Image.new("RGBA", card.size, (0, 0, 0, 0))
    out.paste(card, (0, 0), mask)
    return out


def make_card_back(height: int = 300, label: str | None = None) -> Image.Image:
    width = round(height * 0.6)
    card = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(card)
    draw.rounded_rectangle((0, 0, width - 1, height - 1), radius=16, fill=(226, 178, 170), outline=PALETTE["ivory"], width=5)
    draw.rounded_rectangle((16, 16, width - 17, height - 17), radius=10, outline=PALETTE["plum"], width=3)
    for y in range(36, height - 20, 34):
        for x in range(34, width - 20, 38):
            draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=PALETTE["gold"])
            draw.arc((x - 11, y - 13, x + 11, y + 9), 205, 335, fill=PALETTE["plum"], width=2)
    if label:
        w, h = text_bbox(draw, label, FONT_BODY_BOLD)
        draw.rounded_rectangle((width // 2 - 34, height // 2 - 34, width // 2 + 34, height // 2 + 34), 34, fill=PALETTE["plum"])
        draw.text((width // 2 - w // 2, height // 2 - h // 2 - 2), label, font=FONT_BODY_BOLD, fill=PALETTE["ivory"])
    return card


def draw_bottom_caption(
    draw: ImageDraw.ImageDraw,
    zh: str,
    en: str,
    top: int = 594,
) -> None:
    draw.rounded_rectangle((190, top - 16, WIDTH - 190, HEIGHT - 34), radius=18, fill=(20, 18, 20, 170))
    y = draw_text_block(draw, zh, (228, top), FONT_BODY_BOLD, PALETTE["ivory"], WIDTH - 456, align="center")
    draw_text_block(draw, en, (228, y + 4), FONT_SMALL, PALETTE["muted"], WIDTH - 456, align="center")


def draw_picker_cards(image: Image.Image, selected: int | None = None) -> None:
    positions = [(330, 265), (550, 245), (770, 265)]
    for idx, pos in enumerate(positions, start=1):
        card = make_card_back(300, str(idx))
        if selected is not None and idx != selected:
            card = Image.blend(card, Image.new("RGBA", card.size, (0, 0, 0, 96)), 0.35)
        paste_with_shadow(image, card, pos)
        draw = ImageDraw.Draw(image)
        label = f"第 {idx} 组"
        w, _ = text_bbox(draw, label, FONT_SMALL)
        draw.text((pos[0] + card.width // 2 - w // 2, pos[1] + card.height + 24), label, font=FONT_SMALL, fill=PALETTE["ivory"])


def render_hero(scene: dict) -> Image.Image:
    image = base_canvas()
    draw = ImageDraw.Draw(image, "RGBA")
    draw_brand(draw)
    draw_text_block(draw, scene["title"], (128, 205), FONT_H1, PALETTE["ivory"], 620, line_gap=10)
    draw_text_block(draw, scene["subtitle"], (132, 365), FONT_BODY, PALETTE["muted"], 620, line_gap=4)
    card_ids = ["the-high-priestess", "the-star", "ace-of-cups"]
    for i, card_id in enumerate(card_ids):
        card = make_card_face(card_id, 315)
        x = 825 + i * 88
        y = 205 + abs(i - 1) * 34
        paste_with_shadow(image, card, (x, y))
    draw.line((128, 466, 474, 466), fill=PALETTE["gold"], width=3)
    draw.text((128, 496), "原创样片 | Original pilot", font=FONT_SMALL, fill=PALETTE["sage"])
    return image


def render_pick(scene: dict) -> Image.Image:
    image = base_canvas()
    draw = ImageDraw.Draw(image, "RGBA")
    draw_brand(draw)
    draw_text_block(draw, scene["title"], (0, 125), FONT_H1, PALETTE["ivory"], WIDTH, align="center")
    draw_text_block(draw, scene["subtitle"], (0, 205), FONT_SMALL, PALETTE["muted"], WIDTH, align="center")
    draw_picker_cards(image)
    return image


def draw_group_header(draw: ImageDraw.ImageDraw, group: dict, active_line: int) -> None:
    draw.text((54, 126), group["label"], font=FONT_SMALL, fill=PALETTE["gold"])
    draw_text_block(draw, group["title"], (54, 158), FONT_H2, PALETTE["ivory"], 430)
    draw_text_block(draw, group["title_en"], (56, 214), FONT_SMALL, PALETTE["muted"], 420)
    dots = ["现状", "流动", "提醒"]
    for i, dot in enumerate(dots):
        x = 56 + i * 82
        fill = PALETTE["gold"] if i == active_line else PALETTE["sage"]
        draw.rounded_rectangle((x, 262, x + 58, 292), radius=15, outline=fill, width=2)
        draw.text((x + 12, 267), dot, font=FONT_TINY, fill=fill)


def render_group(scene: dict) -> Image.Image:
    image = base_canvas()
    draw = ImageDraw.Draw(image, "RGBA")
    draw_brand(draw)
    group = GROUPS[scene["group"]]
    active_line = scene["line"]
    draw_group_header(draw, group, min(active_line, 2))

    card_y = 154
    card_h = 322
    for i, card_id in enumerate(group["cards"]):
        card = make_card_face(card_id, card_h)
        paste_with_shadow(image, card, (570 + i * 150, card_y))

    if active_line == 0:
        zh = f"{group['label']}：{group['title']}"
        en = f"{group['label_en']}: {group['title_en']}"
    else:
        zh, en = group["lines"][active_line - 1]
    draw_bottom_caption(draw, zh, en)
    return image


def render_closing(scene: dict) -> Image.Image:
    image = base_canvas()
    draw = ImageDraw.Draw(image, "RGBA")
    draw_brand(draw)
    for i, group in enumerate(GROUPS):
        card = make_card_face(group["cards"][0], 255)
        paste_with_shadow(image, card, (330 + i * 210, 118))
        draw.text((350 + i * 210, 396), group["label"], font=FONT_SMALL, fill=PALETTE["gold"])
    draw_bottom_caption(draw, scene["title"], scene["subtitle"], top=548)
    return image


def render_scene(scene: dict) -> Image.Image:
    if scene["kind"] == "hero":
        return render_hero(scene)
    if scene["kind"] == "pick":
        return render_pick(scene)
    if scene["kind"] == "group":
        return render_group(scene)
    if scene["kind"] == "closing":
        return render_closing(scene)
    raise ValueError(f"Unknown scene kind: {scene['kind']}")


def srt_timestamp(seconds: int) -> str:
    h = seconds // 3600
    m = (seconds % 3600) // 60
    s = seconds % 60
    return f"{h:02}:{m:02}:{s:02},000"


def scene_caption(scene: dict) -> tuple[str, str]:
    if scene["kind"] in {"hero", "pick", "closing"}:
        return scene["title"], scene["subtitle"]
    group = GROUPS[scene["group"]]
    if scene["line"] == 0:
        return f"{group['label']}：{group['title']}", f"{group['label_en']}: {group['title_en']}"
    return group["lines"][scene["line"] - 1]


def write_subtitles() -> None:
    lines: list[str] = []
    cursor = 0
    for idx, scene in enumerate(SCENES, start=1):
        end = cursor + scene["duration"]
        zh, en = scene_caption(scene)
        lines.extend(
            [
                str(idx),
                f"{srt_timestamp(cursor)} --> {srt_timestamp(end)}",
                zh,
                en,
                "",
            ]
        )
        cursor = end
    (OUT / "captions.srt").write_text("\n".join(lines), encoding="utf-8")


def write_script_md() -> None:
    total = sum(scene["duration"] for scene in SCENES)
    lines = [
        "# Stillpoint Tarot Pick-A-Card Prototype",
        "",
        f"Length: {total} seconds",
        "Format: 16:9, silent pilot with bilingual on-screen captions.",
        "",
        "## Structure",
        "",
    ]
    cursor = 0
    for scene in SCENES:
        end = cursor + scene["duration"]
        zh, en = scene_caption(scene)
        lines.append(f"- {srt_timestamp(cursor).replace(',000', '')}-{srt_timestamp(end).replace(',000', '')}: {zh} / {en}")
        cursor = end
    lines.extend(
        [
            "",
            "## Notes",
            "",
            "- This is an original format pilot inspired by the three-group pick-a-card mechanism, not by the reference video's visual style.",
            "- The tone stays reflective and grounded: invitation, mirror, and self-check rather than fixed prediction.",
            "- A voiceover version can use the same captions as a narration skeleton.",
            "",
        ]
    )
    (OUT / "storyboard.md").write_text("\n".join(lines), encoding="utf-8")


def write_preview_html(scene_files: Iterable[Path]) -> None:
    scene_files = list(scene_files)
    total = sum(scene["duration"] for scene in SCENES)
    css_steps = []
    cursor = 0.0
    for idx, scene in enumerate(SCENES):
        start = cursor / total * 100
        end = (cursor + scene["duration"]) / total * 100
        css_steps.append((idx + 1, start, end))
        cursor += scene["duration"]

    keyframes = ["@keyframes stillpointPilot {"]
    for idx, start, end in css_steps:
        keyframes.append(f"  {start:.3f}%, {end:.3f}% {{ background-image: url('scenes/scene-{idx:02}.png'); }}")
    keyframes.append("}")

    html = f"""<!doctype html>
<html lang="zh">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Stillpoint Pick-A-Card Prototype</title>
  <style>
    html, body {{
      margin: 0;
      min-height: 100%;
      background: #141214;
      display: grid;
      place-items: center;
      color: #f3ecdc;
      font-family: "Microsoft YaHei", Arial, sans-serif;
    }}
    .frame {{
      width: min(100vw, 1280px);
      aspect-ratio: 16 / 9;
      background-size: cover;
      background-position: center;
      animation: stillpointPilot {total}s linear infinite;
      box-shadow: 0 20px 80px rgba(0,0,0,.45);
    }}
    .hint {{
      margin-top: 16px;
      color: #bfb5a9;
      font-size: 14px;
    }}
    {" ".join(keyframes)}
  </style>
</head>
<body>
  <main>
    <div class="frame" aria-label="Stillpoint Tarot pick-a-card prototype"></div>
    <div class="hint">HTML preview loops the scene timing. MP4/GIF exports use the same frames.</div>
  </main>
</body>
</html>
"""
    (OUT / "preview-loop.html").write_text(html, encoding="utf-8")


def write_ffmpeg_concat(scene_files: list[Path], durations: list[int]) -> None:
    lines: list[str] = []
    for path, duration in zip(scene_files, durations, strict=True):
        lines.append(f"file '{path.as_posix()}'")
        lines.append(f"duration {duration}")
    lines.append(f"file '{scene_files[-1].as_posix()}'")
    (OUT / "ffmpeg-concat.txt").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    SCENES_DIR.mkdir(parents=True, exist_ok=True)
    scene_files: list[Path] = []
    durations: list[int] = []

    for idx, scene in enumerate(SCENES, start=1):
        image = render_scene(scene)
        path = SCENES_DIR / f"scene-{idx:02}.png"
        image.save(path)
        scene_files.append(path)
        durations.append(scene["duration"])

    gif_frames = [Image.open(path).convert("P", palette=Image.Palette.ADAPTIVE, colors=128) for path in scene_files]
    gif_frames[0].save(
        OUT / "preview-animation.gif",
        save_all=True,
        append_images=gif_frames[1:],
        duration=[d * 1000 for d in durations],
        loop=0,
        optimize=True,
    )

    write_subtitles()
    write_script_md()
    write_preview_html(scene_files)
    write_ffmpeg_concat(scene_files, durations)
    (OUT / "manifest.json").write_text(
        json.dumps({"width": WIDTH, "height": HEIGHT, "scenes": SCENES, "groups": GROUPS}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"Wrote {len(scene_files)} scenes to {SCENES_DIR}")
    print(f"Wrote preview GIF to {OUT / 'preview-animation.gif'}")


if __name__ == "__main__":
    main()
