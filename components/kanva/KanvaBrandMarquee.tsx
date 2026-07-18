"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { KANVA_ACCENTS } from "@/lib/kanva";
import { LOGICA_BRAND_LOGOS, type BrandLogo } from "@/lib/brands";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Curated subset for the full-screen static grid — the brands customers
 *  search for most, kept to a count that fits one viewport without scrolling. */
const FEATURED_BRAND_NAMES = [
  "Dell",
  "HP",
  "ASUS",
  "Acer",
  "Lenovo",
  "Apple",
  "Samsung",
  "Vivo",
  "OPPO",
  "Realme",
  "OnePlus",
  "Xiaomi",
  "Canon",
  "Epson",
  "Brother",
  "Logitech",
];

const FEATURED_BRANDS: BrandLogo[] = FEATURED_BRAND_NAMES.map(
  (name) => LOGICA_BRAND_LOGOS.find((b) => b.name === name)!,
).filter(Boolean);

/** Rotating subheadings shown one-at-a-time below the main heading. */
const ROTATING_SUBHEADS = [
  { text: "Genuine products you trust", color: KANVA_ACCENTS.sky },
  { text: "Shop by product", color: KANVA_ACCENTS.mint },
  { text: "Full manufacturer warranty", color: KANVA_ACCENTS.yellow },
  { text: "Authorized brand partners", color: KANVA_ACCENTS.violet },
  { text: "Trusted by enterprises & governments", color: KANVA_ACCENTS.peach },
];

function RotatingSubhead() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_SUBHEADS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  const current = ROTATING_SUBHEADS[index];

  return (
    <div className="relative mx-auto mt-4 h-7 max-w-xl">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute inset-x-0 top-0 text-sm font-semibold tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:text-base"
          style={{ color: current.color }}
        >
          {current.text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/** Every stock brand PNG in this set has a fully opaque, baked-in white
 *  background (verified — no alpha channel) — so floating them directly on
 *  the dark video would show as solid white rectangles, and the earlier
 *  invert-filter trick flattened them into grey blobs. This decodes each PNG
 *  onto a canvas at mount and keys out near-white pixels to transparency,
 *  so the *real* logo artwork floats free with no card behind it. SVGs are
 *  already transparent and pass through untouched. */
function useWhiteKeyedSrc(src: string) {
  const [keyedSrc, setKeyedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (src.endsWith(".svg")) {
      setKeyedSrc(src);
      return;
    }

    let cancelled = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setKeyedSrc(src);
        return;
      }
      ctx.drawImage(img, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Distance from pure white — fully transparent past the threshold,
        // soft-faded near the edge so anti-aliased fringes don't look cut out.
        const whiteness = Math.min(r, g, b);
        if (whiteness > 235) {
          data[i + 3] = 0;
        } else if (whiteness > 200) {
          data[i + 3] = Math.round(((235 - whiteness) / 35) * 255);
        }
      }
      ctx.putImageData(frame, 0, 0);
      if (!cancelled) setKeyedSrc(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      if (!cancelled) setKeyedSrc(src);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  return keyedSrc;
}

function BrandLogoImage({ src, alt }: { src: string; alt: string }) {
  const keyedSrc = useWhiteKeyedSrc(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={keyedSrc ?? src}
      alt={alt}
      className={cn(
        "h-14 w-auto max-w-[9rem] object-contain opacity-90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out group-hover/brand:scale-125 group-hover/brand:opacity-100 group-hover/brand:drop-shadow-[0_6px_22px_rgba(0,0,0,0.55)] sm:h-16 lg:h-20",
        !keyedSrc && "invisible",
      )}
      draggable={false}
    />
  );
}

const gridItem = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

/** Bare, enlarged logo — no card behind it. A soft radial glow blooms in on
 *  hover to put "life" into an otherwise static grid. */
function BrandItem({ brand }: { brand: BrandLogo }) {
  return (
    <motion.div variants={gridItem}>
      <Link
        href={`/shop?brand=${encodeURIComponent(brand.name)}`}
        className="group/brand relative flex h-28 w-32 shrink-0 items-center justify-center sm:h-32 sm:w-36 lg:h-36 lg:w-40"
        aria-label={brand.name}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 scale-75 rounded-full bg-white opacity-0 blur-2xl transition-all duration-500 ease-out group-hover/brand:scale-110 group-hover/brand:opacity-20"
        />
        <BrandLogoImage src={brand.logo} alt={brand.name} />
      </Link>
    </motion.div>
  );
}

/** Static, full-screen "shop by brand" grid — a fixed, curated set of logos
 *  (no infinite scroll loop) sized to fit one viewport. */
export function KanvaBrandMarquee() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden border-t border-white/10 bg-neutral-950 px-6 py-16 lg:px-10">
      <video
        src="/videos/shop-by-brand-bg.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Darkening overlay so headings and logos stay legible over the video */}
      <div className="pointer-events-none absolute inset-0 bg-black/55" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[90rem] text-center">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Shop by{" "}
          <span style={{ color: KANVA_ACCENTS.sky }}>brand</span>
        </h2>
        <RotatingSubhead />
      </div>

      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative z-10 mx-auto mt-12 grid max-w-[62rem] grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10 sm:gap-y-12 lg:mt-16 lg:grid-cols-4 lg:gap-x-16 lg:gap-y-14"
      >
        {FEATURED_BRANDS.map((brand) => (
          <BrandItem key={brand.name} brand={brand} />
        ))}
      </motion.div>

      <Link
        href="/shop"
        className="relative z-10 mt-12 text-sm font-semibold text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline lg:mt-14"
      >
        See all brands
      </Link>
    </section>
  );
}
