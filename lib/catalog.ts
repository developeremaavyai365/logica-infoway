/** Canonical product taxonomy — single source for the Browse bar, mega-menu,
 *  category pages, and footer. Icon is a string key resolved in the UI. */

export interface Category {
  label: string;
  href: string;
  icon: string;
  featured?: boolean;
}

export const CATEGORIES: Category[] = [
  { label: "Deal Of The Day", href: "/shop/deals", icon: "deal", featured: true },
  { label: "Laptops", href: "/shop/laptops", icon: "laptop" },
  { label: "Mobile Phones", href: "/shop/mobile-phones", icon: "phone" },
  { label: "Monitors", href: "/shop/monitors", icon: "monitor" },
  { label: "Printers", href: "/shop/printers", icon: "printer" },
  { label: "Desktops AIO", href: "/shop/desktops", icon: "desktop" },
  { label: "Accessories", href: "/shop/accessories", icon: "accessories" },
  { label: "Software", href: "/shop/software", icon: "software" },
  { label: "Laptop Bags", href: "/shop/laptop-bags", icon: "bag" },
  { label: "Storage Devices", href: "/shop/storage-devices", icon: "storage" },
  { label: "Wireless", href: "/shop/wireless", icon: "wireless" },
];
