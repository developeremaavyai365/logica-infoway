"""Download brand logos from logicainfoway.com into public/brands/."""
import json
import os
import re
import urllib.parse
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
BASE = "https://www.logicainfoway.com"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "brands")

# brand name -> filename slug hints from carousel filenames
NAME_FROM_FILE = {
    "acer": "Acer",
    "aoc": "AOC",
    "apple": "Apple",
    "asus": "ASUS",
    "avita": "Avita",
    "brother": "Brother",
    "canon": "Canon",
    "corsair": "Corsair",
    "crucial": "Crucial",
    "dell": "Dell",
    "d-link": "D-Link",
    "epson": "Epson",
    "evm": "EVM",
    "hikvision": "Hikvision",
    "hp": "HP",
    "intel": "Intel",
    "itel": "itel",
    "jbl": "JBL",
    "lenovo": "Lenovo",
    "logitech": "Logitech",
    "microtek": "Microtek",
    "mi": "Xiaomi",
    "nokia": "Nokia",
    "oneplus": "OnePlus",
    "oppo": "OPPO",
    "quick-heal": "Quick Heal",
    "realme": "Realme",
    "samsung": "Samsung",
    "sandisk": "SanDisk",
    "seagate": "Seagate",
    "silicon-power": "Silicon Power",
    "zebronics": "Zebronics",
    "lg": "LG",
    "sony": "Sony",
    "msi": "MSI",
    "nvidia": "NVIDIA",
    "amd": "AMD",
    "google": "Google",
    "microsoft": "Microsoft",
    "nothing": "Nothing",
    "vivo": "Vivo",
    "honor": "Honor",
    "redmi": "Redmi",
    "motorola": "Motorola",
    "benq": "BenQ",
    "viewsonic": "ViewSonic",
    "philips": "Philips",
    "boat": "boAt",
    "portronics": "Portronics",
    "iball": "iBall",
    "netgear": "Netgear",
    "tp-link": "TP-Link",
    "cisco": "Cisco",
    "kingston": "Kingston",
    "gigabyte": "Gigabyte",
    "xerox": "Xerox",
    "apc": "APC",
    "western-digital": "Western Digital",
    "ambrane": "Ambrane",
}

CLEARBIT = {
    "AMD": "amd.com",
    "AOC": "aoc.com",
    "APC": "apc.com",
    "Apple": "apple.com",
    "ASUS": "asus.com",
    "BenQ": "benq.com",
    "boAt": "boat-lifestyle.com",
    "Brother": "brother.com",
    "Canon": "canon.com",
    "Corsair": "corsair.com",
    "Crucial": "crucial.com",
    "D-Link": "dlink.com",
    "Dell": "dell.com",
    "Epson": "epson.com",
    "Gigabyte": "gigabyte.com",
    "Google": "google.com",
    "Honor": "hihonor.com",
    "HP": "hp.com",
    "iBall": "iball.co.in",
    "Intel": "intel.com",
    "JBL": "jbl.com",
    "Lenovo": "lenovo.com",
    "LG": "lg.com",
    "Logitech": "logitech.com",
    "Microsoft": "microsoft.com",
    "Motorola": "motorola.com",
    "MSI": "msi.com",
    "Netgear": "netgear.com",
    "Nokia": "nokia.com",
    "Nothing": "nothing.tech",
    "NVIDIA": "nvidia.com",
    "OnePlus": "oneplus.com",
    "OPPO": "oppo.com",
    "Philips": "philips.com",
    "Portronics": "portronics.com",
    "Realme": "realme.com",
    "Redmi": "mi.com",
    "Samsung": "samsung.com",
    "SanDisk": "sandisk.com",
    "Seagate": "seagate.com",
    "Sony": "sony.com",
    "TP-Link": "tp-link.com",
    "ViewSonic": "viewsonic.com",
    "Vivo": "vivo.com",
    "Western Digital": "westerndigital.com",
    "Xerox": "xerox.com",
    "Xiaomi": "mi.com",
    "Zebronics": "zebronics.com",
    "Acer": "acer.com",
    "Ambrane": "ambraneindia.com",
}


def fetch_html() -> str:
    req = urllib.request.Request(BASE + "/", headers=UA)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")


def brand_from_url(url: str) -> str | None:
    path = urllib.parse.urlparse(url).path.lower()
    name = os.path.basename(path)
    name = re.sub(r"\.(png|jpg|jpeg|webp|svg)$", "", name)
    name = re.sub(r"-eastern-logica.*", "", name)
    name = re.sub(r"-\d+$", "", name)
    for key, label in NAME_FROM_FILE.items():
        if key in name or name.startswith(key):
            return label
    return None


def download(url: str, path: str) -> bool:
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        if len(data) < 200:
            return False
        with open(path, "wb") as f:
            f.write(data)
        return True
    except Exception as e:
        print(f"  fail {url}: {e}")
        return False


def main():
    os.makedirs(OUT, exist_ok=True)
    html = fetch_html()
    urls = list(dict.fromkeys(re.findall(
        r"https?://www\.logicainfoway\.com/wp-content/uploads/2022/11/[^\"'\s]+\.(?:png|jpg|jpeg|webp)",
        html,
        re.I,
    )))

    catalog: dict[str, str] = {}
    for url in urls:
        brand = brand_from_url(url)
        if brand and brand not in catalog:
            ext = os.path.splitext(urllib.parse.urlparse(url).path)[1] or ".png"
            slug = re.sub(r"[^a-z0-9]+", "-", brand.lower()).strip("-")
            local = f"{slug}{ext}"
            dest = os.path.join(OUT, local)
            print(f"{brand} <- {url}")
            if download(url, dest):
                catalog[brand] = f"/brands/{local}"

    # clearbit fallback for missing
    for brand, domain in CLEARBIT.items():
        if brand in catalog:
            continue
        slug = re.sub(r"[^a-z0-9]+", "-", brand.lower()).strip("-")
        dest = os.path.join(OUT, f"{slug}.png")
        url = f"https://logo.clearbit.com/{domain}"
        print(f"{brand} (clearbit) <- {url}")
        if download(url, dest):
            catalog[brand] = f"/brands/{slug}.png"

    brands = sorted(catalog.keys(), key=str.lower)
    data = [{"name": b, "logo": catalog[b]} for b in brands]
    with open(os.path.join(os.path.dirname(__file__), "..", "lib", "brand-logos.json"), "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print(f"\nSaved {len(data)} brands to lib/brand-logos.json")


if __name__ == "__main__":
    main()
