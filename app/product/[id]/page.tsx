import { notFound } from "next/navigation";
import Link from "next/link";
import { LuChevronRight, LuShare2, LuShieldCheck, LuStar, LuTruck } from "react-icons/lu";
import { ProductActions } from "@/components/shop/ProductActions";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductGridFlat } from "@/components/shop/ProductGridFlat";
import { SectionHeading } from "@/components/shop/SectionHeading";
import { KANVA_ACCENTS } from "@/lib/kanva";
import { PRODUCTS, discountPercent, formatINR, getCategory, getProductsByCategory } from "@/lib/products";
import { extractSpecs, SPEC_LABELS, SPEC_ORDER } from "@/lib/product-specs";
import { PRODUCT_DETAILS } from "@/lib/product-details";
import { getProductGallery } from "@/lib/product-gallery";
import { decodeHtmlEntities } from "@/lib/utils";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) return { title: "Product | Logica Infoway" };
  return {
    title: `${product.name} | Logica Infoway`,
    description: `${product.brand} ${product.name} — ${formatINR(product.price)}. Genuine products, warranty-backed, delivered across India.`,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) notFound();

  const category = getCategory(product.category);
  const off = discountPercent(product.price, product.mrp);

  // Real scraped highlights/specs/overview when available; fall back to
  // regex-extracted specs from the name for the handful of products the
  // scrape didn't cover. Never fabricated either way.
  const detail = PRODUCT_DETAILS[product.id];
  const fallbackSpecs = extractSpecs(product.name);
  const fallbackEntries = SPEC_ORDER.filter((k) => fallbackSpecs[k]).map(
    (k) => [SPEC_LABELS[k], fallbackSpecs[k] as string] as const,
  );
  const highlights = (detail?.highlights ?? []).map(decodeHtmlEntities);
  const specEntries: readonly (readonly [string, string])[] = (detail?.specs ?? fallbackEntries).map(
    ([label, value]) => [decodeHtmlEntities(label), decodeHtmlEntities(value)] as const,
  );
  const overview = detail?.overview ? decodeHtmlEntities(detail.overview) : undefined;

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 8);
  const galleryImages = getProductGallery(product.id);
  const images = galleryImages.length > 0 ? galleryImages : product.image ? [product.image] : [];

  return (
    <main className="bg-white text-neutral-900">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[90rem] px-6 pb-2 pt-28 lg:px-10">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
          <Link href="/" className="transition-colors hover:text-neutral-900">
            Home
          </Link>
          <LuChevronRight className="h-3 w-3" />
          <Link href="/shop" className="transition-colors hover:text-neutral-900">
            Shop
          </Link>
          {category && (
            <>
              <LuChevronRight className="h-3 w-3" />
              <Link href={`/shop/${category.slug}`} className="transition-colors hover:text-neutral-900">
                {category.label}
              </Link>
            </>
          )}
          <LuChevronRight className="h-3 w-3" />
          <span className="line-clamp-1 text-neutral-600">{product.name}</span>
        </nav>
      </div>

      {/* Gallery + info */}
      <section className="mx-auto grid max-w-[90rem] gap-10 px-6 py-10 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Gallery — real multi-angle photography from logicainfoway.com where
           available; a thumbnail strip appears automatically when a product
           has more than one real photo. */}
        <ProductGallery images={images} alt={product.name} />

        {/* Info */}
        <div>
          <Link
            href={`/shop?brand=${encodeURIComponent(product.brand)}`}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0B84C4] transition-colors hover:text-neutral-900"
          >
            {product.brand}
          </Link>
          <h1 className="mt-2 font-display text-2xl font-semibold leading-snug text-neutral-900 sm:text-3xl">
            {product.name}
          </h1>

          {product.rating && (
            <div className="mt-3 flex items-center gap-1.5 text-sm text-neutral-500">
              <LuStar className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-neutral-700">{product.rating}</span>
              {product.reviews && <span className="text-neutral-400">({product.reviews} reviews)</span>}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <p className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
              {formatINR(product.price)}
            </p>
            {product.mrp && product.mrp > product.price && (
              <p className="pb-1 text-base text-neutral-400 line-through">{formatINR(product.mrp)}</p>
            )}
            {Boolean(off) && (
              <span className="mb-0.5 rounded-full bg-emerald-500 px-3 py-1 text-sm font-bold text-neutral-950">
                -{off}%
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-neutral-400">Inclusive of all taxes</p>

          {/* Real highlights, scraped from the product's own page on
             logicainfoway.com — shown only when we actually have them. */}
          {highlights.length > 0 && (
            <ul className="mt-6 space-y-2">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F9D58]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          <ProductActions productId={product.id} />

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-y border-neutral-200 py-5 text-sm text-neutral-500">
            <span className="inline-flex items-center gap-2">
              <LuTruck className="h-4 w-4 text-[#0B84C4]" /> Free shipping
            </span>
            <span className="inline-flex items-center gap-2">
              <LuShieldCheck className="h-4 w-4 text-[#0B84C4]" /> Genuine warranty
            </span>
            <button type="button" className="inline-flex items-center gap-2 transition-colors hover:text-neutral-900">
              <LuShare2 className="h-4 w-4 text-[#0B84C4]" /> Share
            </button>
          </div>

          {category && (
            <p className="mt-5 text-sm text-neutral-500">
              Category:{" "}
              <Link href={`/shop/${category.slug}`} className="text-[#0B84C4] transition-colors hover:text-neutral-900">
                {category.label}
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* Overview — real description text scraped from the product page */}
      {overview && (
        <section className="mx-auto max-w-[90rem] px-6 pb-10 lg:px-10">
          <h2 className="font-display text-xl font-semibold text-neutral-900">Description</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-neutral-600">{overview}</p>
        </section>
      )}

      {/* Technical Details — only rendered when the catalog actually has spec data */}
      {specEntries.length > 0 && (
        <section className="mx-auto max-w-[90rem] px-6 pb-16 lg:px-10">
          <h2 className="font-display text-xl font-semibold text-neutral-900">Technical Details</h2>
          <div className="mt-5 overflow-hidden rounded-xl border border-neutral-200">
            <table className="w-full text-sm">
              <tbody>
                {specEntries.map(([label, value], i) => (
                  <tr key={label} className={i % 2 === 1 ? "bg-neutral-50" : undefined}>
                    <td className="w-1/3 px-4 py-3 font-medium text-neutral-500 sm:w-1/4">{label}</td>
                    <td className="px-4 py-3 text-neutral-900">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related products — real, same-category items */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[90rem] px-6 pb-20 lg:px-10">
          <SectionHeading eyebrow="You may also like" title="Related products" accent={KANVA_ACCENTS.violet} />
          <div className="mt-10">
            <ProductGridFlat products={related} />
          </div>
        </section>
      )}
    </main>
  );
}
