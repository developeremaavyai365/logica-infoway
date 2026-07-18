"""Scrape category URLs and homepage products from logicainfoway.com."""
import re
import json
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
URL = "https://www.logicainfoway.com/"

req = urllib.request.Request(URL, headers=UA)
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")

# product-category links
cats = []
for m in re.finditer(r'href="(https?://www\.logicainfoway\.com)?(/product-category/[^"#?]+/?)"', html):
    path = m.group(2).rstrip("/")
    slug = path.split("/")[-1]
    cats.append({"slug": slug, "path": path})

# dedupe
seen = set()
unique = []
for c in cats:
    if c["path"] not in seen:
        seen.add(c["path"])
        unique.append(c)

print("CATEGORIES:")
for c in sorted(unique, key=lambda x: x["slug"]):
    print(f"  {c['slug']:30} {c['path']}")

# nav menu items
for m in re.finditer(r'menu-item[^>]*>.*?<a[^>]+href="([^"]+)"[^>]*>([^<]+)</a>', html, re.S | re.I):
    print("NAV:", m.group(2).strip(), m.group(1))

# tab labels (Best Sellers, Laptops, etc)
for m in re.finditer(r'>(Best Sellers|Laptops|Mobiles|Monitors|Accessories|Software|Laptop Bags|Printers|Desktops)<', html):
    print("TAB:", m.group(1))
