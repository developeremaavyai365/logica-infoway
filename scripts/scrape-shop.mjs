// One-off scraper: pulls the live Logica shop catalog (names, prices, images,
// category, brand) and writes lib/catalog-data.ts + downloads product photos.
import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const BASE = "https://www.logicainfoway.com";
const OUT_IMG = path.resolve("public/products");
const OUT_DATA = path.resolve("lib/catalog-data.ts");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

fs.mkdirSync(OUT_IMG, { recursive: true });

function get(url, binary = false) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": UA } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(get(res.headers.location, binary));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`${res.statusCode} ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(binary ? Buffer.concat(chunks) : Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

const amt = (frag) => {
  const m = frag && frag.match(/&#8377;<\/span>([\d,]+)/);
  return m ? Number(m[1].replace(/,/g, "")) : undefined;
};

function mapCategory(classes) {
  const c = classes;
  const has = (s) => c.includes(`product_cat-${s}`);
  if (c.includes("laptop-bags")) return "laptop-bags";
  if (has("apple-macbooks") || c.includes("product_cat-laptops") || c.includes("gaming-laptops") || c.includes("homeschooling-laptops")) return "laptops";
  if (c.includes("printer")) return "printers";
  if (c.includes("monitor")) return "monitors";
  if (c.includes("desktop") || c.includes("all-in-one") || c.includes("tower-pc")) return "desktops";
  if (c.includes("storage") || c.includes("hard-disk") || c.includes("pen-drive") || c.includes("-ssd") || c.includes("ssd-")) return "storage-devices";
  if (c.includes("software") || c.includes("operating-system") || c.includes("antivirus")) return "software";
  if (c.includes("wireless") || c.includes("earbud")) return "wireless";
  if (c.includes("apple-iphones") || c.includes("mobile-phone") || c.includes("smartphone") || c.includes("smart-phone") || c.includes("feature-phone") || c.includes("tablet") || c.includes("ipad")) return "mobile-phones";
  if (c.includes("accessor")) return "accessories";
  return "accessories";
}

const titleCase = (s) =>
  s
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .replace(/\bHp\b/g, "HP")
    .replace(/\bAsus\b/g, "ASUS")
    .replace(/\bAoc\b/g, "AOC")
    .replace(/\bLg\b/g, "LG")
    .replace(/\bMsi\b/g, "MSI")
    .replace(/\bSsd\b/g, "SSD")
    .replace(/\bOneplus\b/g, "OnePlus")
    .replace(/\bRealme\b/g, "realme")
    .replace(/\bPoco\b/g, "POCO")
    .replace(/\bIphone\b/g, "Apple")
    .replace(/\bTvs\b/g, "TVS")
    .replace(/\bZebronics\b/g, "Zebronics");

function parseProducts(html) {
  const out = [];
  const liRe = /<li class="(col-[^"]*?product[^"]*?)">([\s\S]*?)(?=<li class="col-|<\/ul>)/g;
  let m;
  while ((m = liRe.exec(html))) {
    const classes = m[1];
    const block = m[2];
    if (!/product-title/.test(block)) continue;

    const slug = (block.match(/\/product\/([^/"]+)\//) || [])[1];
    const title = (block.match(/<h3 class="product-title"><a[^>]*>([^<]+)<\/a>/) || [])[1];
    const img = (block.match(/<img[^>]*\ssrc="([^"]+)"/) || [])[1];
    if (!slug || !title) continue;

    const priceFrag = (block.match(/<span class="price">([\s\S]*?)<a class="add_to_cart_button/) || [])[1] || "";
    const del = (priceFrag.match(/<del[\s\S]*?<\/del>/) || [])[0];
    const ins = (priceFrag.match(/<ins[\s\S]*?<\/ins>/) || [])[0];
    let price, mrp;
    if (ins || del) {
      price = amt(ins) ?? amt(priceFrag);
      mrp = amt(del);
    } else {
      const all = [...priceFrag.matchAll(/&#8377;<\/span>([\d,]+)/g)].map((x) => Number(x[1].replace(/,/g, "")));
      if (all.length) price = Math.min(...all);
    }
    if (!price) continue;

    const brandSlug = (classes.match(/berocket_brand-([a-z0-9-]+)/) || [])[1];
    const brand = brandSlug ? titleCase(brandSlug) : title.split(/[\s,]/)[0];
    const category = mapCategory(classes);
    const badge = /\bsale\b/.test(classes) && mrp ? undefined : undefined;

    out.push({ id: slug, name: title.trim(), brand, category, price, mrp, image: img, slug });
  }
  return out;
}

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

async function main() {
  const all = [];
  const seen = new Set();
  for (let page = 1; page <= 8; page++) {
    const url = page === 1 ? `${BASE}/shop/` : `${BASE}/shop/page/${page}/`;
    let html;
    try {
      html = await get(url);
    } catch (e) {
      console.log(`stop at page ${page}: ${e.message}`);
      break;
    }
    const items = parseProducts(html);
    if (items.length === 0) {
      console.log(`page ${page}: 0 items — done`);
      break;
    }
    let added = 0;
    for (const it of items) {
      if (seen.has(it.id)) continue;
      seen.add(it.id);
      all.push(it);
      added++;
    }
    console.log(`page ${page}: ${items.length} parsed, ${added} new (total ${all.length})`);
  }

  // Download images
  let ok = 0;
  for (const p of all) {
    const ext = (p.image.match(/\.(jpg|jpeg|png|webp)/i) || [".jpg"])[0];
    const file = `${p.slug.slice(0, 110)}${ext}`;
    const dest = path.join(OUT_IMG, file);
    p.localImage = `/products/${file}`;
    if (fs.existsSync(dest)) { ok++; continue; }
    try {
      const buf = await get(p.image, true);
      fs.writeFileSync(dest, buf);
      ok++;
    } catch (e) {
      console.log(`img fail ${p.slug}: ${e.message}`);
      p.localImage = undefined;
    }
  }
  console.log(`images ok: ${ok}/${all.length}`);

  const lines = all.map((p) => {
    const parts = [
      `id: "${esc(p.id)}"`,
      `name: "${esc(p.name)}"`,
      `brand: "${esc(p.brand)}"`,
      `category: "${p.category}"`,
      `price: ${p.price}`,
      p.mrp ? `mrp: ${p.mrp}` : null,
      p.localImage ? `image: "${p.localImage}"` : null,
      `inStock: true`,
    ].filter(Boolean);
    return `  { ${parts.join(", ")} },`;
  });

  const content = `import type { Product } from "@/lib/products";\n\n/** Auto-generated from logicainfoway.com/shop (${all.length} products). */\nexport const CATALOG_PRODUCTS: Product[] = [\n${lines.join("\n")}\n];\n`;
  fs.writeFileSync(OUT_DATA, content);
  console.log(`wrote ${OUT_DATA} with ${all.length} products`);

  // category breakdown
  const byCat = {};
  for (const p of all) byCat[p.category] = (byCat[p.category] || 0) + 1;
  console.log(byCat);
}

main();
