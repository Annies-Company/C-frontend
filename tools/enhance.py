"""Brightens and colour-corrects food photos for the website.

    python3 tools/enhance.py <input> <output.jpg>

Gentle on purpose: pulls yellow indoor light back toward neutral, stretches
contrast, lifts dull exposure toward a bright, airy look, adds a touch of
colour and sharpness. Also strips camera metadata (including GPS).
"""
import subprocess, sys, tempfile, os
from PIL import Image, ImageOps, ImageEnhance, ImageFilter, ImageStat


def load(path):
    if path.lower().endswith(".heic"):
        tmp = os.path.join(tempfile.mkdtemp(), "in.jpg")
        subprocess.run(["sips", "-s", "format", "jpeg", path, "--out", tmp], capture_output=True, check=True)
        path = tmp
    return ImageOps.exif_transpose(Image.open(path)).convert("RGB")


def enhance(im):
    r, g, b = ImageStat.Stat(im).mean
    avg = (r + g + b) / 3
    fix = lambda c, m: c.point(lambda v: min(255, v * (0.5 + 0.5 * avg / max(m, 1))))
    im = Image.merge("RGB", tuple(fix(c, m) for c, m in zip(im.split(), (r, g, b))))
    im = ImageOps.autocontrast(im, cutoff=0.6)
    lum = ImageStat.Stat(im.convert("L")).mean[0] / 255
    if lum < 0.56:
        gamma = max(0.72, min(1.0, (0.56 / max(lum, 0.2)) ** -0.8))
        im = im.point(lambda v: 255 * ((v / 255) ** gamma))
    im = ImageEnhance.Color(im).enhance(1.08)
    return im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=60, threshold=3))


if __name__ == "__main__":
    src, dest = sys.argv[1], sys.argv[2]
    out = enhance(load(src))
    out.thumbnail((1600, 1600), Image.LANCZOS)
    out.save(dest, "JPEG", quality=84, optimize=True, progressive=True)
