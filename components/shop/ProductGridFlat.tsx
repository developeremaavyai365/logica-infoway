"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatINR, type Product } from "@/lib/products";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { useShopStore } from "@/components/shop/store";
import { ProductMediaFlip } from "@/components/shop/ProductMediaFlip";
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
        const wished = ready && inWishlist(product.id);

        return (
          <motion.div key={product.id} variants={fadeUp}>
            <Link
              href={`/product/${product.id}`}
              className="group flex flex-col items-center text-center"
            >
              <ProductMediaFlip
                product={product}
                wished={wished}
                light={light}
                onToggleWishlist={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
              />

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
