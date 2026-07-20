/** Single source of truth for primary navigation. Matches the approved IA. */

import { KANVA_CATEGORIES } from "@/lib/kanva";

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavMegaCategory {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  /** Multi-column mega-menu (categories + sub-links), e.g. Shop, Investor. */
  mega?: NavMegaCategory[];
}

/** All product categories — shown only inside the Shop dropdown. */
export const SHOP_MENU: NavChild[] = [
  { label: "Deal Of The Day", href: "/shop/deals", description: "Today's best offer" },
  ...KANVA_CATEGORIES.map((c) => ({ label: c.label, href: c.href })),
  { label: "View All Products", href: "/shop", description: "Browse the full catalog" },
];

/** Category + subcategory tree for the Shop mega-menu. Mirrors logicainfoway.com.
 *  Subcategory hrefs carry `?sub=` — the category page filters by it when the
 *  seed catalog has matches, and gracefully shows the whole category otherwise. */
export interface ShopMegaCategory {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const sub = (parent: string, label: string, keyword: string) => ({
  label,
  href: `/shop/${parent}?sub=${encodeURIComponent(keyword)}`,
});

export const SHOP_MEGA: ShopMegaCategory[] = [
  {
    label: "Laptops",
    href: "/shop/laptops",
    children: [
      sub("laptops", "MacBook", "macbook"),
      sub("laptops", "Gaming Laptops", "gaming"),
      sub("laptops", "Homeschooling Laptops", "homeschooling"),
      sub("laptops", "2 in 1 Laptops with Pen", "2-in-1"),
    ],
  },
  {
    label: "Mobile Phones",
    href: "/shop/mobile-phones",
    children: [
      sub("mobile-phones", "iPhones", "iphone"),
      sub("mobile-phones", "iPads", "ipad"),
      sub("mobile-phones", "Tablets", "tablet"),
      sub("mobile-phones", "Smartphones", "smartphone"),
      sub("mobile-phones", "Feature Phones", "feature"),
    ],
  },
  {
    label: "Accessories",
    href: "/shop/accessories",
    children: [
      sub("accessories", "Adapters", "adapter"),
      sub("accessories", "Cabinet", "cabinet"),
      sub("accessories", "CPU Cooling Fan", "cooling"),
      sub("accessories", "Earphone and Headphones", "headphone"),
      sub("accessories", "Gaming Mouse", "mouse"),
      sub("accessories", "Keyboards", "keyboard"),
      sub("accessories", "Keyboard & Mouse Combo", "combo"),
      sub("accessories", "Laptop Cooling Pads", "cooling pad"),
      sub("accessories", "Power Banks", "power bank"),
      sub("accessories", "Smart Watches", "watch"),
      sub("accessories", "SMPS", "smps"),
      sub("accessories", "Webcams", "webcam"),
    ],
  },
  {
    label: "Desktops",
    href: "/shop/desktops",
    children: [
      sub("desktops", "All in One PCs", "all-in-one"),
      sub("desktops", "Tower PCs", "tower"),
    ],
  },
  { label: "Monitors", href: "/shop/monitors" },
  {
    label: "Printers",
    href: "/shop/printers",
    children: [
      sub("printers", "Ink Tank Printers", "tank"),
      sub("printers", "Inkjet Printers", "inkjet"),
      sub("printers", "LaserJet Printers", "laser"),
    ],
  },
  {
    label: "Storage Devices",
    href: "/shop/storage-devices",
    children: [
      sub("storage-devices", "External Hard Disks", "external"),
      sub("storage-devices", "Internal Hard Disk Drives", "internal"),
      sub("storage-devices", "Pen Drives", "pen drive"),
      sub("storage-devices", "SSD", "ssd"),
    ],
  },
  {
    label: "Software",
    href: "/shop/software",
    children: [
      sub("software", "Antivirus & Security Software", "security"),
      sub("software", "Operating Systems", "windows"),
    ],
  },
  { label: "Laptop Bags", href: "/shop/laptop-bags" },
  {
    label: "Wireless",
    href: "/shop/wireless",
    children: [sub("wireless", "True Wireless Earbuds", "buds")],
  },
];

/** Real Investor mega-menu, mirrored from logicainfoway.com's header nav
 *  (Performance / Shareholder Information / Fund Raising / Stock Exchange /
 *  Group Companies). "Annual Report" points at our own built page; every
 *  other item links to the real source page — building 20+ individual
 *  investor-relations pages is out of scope right now, and a real external
 *  link beats a fabricated or dead internal one. */
const LIW = "https://www.logicainfoway.com";

export const INVESTOR_MEGA: NavMegaCategory[] = [
  {
    label: "Performance",
    children: [
      { label: "Annual Report", href: "/investor/annual-reports" },
      { label: "Annual Return", href: `${LIW}/annual-return/` },
      { label: "Board Meeting", href: `${LIW}/notice-of-board-meeting/` },
      { label: "Financial Results", href: `${LIW}/financial-results/` },
      { label: "General Meeting", href: `${LIW}/general-meeting/` },
      { label: "Secretarial Compliance", href: `${LIW}/secretarial-compliance/` },
      { label: "Projects", href: `${LIW}/projects/` },
    ],
  },
  {
    label: "Shareholder Information",
    children: [
      { label: "Notice", href: `${LIW}/notice/` },
      { label: "Board Meeting", href: `${LIW}/board-meeting/` },
      { label: "General Meeting", href: `${LIW}/notice-of-general-meeting/` },
      { label: "Committee Meeting", href: `${LIW}/committee-meeting/` },
      { label: "Policies", href: `${LIW}/policies/` },
      { label: "Advertisement", href: `${LIW}/advertisement/` },
      { label: "Material Creditors", href: `${LIW}/material-creditors/` },
      { label: "Basis Of Allotment", href: `${LIW}/basis-of-allotment/` },
      { label: "Shareholding Pattern", href: `${LIW}/shareholding-pattern/` },
      { label: "Familiarization Program", href: `${LIW}/familiarization-program/` },
    ],
  },
  {
    label: "Fund Raising",
    children: [
      { label: "Fund Raising", href: `${LIW}/fund-raising/` },
      { label: "Prospectus", href: `${LIW}/prospectus/` },
    ],
  },
  {
    label: "Stock Exchange",
    children: [
      { label: "Corporate Announcement", href: `${LIW}/compliances/` },
      { label: "Authorized Person", href: `${LIW}/authorized-person/` },
      { label: "Grievance Redressal", href: `${LIW}/grievance-redressal/` },
    ],
  },
  {
    label: "Group Companies",
    href: `${LIW}/group-companies/`,
  },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    children: SHOP_MENU,
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Overview", href: "/about" },
      { label: "Organization Chart", href: "/about/organization-chart" },
      { label: "Board of Directors & KMP", href: "/about/board-of-directors-and-kmp" },
      { label: "Composition Of Committees", href: "/about/composition-of-committees" },
    ],
  },
  {
    label: "Investor",
    href: "/investor/annual-reports",
    mega: INVESTOR_MEGA,
  },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/careers" },
];

export const CONTACT_EMAIL = "info@logicainfoway.com";
