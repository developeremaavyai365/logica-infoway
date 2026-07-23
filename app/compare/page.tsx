"use client";

import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuScale, LuX } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { useShopStore } from "@/components/shop/store";
import { PRODUCTS, discountPercent, formatINR } from "@/lib/products";
import { PRODUCT_DETAILS } from "@/lib/product-details";
import { decodeHtmlEntities } from "@/lib/utils";

export default function ComparePage() {
  const { compare, removeFromCompare, clearCompare, addToCart, ready } = useShopStore();

  if (!ready) return null;

  const products = compare
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof PRODUCTS)[number] => !!p);

  if (products.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-[90rem] flex-col items-center justify-center px-6 pt-28 text-center lg:px-10">
        <LuScale className="h-12 w-12 text-neutral-300" />
        <h1 className="mt-5 font-display text-2xl font-semibold text-neutral-900">Nothing to compare yet</h1>
        <p className="mt-2 max-w-sm text-sm text-neutral-500">
          Add up to 4 products to compare their specs side by side.
        </p>
        <Link
          href="/shop"
          style={{ "--liquid": "#0F9D58", "--liquid-ink": "#fff" } as React.CSSProperties}
          className="btn-liquid mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          Continue shopping <LuArrowRight className="h-4 w-4" />
        </Link>
      </main>
    );
  }

  // Union of every real spec label across the compared products, in the
  // order each first appears — rows with no value for a product show "—".
  const specRows: string[] = [];
  const specsByProduct = products.map((p) => {
    const raw = PRODUCT_DETAILS[p.id]?.specs ?? [];
    const map = new Map(raw.map(([label, value]) => [decodeHtmlEntities(label), decodeHtmlEntities(value)]));
    for (const label of map.keys()) if (!specRows.includes(label)) specRows.push(label);
    return map;
  });

  return (
    <main className="mx-auto max-w-[90rem] px-6 pb-24 pt-28 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-neutral-900">
          Compare <span className="text-neutral-400">({products.length}/4)</span>
        </h1>
        <button type="button" onClick={clearCompare} className="text-sm text-neutral-500 transition-colors hover:text-neutral-900">
          Clear all
        </button>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="w-40" />
              {products.map((p) => {
                const off = discountPercent(p.price, p.mrp);
                return (
                  <th key={p.id} className="min-w-[14rem] px-4 pb-6 text-left align-top">
                    <div className="relative rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                      <button
                        type="button"
                        aria-label="Remove from compare"
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute right-3 top-3 text-neutral-400 transition-colors hover:text-neutral-900"
                      >
                        <LuX className="h-4 w-4" />
                      </button>
                      <Link href={`/product/${p.id}`} className="relative block aspect-square w-full overflow-hidden rounded-xl bg-white">
                        {p.image && <Image src={p.image} alt={p.name} fill sizes="200px" className="object-contain p-4" />}
                      </Link>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">{p.brand}</p>
                      <Link href={`/product/${p.id}`} className="mt-0.5 line-clamp-2 font-semibold text-neutral-900 hover:text-[#0F9D58]">
                        {p.name}
                      </Link>
                      <div className="mt-2 flex items-end gap-2">
                        <span className="font-display text-lg font-bold text-neutral-900">{formatINR(p.price)}</span>
                        {Boolean(off) && <span className="text-xs font-semibold text-emerald-400">-{off}%</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(p.id, 1)}
                        style={{ "--liquid": "#0F9D58", "--liquid-ink": "#fff" } as React.CSSProperties}
                        className="btn-liquid mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
                      >
                        <FiShoppingBag className="h-3.5 w-3.5" />
                        Add to Cart
                      </button>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {specRows.length === 0 ? (
              <tr>
                <td colSpan={products.length + 1} className="px-4 py-6 text-center text-neutral-400">
                  No detailed specs available for these products yet.
                </td>
              </tr>
            ) : (
              specRows.map((label, i) => (
                <tr key={label} className={i % 2 === 1 ? "bg-neutral-50" : undefined}>
                  <td className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">{label}</td>
                  {specsByProduct.map((map, idx) => (
                    <td key={idx} className="px-4 py-3 text-neutral-700">
                      {map.get(label) ?? <span className="text-neutral-300">—</span>}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
