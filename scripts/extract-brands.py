"""Extract brands from logicainfoway.com product catalog."""
import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
BASE = "https://www.logicainfoway.com"

PAGES = [
    "/",
    "/product-category/laptops/",
    "/product-category/mobile-phones/",
    "/product-category/monitors/",
    "/product-category/printers/",
    "/product-category/accessories/",
    "/product-category/desktops/",
    "/product-category/software/",
]

BRAND_KEYS = {
    "hp": "HP",
    "dell": "Dell",
    "lenovo": "Lenovo",
    "asus": "ASUS",
    "acer": "Acer",
    "apple": "Apple",
    "samsung": "Samsung",
    "oneplus": "OnePlus",
    "oppo": "OPPO",
    "vivo": "Vivo",
    "realme": "Realme",
    "redmi": "Redmi",
    "honor": "Honor",
    "iphone": "Apple",
    "macbook": "Apple",
    "msi": "MSI",
    "lg": "LG",
    "sony": "Sony",
    "canon": "Canon",
    "epson": "Epson",
    "brother": "Brother",
    "xerox": "Xerox",
    "logitech": "Logitech",
    "microsoft": "Microsoft",
    "intel": "Intel",
    "amd": "AMD",
    "nvidia": "NVIDIA",
    "google": "Google",
    "nokia": "Nokia",
    "nothing": "Nothing",
    "motorola": "Motorola",
    "xiaomi": "Xiaomi",
    "zebronics": "Zebronics",
    "iball": "iBall",
    "portronics": "Portronics",
    "boat": "boAt",
    "jbl": "JBL",
    "jabra": "Jabra",
    "benq": "BenQ",
    "viewsonic": "ViewSonic",
    "aoc": "AOC",
    "philips": "Philips",
    "tplink": "TP-Link",
    "netgear": "Netgear",
    "cisco": "Cisco",
    "kingston": "Kingston",
    "sandisk": "SanDisk",
    "crucial": "Crucial",
    "corsair": "Corsair",
    "seagate": "Seagate",
    "apc": "APC",
    "ambrane": "Ambrane",
    "pny": "PNY",
    "transcend": "Transcend",
    "gigabyte": "Gigabyte",
    "antec": "Antec",
    "zeb": "Zebronics",
}

EXTRA = [
    "HP", "Dell", "Lenovo", "ASUS", "Acer", "Apple", "Samsung", "OnePlus",
    "OPPO", "Vivo", "Realme", "Redmi", "Honor", "Xiaomi", "Motorola", "Nokia",
    "Google", "Nothing", "MSI", "LG", "Sony", "Canon", "Epson", "Brother",
    "Xerox", "Logitech", "Microsoft", "Intel", "AMD", "NVIDIA", "BenQ",
    "ViewSonic", "AOC", "Philips", "Zebronics", "iBall", "Portronics", "boAt",
    "JBL", "Jabra", "TP-Link", "D-Link", "Netgear", "Cisco", "Kingston",
    "SanDisk", "Crucial", "Corsair", "Seagate", "Western Digital", "APC",
    "Ambrane", "PNY", "Transcend", "Gigabyte", "Antec", "Cooler Master",
]


def main():
    html = ""
    for p in PAGES:
        try:
            req = urllib.request.Request(BASE + p, headers=UA)
            html += urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
        except Exception as e:
            print("skip", p, e)

    counts: dict[str, int] = {}
    for m in re.finditer(r"/product/([a-z0-9-]+)", html):
        parts = m.group(1).split("-")
        for n in (1, 2):
            key = "-".join(parts[:n])
            counts[key] = counts.get(key, 0) + 1

    from_catalog: set[str] = set()
    for key, c in counts.items():
        if c < 3:
            continue
        word = key.split("-")[0]
        if word in BRAND_KEYS:
            from_catalog.add(BRAND_KEYS[word])

    # carousel img alt/title
    for m in re.finditer(r'alt="([^"]{2,30})"', html):
        t = m.group(1).strip()
        if t in EXTRA:
            from_catalog.add(t)

    brands = sorted(from_catalog | {b for b in EXTRA if b.lower() in html.lower()}, key=str.lower)
    print("BRANDS:")
    for b in brands:
        print(f"  {b!r},")
    print("COUNT", len(brands))


if __name__ == "__main__":
    main()
