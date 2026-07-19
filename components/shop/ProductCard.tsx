"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LuStar } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { formatINR, type Product } from "@/lib/products";
import { fadeUp } from "@/lib/motion";
import { useShopStore } from "@/components/shop/store";
import { ProductMediaFlip } from "@/components/shop/ProductMediaFlip";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, inWishlist, addToCart, ready } = useShopStore();
  const wished = ready && inWishlist(product.id);

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/product/${product.id}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      >
        <ProductMediaFlip
          product={product}
          wished={wished}
          bordered
          onToggleWishlist={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
        />

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
            {product.brand}
          </p>
          <h3 className="mt-1 line-clamp-2 font-display text-sm font-semibold leading-snug text-neutral-900">
            {product.name}
          </h3>

          {product.rating && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
              <LuStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-neutral-700">{product.rating}</span>
              {product.reviews && <span className="text-neutral-400">({product.reviews})</span>}
            </div>
          )}

          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
            <div>
              <p className="font-display text-lg font-bold text-neutral-900">{formatINR(product.price)}</p>
              {product.mrp && product.mrp > product.price && (
                <p className="text-xs text-neutral-400 line-through">{formatINR(product.mrp)}</p>
              )}
            </div>
            <button
              type="button"
              aria-label="Add to cart"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product.id, 1);
              }}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-[#0F9D58]"
            >
              <FiShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
