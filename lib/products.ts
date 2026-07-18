import { KANVA_ACCENTS } from "@/lib/kanva";
import { CATALOG_PRODUCTS } from "@/lib/catalog-data";
import { decodeHtmlEntities } from "@/lib/utils";

/** Shop taxonomy + seed catalog. Prices in INR. Images optional — cards
 *  fall back to a branded gradient tile when a photo isn't available. */

export interface ShopCategory {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  accent: string;
  icon: string;
  /** Optional cinematic hero media reused from the homepage. */
  video?: string;
  videoFit?: "cover" | "contain";
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  /** Canonical category slug (see SHOP_CATEGORIES). */
  category: string;
  price: number;
  mrp?: number;
  image?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  inStock?: boolean;
  /** Faceted spec attributes — keys must come from FACET_ORDER. */
  attrs?: Partial<Record<FacetKey, string>>;
}

/** Facet groups shown in the filter sidebar, in display order (Price first,
 *  Brand last are handled separately). Mirrors logicainfoway.com facets. */
export const FACET_ORDER = [
  "Colour",
  "Dedicated Graphics Memory",
  "Hard Disk Capacity",
  "Operating System",
  "Processor",
  "Processor Generation",
  "RAM",
  "Screen Size",
  "Storage",
] as const;

export type FacetKey = (typeof FACET_ORDER)[number];

