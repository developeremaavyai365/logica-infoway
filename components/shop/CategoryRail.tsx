"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import { getProductsByCategory, SHOP_CATEGORIES } from "@/lib/products";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/** A representative real product photo for the category tile — original, unedited. */
function previewImage(slug: string): string | undefined {
  return getProductsByCategory(slug).find((p) => p.image)?.image;
}

/** No card chrome — just the original product photo plus a label underneath. */
export function CategoryRail() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
    >
      {SHOP_CATEGORIES.map((cat) => {
        const image = previewImage(cat.slug);

        return (
          <motion.div key={cat.slug} variants={fadeUp}>
            <Link href={`/shop/${cat.slug}`} className="group flex flex-col items-center text-center">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {image ? (
                  <Image
                    src={image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="px-4 text-center font-display text-lg font-semibold text-white/85">
                      {cat.label}
                    </span>
                  </div>
                )}
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                {cat.label}
              </p>
              <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] transition-colors group-hover:text-[#0F9D58]">
                Shop now
                <LuArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
