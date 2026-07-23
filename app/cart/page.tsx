"use client";

import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuMinus, LuPlus, LuShoppingCart, LuTrash2 } from "react-icons/lu";
import { useShopStore } from "@/components/shop/store";
import { PRODUCTS, formatINR } from "@/lib/products";

export default function CartPage() {
  const { cart, setQty, removeFromCart, clearCart, ready } = useShopStore();

  const lines = cart
    .map((line) => ({ line, product: PRODUCTS.find((p) => p.id === line.id) }))
    .filter((l): l is { line: (typeof cart)[number]; product: (typeof PRODUCTS)[number] } => !!l.product);

  const subtotal = lines.reduce((sum, { line, product }) => sum + product.price * line.qty, 0);
  const mrpTotal = lines.reduce((sum, { line, product }) => sum + (product.mrp ?? product.price) * line.qty, 0);
  const savings = mrpTotal - subtotal;

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
    <main className="mx-auto max-w-[90rem] px-6 pb-24 pt-28 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-neutral-900">
          Your cart <span className="text-neutral-400">({lines.length})</span>
        </h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          Clear cart
        </button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
        {/* Line items */}
        <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200">
          {lines.map(({ line, product }) => (
            <div key={line.id} className="flex gap-4 p-4 sm:p-5">
              <Link
                href={`/product/${product.id}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white"
              >
                {product.image && (
                  <Image src={product.image} alt={product.name} fill sizes="96px" className="object-contain p-2" />
                )}
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                      {product.brand}
                    </p>
                    <Link
                      href={`/product/${product.id}`}
                      className="mt-0.5 line-clamp-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-[#0F9D58]"
                    >
                      {product.name}
                    </Link>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove from cart"
                    onClick={() => removeFromCart(product.id)}
                    className="shrink-0 text-neutral-400 transition-colors hover:text-rose-400"
                  >
                    <LuTrash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                  <div className="flex items-center rounded-full border border-neutral-200">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQty(product.id, line.qty - 1)}
                      className="flex h-9 w-9 items-center justify-center text-neutral-600 transition-colors hover:text-neutral-900"
                    >
                      <LuMinus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold text-neutral-900">{line.qty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQty(product.id, line.qty + 1)}
                      className="flex h-9 w-9 items-center justify-center text-neutral-600 transition-colors hover:text-neutral-900"
                    >
                      <LuPlus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="font-display text-base font-bold text-neutral-900">
                    {formatINR(product.price * line.qty)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="font-display text-lg font-semibold text-neutral-900">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-neutral-900">{formatINR(subtotal)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>You save</span>
                <span>{formatINR(savings)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-[#0F9D58]">Free</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 font-display text-lg font-bold text-neutral-900">
            <span>Total</span>
            <span>{formatINR(subtotal)}</span>
          </div>

          <button
            type="button"
            disabled
            title="Checkout isn't wired to a payment backend yet"
            className="mt-6 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-400"
          >
            Proceed to Checkout
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