/** The full Colour attribute term list — transcribed from logicainfoway.com. */
export const SHOP_COLORS: string[] = [
  "Aluminum: Midnight",
  "Aluminum: Midnight/Starlight",
  "Aluminum: Pink/Light Pink",
  "Aluminum: RED",
  "Aluminum: Silver/Blue",
  "Aluminum: Silver/Storm Blue",
  "Aluminum: Silver/Winter Blue",
  "Aluminum: Starlight",
  "Amber Yellow",
  "Arctic Grey",
  "Aurora Gold",
  "Awesome Graphite",
  "Awesome Iceblue",
  "Awesome Lime",
  "Awesome Navy",
  "Awesome Violet",
  "Beige",
  "Berry Blue",
  "Black",
  "Black Dusk",
  "Black Titanium",
  "Blue",
  "Blue Black",
  "Blue Tide",
  "Blue Titanium",
  "Burgundy",
  "Celadon Marble",
  "Chromatic Gray",
  "Cobalt Violet",
  "Cosmos Black",
  "Cream",
  "Crystal Purple",
  "Dark Blue",
  "Dark Chrome",
  "Dark Purple",
  "Deep Purple",
  "Diamond Silver",
  "Emerald Green",
  "Forest Green",
  "Frosted Green",
  "Galactic Silver",
  "Glimmer Black",
  "Glitter Aqua",
  "Glowing Black",
  "Glowing Blue",
  "Gold",
  "Graphite",
  "Graphite Black",
  "Graphite Grey",
  "Gray",
  "Gray Shadow",
  "Green",
  "Grey",
  "Horizon Blue",
  "Icy Blue",
  "Icy Silver",
  "Jade Black",
  "Jade Fog",
  "Lavendar",
  "Light Blue",
  "Light Green",
  "Magic Blue",
  "Matte Black",
  "Metallic Blue",
  "Meteor Blue",
  "Midnight Black",
  "Midnight Blue",
  "Mint",
  "Mint Green",
  "Moonstone Silver",
  "Mystique Blue",
  "Noble Black",
  "Noir Black",
  "OASIS GREEN",
  "Olive",
  "Olive Green",
  "Onyx Black",
  "Opera Mauve",
  "Orange",
  "Pacific Blue",
  "Pastel Blue",
  "Pastel Lime",
  "Pearl White",
  "Phantom Black",
  "Phantom White",
  "Pink",
  "Platinum Grey",
  "Prism Silver",
  "Purple",
  "Red",
  "Rock Grey",
  "Sierra Black",
  "Silver",
  "Silver / White",
  "Slate Grey",
  "Smoky Teal",
  "Solar Red",
  "Sonic Black",
  "Space Black",
  "Space Grey",
  "Stainless Steel: Gold/Clay Sport",
  "Stainless Steel: Silver",
  "Stainless Steel: Silver/Storm Blue",
  "Stardust Black",
  "Stardust Silver",
  "Stardust White",
  "Starlight",
  "Starlight Black",
  "Starshine Green",
  "Startail Silver",
  "Submarine Blue",
  "Sunny Oasis",
  "SUNRISE BEIGE",
  "Sunrise Gold",
  "Sunrise Orange",
  "Teal",
  "Titan Grey",
  "Titanium Black",
  "Titanium Blue",
  "Titanium Gray",
  "Titanium Silver",
  "Titanium Violet",
  "Transparent Silver",
  "Twilight Gold",
  "Ultramarine",
  "Waterfall Blue",
  "White",
  "White Titanium",
  "Yellow",
];

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    slug: "laptops",
    label: "Laptops",
    tagline: "Ultrabooks, gaming rigs & pro machines",
    description:
      "Business-grade portables and gaming powerhouses from every major brand — configured, imaged and warranty-backed.",
    accent: KANVA_ACCENTS.mint,
    icon: "laptop",
    video: "/videos/laptops-segment.mp4",
    videoFit: "cover",
  },
  {
    slug: "mobile-phones",
    label: "Mobile Phones",
    tagline: "Flagships, mid-range & budget picks",
    description:
      "The latest 5G smartphones from brands you trust, with genuine warranty and enterprise supply options.",
    accent: KANVA_ACCENTS.sky,
    icon: "phone",
    video: "/videos/showcase-mobile.mp4",
    videoFit: "contain",
  },
  {
    slug: "accessories",
    label: "Accessories",
    tagline: "Everything around your setup",
    description:
      "Keyboards, mice, wearables and webcams — complete your workspace with the right add-ons.",
    accent: KANVA_ACCENTS.violet,
    icon: "accessories",
    video: "/videos/showcase-accessories.mp4",
    videoFit: "cover",
  },
  {
    slug: "desktops",
    label: "Desktops",
    tagline: "All-in-one desktops for office performance",
    description:
      "Space-saving all-in-ones and desktop towers built for offices, labs and government deployments.",
    accent: KANVA_ACCENTS.cyan,
    icon: "desktop",
    video: "/videos/showcase-desktop-aio.mp4",
    videoFit: "contain",
  },
  {
    slug: "monitors",
    label: "Monitors",
    tagline: "Crisp screens, better productivity",
    description:
      "From everyday FHD panels to high-refresh and curved displays for creative and trading desks.",
    accent: KANVA_ACCENTS.yellow,
    icon: "monitor",
    video: "/videos/showcase-monitor.mp4",
    videoFit: "contain",
  },
  {
    slug: "printers",
    label: "Printers",
    tagline: "Print faster, work smarter",
    description:
      "Inkjet, laser and all-in-one printers for home offices to high-volume enterprise workflows.",
    accent: KANVA_ACCENTS.peach,
    icon: "printer",
    video: "/videos/showcase-printer.mp4",
    videoFit: "contain",
  },
  {
    slug: "storage-devices",
    label: "Storage Devices",
    tagline: "SSDs, drives & memory that keep up",
    description:
      "Portable SSDs, external hard drives and memory cards — fast, reliable storage for work and backup.",
    accent: KANVA_ACCENTS.cyan,
    icon: "storage",
    video: "/videos/showcase-storage.mp4",
    videoFit: "cover",
  },
  {
    slug: "software",
    label: "Software",
    tagline: "Genuine licenses & subscriptions",
    description:
      "Operating systems, productivity suites and security — licensed and delivered for teams.",
    accent: KANVA_ACCENTS.gold,
    icon: "software",
  },
  {
    slug: "laptop-bags",
    label: "Laptop Bags",
    tagline: "Carry it in style & safety",
    description:
      "Backpacks, briefcases and sleeves engineered to protect your gear on the move.",
    accent: KANVA_ACCENTS.mint,
    icon: "bag",
  },
  {
    slug: "wireless",
    label: "Wireless",
    tagline: "True wireless audio, untethered",
    description:
      "Earbuds, headphones and wireless audio engineered for crystal-clear calls and immersive sound.",
    accent: KANVA_ACCENTS.sky,
    icon: "wireless",
    video: "/videos/showcase-true-wireless.mp4",
    videoFit: "cover",
  },
];

/** Legacy / alternate slugs mapped to canonical category slugs. */
const CATEGORY_ALIASES: Record<string, string> = {
  "smart-phones": "mobile-phones",
  "mobiles": "mobile-phones",
  "desktop-aio": "desktops",
  "storage": "storage-devices",
  "true-wireless": "wireless",
};

export function resolveCategorySlug(slug: string): string {
  return CATEGORY_ALIASES[slug] ?? slug;
}

export function getCategory(slug: string): ShopCategory | undefined {
  const canonical = resolveCategorySlug(slug);
  return SHOP_CATEGORIES.find((c) => c.slug === canonical);
}

/** Live catalog scraped from logicainfoway.com/shop — real names, prices,
 *  photos, category and brand for every product on the shop grid. */
