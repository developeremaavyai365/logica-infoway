"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuSearch, LuSlidersHorizontal, LuX } from "react-icons/lu";
import { ProductGridFlat } from "@/components/shop/ProductGridFlat";
import { FilterSidebar, type FilterSelection } from "@/components/shop/FilterSidebar";
import {
  FACET_ORDER,
  SHOP_COLORS,
  buildFacets,
  getPriceBounds,
  priceStepFor,
  type FacetKey,
  type Product,
} from "@/lib/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "discount";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
  { key: "discount", label: "Biggest Discount" },
];

function scoreDiscount(p: Product) {
  if (!p.mrp || p.mrp <= p.price) return 0;
  return (p.mrp - p.price) / p.mrp;
}

/** Products per page before pagination kicks in. */
const PAGE_SIZE = 24;

/** Build a compact page list with ellipses, e.g. [1, "…", 4, 5, 6, "…", 12]. */
function pageItems(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}

export function CategoryBrowser({
  products,
  accent,
  initialBrand,
  initialQuery = "",
}: {
  products: Product[];
  /** @deprecated brands are now derived internally */
  brands?: string[];
  accent: string;
  initialBrand?: string;
  initialQuery?: string;
}) {
  // Exact price bounds across every product in this set.
  const [priceMin, priceMax] = useMemo(() => getPriceBounds(products), [products]);
  const priceStep = useMemo(() => priceStepFor(priceMax - priceMin), [priceMin, priceMax]);

  const emptySelection = useMemo<FilterSelection>(
    () => ({ attrs: {}, brands: initialBrand ? [initialBrand] : [], price: [priceMin, priceMax] }),
    [initialBrand, priceMin, priceMax],
  );

  const [queryInput, setQueryInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);

  // Debounce the raw keystrokes before they hit the filter — the input
  // stays instantly responsive, while the (layout-animated) grid below
  // only re-settles once typing pauses instead of thrashing every key.
  useEffect(() => {
    const id = setTimeout(() => setQuery(queryInput), 220);
    return () => clearTimeout(id);
  }, [queryInput]);
  const [sort, setSort] = useState<SortKey>("featured");
  const [sel, setSel] = useState<FilterSelection>(emptySelection);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Facet options + counts derived from the full category set (stable).
  // Colour is handled separately (full master list), so drop it here.
  const facets = useMemo(() => buildFacets(products).filter((f) => f.key !== "Colour"), [products]);
  const brandOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    return Array.from(counts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value));
  }, [products]);

  // Colour options = full site colour list, unioned with any product colours,
  // each with its in-stock count. Every colour is always listed.
  const colorOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      const c = p.attrs?.Colour;
      if (c) counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    const all = new Set<string>([...SHOP_COLORS, ...counts.keys()]);
    return Array.from(all)
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({ value, count: counts.get(value) ?? 0 }));
  }, [products]);

  const priceNarrowed = sel.price[0] > priceMin || sel.price[1] < priceMax;
  const activeCount =
    sel.brands.length +
    (priceNarrowed ? 1 : 0) +
    Object.values(sel.attrs).reduce((n, v) => n + v.length, 0);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      // Search
      const q = query.trim().toLowerCase();
      if (q && !(p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))) return false;
      // Brand
      if (sel.brands.length && !sel.brands.includes(p.brand)) return false;
      // Price range
      if (p.price < sel.price[0] || p.price > sel.price[1]) return false;
      // Attribute facets (AND across groups, OR within a group)
      for (const key of FACET_ORDER) {
        const picked = sel.attrs[key];
        if (picked && picked.length) {
          const v = p.attrs?.[key as FacetKey];
          if (!v || !picked.includes(v)) return false;
        }
      }
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "discount":
        list = [...list].sort((a, b) => scoreDiscount(b) - scoreDiscount(a));
        break;
      default:
        break;
    }
    return list;
  }, [products, query, sel, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  );

  // Reset to first page whenever the result set changes.
  useEffect(() => {
    setPage(1);
  }, [query, sel, sort]);

  function goToPage(next: number) {
    setPage(Math.min(Math.max(1, next), pageCount));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggle(type: "attr" | "brand", group: string, value: string) {
    setSel((prev) => {
      if (type === "brand") {
        const has = prev.brands.includes(value);
        return { ...prev, brands: has ? prev.brands.filter((b) => b !== value) : [...prev.brands, value] };
      }
      const cur = prev.attrs[group] ?? [];
      const has = cur.includes(value);
      const next = has ? cur.filter((v) => v !== value) : [...cur, value];
      const attrs = { ...prev.attrs, [group]: next };
      if (next.length === 0) delete attrs[group];
      return { ...prev, attrs };
    });
  }

  const sidebar = (
    <FilterSidebar
      facets={facets}
      brands={brandOptions}
      colors={colorOptions}
      priceMin={priceMin}
      priceMax={priceMax}
      priceStep={priceStep}
      priceValue={sel.price}
      onPriceChange={(price) => setSel((prev) => ({ ...prev, price }))}
      selected={sel}
      onToggle={toggle}
      onClear={() => setSel(emptySelection)}
      accent={accent}
      activeCount={activeCount}
    />
  );

  return (
    <div className="flex gap-8">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24">{sidebar}</div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-sm">
            <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Search this category..."
              className="w-full rounded-full border border-neutral-200 bg-neutral-100 py-2.5 pl-10 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-neutral-400"
            />
            {queryInput && (
              <button
                type="button"
                onClick={() => {
                  setQueryInput("");
                  setQuery("");
                }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
              >
                <LuX className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              style={{ "--liquid": accent, "--liquid-ink": "#0a0a0a" } as React.CSSProperties}
              className="btn-liquid inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 lg:hidden"
            >
              <LuSlidersHorizontal className="h-4 w-4" />
              Filters
              {activeCount > 0 && (
                <span
                  className="inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-neutral-950"
                  style={{ backgroundColor: accent }}
                >
                  {activeCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2">
              <LuSlidersHorizontal className="hidden h-4 w-4 text-neutral-400 sm:block" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-neutral-200 bg-neutral-50 py-2.5 pl-3 pr-8 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-400"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div ref={topRef} className="mt-6 scroll-mt-28">
          <p className="text-sm text-neutral-500">
            {filtered.length === 0 ? (
              "No products"
            ) : (
              <>
                Showing{" "}
                <span className="text-neutral-600">
                  {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)}
                </span>{" "}
                of {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </>
            )}
          </p>
        </div>

        <div className="mt-4">
          <ProductGridFlat products={paged} />
        </div>

        {pageCount > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-1.5"
          >
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="inline-flex h-9 items-center gap-1 rounded-full border border-neutral-200 px-3 text-sm text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-200"
            >
              <LuChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {pageItems(currentPage, pageCount).map((it, i) =>
              it === "…" ? (
                <span key={`gap-${i}`} className="px-2 text-sm text-neutral-400">
                  …
                </span>
              ) : (
                <button
                  key={it}
                  type="button"
                  onClick={() => goToPage(it)}
                  aria-current={it === currentPage ? "page" : undefined}
                  className={
                    it === currentPage
                      ? "inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-bold text-neutral-950"
                      : "inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-neutral-200 px-3 text-sm text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                  }
                  style={it === currentPage ? { backgroundColor: accent } : undefined}
                >
                  {it}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              aria-label="Next page"
              className="inline-flex h-9 items-center gap-1 rounded-full border border-neutral-200 px-3 text-sm text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-200"
            >
              <span className="hidden sm:inline">Next</span>
              <LuChevronRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
              <span className="font-display text-lg font-semibold text-neutral-900">Filters</span>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-100"
              >
                <LuX className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-6">{sidebar}</div>
            <div className="border-t border-neutral-200 p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="btn-liquid w-full rounded-full py-3 text-sm font-bold text-neutral-950"
                style={{ backgroundColor: accent, "--liquid": "#0a0a0a", "--liquid-ink": "#fff" } as React.CSSProperties}
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
