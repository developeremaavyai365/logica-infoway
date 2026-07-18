"""Fetch brand names from logicainfoway.com."""
import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
BASE = "https://www.logicainfoway.com"

PAGES = [
    "/",
    "/shop/",
    "/product-category/laptops/",
    "/product-category/mobile-phones/",
    "/about/",
]


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="ignore")


def main():
    html = ""
    for p in PAGES:
        try:
            html += fetch(BASE + p)
        except Exception as e:
            print(f"skip {p}: {e}")

    # WooCommerce brand taxonomy, partner sections, alt text, etc.
    brands = set()

    for m in re.finditer(r'brand[_-]?name["\s:>]+([A-Za-z0-9][A-Za-z0-9+.\-\s&]{1,30})', html, re.I):
        brands.add(m.group(1).strip())

    for m in re.finditer(r'product_brand[^>]*>([^<]+)<', html, re.I):
        brands.add(m.group(1).strip())

    # Common patterns on shop pages
    known = [
        "HP", "Dell", "Lenovo", "ASUS", "Acer", "Apple", "Samsung", "OnePlus",
        "MSI", "LG", "Sony", "Canon", "Epson", "Brother", "Xerox", "Logitech",
        "Microsoft", "Intel", "AMD", "NVIDIA", "OPPO", "Vivo", "Realme", "Xiaomi",
        "Motorola", "Nokia", "Google", "Nothing", "iBall", "Zebronics", "Portronics",
        "TP-Link", "D-Link", "Netgear", "Cisco", "Western Digital", "Seagate",
        "Kingston", "SanDisk", "Crucial", "Corsair", "BenQ", "ViewSonic", "AOC",
        "Philips", "JBL", "Boat", "Jabra", "Dell EMC", "HPE", "APC", "CyberPower",
    ]
    for k in known:
        if re.search(rf"\b{re.escape(k)}\b", html, re.I):
            brands.add(k)

    # Brand logos in uploads
    for m in re.finditer(r'/wp-content/uploads/[^"\']*?([A-Za-z][A-Za-z0-9-]+)-logo', html, re.I):
        brands.add(m.group(1).replace("-", " ").title())

    # Product titles often start with brand
    for m in re.finditer(r'product/([a-z0-9-]+)', html):
        slug = m.group(1)
        first = slug.split("-")[0]
        if first in ("hp", "dell", "lenovo", "asus", "acer", "apple", "samsung", "oneplus", "msi", "lg", "canon", "epson", "brother", "logitech", "oppo", "vivo", "realme", "xiaomi", "motorola", "nokia", "google", "benq", "viewsonic", "aoc", "philips", "jbl", "boat", "jabra", "tp", "netgear", "cisco", "kingston", "sandisk", "crucial", "corsair", "zebronics", "portronics", "iball", "nothing", "microsoft", "intel", "amd", "nvidia", "xerox", "apc", "seagate", "western"):
            brands.add(first.upper() if len(first) <= 4 else first.title())

    # Explicit partner / brand blocks
    for m in re.finditer(r'<(?:span|strong|h\d)[^>]*>\s*([A-Z][A-Za-z0-9+.&]{1,20})\s*</', html):
        t = m.group(1).strip()
        if t in known or len(t) <= 12:
            if t not in ("Shop", "Home", "About", "Contact", "Deals", "Cart", "Login", "India", "Search"):
                brands.add(t)

    cleaned = sorted({b.strip() for b in brands if 2 <= len(b.strip()) <= 25 and not b.strip().isdigit()}, key=str.lower)
    print(f"Found {len(cleaned)} brands:")
    for b in cleaned:
        print(f"  {b}")

    # Count product slug prefixes
    prefixes: dict[str, int] = {}
    for m in re.finditer(r'/product/([a-z0-9-]+)', html):
        slug = m.group(1)
        parts = slug.split("-")
        for n in (1, 2):
            if n <= len(parts):
                key = "-".join(parts[:n])
                prefixes[key] = prefixes.get(key, 0) + 1

    print("\nTop slug prefixes:")
    for k, v in sorted(prefixes.items(), key=lambda x: -x[1])[:40]:
        if v >= 3 and len(k) >= 2:
            print(f"  {v:3} {k}")


if __name__ == "__main__":
    main()
