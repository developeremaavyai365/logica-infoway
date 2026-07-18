"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuHeart } from "react-icons/lu";
import { discountPercent, formatINR, type Product } from "@/lib/products";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { useShopStore } from "@/components/shop/store";
import { cn } from "@/lib/utils";

/**
 * No card chrome — same treatment as CategoryRail: just the product photo
 * and text floating directly on the segment's background, no border/bg/blur
 * box. Used both over a busy image/video background (pass `light`) and on
 * the plain white page background (default).
 */
export function ProductGridFlat({
  products,
  light = false,
}: {
  products: Product[];
  /** Use white text with a drop-shadow — for sections with a dark video/photo background. */
  light?: boolean;
}) {
  const { toggleWishlist, inWishlist, ready } = useShopStore();
  if (products.length === 0) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
    >
      {products.map((product) => {
        const off = discountPercent(product.price, product.mrp);
        const wished = ready && inWishlist(product.id);

        return (
          <motion.div key={product.id} variants={fadeUp}>
            <Link
              href={`/product/${product.id}`}
              className="group flex flex-col items-center text-center"
            >
              <div
                className={cn(
                  "relative aspect-[4/3] w-full overflow-hidden",
                  !light && "rounded-xl bg-neutral-100",
                )}
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span
                      className={cn(
                        "px-4 text-center font-display text-lg font-semibold",
                        light ? "text-white/85" : "text-neutral-500",
                      )}
                    >
                      {product.brand}
                    </span>
                  </div>
                )}
                {Boolean(off) && (
                  <span className="absolute right-2 top-2 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white">
                    -{off}%
                  </span>
                )}
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
                    "absolute left-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
                    wished
                      ? "bg-rose-500 text-white"
                      : light
                        ? "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white"
                        : "bg-white/80 text-neutral-500 hover:bg-white hover:text-neutral-900",
                  )}
                >
                  <LuHeart className={cn("h-4 w-4", wished && "fill-current")} />
                </button>
              </div>

              <p
                className={cn(
                  "mt-4 text-[11px] font-semibold uppercase tracking-[0.16em]",
                  light ? "text-white/60 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]" : "text-neutral-400",
                )}
              >
                {product.brand}
              </p>
              <h3
                className={cn(
                  "mt-1 line-clamp-2 max-w-[14rem] font-display text-sm font-semibold leading-snug",
                  light ? "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]" : "text-neutral-900",
                )}
              >
                {product.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <p
                  className={cn(
                    "font-display text-base font-bold",
                    light ? "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]" : "text-neutral-900",
                  )}
                >
                  {formatINR(product.price)}
                </p>
                {product.mrp && product.mrp > product.price && (
                  <p className={cn("text-xs line-through", light ? "text-white/50" : "text-neutral-400")}>
                    {formatINR(product.mrp)}
                  </p>
                )}
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