// Decode stray HTML entities (&amp;, &#8243; etc.) present in the scraped
// names once here, so every consumer downstream renders clean text.
export const PRODUCTS: Product[] = CATALOG_PRODUCTS.map((p) => ({
  ...p,
  name: decodeHtmlEntities(p.name),
  brand: decodeHtmlEntities(p.brand),
}));

export interface PriceBracket {
  label: string;
  min: number;
  max: number;
}

export const PRICE_BRACKETS: PriceBracket[] = [
  { label: "Under ₹10,000", min: 0, max: 10000 },
  { label: "₹10,000 – ₹25,000", min: 10000, max: 25000 },
  { label: "₹25,000 – ₹50,000", min: 25000, max: 50000 },
  { label: "₹50,000 – ₹1,00,000", min: 50000, max: 100000 },
  { label: "Above ₹1,00,000", min: 100000, max: Infinity },
];

/** Exact [min, max] price across a product set — drives the price slider bounds. */
export function getPriceBounds(products: Product[]): [number, number] {
  if (products.length === 0) return [0, 0];
  let min = Infinity;
  let max = -Infinity;
  for (const p of products) {
    if (p.price < min) min = p.price;
    if (p.price > max) max = p.price;
  }
  return [min, max];
}

/** A sensible slider step for a given price span. */
export function priceStepFor(span: number): number {
  if (span > 100000) return 5000;
  if (span > 40000) return 1000;
  if (span > 10000) return 500;
  if (span > 2000) return 100;
  return 50;
}

export interface FacetGroup {
  key: FacetKey;
  options: { value: string; count: number }[];
}

/** Build the facet groups available for a given product set, in display order. */
export function buildFacets(products: Product[]): FacetGroup[] {
  const groups: FacetGroup[] = [];
  for (const key of FACET_ORDER) {
    const counts = new Map<string, number>();
    for (const p of products) {
      const v = p.attrs?.[key];
      if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    if (counts.size > 0) {
      groups.push({
        key,
        options: Array.from(counts.entries())
          .map(([value, count]) => ({ value, count }))
          .sort((a, b) => a.value.localeCompare(b.value, undefined, { numeric: true })),
      });
    }
  }
  return groups;
}

export function getProductsByCategory(slug: string): Product[] {
  const canonical = resolveCategorySlug(slug);
  return PRODUCTS.filter((p) => p.category === canonical);
}

const PRODUCT_INDEX = new Map(PRODUCTS.map((p) => [p.id, p]));

export function getProductById(id: string): Product | undefined {
  return PRODUCT_INDEX.get(id);
}

export function getBrandsInCategory(slug: string): string[] {
  const set = new Set(getProductsByCategory(slug).map((p) => p.brand));
  return Array.from(set).sort();
}

/**
 * A diverse "featured" set: the single best-discounted product from each
 * category, round-robin, skipping any id already used elsewhere on the page
 * (e.g. the Deal of the Day spotlight) so sections never repeat products.
 */
export function getFeaturedProducts(limit = 8, exclude: Set<string> = new Set()): Product[] {
  const badged = PRODUCTS.filter(
    (p) => p.badge === "Best Seller" || p.badge === "New" || p.badge === "Flagship",
  ).filter((p) => !exclude.has(p.id));
  if (badged.length >= limit) return badged.slice(0, limit);

  // Fallback for the scraped catalog (no badges): best discount per category,
  // cycling through categories so the set feels curated, not repetitive.
  const byCategory = new Map<string, Product[]>();
  for (const cat of SHOP_CATEGORIES) {
    const ranked = getProductsByCategory(cat.slug)
      .filter((p) => !exclude.has(p.id))
      .map((p) => ({ p, d: discountPercent(p.price, p.mrp) ?? 0 }))
      .sort((a, b) => b.d - a.d)
      .map((x) => x.p);
    if (ranked.length) byCategory.set(cat.slug, ranked);
  }

  const seen = new Set(badged.map((p) => p.id));
  const result = [...badged];
  let round = 0;
  while (result.length < limit) {
    let addedThisRound = false;
    for (const [, ranked] of byCategory) {
      if (result.length >= limit) break;
      const candidate = ranked[round];
      if (candidate && !seen.has(candidate.id)) {
        result.push(candidate);
        seen.add(candidate.id);
        addedThisRound = true;
      }
    }
    if (!addedThisRound) break; // exhausted every category
    round++;
  }
  return result.slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  );
}

export function getProductsByBrand(brand: string): Product[] {
  const b = brand.trim().toLowerCase();
  return PRODUCTS.filter((p) => p.brand.toLowerCase() === b);
}

export function formatINR(value: number): string {
  return "₹" + value.toLocaleString("en-IN");
}

export function discountPercent(price: number, mrp?: number): number | null {
  if (!mrp || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}
