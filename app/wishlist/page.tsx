"use client";

import Link from "next/link";
import { LuArrowRight, LuHeart } from "react-icons/lu";
import { useShopStore } from "@/components/shop/store";
import { ProductGridFlat } from "@/components/shop/ProductGridFlat";
import { PRODUCTS } from "@/lib/products";

export default function WishlistPage() {
  const { wishlist, ready } = useShopStore();

  if (!ready) return null;

  const products = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof PRODUCTS)[number] => !!p);

  if (products.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-[90rem] flex-col items-center justify-center px-6 pt-28 text-center lg:px-10">
        <LuHeart className="h-12 w-12 text-neutral-300" />
        <h1 className="mt-5 font-display text-2xl font-semibold text-neutral-900">Your wishlist is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-neutral-500">
          Tap the heart on any product to save it here for later.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          Continue shopping <LuArrowRight className="h-4 w-4" />
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[90rem] px-6 pb-24 pt-28 lg:px-10">
      <h1 className="font-display text-3xl font-semibold text-neutral-900">
        Your wishlist <span className="text-neutral-400">({products.length})</span>
      </h1>
      <div className="mt-10">
        <ProductGridFlat products={products} />
      </div>
    </main>
  );
}
