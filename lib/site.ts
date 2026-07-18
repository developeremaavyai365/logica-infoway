/** Company facts + footer IA. Mirrors the official Logica Infoway footer. */

import { KANVA_CATEGORIES } from "@/lib/kanva";

export const COMPANY = {
  legalName: "Logica Infoway Limited",
  formerName: "Formerly : Eastern Logica Infoway Limited",
  tagline:
    "Cost-effective computer hardware, networking, and IT solutions for corporate and government — trusted since 1995.",
  cin: "L30007WB1995PLC073218",
  gstin: "19AABCE0772B1Z1",
  email: "info@logicainfoway.com",
  registeredOffice: "2 Saklat Place, 1st Floor, Kolkata, West Bengal India – 700072.",
  telephone: "033 4058 0000",
  orderPhone: "+91 7003999192",
  orderHours: "Mon To Sat : 10:00 AM TO 7:00 PM",
  cities: ["Kolkata", "Delhi", "Noida", "Gurugram", "Lucknow", "Hyderabad", "Mumbai", "Bangalore"],
  /** Real company philosophy statement, from the official Careers page. */
  philosophy:
    "Our philosophy is that corporate enterprises must be managed not merely in the interests of their owners, but equally in those of their employees, of the consumers of their products, of the local community and finally of the country as a whole.",
};

export interface Office {
  city: string;
  label: string;
  address: string;
  phone?: string;
  altPhone?: string;
  email: string;
}

/** Real branch office addresses, scraped from the official Contact Us page. */
export const OFFICES: Office[] = [
  {
    city: "Kolkata",
    label: "Head Office",
    address: "2 Saklat Place, 1st Floor, Kolkata, West Bengal – 700072",
    phone: "+91 7003999192",
    altPhone: "033 4058-0000",
    email: "info@logicainfoway.com",
  },
  {
    city: "Delhi",
    label: "Delhi",
    address: "A-78, 3rd Floor, Okhla Phase II, New Delhi – 110020",
    phone: "+91 7003999192",
    altPhone: "011 4362-8116",
    email: "info@logicainfoway.com",
  },
  {
    city: "Bangalore",
    label: "Bangalore",
    address: "14, Sunkalpet Main Road, 1st Floor, Bangalore – 560002",
    phone: "+91 7003999192",
    email: "info@logicainfoway.com",
  },
  {
    city: "Gurugram",
    label: "Haryana",
    address: "Shop No. 82, Sec-12A Opp. Telephone Exchange, Gurugram – 122001",
    phone: "+91 7003999192",
    email: "info@logicainfoway.com",
  },
  {
    city: "Hyderabad",
    label: "Hyderabad",
    address: "Shop No. 12B, G. Floor, Emarald House, S.D. Road, Telengana – 500003",
    phone: "+91 7003999192",
    email: "info@logicainfoway.com",
  },
  {
    city: "Mumbai",
    label: "Mumbai",
    address: "Build no. A-7, Gala no. S-102, Anmol Textile Market, Bhiwandi, Mumbai – 421302",
    phone: "+91 7003999192",
    email: "info@logicainfoway.com",
  },
];

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Useful Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Stock Exchange", href: "/investor" },
      { label: "Contact Us", href: "/contact" },
      { label: "Media", href: "/media" },
    ],
  },
  {
    // Sourced directly from KANVA_CATEGORIES (same list BrowseBar/CategoryRail
    // use) so this column can never drift out of sync with real shop routes.
    title: "Product Categories",
    links: KANVA_CATEGORIES.map((c) => ({ label: c.label, href: c.href })),
  },
  {
    title: "Help Desk",
    links: [
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Shipping Policy", href: "/policies/shipping" },
      { label: "Terms & Conditions", href: "/policies/terms" },
      { label: "Cancellation & Refund", href: "/policies/refund" },
      { label: "Help/Faq", href: "/support/faqs" },
    ],
  },
];

export const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com/easternlogicaofficial", icon: "facebook" },
  { label: "Twitter", href: "https://twitter.com/eastern_logica", icon: "twitter" },
  { label: "Instagram", href: "https://instagram.com/easternlogicaofficial", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/company/easternlogicainfowayltd", icon: "linkedin" },
  { label: "Pinterest", href: "https://pinterest.com/eastern_logica", icon: "pinterest" },
] as const;
