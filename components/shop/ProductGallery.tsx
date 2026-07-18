"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Product image gallery — a large primary photo plus a thumbnail strip when
 * more than one real angle exists. Falls back to a single static image (no
 * thumbnails) for the products that only have one real photo — never fakes
 * extra angles.
 */
export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const hasMultiple = images.length > 1;
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {current ? (
          <Image
            key={current}
            src={current}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-10"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="px-6 text-center font-display text-2xl font-semibold text-neutral-900">{alt}</span>
          </div>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show angle ${i + 1}`}
              aria-current={i === active}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white transition-colors ${
                i === active ? "border-[#0F9D58]" : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              <Image src={src} alt={`${alt} — angle ${i + 1}`} fill sizes="80px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
