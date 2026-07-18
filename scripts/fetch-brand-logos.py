"""Fetch brand logo URLs from logicainfoway.com carousel."""
import json
import re
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
URL = "https://www.logicainfoway.com/"


def main():
    req = urllib.request.Request(URL, headers=UA)
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")

    logos: list[dict] = []

    # slick carousel slides
    for m in re.finditer(
        r'<img[^>]+src="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*>',
        html,
        re.I,
    ):
        src = m.group(1)
        alt = (m.group(2) or "").strip()
        if "wp-content/uploads" in src and (
            "logo" in src.lower() or "brand" in src.lower() or alt
        ):
            if src.startswith("/"):
                src = "https://www.logicainfoway.com" + src
            logos.append({"alt": alt, "src": src})

    # slick data-lazy
    for m in re.finditer(r'data-lazy="([^"]+wp-content[^"]+)"', html):
        src = m.group(1)
        if src.startswith("/"):
            src = "https://www.logicainfoway.com" + src
        logos.append({"alt": "", "src": src})

    # all upload images in carousel section
    block = html
    if "slick_logo_carousel" in html:
        idx = html.find("slick_logo_carousel")
        block = html[max(0, idx - 5000) : idx + 15000]

    for m in re.finditer(r'(https?://[^"\']+/wp-content/uploads/[^"\']+\.(?:png|jpg|jpeg|webp|svg))', block, re.I):
        src = m.group(1)
        logos.append({"alt": "", "src": src})

    seen = set()
    unique = []
    for item in logos:
        if item["src"] not in seen:
            seen.add(item["src"])
            unique.append(item)

    print(f"Found {len(unique)} logo images")
    for item in unique[:60]:
        print(item)

    with open("brand-logos-raw.json", "w", encoding="utf-8") as f:
        json.dump(unique, f, indent=2)


if __name__ == "__main__":
    main()
