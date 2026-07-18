import json, os, re, time, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_JSON = os.path.join(ROOT, "scripts", "gallery-source.json")
CATALOG = os.path.join(ROOT, "lib", "catalog-data.ts")
OUT_DIR = os.path.join(ROOT, "public", "products-gallery")
MANIFEST = os.path.join(ROOT, "lib", "product-gallery.ts")

with open(SRC_JSON, encoding="utf-8") as f:
    gallery = json.load(f)

txt = open(CATALOG, encoding="utf-8").read()
ids = re.findall(r'id: "([^"]+)"', txt)
print("catalog ids:", len(ids))

def original_url(thumb_url: str) -> str:
    # strip a trailing "-WxH" size suffix before the extension, e.g.
    # ".../foo-300x300.jpg" -> ".../foo.jpg"
    return re.sub(r"-\d+x\d+(\.[a-zA-Z]+)$", r"\1", thumb_url)

os.makedirs(OUT_DIR, exist_ok=True)

manifest = {}
ok_count = 0
fail_count = 0
skip_count = 0

opener = urllib.request.build_opener()
opener.addheaders = [("User-Agent", "Mozilla/5.0 (compatible; LogicaSiteRebuild/1.0)")]

for pid in ids:
    thumbs = gallery.get(pid)
    if not thumbs:
        continue
    urls = []
    seen = set()
    for t in thumbs:
        u = original_url(t)
        if u not in seen:
            seen.add(u)
            urls.append(u)

    saved_paths = []
    prod_dir = os.path.join(OUT_DIR, pid)
    for idx, url in enumerate(urls, start=1):
        ext = os.path.splitext(url)[1].lower()
        if ext not in (".jpg", ".jpeg", ".png", ".webp"):
            ext = ".jpg"
        dest = os.path.join(prod_dir, f"{idx}{ext}")
        rel = f"/products-gallery/{pid}/{idx}{ext}"

        if os.path.exists(dest) and os.path.getsize(dest) > 500:
            saved_paths.append(rel)
            skip_count += 1
            continue

        os.makedirs(prod_dir, exist_ok=True)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with opener.open(req, timeout=20) as resp:
                data = resp.read()
            if len(data) < 500:
                raise ValueError("suspiciously small response")
            with open(dest, "wb") as out:
                out.write(data)
            saved_paths.append(rel)
            ok_count += 1
        except Exception as e:
            print(f"FAIL {pid} [{idx}]: {url} -> {e}")
            fail_count += 1
        time.sleep(0.05)

    if saved_paths:
        manifest[pid] = saved_paths

print(f"downloaded={ok_count} skipped(existing)={skip_count} failed={fail_count} products_with_gallery={len(manifest)}")

# Write the TS manifest
lines = [
    "/** Real multi-angle product photography, gathered from logicainfoway.com.",
    " *  Maps a product id to its local gallery image paths (downloaded once,",
    " *  served from /public). Not every product has more than one angle —",
    " *  only real photos are listed here, nothing is fabricated. */",
    "",
    "export const PRODUCT_GALLERY: Record<string, string[]> = {",
]
for pid in ids:
    if pid in manifest:
        arr = ", ".join(json.dumps(p) for p in manifest[pid])
        lines.append(f'  "{pid}": [{arr}],')
lines.append("};")
lines.append("")
lines.append("export function getProductGallery(id: string): string[] {")
lines.append("  return PRODUCT_GALLERY[id] ?? [];")
lines.append("}")
lines.append("")

with open(MANIFEST, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print("manifest written:", MANIFEST)
