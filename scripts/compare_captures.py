"""Compare the first fold of Playwright captures with the provided mockups."""
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
CAPTURES = ROOT / "qa" / "captures"
PAGES = ("home", "productos", "frutas", "verduras", "restaurantes", "cotizar", "privacidad", "404")

for page in PAGES:
    for mode, width, height in (("desktop", 1440, 900), ("mobile", 390, 844)):
        with Image.open(ROOT / "design" / "mockups" / mode / f"{page}-{mode}.png") as mockup:
            reference = Image.new("RGB", (width, height), "#f6f3eb")
            reference.paste(mockup.crop((0, 0, width, min(height, mockup.height))).convert("RGB"))
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
