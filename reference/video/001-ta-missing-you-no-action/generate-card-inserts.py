from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


HERE = Path(__file__).resolve().parent
OUT_DIR = HERE / "card-inserts"
CARD_W = 500
CARD_H = 840
SPREAD_W = 2160
SPREAD_H = 3840


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
        "slug": "group-1",
        "label": "第一组 黑色石头",
        "accent": (92, 101, 119),
        "summary": "想起是真的，但行动还被旧伤卡住",
        "cards": [
            ("the-tower", "高塔", "reversed", "逆位"),
            ("the-fool", "愚者", "reversed", "逆位"),
            ("five-of-wands", "权杖五", "upright", "正位"),
            ("three-of-swords", "宝剑三", "upright", "正位"),
            ("nine-of-swords", "宝剑九", "upright", "正位"),
            ("two-of-wands", "权杖二", "reversed", "逆位"),
        ],
    },
    {
        "slug": "group-2",
        "label": "第二组 红线",
        "accent": (190, 65, 70),
        "summary": "有牵引，但还没有落地",
        "cards": [
            ("ten-of-pentacles", "星币十", "reversed", "逆位"),
            ("queen-of-wands", "权杖皇后", "reversed", "逆位"),
            ("knight-of-wands", "权杖骑士", "upright", "正位"),
            ("the-moon", "月亮", "reversed", "逆位"),
            ("the-hanged-man", "倒吊人", "upright", "正位"),
            ("four-of-cups", "圣杯四", "reversed", "逆位"),
        ],
    },
    {
        "slug": "group-3",
        "label": "第三组 透明水晶",
        "accent": (132, 184, 198),
        "summary": "慢慢靠近，但不要替冷静补成深情",
        "cards": [
            ("eight-of-pentacles", "星币八", "upright", "正位"),
            ("queen-of-swords", "宝剑皇后", "upright", "正位"),
            ("four-of-swords", "宝剑四", "upright", "正位"),
            ("two-of-pentacles", "星币二", "reversed", "逆位"),
            ("three-of-pentacles", "星币三", "upright", "正位"),
            ("king-of-cups", "圣杯国王", "reversed", "逆位"),
        ],
    },
]


def find_repo_root() -> Path:
    for path in [HERE, *HERE.parents]:
        if (path / "public" / "images" / "cards").exists():
            return path
    raise RuntimeError("Could not find public/images/cards.")


ROOT = find_repo_root()
CARD_DIR = ROOT / "public" / "images" / "cards"


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


FONT_TITLE = load_font(92, bold=True)
FONT_BODY = load_font(48)
FONT_SMALL = load_font(36)


def draw_table_background(size: tuple[int, int], accent: tuple[int, int, int]) -> Image.Image:
    image = Image.new("RGB", size, (20, 17, 22))
    draw = ImageDraw.Draw(image)
    width, height = size
    for y in range(0, height, 28):
        shade = 18 + (y % 120) // 20
        draw.rectangle((0, y, width, y + 14), fill=(shade, 16, 22))
    draw.rectangle((60, 60, width - 60, height - 60), outline=(54, 47, 62), width=3)
    draw.rectangle((85, 85, width - 85, height - 85), outline=(32, 28, 36), width=3)
    draw.line((160, 240, width - 160, 240), fill=accent, width=4)
    return image


