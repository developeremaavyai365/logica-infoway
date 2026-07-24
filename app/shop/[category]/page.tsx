import { notFound } from "next/navigation";
import { CategoryBrowser } from "@/components/shop/CategoryBrowser";
import { ShopHero } from "@/components/shop/ShopHero";
import { KANVA_ACCENTS } from "@/lib/kanva";
import { SHOP_MEGA } from "@/lib/nav";
import {
  PRODUCTS,
  SHOP_CATEGORIES,
  type Product,
  discountPercent,
  getCategory,
  getProductsByCategory,
} from "@/lib/products";

/** Look up the human label for a `?sub=` keyword from the mega-menu tree. */
function findSubLabel(catSlug: string, keyword: string): string | undefined {
  const cat = SHOP_MEGA.find((c) => c.href === `/shop/${catSlug}`);
  return cat?.children?.find((ch) => {
    const raw = ch.href.split("sub=")[1];
    return raw && decodeURIComponent(raw) === keyword;
  })?.label;
}

function matchesSub(p: Product, keyword: string) {
  return (`${p.name} ${p.brand}`).toLowerCase().includes(keyword.toLowerCase());
}

export function generateStaticParams() {
  return [{ category: "deals" }, ...SHOP_CATEGORIES.map((c) => ({ category: c.slug }))];
}

export function generateMetadata({ params }: { params: { category: string } }) {
  if (params.category === "deals") {
    return { title: "Deals | Logica Infoway", description: "Today's biggest discounts across all categories." };
  }
  const cat = getCategory(params.category);
  if (!cat) return { title: "Shop | Logica Infoway" };
  return { title: `${cat.label} | Logica Infoway`, description: cat.description };
}

const ALL_BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { brand?: string; q?: string; sub?: string };
}) {
  const brand = searchParams.brand?.trim();
  const query = searchParams.q?.trim();
  const subKeyword = searchParams.sub?.trim();

  // Special "Deal Of The Day" pseudo-category
  if (params.category === "deals") {
    const deals = PRODUCTS.filter((p) => discountPercent(p.price, p.mrp)).sort(
      (a, b) => (discountPercent(b.price, b.mrp) ?? 0) - (discountPercent(a.price, a.mrp) ?? 0),
    );
    return (
      <main className="bg-white text-neutral-900">
        <ShopHero
          eyebrow="Limited time"
          title="Deals of"
          accentWord="the day"
          accent={KANVA_ACCENTS.peach}
          subtitle="The steepest discounts across every category, refreshed daily. Grab them before they're gone."
        />
        <section className="mx-auto max-w-[90rem] px-6 py-16 lg:px-10">
          <CategoryBrowser
            products={deals}
            brands={Array.from(new Set(deals.map((p) => p.brand))).sort()}
            accent={KANVA_ACCENTS.peach}
            initialBrand={brand}
            initialQuery={query}
          />
        </section>
      </main>
    );
  }

  const cat = getCategory(params.category);
  if (!cat) notFound();

  const allInCategory = getProductsByCategory(cat.slug);

  // Apply the sub-category filter only when it actually narrows to results,
  // otherwise fall back to the full category (never a confusing empty page).
  let products = allInCategory;
  let subLabel: string | undefined;
  if (subKeyword) {
    const matched = allInCategory.filter((p) => matchesSub(p, subKeyword));
    if (matched.length > 0) {
      products = matched;
      subLabel = findSubLabel(cat.slug, subKeyword) ?? subKeyword;
    }
  }

  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

  return (
    <main className="bg-white text-neutral-900">
      <ShopHero
        eyebrow={subLabel ? `${cat.label} · ${subLabel}` : ""}
        title={subLabel ?? cat.label}
        accent={cat.accent}
        subtitle={cat.description}
        video={cat.video}
        videoFit={cat.videoFit}
        image={cat.image}
      />
      <section className="mx-auto max-w-[90rem] px-6 py-16 lg:px-10">
        <CategoryBrowser
          products={products}
          brands={brands}
          accent={cat.accent}
          initialBrand={brand && brands.includes(brand) ? brand : undefined}
          initialQuery={query}
        />
      </section>
    </main>
  );
}
