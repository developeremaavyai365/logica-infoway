"use client";

import { useState } from "react";
import Image from "next/image";
import { LuHeart, LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { discountPercent, type Product } from "@/lib/products";
import { PRODUCT_GALLERY } from "@/lib/product-gallery";
import { cn } from "@/lib/utils";

/**
 * Flip-card product media block — hover-lift + "View details" flips to a
 * real photo gallery on the back (from PRODUCT_GALLERY, the same real
 * multi-angle photography used on the PDP), with prev/next arrows and a
 * close button back to the front. No fabricated images: products with only
 * one real photo simply show that one photo on the back, no arrows.
 */
export function ProductMediaFlip({
  product,
  wished,
  onToggleWishlist,
  light = false,
  bordered = false,
}: {
  product: Product;
  wished: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
  /** White text/icons for use over a dark video/photo background. */
  light?: boolean;
  /** Rounded card chrome (bordered ProductCard) vs flat/borderless grid tile. */
  bordered?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const off = discountPercent(product.price, product.mrp);
  const gallery = PRODUCT_GALLERY[product.id] ?? (product.image ? [product.image] : []);
  const hasMultiple = gallery.length > 1;

  return (
    <div
      className={cn("group/media relative aspect-[4/3] w-full [perspective:1200px]", bordered && "overflow-hidden")}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden [backface-visibility:hidden]",
            bordered ? "bg-neutral-100" : !light && "rounded-xl bg-neutral-100",
          )}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                "object-contain transition-transform duration-500 ease-out group-hover/media:scale-105",
                bordered ? "p-4" : "p-2",
              )}
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

          {/* Hover tint, matching the reference card's mint overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[#0F9D58] opacity-0 transition-opacity duration-300 group-hover/media:opacity-[0.12]" />

          <div className="absolute left-2 top-2 flex flex-col gap-1.5">
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
            onClick={onToggleWishlist}
            className={cn(
              "absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
              wished
                ? "bg-rose-500 text-white"
                : light
                  ? "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white"
                  : "bg-white/80 text-neutral-500 hover:bg-white hover:text-neutral-900",
            )}
          >
            <LuHeart className={cn("h-4 w-4", wished && "fill-current")} />
          </button>

          {gallery.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setGalleryIndex(0);
                setFlipped(true);
              }}
              className="absolute inset-x-4 bottom-3 translate-y-2 rounded-full border-2 border-white/90 bg-black/0 py-2 text-center text-xs font-bold uppercase tracking-wide text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-neutral-900 group-hover/media:translate-y-0 group-hover/media:opacity-100"
            >
              View gallery
            </button>
          )}
        </div>

        {/* Back — real photo gallery */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden bg-neutral-950 [backface-visibility:hidden] [transform:rotateY(180deg)]",
            bordered ? "" : "rounded-xl",
          )}
        >
          {gallery.length > 0 && (
            // Not a Link — this whole card already sits inside the grid's outer
            // <Link> to the PDP, so tapping the photo falls through and navigates
            // normally. An inner <Link> here would be invalid <a>-in-<a> nesting.
            <div className="absolute inset-0">
              <Image
                src={gallery[galleryIndex]}
                alt={`${product.name} — photo ${galleryIndex + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain p-3"
              />
            </div>
          )}

          <button
            type="button"
            aria-label="Close gallery"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFlipped(false);
            }}
            className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-neutral-900"
          >
            <LuX className="h-4 w-4" />
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length);
                }}
                className="absolute left-2 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-neutral-700 backdrop-blur-sm transition-colors hover:bg-white"
              >
                <LuChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setGalleryIndex((i) => (i + 1) % gallery.length);
                }}
                className="absolute right-2 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-neutral-700 backdrop-blur-sm transition-colors hover:bg-white"
              >
                <LuChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
                {gallery.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors",
                      i === galleryIndex ? "bg-white" : "bg-white/35",
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