def card_image(card_id: str, orientation: str, width: int = CARD_W) -> Image.Image:
    source = Image.open(CARD_DIR / f"{card_id}.webp").convert("RGB")
    height = int(width * 1.68)
    image = ImageOps.contain(source, (width, height), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (width, height), (244, 232, 207))
    canvas.paste(image, ((width - image.width) // 2, (height - image.height) // 2))
    if orientation == "reversed":
        canvas = canvas.rotate(180)
    return canvas


def make_card_overlay(card_id: str, orientation: str) -> Image.Image:
    card = card_image(card_id, orientation, width=620).convert("RGBA")
    image = Image.new("RGBA", (760, 1180), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    x = (image.width - card.width) // 2
    y = 70
    draw.rounded_rectangle((x + 18, y + 24, x + card.width + 18, y + card.height + 24), radius=28, fill=(0, 0, 0, 95))
    draw.rounded_rectangle((x - 8, y - 8, x + card.width + 8, y + card.height + 8), radius=28, fill=(218, 194, 142, 255))
    image.alpha_composite(card, (x, y))
    return image


def make_card_insert(card_id: str, zh_name: str, orientation: str, orientation_zh: str, position: str) -> Image.Image:
    image = Image.new("RGB", (900, 1400), (20, 17, 22))
    draw = ImageDraw.Draw(image)
    card = card_image(card_id, orientation, width=620)
    x = (image.width - card.width) // 2
    y = 120
    draw.rounded_rectangle((x + 18, y + 24, x + card.width + 18, y + card.height + 24), radius=26, fill=(7, 6, 8))
    draw.rounded_rectangle((x - 8, y - 8, x + card.width + 8, y + card.height + 8), radius=26, fill=(218, 194, 142))
    image.paste(card, (x, y))
    draw.text((90, 1190), position, font=FONT_SMALL, fill=(186, 178, 166))
    draw.text((90, 1248), f"{zh_name} {orientation_zh}", font=FONT_BODY, fill=(247, 239, 224))
    return image


def make_spread(group: dict) -> Image.Image:
    image = draw_table_background((SPREAD_W, SPREAD_H), group["accent"])
    draw = ImageDraw.Draw(image)
    draw.text((170, 130), group["label"], font=FONT_TITLE, fill=(248, 240, 226))
    draw.text((175, 270), group["summary"], font=FONT_BODY, fill=(211, 199, 178))

    card_w = 500
    xs = [170, 830, 1490]
    ys = [540, 1890]
    for index, (card_id, zh_name, orientation, orientation_zh) in enumerate(group["cards"]):
        x = xs[index % 3]
        y = ys[index // 3]
        card = card_image(card_id, orientation, width=card_w)
        draw.rounded_rectangle((x + 20, y + 28, x + card.width + 20, y + card.height + 28), radius=28, fill=(8, 7, 10))
        draw.rounded_rectangle((x - 8, y - 8, x + card.width + 8, y + card.height + 8), radius=28, fill=(222, 198, 144))
        image.paste(card, (x, y))
        draw.text((x, y + card.height + 42), POSITIONS[index], font=FONT_SMALL, fill=(183, 174, 162))
        draw.text((x, y + card.height + 98), f"{zh_name} {orientation_zh}", font=FONT_BODY, fill=(248, 240, 226))

    return image


def make_contact_sheet(spread_paths: list[Path]) -> None:
    thumb_w = 600
    thumb_h = 1067
    image = Image.new("RGB", (2160, 1500), (20, 17, 22))
    draw = ImageDraw.Draw(image)
    draw.text((100, 80), "001 exact card insert spreads", font=FONT_TITLE, fill=(248, 240, 226))
    for index, path in enumerate(spread_paths):
        spread = Image.open(path).convert("RGB")
        spread = ImageOps.contain(spread, (thumb_w, thumb_h), Image.Resampling.LANCZOS)
        x = 100 + index * 680
        y = 300
        image.paste(spread, (x, y))
        draw.text((x, y + thumb_h + 45), path.stem, font=FONT_SMALL, fill=(214, 202, 185))
    image.save(OUT_DIR / "all-groups-contact-sheet.png")


def make_print_sheets(individual_paths: list[Path]) -> None:
    print_dir = OUT_DIR / "print-sheets"
    print_dir.mkdir(parents=True, exist_ok=True)
    sheet_w = 2480
    sheet_h = 3508
    margin_x = 145
    margin_y = 150
    cell_w = 700
    cell_h = 1030
    per_sheet = 9
    for sheet_index in range(0, len(individual_paths), per_sheet):
        sheet = Image.new("RGB", (sheet_w, sheet_h), (245, 241, 232))
        draw = ImageDraw.Draw(sheet)
        draw.text((margin_x, 60), f"001 card print sheet {sheet_index // per_sheet + 1}", font=FONT_BODY, fill=(30, 27, 32))
        for offset, path in enumerate(individual_paths[sheet_index : sheet_index + per_sheet]):
            source = Image.open(path).convert("RGB")
            card_crop = source.crop((140, 80, 760, 1125))
            card_crop = ImageOps.contain(card_crop, (560, 940), Image.Resampling.LANCZOS)
            col = offset % 3
            row = offset // 3
            x = margin_x + col * cell_w
            y = margin_y + row * cell_h
            sheet.paste(card_crop, (x, y))
            draw.rectangle((x, y, x + card_crop.width, y + card_crop.height), outline=(160, 150, 130), width=2)
        sheet.save(print_dir / f"print-sheet-{sheet_index // per_sheet + 1:02d}.png")


def clean_outputs() -> None:
    OUT_DIR.mkdir(exist_ok=True)
    for path in OUT_DIR.glob("*.png"):
        path.unlink()
    for group in GROUPS:
        group_dir = OUT_DIR / group["slug"]
        group_dir.mkdir(parents=True, exist_ok=True)
        for path in group_dir.glob("*.png"):
            path.unlink()
    print_dir = OUT_DIR / "print-sheets"
    print_dir.mkdir(parents=True, exist_ok=True)
    for path in print_dir.glob("*.png"):
        path.unlink()


def main() -> None:
    clean_outputs()
    spread_paths: list[Path] = []
    individual_paths: list[Path] = []

    for group in GROUPS:
        group_dir = OUT_DIR / group["slug"]
        for index, (card_id, zh_name, orientation, orientation_zh) in enumerate(group["cards"], start=1):
            labeled = make_card_insert(card_id, zh_name, orientation, orientation_zh, POSITIONS[index - 1])
            labeled_out = group_dir / f"{index:02d}-{card_id}-{orientation}-labeled.png"
            labeled.save(labeled_out)
            individual_paths.append(labeled_out)

            overlay = make_card_overlay(card_id, orientation)
            overlay_out = group_dir / f"{index:02d}-{card_id}-{orientation}-card.png"
            overlay.save(overlay_out)

        spread = make_spread(group)
        spread_out = OUT_DIR / f"{group['slug']}-spread.png"
        spread.save(spread_out)
        spread_paths.append(spread_out)

    make_contact_sheet(spread_paths)
    make_print_sheets(individual_paths)

    print("Generated card inserts:")
    for path in spread_paths:
        print(f"- {path.relative_to(HERE)}")
    print("- card-inserts/all-groups-contact-sheet.png")
    print("- card-inserts/print-sheets/print-sheet-01.png")
    print("- card-inserts/print-sheets/print-sheet-02.png")


if __name__ == "__main__":
    main()
