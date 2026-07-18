/** Data model for the cinematic full-screen HorizontalProductShowcase.
 *  Each category renders dynamically — add/reorder here, the UI follows.
 *
 *  theme.bg       — fallback base colour
 *  theme.glow     — accent glow behind the product (drives dots, bullets, aurora)
 *  theme.dark     — true when the background is dark (drives text contrast)
 *  theme.gradient — [from, via, to] vivid gradient for the slide backdrop
 *  stats          — right-rail metrics (value + label)
 *  icon           — Lucide key resolved in the component
 *  image          — optional real render (public path); falls back to the icon
 *  photo          — use the bundled laptop photo on the stage
 */

export interface ShowcaseStat {
  value: string;
  label: string;
}

export interface ShowcaseCategory {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  stats: ShowcaseStat[];
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  icon: string;
  image?: string;
  photo?: boolean;
  theme: {
    bg: string;
    glow: string;
    dark: boolean;
    gradient: [string, string, string];
  };
}

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  {
    id: "laptops",
    title: "Laptops",
    description:
      "Business-grade portables built for real work — from thin-and-light ultrabooks to mobile workstations, configured and deployed at scale.",
    highlights: ["13th-gen Intel & Ryzen", "Bulk deployment ready", "3-year onsite warranty"],
    stats: [
      { value: "25+", label: "Brands" },
      { value: "1200+", label: "Models in stock" },
    ],
    ctaLabel: "Explore Laptops",
    ctaHref: "/shop/laptops",
    secondaryLabel: "View Collection",
    secondaryHref: "/shop/laptops",
    icon: "laptop",
    photo: true,
    theme: { bg: "#0b0f24", glow: "#6366f1", dark: true, gradient: ["#1e1b4b", "#4338ca", "#0ea5e9"] },
  },
  {
    id: "mobile-phones",
    title: "Mobile Phones",
    description:
      "The latest 5G smartphones for a connected workforce — corporate plans, MDM enrolment and volume pricing included.",
    highlights: ["5G · 120Hz displays", "MDM & fleet enrolment", "Trade-in programme"],
    stats: [
      { value: "30+", label: "Brands" },
      { value: "2000+", label: "Handsets" },
    ],
    ctaLabel: "Explore Phones",
    ctaHref: "/shop/mobile-phones",
    secondaryLabel: "View Collection",
    secondaryHref: "/shop/mobile-phones",
    icon: "phone",
    theme: { bg: "#1a0b2e", glow: "#d946ef", dark: true, gradient: ["#2e1065", "#a21caf", "#6d28d9"] },
  },
  {
    id: "tablets",
    title: "Tablets",
    description:
      "Powerful tablets for field teams, presentations and creative work — with keyboards, styluses and rugged cases to match.",
    highlights: ["AMOLED + stylus", "LTE / Wi-Fi models", "Field-ready accessories"],
    stats: [
      { value: "20+", label: "Brands" },
      { value: "850+", label: "Configurations" },
    ],
    ctaLabel: "Explore Tablets",
    ctaHref: "/shop/accessories",
    secondaryLabel: "View Collection",
    secondaryHref: "/shop/accessories",
    icon: "tablet",
    theme: { bg: "#04182b", glow: "#22d3ee", dark: true, gradient: ["#083344", "#0e7490", "#2563eb"] },
  },
  {
    id: "printers",
    title: "Printers",
    description:
      "Reliable print, scan and copy for high-volume offices — laser, inkjet and managed print services across India.",
    highlights: ["Laser & inkjet", "Managed print services", "On-site AMC support"],
    stats: [
      { value: "15+", label: "Brands" },
      { value: "500+", label: "Models" },
    ],
    ctaLabel: "Explore Printers",
    ctaHref: "/shop/printers",
    secondaryLabel: "View Collection",
    secondaryHref: "/shop/printers",
    icon: "printer",
    theme: { bg: "#2a0f05", glow: "#fb923c", dark: true, gradient: ["#7c2d12", "#ea580c", "#e11d48"] },
  },
  {
    id: "monitors",
    title: "Monitors",
    description:
      "Crisp, colour-accurate displays — from productivity panels to 4K USB-C docks that power the whole desk from one cable.",
    highlights: ["4K & ultrawide", "USB-C single-cable", "Ergonomic stands"],
    stats: [
      { value: "18+", label: "Brands" },
      { value: "600+", label: "Panels" },
    ],
    ctaLabel: "Explore Monitors",
    ctaHref: "/shop/monitors",
    secondaryLabel: "View Collection",
    secondaryHref: "/shop/monitors",
    icon: "monitor",
    theme: { bg: "#04180f", glow: "#34d399", dark: true, gradient: ["#064e3b", "#0d9488", "#0891b2"] },
  },
  {
    id: "networking",
    title: "Networking",
    description:
      "Enterprise networking that scales — switches, firewalls, access points and structured cabling, designed and installed by our team.",
    highlights: ["Switching & Wi-Fi 6E", "Firewalls & security", "Design + installation"],
    stats: [
      { value: "22+", label: "Brands" },
      { value: "900+", label: "SKUs" },
    ],
    ctaLabel: "Explore Networking",
    ctaHref: "/shop",
    secondaryLabel: "Request a survey",
    secondaryHref: "/contact",
    icon: "network",
    theme: { bg: "#050b2e", glow: "#60a5fa", dark: true, gradient: ["#172554", "#1d4ed8", "#7c3aed"] },
  },
  {
    id: "accessories",
    title: "Accessories",
    description:
      "Everything around the device — headsets, docks, keyboards and power — sourced from brands you trust, in the quantities you need.",
    highlights: ["Headsets & docks", "Cables & power", "Volume pricing"],
    stats: [
      { value: "40+", label: "Brands" },
      { value: "3000+", label: "SKUs" },
    ],
    ctaLabel: "Explore Accessories",
    ctaHref: "/shop/accessories",
    secondaryLabel: "View Collection",
    secondaryHref: "/shop/accessories",
    icon: "accessories",
    theme: { bg: "#1c0a2e", glow: "#e879f9", dark: true, gradient: ["#4a044e", "#9333ea", "#db2777"] },
  },
  {
    id: "storage",
    title: "Storage",
    description:
      "From blazing NVMe drives to network-attached storage and backup — keep business data fast, safe and always available.",
    highlights: ["NVMe & SSD", "NAS & backup", "Data-recovery ready"],
    stats: [
      { value: "20+", label: "Brands" },
      { value: "750+", label: "Drives" },
    ],
    ctaLabel: "Explore Storage",
    ctaHref: "/shop/storage-devices",
    secondaryLabel: "View Collection",
    secondaryHref: "/shop/storage-devices",
    icon: "storage",
    theme: { bg: "#241803", glow: "#fbbf24", dark: true, gradient: ["#713f12", "#d97706", "#ca8a04"] },
  },
  {
    id: "gaming",
    title: "Gaming",
    description:
      "High-refresh rigs, GPUs and peripherals for esports labs, creators and workstations that need serious graphics horsepower.",
    highlights: ["RTX-class GPUs", "High-refresh displays", "Custom builds"],
    stats: [
      { value: "16+", label: "Brands" },
      { value: "300+", label: "Custom builds" },
    ],
    ctaLabel: "Explore Gaming",
    ctaHref: "/shop",
    secondaryLabel: "View Collection",
    secondaryHref: "/shop",
    icon: "gaming",
    theme: { bg: "#0a0417", glow: "#a3e635", dark: true, gradient: ["#3b0764", "#7e22ce", "#16a34a"] },
  },
  {
    id: "enterprise",
    title: "Enterprise Solutions",
    description:
      "End-to-end IT for corporates and government — procurement, deployment, AMC and support, trusted since 1995.",
    highlights: ["Procurement at scale", "Deployment & AMC", "Govt & corporate"],
    stats: [
      { value: "500+", label: "Clients served" },
      { value: "30", label: "Years trusted" },
    ],
    ctaLabel: "Partner With Us",
    ctaHref: "/contact",
    secondaryLabel: "About Logica",
    secondaryHref: "/about",
    icon: "enterprise",
    theme: { bg: "#03211b", glow: "#2dd4bf", dark: true, gradient: ["#064e3b", "#0f766e", "#15803d"] },
  },
];
