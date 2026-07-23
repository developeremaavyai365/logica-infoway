"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight, LuFlame } from "react-icons/lu";
import { discountPercent, formatINR, type Product } from "@/lib/products";
import { fadeUp } from "@/lib/motion";

/**
 * Large "Deal of the Day" spotlight for the single best real discount in the
 * catalog — no card chrome, same as the category tiles: just the product
 * photo and text floating directly on the segment's video background.
 * Links to the product's own detail page, same as every other product
 * surface on the site.
 */
export function DealOfTheDaySpotlight({ product }: { product: Product }) {
  const off = discountPercent(product.price, product.mrp);

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/product/${product.id}`}
        className="group flex flex-col items-center gap-6 text-center md:flex-row md:text-left"
      >
        {/* Media */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden md:w-2/5">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="px-6 text-center font-display text-2xl font-semibold text-white/85">
                {product.brand}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center md:items-start">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#FDE047]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FDE047] drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            <LuFlame className="h-3.5 w-3.5" />
            Deal of the Day
          </span>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            {product.brand}
          </p>
          <h3 className="mt-1.5 max-w-lg font-display text-2xl font-semibold leading-snug text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)] sm:text-3xl">
            {product.name}
          </h3>

          <div className="mt-6 flex flex-wrap items-end justify-center gap-3 md:justify-start">
            <p className="font-display text-3xl font-bold text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)] sm:text-4xl">
              {formatINR(product.price)}
            </p>
            {product.mrp && product.mrp > product.price && (
              <p className="pb-1 text-base text-white/50 line-through drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                {formatINR(product.mrp)}
              </p>
            )}
            {Boolean(off) && (
              <span className="mb-0.5 rounded-full bg-emerald-500 px-3 py-1 text-sm font-bold text-neutral-950">
                -{off}%
              </span>
            )}
          </div>

          <span
            style={{ "--liquid": "#0F9D58", "--liquid-ink": "#fff" } as React.CSSProperties}
            className="btn-liquid mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition-transform group-hover:scale-[1.03]"
          >
            Shop this deal
            <LuArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
