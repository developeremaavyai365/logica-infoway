// Scrapes each product page on logicainfoway.com for: spec highlights (JSON-LD),
// the Technical Details table, an overview paragraph, and the full multi-angle
// gallery. Writes lib/product-details.ts and refreshes lib/product-gallery.ts.
import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const BASE = "https://www.logicainfoway.com";
const GAL_DIR = path.resolve("public/products-gallery");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

fs.mkdirSync(GAL_DIR, { recursive: true });

function get(url, binary = false) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": UA } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(get(res.headers.location, binary));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(binary ? Buffer.concat(chunks) : Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#8377;/g, "\u20b9")
    .replace(/&#8482;|&trade;/g, "\u2122")
    .replace(/&#174;|&reg;/g, "\u00ae")
    .replace(/&#215;|&times;/g, "\u00d7")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8211;|&ndash;/g, "\u2013")
    .replace(/&#8212;|&mdash;/g, "\u2014")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const slugs = [
  ...new Set(
    [...fs.readFileSync(path.resolve("lib/catalog-data.ts"), "utf8").matchAll(/id: "([^"]+)"/g)].map((m) => m[1]),
  ),
];

function parse(html) {
  // JSON-LD Product -> highlights + main image
  let highlights = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      const node = Array.isArray(data) ? data.find((d) => /Product/.test(d["@type"])) : data;
      if (node && node.description) {
        highlights = String(node.description)
          .split(/\r\n|\n|\r/)
          .map((s) => s.replace(/^[\s\t]+/, "").trim())
          .filter((s) => s.length > 1);
        break;
      }
    } catch {}
  }

  // Technical Details table
  const specs = [];
  const seen = new Set();
  for (const m of html.matchAll(
    /custom-desc-table-title">\s*<span>([\s\S]*?)<\/span>\s*<\/div>\s*<div class="custom-desc-table-cnt">\s*([\s\S]*?)<\/div>/g,
  )) {
    const label = decode(m[1]);
    const value = decode(m[2]);
    if (label && value && !seen.has(label.toLowerCase())) {
      seen.add(label.toLowerCase());
      specs.push([label, value]);
    }
  }

  // Overview paragraph (first <p> inside the description tab)
  let overview;
  const tab = html.match(/id="tab-description"[^>]*>([\s\S]*?)<div class="custom-desc-tables"/);
  if (tab) {
    const p = tab[1].match(/<p>([\s\S]*?)<\/p>/);
    if (p) {
      const t = decode(p[1]);
      if (t.length > 20) overview = t;
    }
  }

  // Gallery — full-size angles
  const imgs = [];
  const gseen = new Set();
  for (const m of html.matchAll(/data-large_image="([^"{]+?)"/g)) {
    const u = m[1];
    if (u.startsWith("http") && !gseen.has(u)) {
      gseen.add(u);
      imgs.push(u);
    }
  }
  return { highlights, specs, overview, imgs: imgs.slice(0, 6) };
}

async function main() {
  const details = {};
  const galleries = {};
  let done = 0;
  let imgOk = 0;

  for (const slug of slugs) {
    let html;
    try {
      html = await get(`${BASE}/product/${slug}/`);
    } catch (e) {
      console.log(`skip ${slug}: ${e.message}`);
      continue;
    }
    const { highlights, specs, overview, imgs } = parse(html);
    if (highlights.length || specs.length) {
      details[slug] = { highlights, specs, overview };
    }

    // Download gallery images
    const local = [];
    const dir = path.join(GAL_DIR, slug.slice(0, 110));
    for (let i = 0; i < imgs.length; i++) {
      const ext = (imgs[i].match(/\.(jpg|jpeg|png|webp)/i) || [".jpg"])[0];
      const rel = `/products-gallery/${slug.slice(0, 110)}/${i + 1}${ext}`;
      const dest = path.join(dir, `${i + 1}${ext}`);
      try {
        fs.mkdirSync(dir, { recursive: true });
        const buf = await get(imgs[i], true);
        fs.writeFileSync(dest, buf);
        local.push(rel);
        imgOk++;
      } catch {}
    }
    if (local.length) galleries[slug] = local;

    done++;
    if (done % 25 === 0) console.log(`${done}/${slugs.length} pages, ${imgOk} imgs`);
  }

  // Write details file
  const esc = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const detailLines = Object.entries(details).map(([slug, d]) => {
    const hl = d.highlights.map((h) => `"${esc(h)}"`).join(", ");
    const sp = d.specs.map(([l, v]) => `["${esc(l)}", "${esc(v)}"]`).join(", ");
    const ov = d.overview ? `, overview: "${esc(d.overview)}"` : "";
    return `  "${esc(slug)}": { highlights: [${hl}], specs: [${sp}]${ov} },`;
  });
  const detailContent = `/** Auto-generated from logicainfoway.com product pages.\n *  Real spec highlights + Technical Details table + overview per product. */\n\nexport interface ProductDetail {\n  highlights: string[];\n  specs: [string, string][];\n  overview?: string;\n}\n\nexport const PRODUCT_DETAILS: Record<string, ProductDetail> = {\n${detailLines.join("\n")}\n};\n\nexport function getProductDetail(id: string): ProductDetail | undefined {\n  return PRODUCT_DETAILS[id];\n}\n`;
  fs.writeFileSync(path.resolve("lib/product-details.ts"), detailContent);

  // Rewrite gallery file
  const galLines = Object.entries(galleries).map(
    ([slug, arr]) => `  "${esc(slug)}": [${arr.map((a) => `"${a}"`).join(", ")}],`,
  );
  const galContent = `/** Real multi-angle product photography, scraped from logicainfoway.com.\n *  Maps a product id to its local gallery image paths (served from /public). */\n\nexport const PRODUCT_GALLERY: Record<string, string[]> = {\n${galLines.join("\n")}\n};\n\nexport function getProductGallery(id: string): string[] {\n  return PRODUCT_GALLERY[id] ?? [];\n}\n`;
  fs.writeFileSync(path.resolve("lib/product-gallery.ts"), galContent);

  console.log(`\nDONE: ${Object.keys(details).length} details, ${Object.keys(galleries).length} galleries, ${imgOk} images`);
}

main();
