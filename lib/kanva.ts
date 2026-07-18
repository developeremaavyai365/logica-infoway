/** Kanva-style homepage content — real Logica Infoway categories & products.
 *  Categories/products mirror logicainfoway.com. */

export interface KanvaCategory {
  label: string;
  href: string;
  icon: string;
}

/** Accent palette — darkened/saturated for legibility on the white theme.
 *  Green (mint) is the brand lead, matching the logo + CSS `--primary`. */
export const KANVA_ACCENTS = {
  mint: "#0F9D58",
  sky: "#0B84C4",
  yellow: "#A16207",
  cyan: "#0891B2",
  violet: "#7C3AED",
  peach: "#C2410C",
  gold: "#B45309",
} as const;

/** Rotating hero slides — synced video + advertising copy. */
export interface KanvaHeroSlide {
  id: string;
  video: string;
  tag: string;
  line1: string;
  line2: string;
  /** Accent color for line2 — tuned to sit well over the hero film. */
  accent: string;
  cta: { label: string; href: string };
}

/** One slide per hero video — order must match the film files in public/videos/. */
export const KANVA_HERO_SLIDES: KanvaHeroSlide[] = [
  {
    id: "accessories",
    video: "/videos/hero.mp4",
    tag: "Accessories",
    line1: "Elevate your experience with",
    line2: "audio & accessories",
    accent: "#C4B5FD",
    cta: { label: "Shop Accessories", href: "/shop/accessories" },
  },
  {
    id: "mobiles",
    video: "/videos/hero-2.mp4",
    tag: "Mobile Phones",
    line1: "Stay ahead with",
    line2: "latest 5G mobiles",
    accent: "#78C0F0",
    cta: { label: "Shop Mobiles", href: "/shop/mobile-phones" },
  },
  {
    id: "laptops",
    video: "/videos/hero-3.mp4",
    tag: "Laptops",
    line1: "Power every workflow with",
    line2: "premium laptops",
    accent: "#0F9D58",
    cta: { label: "Shop Laptops", href: "/shop/laptops" },
  },
];

/** @deprecated Use KANVA_HERO_SLIDES */
export type KanvaHeroHeadline = KanvaHeroSlide;
/** @deprecated Use KANVA_HERO_SLIDES */
export const KANVA_HERO_HEADLINES = KANVA_HERO_SLIDES;

/** Full-screen category film — hero-style segment with shop CTA. */
export interface KanvaFilmSegment {
  id: string;
  /** Omit when no real, relevant footage exists — falls back to a static accent gradient. */
  video?: string;
  /** Optional background video (full-bleed) behind `video` overlays. */
  backgroundVideo?: string;
  backgroundVideoFit?: "cover" | "contain";
  tag: string;
  line1: string;
  line2: string;
  accent: string;
  cta: { label: string; href: string };
  ariaLabel: string;
  /** Portrait clips use contain on wide screens. */
  videoFit?: "cover" | "contain";
  /** Optional stat row rendered under the CTA (e.g. legacy/trust numbers). */
  stats?: { value: string; label: string }[];
  /** Optional brand logo badges overlaid in the segment's corner (real logos only). */
  brandLogos?: { name: string; logo: string }[];
}

/** Full-screen laptop film — sits directly below the hero. */
export const KANVA_LAPTOP_SEGMENT: KanvaFilmSegment = {
  id: "laptops",
  video: "/videos/laptops-segment.mp4",
  tag: "",
  line1: "Shop",
  line2: "Laptops",
  accent: KANVA_ACCENTS.mint,
  cta: { label: "Shop laptops", href: "/shop/laptops" },
  ariaLabel: "Shop laptops",
  videoFit: "cover",
  brandLogos: [
    { name: "Dell", logo: "/brands/dell.png" },
    { name: "ASUS", logo: "/images/logos/asus.svg" },
    { name: "Acer", logo: "/images/logos/acer.svg" },
    { name: "HP", logo: "/images/logos/hp-icon.svg" },
  ],
};

/** Full-screen featured category — mobile showcase. */
export const KANVA_SHOP_SHOWCASE: KanvaFilmSegment[] = [
  {
    id: "mobiles",
    video: "/videos/showcase-mobile-2.mp4",
    tag: "Shop Mobile Phones",
    line1: "Flagships, mid-range & budget picks",
    line2: "from brands you trust",
    accent: KANVA_ACCENTS.sky,
    cta: { label: "Shop mobile phones", href: "/shop/mobile-phones" },
    ariaLabel: "Shop mobile phones",
    videoFit: "cover",
    brandLogos: [
      { name: "Apple", logo: "/images/logos/apple.svg" },
      { name: "Vivo", logo: "/images/logos/vivo.svg" },
      { name: "Oppo", logo: "/images/logos/oppo.svg" },
      { name: "Realme", logo: "/images/logos/realme.svg" },
    ],
  },
];

