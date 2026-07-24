"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuArrowRight, LuShoppingCart, LuX } from "react-icons/lu";
import { useShopStore } from "@/components/shop/store";
import { PRODUCTS, formatINR } from "@/lib/products";

export default function CartPage() {
  const { cart, setQty, removeFromCart, ready } = useShopStore();
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState<string | null>(null);

  const lines = cart
    .map((line) => ({ line, product: PRODUCTS.find((p) => p.id === line.id) }))
    .filter((l): l is { line: (typeof cart)[number]; product: (typeof PRODUCTS)[number] } => !!l.product);

  const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.qty, 0);
  const mrpTotal = lines.reduce((sum, { line, product }) => sum + (product.mrp ?? product.price) * line.qty, 0);
  const savings = mrpTotal - subtotal;

  function applyPromo(e: React.FormEvent) {
    e.preventDefault();
    // No real coupon system is wired up — say so honestly instead of
    // pretending a code was accepted or silently doing nothing.
    setPromoMsg(promo.trim() ? "No active promo codes right now." : null);
  }

  if (!ready) return null; // avoid a hydration flash before localStorage loads

  if (lines.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-[90rem] flex-col items-center justify-center px-6 pt-28 text-center lg:px-10">
        <LuShoppingCart className="h-12 w-12 text-neutral-300" />
        <h1 className="mt-5 font-display text-2xl font-semibold text-neutral-900">Your cart is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-neutral-500">
          Browse the shop and add products — they&apos;ll show up here.
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

  return (
    <main className="min-h-screen bg-neutral-100 px-4 pb-24 pt-28 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:grid lg:grid-cols-[1fr_20rem] lg:divide-x lg:divide-neutral-200">
        {/* Line items */}
        <div className="p-5 sm:p-8">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-neutral-900">Shopping Cart</h1>
            <span className="text-sm text-neutral-400">{lines.length} items</span>
          </div>

          <div className="mt-6 divide-y divide-neutral-100">
            {lines.map(({ line, product }) => (
              <div key={line.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <Link
                  href={`/product/${product.id}`}
                  className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100"
                >
                  {product.image && (
                    <Image src={product.image} alt={product.name} fill sizes="56px" className="object-contain p-1.5" />
                  )}
                </Link>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                    {product.brand}
                  </p>
                  <Link
                    href={`/product/${product.id}`}
                    className="line-clamp-1 text-sm font-semibold text-neutral-900 transition-colors hover:text-[#0F9D58]"
                  >
                    {product.name}
                  </Link>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty(product.id, line.qty - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={line.qty}
                    onChange={(e) => setQty(product.id, Math.max(1, Number(e.target.value) || 1))}
                    aria-label={`Quantity for ${product.name}`}
                    className="h-7 w-11 rounded-md border border-neutral-200 text-center text-sm text-neutral-900 outline-none focus:border-neutral-400 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty(product.id, line.qty + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                  >
                    +
                  </button>
                </div>

                <p className="w-24 shrink-0 text-right font-display text-sm font-bold text-neutral-900">
                  {formatINR(product.price * line.qty)}
                </p>

                <button
                  type="button"
                  aria-label="Remove from cart"
                  onClick={() => removeFromCart(product.id)}
                  className="shrink-0 text-neutral-300 transition-colors hover:text-rose-400"
                >
                  <LuX className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <LuArrowLeft className="h-4 w-4" /> Back to shop
          </Link>
        </div>

        {/* Summary */}
        <div className="bg-neutral-50 p-5 sm:p-8">
          <h2 className="font-display text-lg font-bold text-neutral-900">Summary</h2>

          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="font-semibold uppercase tracking-[0.08em] text-neutral-500">
              Items {lines.reduce((n, { line }) => n + line.qty, 0)}
            </span>
            <span className="font-semibold text-neutral-900">{formatINR(subtotal)}</span>
          </div>

          {savings > 0 && (
            <div className="mt-2 flex items-center justify-between text-sm text-[#0F9D58]">
              <span>You save</span>
              <span>{formatINR(savings)}</span>
            </div>
          )}

          <div className="mt-4">
            <label htmlFor="shipping" className="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
              Shipping
            </label>
            <select
              id="shipping"
              defaultValue="standard"
              className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-neutral-400"
            >
              <option value="standard">Standard Delivery — Free</option>
            </select>
          </div>

          <form onSubmit={applyPromo} className="mt-4">
            <label htmlFor="promo" className="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
              Give code
            </label>
            <div className="mt-1.5 flex items-center rounded-lg border border-neutral-200 bg-white pr-1.5 focus-within:border-neutral-400">
              <input
                id="promo"
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Enter your code"
                className="h-10 w-full bg-transparent px-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                aria-label="Apply code"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <LuArrowRight className="h-4 w-4" />
              </button>
            </div>
            {promoMsg && <p className="mt-1.5 text-xs text-neutral-500">{promoMsg}</p>}
          </form>

          <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">Total price</span>
            <span className="font-display text-lg font-bold text-neutral-900">{formatINR(subtotal)}</span>
          </div>

          <button
            type="button"
            disabled
            title="Checkout isn't wired to a payment backend yet"
            className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-neutral-900/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white opacity-40"
          >
            Checkout
          </button>
          <p className="mt-3 text-center text-xs text-neutral-400">
            Checkout &amp; payment aren&apos;t wired to a backend yet — your cart itself is fully real and saved on
            this device.
          </p>
        </div>
      </div>
    </main>
  );
}
