"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuHeart, LuStar } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { discountPercent, formatINR, type Product } from "@/lib/products";
import { fadeUp } from "@/lib/motion";
import { useShopStore } from "@/components/shop/store";
import { cn } from "@/lib/utils";

/** Deterministic accent per product so gradient fallbacks feel intentional. */
const GRADIENTS = [
  "from-sky-100 via-transparent to-indigo-100",
  "from-emerald-100 via-transparent to-teal-100",
  "from-amber-100 via-transparent to-orange-100",
  "from-violet-100 via-transparent to-fuchsia-100",
  "from-rose-100 via-transparent to-pink-100",
  "from-cyan-100 via-transparent to-blue-100",
];

function hashIndex(id: string, len: number) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % len;
}

export function ProductCard({ product }: { product: Product }) {
  const off = discountPercent(product.price, product.mrp);
  const gradient = GRADIENTS[hashIndex(product.id, GRADIENTS.length)];
  const { toggleWishlist, inWishlist, addToCart, ready } = useShopStore();
  const wished = ready && inWishlist(product.id);

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/product/${product.id}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      >
        {/* Media */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={cn("flex h-full w-full items-center justify-center bg-gradient-to-br", gradient)}>
              <span className="px-4 text-center font-display text-lg font-semibold text-neutral-600">
                {product.brand}
              </span>
            </div>
          )}

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                {product.badge}
              </span>
            )}
            {Boolean(off) && (
              <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white">
                -{off}%
              </span>
            )}
          </div>

          <button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={cn(
              "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
              wished
                ? "bg-rose-500 text-white"
                : "bg-white/80 text-neutral-500 hover:bg-white hover:text-neutral-900",
            )}
          >
            <LuHeart className={cn("h-4 w-4", wished && "fill-current")} />
          </button>
        </div>

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
