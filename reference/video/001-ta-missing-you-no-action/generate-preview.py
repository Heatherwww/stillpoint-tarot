from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


HERE = Path(__file__).resolve().parent
WIDTH = 1080
HEIGHT = 1920
CARD_W = 225
CARD_H = 392


POSITIONS = [
    "连接状态",
    "TA 是否想起你",
    "触发点",
    "为什么没行动",
    "未来 30 天",
    "给你的建议",
]


GROUPS = [
    {
        "number": "01",
        "label": "第一组",
        "anchor": "黑色石头",
        "slug": "group-1",
        "accent": (79, 88, 105),
        "start": "00:50",
        "summary": "想起是真的，但行动还被旧伤卡住",
        "cards": [
            ("the-tower", "高塔", "逆位"),
            ("the-fool", "愚者", "逆位"),
            ("five-of-wands", "权杖五", "正位"),
            ("three-of-swords", "宝剑三", "正位"),
            ("nine-of-swords", "宝剑九", "正位"),
            ("two-of-wands", "权杖二", "逆位"),
        ],
        "bullets": [
            "结论：TA 有想起你，但想起并不轻松。",
            "不行动：宝剑三指向旧伤、刺痛和未说清的话。",
            "30天：更像焦虑、反复想起和试探。",
            "提醒：不要把自己一直放在等待的位置。",
        ],
    },
    {
        "number": "02",
        "label": "第二组",
        "anchor": "红线",
        "slug": "group-2",
        "accent": (174, 54, 59),
        "start": "07:45",
        "summary": "有牵引，但还没有落地",
        "cards": [
            ("ten-of-pentacles", "星币十", "逆位"),
            ("queen-of-wands", "权杖皇后", "逆位"),
            ("knight-of-wands", "权杖骑士", "正位"),
            ("the-moon", "月亮", "逆位"),
            ("the-hanged-man", "倒吊人", "正位"),
            ("four-of-cups", "圣杯四", "逆位"),
        ],
        "bullets": [
            "结论：不是完全冷掉，这里有吸引和拉扯。",
            "不行动：月亮逆位说明路还没有真正看清。",
            "30天：倒吊人更像悬着、观察、慢慢转念。",
            "提醒：看他热完以后，能不能持续往前走。",
        ],
    },
    {
        "number": "03",
        "label": "第三组",
        "anchor": "透明水晶",
        "slug": "group-3",
        "accent": (128, 177, 190),
        "start": "14:55",
        "summary": "慢慢靠近，但不要替冷静补成深情",
        "cards": [
            ("eight-of-pentacles", "星币八", "正位"),
            ("queen-of-swords", "宝剑皇后", "正位"),
            ("four-of-swords", "宝剑四", "正位"),
            ("two-of-pentacles", "星币二", "逆位"),
            ("three-of-pentacles", "星币三", "正位"),
            ("king-of-cups", "圣杯国王", "逆位"),
        ],
        "bullets": [
            "结论：TA 有想起你，但方式更清醒克制。",
            "不行动：现实节奏失衡，未必能稳定承接。",
            "30天：星币三带来合作、沟通、共同事务入口。",
            "提醒：不要自动把克制读成成熟。",
        ],
    },
]


def find_repo_root() -> Path:
    for path in [HERE, *HERE.parents]:
        if (path / "public" / "images" / "cards").exists():
            return path
    raise RuntimeError("Could not find public/images/cards from this script location.")


ROOT = find_repo_root()
CARD_DIR = ROOT / "public" / "images" / "cards"
FRAME_DIR = HERE / "frames"


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


FONT_TITLE = load_font(62, bold=True)
FONT_SUBTITLE = load_font(38)
FONT_BODY = load_font(34)
FONT_SMALL = load_font(27)
FONT_TINY = load_font(23)


def make_canvas() -> Image.Image:
    image = Image.new("RGB", (WIDTH, HEIGHT), (18, 16, 21))
    draw = ImageDraw.Draw(image)
    for y in range(0, HEIGHT, 24):
        shade = 18 + (y % 96) // 12
        draw.rectangle((0, y, WIDTH, y + 12), fill=(shade, 16, 22))
    draw.rectangle((38, 38, WIDTH - 38, HEIGHT - 38), outline=(66, 56, 68), width=2)
    draw.rectangle((55, 55, WIDTH - 55, HEIGHT - 55), outline=(33, 29, 38), width=2)
    return image


