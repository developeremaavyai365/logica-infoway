"use client";

import { useState } from "react";
import Link from "next/link";
import { LuCheck, LuHeart, LuMinus, LuPlus } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { useShopStore } from "@/components/shop/store";
import { cn } from "@/lib/utils";

/**
 * Quantity + Add to Cart + Buy Now + wishlist — fully working against the
 * local ShopStore (localStorage-backed). There's no payments backend, so
 * "Buy Now" adds to cart and sends the user to checkout-in-cart; that's
 * clearly labelled rather than pretending a real purchase happens.
 */
export function ProductActions({ productId }: { productId: string }) {
  const { addToCart, inCart, toggleWishlist, inWishlist, ready } = useShopStore();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const wished = ready && inWishlist(productId);
  const alreadyInCart = ready && inCart(productId);

  const handleAdd = () => {
    addToCart(productId, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-neutral-200">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <LuMinus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-neutral-900">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="flex h-11 w-11 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <LuPlus className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-neutral-900 px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          {justAdded ? <LuCheck className="h-4 w-4" /> : <FiShoppingBag className="h-4 w-4" />}
          {justAdded ? "Added" : alreadyInCart ? "Add More" : "Add to Cart"}
        </button>

        <Link
          href="/cart"
          onClick={() => addToCart(productId, qty)}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-neutral-300 px-6 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
        >
          Buy Now
        </Link>

        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          onClick={() => toggleWishlist(productId)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
            wished
              ? "border-rose-300 bg-rose-50 text-rose-500"
              : "border-neutral-300 text-neutral-500 hover:text-neutral-900",
          )}
        >
          <LuHeart className={cn("h-4 w-4", wished && "fill-current")} />
        </button>
      </div>

      {alreadyInCart && !justAdded && (
        <p className="mt-3 text-xs text-[#0F9D58]">Already in your cart — quantity above adds more.</p>
      )}
      <p className="mt-3 text-xs text-neutral-400">
        Cart is fully functional (saved on this device). Checkout &amp; payment aren&apos;t wired to a backend yet.
      </p>
    </div>
  );
}
