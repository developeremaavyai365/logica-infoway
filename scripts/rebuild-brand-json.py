"""Rebuild lib/brand-logos.json from public/brands files."""
import json
import os
import re

BRANDS_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "brands")
OUT = os.path.join(os.path.dirname(__file__), "..", "lib", "brand-logos.json")

SLUG_TO_NAME = {
    "acer": "Acer",
    "aoc": "AOC",
    "amd": "AMD",
    "apple": "Apple",
    "asus": "ASUS",
    "avita": "Avita",
    "boat": "boAt",
    "brother": "Brother",
    "canon": "Canon",
    "cisco": "Cisco",
    "corsair": "Corsair",
    "crucial": "Crucial",
    "d-link": "D-Link",
    "dell": "Dell",
    "epson": "Epson",
    "evm": "EVM",
    "google": "Google",
    "hikvision": "Hikvision",
    "honor": "Honor",
    "hp": "HP",
    "intel": "Intel",
    "itel": "itel",
    "jbl": "JBL",
    "lenovo": "Lenovo",
    "lg": "LG",
    "logitech": "Logitech",
    "microtek": "Microtek",
    "motorola": "Motorola",
    "msi": "MSI",
    "netgear": "Netgear",
    "nokia": "Nokia",
    "nvidia": "NVIDIA",
    "oneplus": "OnePlus",
    "oppo": "OPPO",
    "quick-heal": "Quick Heal",
    "realme": "Realme",
    "samsung": "Samsung",
    "sandisk": "SanDisk",
    "seagate": "Seagate",
    "silicon-power": "Silicon Power",
    "sony": "Sony",
    "vivo": "Vivo",
    "xiaomi": "Xiaomi",
    "zebronics": "Zebronics",
}


def main():
    by_name: dict[str, str] = {}
    for fname in sorted(os.listdir(BRANDS_DIR)):
        if fname.startswith("."):
            continue
        slug = re.sub(r"\.(png|jpg|jpeg|webp|svg)$", "", fname.lower())
        name = SLUG_TO_NAME.get(slug, slug.replace("-", " ").title())
        path = f"/brands/{fname}"
        # Prefer PNG (official Logica assets) over SVG fallbacks
        if name not in by_name or fname.endswith(".png"):
            by_name[name] = path

    items = [{"name": n, "logo": by_name[n]} for n in sorted(by_name, key=str.lower)]
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(items, f, indent=2)
    print(f"Wrote {len(items)} brands")


if __name__ == "__main__":
    main()
