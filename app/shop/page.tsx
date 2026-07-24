import { redirect } from "next/navigation";
import { KanvaLaptopSegment } from "@/components/kanva/KanvaLaptopSegment";
import { KanvaShopShowcase } from "@/components/kanva/KanvaShopShowcase";
import { CategoryBrowser } from "@/components/shop/CategoryBrowser";
import { ShopVideoHero } from "@/components/shop/ShopVideoHero";
import { KANVA_ACCENTS } from "@/lib/kanva";
import { matchCategoryFromQuery, PRODUCTS } from "@/lib/products";

export const metadata = {
  title: "Shop | Logica Infoway",
  description: "Shop laptops, mobiles, monitors, printers, desktops and more — genuine products you trust.",
};

const ALL_BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();

export default function ShopPage({
  searchParams,
}: {
  searchParams: { q?: string; brand?: string };
}) {
  const query = searchParams.q?.trim() ?? "";
  const brand = searchParams.brand?.trim() ?? "";

  // Searching a category name ("mobiles", "laptop", "Mobile Phones") jumps
  // straight to that category page instead of a literal text search.
  if (query) {
    const category = matchCategoryFromQuery(query);
    if (category) redirect(`/shop/${category.slug}`);
  }

  // Search / brand results view
  if (query || brand) {
    return (
      <main className="bg-white text-neutral-900">
        <section className="mx-auto max-w-[90rem] px-6 pb-24 pt-32 lg:px-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0F9D58]">
            {brand ? "Brand" : "Search results"}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-neutral-900 lg:text-5xl">
            {brand || `“${query}”`}
          </h1>
          <div className="mt-10">
            <CategoryBrowser
              products={PRODUCTS}
              brands={ALL_BRANDS}
              accent={KANVA_ACCENTS.mint}
              initialBrand={brand || undefined}
              initialQuery={query}
            />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white text-neutral-900">
      <ShopVideoHero />

      <KanvaLaptopSegment />
      <KanvaShopShowcase />
    </main>
  );
}