/** Grid tile — video + shop CTA for the multi-category showcase. */
export interface KanvaShopGridTile {
  id: string;
  label: string;
  video: string;
  href: string;
  accent: string;
  videoFit?: "cover" | "contain";
  /** CSS object-position for the video (focus point when cropped by cover). */
  objectPosition?: string;
  /** Bento placement for the computing showcase (desktop). */
  desktop?: {
    colStart: number;
    colSpan: number;
    rowStart: number;
    rowSpan: number;
  };
  /** Stacking order on mobile bento grids. */
  mobileOrder?: number;
  /** Stacking order for equal-column grids. */
  order?: number;
}

export const KANVA_SHOP_GRID: KanvaShopGridTile[] = [
  {
    id: "desktop-aio",
    label: "Desktop AIO",
    video: "/videos/showcase-desktop-aio.mp4",
    href: "/shop/desktops",
    accent: KANVA_ACCENTS.cyan,
    videoFit: "contain",
    order: 1,
  },
  {
    id: "monitor",
    label: "Monitors",
    video: "/videos/showcase-monitor.mp4",
    href: "/shop/monitors",
    accent: KANVA_ACCENTS.yellow,
    videoFit: "contain",
    order: 2,
  },
  {
    id: "printer",
    label: "Printers",
    video: "/videos/showcase-printer.mp4",
    href: "/shop/printers",
    accent: KANVA_ACCENTS.peach,
    videoFit: "contain",
    order: 3,
  },
];

/** Wearables segment — Smart Watches & Accessories split into two full-video halves. */
export const KANVA_ACCESSORIES_GRID: KanvaShopGridTile[] = [
  {
    id: "smart-watches",
    label: "Smart Watches",
    video: "/videos/showcase-smart-watches.mp4",
    href: "/shop/accessories?sub=watch",
    accent: KANVA_ACCENTS.violet,
    videoFit: "cover",
    order: 1,
  },
  {
    id: "accessories",
    label: "Accessories",
    video: "/videos/showcase-accessories.mp4",
    href: "/shop/accessories",
    accent: KANVA_ACCENTS.mint,
    videoFit: "cover",
    order: 2,
  },
];

/** True Wireless & Storage — full-screen split segment, matching wearables. */
export const KANVA_ESSENTIALS_GRID: KanvaShopGridTile[] = [
  {
    id: "true-wireless",
    label: "True Wireless",
    video: "/videos/showcase-true-wireless.mp4",
    href: "/shop/wireless",
    accent: KANVA_ACCENTS.sky,
    videoFit: "cover",
    order: 1,
  },
  {
    id: "storage",
    label: "Storage Devices",
    video: "/videos/showcase-storage.mp4",
    href: "/shop/storage-devices",
    accent: KANVA_ACCENTS.cyan,
    videoFit: "cover",
    order: 2,
  },
];

/** Company philosophy pillars — grounded in the real footer tagline, not boilerplate. */
export interface KanvaPhilosophyPillar {
  id: string;
  title: string;
  copy: string;
  accent: string;
}

export const KANVA_PHILOSOPHY: KanvaPhilosophyPillar[] = [
  {
    id: "trusted",
    title: "Enterprise & government trusted",
    copy: "Three decades of corporate and government procurement, recognized with distributor and retail-performance awards from HP, Samsung and Flipkart.",
    accent: KANVA_ACCENTS.sky,
  },
  {
    id: "end-to-end",
    title: "End-to-end technology, not just hardware",
    copy: "Hardware, networking and IT solutions under one roof — a single partner for the whole stack.",
    accent: KANVA_ACCENTS.mint,
  },
  {
    id: "cost-effective",
    title: "Cost-effective by design",
    copy: "Genuine products and authorized brand partnerships, priced to make sense at enterprise scale.",
    accent: KANVA_ACCENTS.yellow,
  },
  {
    id: "reach",
    title: "Nationwide reach",
    copy: "From our Kolkata roots to Delhi, Mumbai, Bengaluru and beyond — wherever your business operates.",
    accent: KANVA_ACCENTS.violet,
  },
];

