"""Scrape WooCommerce product pages from logicainfoway.com for images."""
import json
import os
import re
import urllib.parse
import urllib.request

BASE = "https://www.logicainfoway.com"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "products")
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

# slug fragment -> output filename (order matters: first match wins per product)
TARGETS = [
    ("samsung-galaxy-f54", ["galaxy-f54", "f54-5g", "samsung-galaxy-f54"]),
    ("asus-rog-strix-g15", ["rog-strix-g15", "rog-strix-g15-gaming", "asus-rog-strix"]),
    ("iphone-15-plus", ["iphone-15-plus", "apple-iphone-15-plus"]),
    ("hp-victus-15", ["hp-victus-15", "victus-15-gaming", "hp-victus"]),
    ("macbook-pro-m2", ["macbook-pro-13-m2", "macbook-pro-13", "apple-macbook-pro-13"]),
    ("lenovo-ideapad-slim-3", ["ideapad-slim-3", "lenovo-ideapad-slim"]),
    ("samsung-s25-ultra", ["galaxy-s25-ultra", "s25-ultra", "samsung-galaxy-s25"]),
    ("iphone-16", ["iphone-16", "apple-iphone-16"]),
    ("samsung-galaxy-a16", ["galaxy-a16", "a16-5g", "samsung-galaxy-a16"]),
    ("hp-v20-monitor", ["hp-v20", "v20-19", "hp-v20-19"]),
    ("samsung-curved-monitor", ["samsung-24-curved", "curved-fhd", "gaming-monitor-24"]),
    ("acer-eb192q", ["acer-eb192q", "eb192q"]),
]

CATEGORY_PAGES = [
    "/product-category/laptops/",
    "/product-category/mobile-phones/",
    "/product-category/monitors/",
    "/",
]


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="ignore")


def product_links(html: str) -> list[str]:
    links = set()
    for m in re.finditer(r'href="(https?://www\.logicainfoway\.com/product/[^"#?]+/?)"', html):
        links.add(m.group(1).rstrip("/") + "/")
    for m in re.finditer(r'href="(/product/[^"#?]+/?)"', html):
        links.add((BASE + m.group(1)).rstrip("/") + "/")
    return sorted(links)


def main_image(html: str) -> str | None:
    # og:image is usually the main product shot
    m = re.search(r'property="og:image"\s+content="([^"]+)"', html)
    if m:
        return m.group(1)
    m = re.search(r'class="[^"]*wp-post-image[^"]*"[^>]*src="([^"]+)"', html)
    if m:
        return m.group(1)
    m = re.search(r'data-large_image="([^"]+)"', html)
    if m:
        return m.group(1)
    for m in re.finditer(r'(https?://[^\s"\'<>]+/wp-content/uploads/[^\s"\'<>]+\.(?:jpg|jpeg|png|webp))', html, re.I):
        u = m.group(1)
        if "logo" not in u.lower() and "banner" not in u.lower():
            return u
    return None


def slug_from_url(url: str) -> str:
    path = urllib.parse.urlparse(url).path.rstrip("/")
    return path.split("/")[-1].lower()


def download(url: str, path: str) -> bool:
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        if len(data) < 2000:
            return False
        with open(path, "wb") as f:
            f.write(data)
        return True
    except Exception as e:
        print(f"  FAIL: {e}")
        return False


def main():
    os.makedirs(OUT, exist_ok=True)
    all_links: list[str] = []
    for page in CATEGORY_PAGES:
        try:
            html = fetch(BASE + page)
            all_links.extend(product_links(html))
        except Exception as e:
            print(f"skip {page}: {e}")
    all_links = list(dict.fromkeys(all_links))
    print(f"Found {len(all_links)} product URLs")

    catalog: list[dict] = []
    for link in all_links:
        slug = slug_from_url(link)
        try:
            html = fetch(link)
            img = main_image(html)
            title_m = re.search(r'<title>([^<]+)</title>', html)
            title = title_m.group(1).split(" - ")[0].strip() if title_m else slug
            catalog.append({"slug": slug, "url": link, "title": title, "image": img})
        except Exception as e:
            print(f"  skip {slug}: {e}")

    with open(os.path.join(OUT, "_catalog.json"), "w", encoding="utf-8") as f:
        json.dump(catalog, f, indent=2)

    matched = set()
    for out_name, fragments in TARGETS:
        if out_name in matched:
            continue
        hit = None
        for item in catalog:
            slug = item["slug"]
            if any(frag in slug for frag in fragments):
                hit = item
                break
        if not hit:
            # fuzzy: any fragment in title
            for item in catalog:
                title = item["title"].lower()
                if any(frag.replace("-", " ") in title for frag in fragments):
                    hit = item
                    break
        if not hit or not hit["image"]:
            print(f"NO MATCH: {out_name}")
            continue
        ext = os.path.splitext(urllib.parse.urlparse(hit["image"]).path)[1] or ".jpg"
        path = os.path.join(OUT, f"{out_name}{ext}")
        print(f"{out_name} <- {hit['slug']}")
        print(f"  {hit['image'][:90]}")
        if download(hit["image"], path):
            matched.add(out_name)
            print(f"  saved {os.path.getsize(path)} bytes")


if __name__ == "__main__":
    main()
