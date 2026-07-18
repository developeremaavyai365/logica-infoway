"use client";

import { motion } from "framer-motion";
import { LuPackageOpen } from "react-icons/lu";
import { ProductCard } from "@/components/shop/ProductCard";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import type { Product } from "@/lib/products";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 py-20 text-center">
        <LuPackageOpen className="h-10 w-10 text-neutral-300" />
        <p className="font-display text-lg font-semibold text-neutral-900">No products found</p>
        <p className="max-w-sm text-sm text-neutral-500">
          Try a different filter, brand, or search term.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
