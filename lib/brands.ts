import brandLogos from "@/lib/brand-logos.json";

export interface BrandLogo {
  name: string;
  logo: string;
}

export const LOGICA_BRAND_LOGOS: BrandLogo[] = brandLogos;

export const LOGICA_BRANDS = LOGICA_BRAND_LOGOS.map((b) => b.name);