def text_width(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont) -> int:
    if not text:
        return 0
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0]


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont, max_width: int) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        current = ""
        for char in paragraph:
            candidate = current + char
            if current and text_width(draw, candidate, font) > max_width:
                lines.append(current)
                current = char
            else:
                current = candidate
        lines.append(current)
    return lines


def draw_wrapped(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    font: ImageFont.ImageFont,
    fill: tuple[int, int, int],
    max_width: int,
    line_gap: int = 10,
) -> int:
    x, y = xy
    line_height = draw.textbbox((0, 0), "测", font=font)[3] + line_gap
    for line in wrap_text(draw, text, font, max_width):
        draw.text((x, y), line, font=font, fill=fill)
        y += line_height
    return y


def draw_centered(
    draw: ImageDraw.ImageDraw,
    y: int,
    text: str,
    font: ImageFont.ImageFont,
    fill: tuple[int, int, int],
) -> int:
    width = text_width(draw, text, font)
    draw.text(((WIDTH - width) // 2, y), text, font=font, fill=fill)
    return y + draw.textbbox((0, 0), text, font=font)[3]


def draw_anchor(draw: ImageDraw.ImageDraw, kind: str, center: tuple[int, int], scale: float = 1.0) -> None:
    x, y = center
    if kind == "黑色石头":
        r = int(54 * scale)
        draw.ellipse((x - r, y - r // 2, x + r, y + r // 2), fill=(24, 25, 29), outline=(103, 106, 117), width=3)
        draw.arc((x - r + 16, y - r // 2 + 9, x + r - 10, y + r // 2 - 7), 190, 338, fill=(75, 79, 90), width=3)
    elif kind == "红线":
        points = []
        for i in range(-90, 91, 9):
            points.append((x + int(i * scale), y + int(20 * scale * __import__("math").sin(i / 22))))
        draw.line(points, fill=(199, 59, 63), width=int(9 * scale), joint="curve")
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


def draw_card_back(draw: ImageDraw.ImageDraw, x: int, y: int, w: int = CARD_W, h: int = CARD_H) -> None:
    draw.rounded_rectangle((x + 10, y + 12, x + w + 10, y + h + 12), radius=20, fill=(8, 7, 10))
    draw.rounded_rectangle((x, y, x + w, y + h), radius=20, fill=(42, 35, 52), outline=(165, 139, 91), width=4)
    draw.rectangle((x + 28, y + 28, x + w - 28, y + h - 28), outline=(112, 91, 132), width=3)
    draw.line((x + 50, y + h // 2, x + w - 50, y + h // 2), fill=(165, 139, 91), width=3)
    draw.ellipse((x + 75, y + h // 2 - 55, x + w - 75, y + h // 2 + 55), outline=(165, 139, 91), width=3)


def load_card(card_id: str, orientation: str) -> Image.Image:
    source = Image.open(CARD_DIR / f"{card_id}.webp").convert("RGB")
    card = ImageOps.contain(source, (CARD_W, CARD_H), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (CARD_W, CARD_H), (242, 229, 201))
    canvas.paste(card, ((CARD_W - card.width) // 2, (CARD_H - card.height) // 2))
    if orientation == "逆位":
        canvas = canvas.rotate(180)
    return canvas


def draw_card(draw: ImageDraw.ImageDraw, image: Image.Image, x: int, y: int, card_id: str, zh_name: str, orientation: str, position: str) -> None:
    draw.rounded_rectangle((x + 10, y + 14, x + CARD_W + 10, y + CARD_H + 14), radius=18, fill=(8, 7, 10))
    draw.rounded_rectangle((x - 3, y - 3, x + CARD_W + 3, y + CARD_H + 3), radius=18, fill=(218, 193, 139))
    image.paste(load_card(card_id, orientation), (x, y))
    label_y = y + CARD_H + 14
    draw.text((x, label_y), position, font=FONT_TINY, fill=(191, 178, 156))
    draw.text((x, label_y + 31), f"{zh_name} {orientation}", font=FONT_SMALL, fill=(244, 237, 222))


def selection_frame() -> Path:
    image = make_canvas()
    draw = ImageDraw.Draw(image)
    draw_centered(draw, 145, "TA 最近有没有想起你？", FONT_TITLE, (246, 238, 222))
    draw_centered(draw, 230, "他为什么迟迟没有行动？", FONT_SUBTITLE, (210, 190, 154))
    draw_centered(draw, 310, "结构参考 · 成片用真人桌面读牌", FONT_BODY, (184, 178, 185))
    draw_centered(draw, 365, "凭第一眼选择一个视觉锚点", FONT_SMALL, (150, 144, 153))

    xs = [160, 428, 696]
    for i, group in enumerate(GROUPS):
        x = xs[i]
        draw_card_back(draw, x, 520)
        draw_anchor(draw, group["anchor"], (x + CARD_W // 2, 1035), scale=1.05)
        label = f"{group['label']}：{group['anchor']}"
        label_w = text_width(draw, label, FONT_SMALL)
        draw.text((x + (CARD_W - label_w) // 2, 1130), label, font=FONT_SMALL, fill=(246, 238, 222))
        draw.text((x + 42, 1175), group["start"], font=FONT_SMALL, fill=group["accent"])

    draw.rounded_rectangle((100, 1325, WIDTH - 100, 1585), radius=28, fill=(28, 24, 32), outline=(72, 63, 80), width=2)
    y = 1360
    for line in ["00:50 第一组 黑色石头", "07:45 第二组 红线", "14:55 第三组 透明水晶"]:
        draw_centered(draw, y, line, FONT_BODY, (232, 221, 202))
        y += 62

    draw_centered(draw, 1685, "不要用关系诊断选组，用身体的第一反应。", FONT_SMALL, (172, 167, 174))
    out = FRAME_DIR / "01-selection.png"
    image.save(out)
    return out


def spread_frame(group: dict, sequence: int) -> Path:
    image = make_canvas()
    draw = ImageDraw.Draw(image)
    draw.text((88, 100), f"{group['label']}：{group['anchor']}", font=FONT_TITLE, fill=(246, 238, 222))
    draw.text((92, 185), "结构参考 · 六张牌实抽记录", font=FONT_BODY, fill=group["accent"])
    draw_anchor(draw, group["anchor"], (900, 160), scale=0.88)

    xs = [92, 428, 764]
    ys = [320, 980]
    for index, (card_id, zh_name, orientation) in enumerate(group["cards"]):
        x = xs[index % 3]
        y = ys[index // 3]
        draw_card(draw, image, x, y, card_id, zh_name, orientation, POSITIONS[index])

    draw.text((92, 1725), group["summary"], font=FONT_BODY, fill=(246, 238, 222))
    draw.text((92, 1785), "保留翻牌和逆位方向，让观众看见抽卡过程。", font=FONT_SMALL, fill=(170, 164, 171))
    out = FRAME_DIR / f"{sequence:02d}-{group['slug']}-spread.png"
    image.save(out)
    return out


def key_frame(group: dict, sequence: int) -> Path:
    image = make_canvas()
    draw = ImageDraw.Draw(image)
    draw.text((88, 110), f"{group['label']}：{group['anchor']}", font=FONT_TITLE, fill=(246, 238, 222))
    draw.text((92, 205), "结构参考 · 成片应切回真人读牌", font=FONT_SMALL, fill=(172, 167, 174))
    draw_anchor(draw, group["anchor"], (910, 168), scale=0.92)
    draw.rounded_rectangle((88, 300, WIDTH - 88, 535), radius=30, fill=(29, 25, 34), outline=group["accent"], width=3)
    draw_wrapped(draw, (125, 350), group["summary"], FONT_SUBTITLE, (246, 238, 222), 820, line_gap=14)

    y = 670
    for bullet in group["bullets"]:
        draw.ellipse((105, y + 10, 123, y + 28), fill=group["accent"])
        y = draw_wrapped(draw, (145, y), bullet, FONT_BODY, (226, 219, 205), 820, line_gap=12)
        y += 34

    draw.rounded_rectangle((95, 1510, WIDTH - 95, 1718), radius=24, fill=(24, 22, 29), outline=(72, 63, 80), width=2)
    draw_wrapped(draw, (130, 1550), "真人版节奏：先翻牌和停顿，再讲结论；不要一上来跳答案。", FONT_SMALL, (181, 176, 184), 820)
    draw_wrapped(draw, (130, 1635), "字幕只抓关键句，画面要回到手、牌和桌面。", FONT_SMALL, (181, 176, 184), 820)

    out = FRAME_DIR / f"{sequence:02d}-{group['slug']}-key.png"
    image.save(out)
    return out


def closing_frame() -> Path:
    image = make_canvas()
    draw = ImageDraw.Draw(image)
    draw_centered(draw, 180, "把它当成镜子", FONT_TITLE, (246, 238, 222))
    draw_centered(draw, 270, "不是判决书，也不是承诺书", FONT_SUBTITLE, (210, 190, 154))
    for x, group in zip([250, 540, 830], GROUPS):
        draw_anchor(draw, group["anchor"], (x, 650), scale=1.15)
    draw_wrapped(draw, (145, 920), "真正要观察的，不只是 TA 有没有想起你。", FONT_SUBTITLE, (246, 238, 222), 820)
    draw_wrapped(draw, (145, 1080), "也要看 TA 有没有能力用稳定、清楚、尊重你的方式靠近你。", FONT_SUBTITLE, (246, 238, 222), 820)
    draw_centered(draw, 1500, "观察想念，也观察行动。", FONT_BODY, (210, 190, 154))
    out = FRAME_DIR / "08-closing.png"
    image.save(out)
    return out


def build_html(frames: list[Path]) -> None:
    links = "\n".join(
        f'        <figure><img src="frames/{path.name}" alt="{path.stem}"><figcaption>{path.name}</figcaption></figure>'
        for path in frames
    )
    slides = ",\n".join(f'      "frames/{path.name}"' for path in frames)
    html = f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>001 Preview Loop</title>
  <style>
    body {{
      margin: 0;
      background: #121015;
      color: #f5ecdc;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Microsoft YaHei", sans-serif;
    }}
    main {{
      max-width: 1180px;
      margin: 0 auto;
      padding: 28px;
    }}
    .stage {{
      display: grid;
      grid-template-columns: minmax(280px, 420px) 1fr;
      gap: 28px;
      align-items: start;
    }}
    #loop {{
      width: 100%;
      border: 1px solid #4b4153;
      border-radius: 8px;
      background: #18141d;
    }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-top: 28px;
    }}
    figure {{
      margin: 0;
      background: #1c1822;
      border: 1px solid #403747;
      border-radius: 8px;
      padding: 10px;
    }}
    figure img {{
      width: 100%;
      display: block;
      border-radius: 6px;
    }}
    figcaption {{
      margin-top: 8px;
      color: #bdb2c4;
      font-size: 13px;
    }}
    @media (max-width: 800px) {{
      .stage {{ grid-template-columns: 1fr; }}
    }}
  </style>
</head>
<body>
  <main>
    <h1>001 Preview Loop</h1>
    <div class="stage">
      <img id="loop" src="frames/{frames[0].name}" alt="preview loop">
      <div>
        <p>This is a structural reference only. The final video should feel like a real person reading at a table, with actual hand movement, card turns, pauses, and spoken interpretation.</p>
        <p>Landing points: 00:50 / 07:45 / 14:55 / 22:45.</p>
      </div>
    </div>
    <section class="grid">
{links}
    </section>
  </main>
  <script>
    const frames = [
{slides}
    ];
    let index = 0;
    const img = document.getElementById("loop");
    setInterval(() => {{
      index = (index + 1) % frames.length;
      img.src = frames[index];
    }}, 1800);
  </script>
</body>
</html>
"""
    (HERE / "preview-loop.html").write_text(html, encoding="utf-8")


def build_gif(frames: list[Path]) -> None:
    images = []
    for path in frames:
        frame = Image.open(path).convert("RGB")
        frame = ImageOps.contain(frame, (540, 960), Image.Resampling.LANCZOS)
        images.append(frame)
    images[0].save(
        HERE / "preview-animation.gif",
        save_all=True,
        append_images=images[1:],
        duration=1500,
        loop=0,
        optimize=True,
    )


def main() -> None:
    FRAME_DIR.mkdir(exist_ok=True)
    for stale_frame in FRAME_DIR.glob("*.png"):
        stale_frame.unlink()
    frames = [selection_frame()]
    sequence = 2
    for group in GROUPS:
        frames.append(spread_frame(group, sequence))
        sequence += 1
        frames.append(key_frame(group, sequence))
        sequence += 1
    frames.append(closing_frame())
    build_html(frames)
    build_gif(frames)
    print("Generated:")
    for frame in frames:
        print(f"- {frame.relative_to(HERE)}")
    print("- preview-loop.html")
    print("- preview-animation.gif")


if __name__ == "__main__":
    main()