/** Solutions transition film — bridges storytelling into the product showcase. */
export const KANVA_SOLUTIONS_SEGMENT: KanvaFilmSegment = {
  id: "solutions",
  video: "/videos/category-spotlight-bg.mp4",
  tag: "Complete IT Solutions",
  line1: "Everything your business runs on,",
  line2: "under one technology partner",
  accent: KANVA_ACCENTS.peach,
  cta: { label: "See all categories", href: "/shop" },
  ariaLabel: "Complete IT solutions at Logica Infoway",
  videoFit: "cover",
};

/** Real Logica shop categories — mirrors logicainfoway.com homepage & nav. */
export const KANVA_CATEGORIES: KanvaCategory[] = [
  { label: "Laptops", href: "/shop/laptops", icon: "laptop" },
  { label: "Mobile Phones", href: "/shop/mobile-phones", icon: "phone" },
  { label: "Accessories", href: "/shop/accessories", icon: "accessories" },
  { label: "Desktops", href: "/shop/desktops", icon: "desktop" },
  { label: "Monitors", href: "/shop/monitors", icon: "monitor" },
  { label: "Printers", href: "/shop/printers", icon: "printer" },
  { label: "Storage Devices", href: "/shop/storage-devices", icon: "storage" },
  { label: "Software", href: "/shop/software", icon: "software" },
  { label: "Laptop Bags", href: "/shop/laptop-bags", icon: "bag" },
  { label: "Wireless", href: "/shop/wireless", icon: "wireless" },
];

/** Slim trust strip — glanceable stats directly under the hero. Every value
 *  below is real (from COMPANY in lib/site.ts and KANVA_CATEGORIES); no
 *  fabricated "clients served" count is included since we don't have one. */
export const KANVA_TRUST_STRIP: { value: string; label: string }[] = [
  { value: "30+ yrs", label: "In business, since 1995" },
  { value: "8", label: "Cities served nationwide" },
  { value: `${KANVA_CATEGORIES.length}+`, label: "Product categories" },
  { value: "Corp & Govt", label: "Trusted client base" },
];

/** Real company philosophy statement — from the official Careers page (see
 *  COMPANY.philosophy in lib/site.ts for the source string). */
export const KANVA_MISSION = {
  eyebrow: "Our purpose",
  title: "Technology that works as hard as you do",
  paragraphs: [
    "Our philosophy is that corporate enterprises must be managed not merely in the interests of their owners, but equally in those of their employees, of the consumers of their products, of the local community and finally of the country as a whole.",
    "We ensure fair, transparent, accountable and ethical management — motivating every employee to play an integral role in the company's growth, and every customer to trust what we deliver.",
  ],
};

/** Deeper legacy/story section — real facts only (no invented milestone years).
 *  Awards/recognitions sourced from the official Media page. */
export const KANVA_STORY = {
  eyebrow: "Our story",
  title: "From Eastern Logica to Logica Infoway",
  paragraphs: [
    "Logica Infoway Limited was founded in 1995 as Eastern Logica Infoway Limited, registered as a public limited company in Kolkata, West Bengal — and has since held 28 Annual General Meetings as a listed company.",
    "Three decades on, the company still operates from its original Kolkata roots while serving corporate and government clients across eight cities — Kolkata, Delhi, Noida, Gurugram, Lucknow, Hyderabad, Mumbai and Bangalore.",
  ],
  /** Real client names — logo omitted where no real logo file is available yet. */
  clients: [
    { name: "R.R. Kabel", logo: "/images/logos/rr-kabel.svg" },
    { name: "LIC of India", logo: "/images/logos/lic.svg" },
  ],
  /** Real award/recognition names — logo omitted where no real logo file is available yet. */
  awards: [
    { name: "HP Growthon 2025", logo: "/images/logos/hp.svg" },
    { name: "Samsung Excellent Retail Performance", logo: "/brands/samsung.png" },
    { name: "HP Best Distributor — Consumer Notebooks", logo: "/images/logos/hp.svg" },
    { name: "Flipkart Highest Seller, Mobile Category", logo: "/images/logos/flipkart.svg" },
  ],
};

/** Closing CTA — reuses the site's real primary conversion path (/shop) and
 *  published order line, since no separate /contact route exists yet. */
export const KANVA_CLOSING_CTA = {
  eyebrow: "Ready when you are",
  title: "Let's equip your business",
  subtitle: "Genuine hardware, enterprise pricing, and three decades of delivery behind every order.",
  primaryCta: { label: "Explore products", href: "/shop" },
  phoneLabel: "+91 7003999192",
  phoneHref: "tel:+917003999192",
};

/** Brands — see lib/brands.ts for logo assets from logicainfoway.com */
export { LOGICA_BRANDS, LOGICA_BRAND_LOGOS } from "@/lib/brands";
