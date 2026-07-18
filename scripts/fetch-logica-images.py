"""Fetch product image URLs from logicainfoway.com and download to public/products/."""
import os
import re
import urllib.parse
import urllib.request

BASE = "https://www.logicainfoway.com"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "products")
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

# Product search terms -> output filename
PRODUCTS = {
    "samsung-galaxy-f54": ["galaxy-f54", "f54-5g"],
    "asus-rog-strix-g15": ["rog-strix-g15", "rog-strix"],
    "iphone-15-plus": ["iphone-15-plus", "iphone-15"],
    "hp-victus-15": ["hp-victus", "victus-15"],
    "macbook-pro-m2": ["macbook-pro", "mnejo", "mnejp"],
    "lenovo-ideapad-slim-3": ["ideapad-slim-3", "ideapad-slim"],
    "samsung-s25-ultra": ["s25-ultra", "galaxy-s25"],
    "iphone-16": ["iphone-16"],
    "samsung-galaxy-a16": ["galaxy-a16", "a16-5g"],
    "hp-v20-monitor": ["hp-v20", "v20-19"],
    "samsung-curved-monitor": ["curved", "lc24", "gaming-monitor"],
    "acer-eb192q": ["eb192q", "acer-eb"],
}

PAGES = [
    "/",
    "/product-category/laptops/",
    "/product-category/mobile-phones/",
    "/product-category/monitors/",
    "/shop/",
]


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="ignore")


def collect_images(html: str) -> list[str]:
    found = []
    for m in re.finditer(r'(https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)(?:\?[^\s"\'<>]*)?)', html, re.I):
        found.append(m.group(1))
    for m in re.finditer(r'(/wp-content/uploads/[^\s"\'<>]+\.(?:jpg|jpeg|png|webp))', html, re.I):
        found.append(BASE + m.group(1))
    # srcset entries
    for m in re.finditer(r'(https?://[^\s,]+\.(?:jpg|jpeg|png|webp))', html, re.I):
        u = m.group(1).split(" ")[0]
        if u not in found:
            found.append(u)
    return list(dict.fromkeys(found))


def download(url: str, path: str) -> bool:
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        if len(data) < 3000:
            return False
        with open(path, "wb") as f:
            f.write(data)
        return True
    except Exception as e:
        print(f"  FAIL {url}: {e}")
        return False


def main():
    os.makedirs(OUT, exist_ok=True)
    all_imgs: list[str] = []
    for page in PAGES:
        url = BASE + page
        print(f"Fetching {url}")
        try:
            html = fetch(url)
            all_imgs.extend(collect_images(html))
        except Exception as e:
            print(f"  page error: {e}")
    all_imgs = list(dict.fromkeys(all_imgs))
    print(f"Found {len(all_imgs)} image URLs")

    for name, keywords in PRODUCTS.items():
        matches = [
            u for u in all_imgs
            if any(k.lower() in u.lower() for k in keywords)
            and "logo" not in u.lower()
            and "banner" not in u.lower()
            and "icon" not in u.lower()
        ]
        if not matches:
            print(f"NO MATCH: {name}")
            continue
        # prefer larger images (often have dimensions in filename)
        matches.sort(key=lambda u: len(u), reverse=True)
        ext = os.path.splitext(urllib.parse.urlparse(matches[0]).path)[1] or ".jpg"
        out = os.path.join(OUT, f"{name}{ext}")
        print(f"Downloading {name} <- {matches[0][:80]}...")
        if download(matches[0], out):
            print(f"  OK {os.path.getsize(out)} bytes")

    print("\nAll images in public/products:")
    for f in sorted(os.listdir(OUT)):
        p = os.path.join(OUT, f)
        print(f"  {f:40} {os.path.getsize(p):>8}")


if __name__ == "__main__":
    main()
