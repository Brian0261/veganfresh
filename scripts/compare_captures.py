"""Compare Playwright captures against the editorial upgrade mockups."""
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
CAPTURES = ROOT / "qa" / "captures"
PAGES = ("home", "productos", "frutas", "verduras", "restaurantes", "cotizar", "privacidad", "404")

for page in PAGES:
    for mode, width, height in (("desktop", 1440, 900), ("mobile", 390, 844)):
        with Image.open(ROOT / "design" / "mockups" / mode / f"{page}-{width}.png") as mockup:
            reference = Image.new("RGB", (width, height), "#f6f3eb")
            reference.paste(mockup.crop((0, 0, width, min(height, mockup.height))).convert("RGB"))
            complete_reference = mockup.convert("RGB")
        with Image.open(CAPTURES / f"{page}-{width}-first-fold.png") as screenshot:
            current = screenshot.convert("RGB")
        difference = ImageChops.difference(reference, current)
        canvas = Image.new("RGB", (width * 3, height + 30), "#eeeeee")
        labels = ImageDraw.Draw(canvas)
        for index, (label, panel) in enumerate((
            ("Referencia", reference), ("Implementacion", current), ("Diferencia RGB", difference),
        )):
            x = width * index
            labels.text((x + 8, 8), label, fill="black")
            canvas.paste(panel, (x, 30))
        canvas.thumbnail((1800, 950))
        canvas.save(CAPTURES / f"{page}-{width}-comparacion.png")

        with Image.open(CAPTURES / f"{page}-{width}.png") as screenshot:
            complete_screenshot = screenshot.convert("RGB")
        column_width = 380 if width == 1440 else 230
        for panel in (complete_reference, complete_screenshot):
            panel.thumbnail((column_width, 5500))
        page_sheet = Image.new("RGB", (column_width * 2 + 12, 30 + max(
            complete_reference.height, complete_screenshot.height,
        )), "#eeeeee")
        labels = ImageDraw.Draw(page_sheet)
        for index, (label, panel) in enumerate((
            ("Referencia", complete_reference), ("Implementacion", complete_screenshot),
        )):
            x = index * (column_width + 12)
            labels.text((x + 8, 8), label, fill="black")
            page_sheet.paste(panel, (x, 30))
        page_sheet.save(CAPTURES / f"{page}-{width}-comparacion-completa.png")
