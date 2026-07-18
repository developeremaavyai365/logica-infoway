"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

/** Rotating value-props — product + deal/use-case, each with its own accent.
 *  Kept intentionally distinct from the homepage copy. */
const HEADLINES: { lead: string; accent: string; color: string; href: string }[] = [
  { lead: "Laptops that keep up with", accent: "your ambition.", color: "#0F9D58", href: "/shop/laptops" },
  { lead: "Flagship phones at", accent: "prices that move.", color: "#78C0F0", href: "/shop/mobile-phones" },
  { lead: "Office desktops built for", accent: "serious output.", color: "#7DD3FC", href: "/shop/desktops" },
  { lead: "True-wireless audio for", accent: "life untethered.", color: "#C4B5FD", href: "/shop/wireless" },
  { lead: "Storage that never", accent: "slows you down.", color: "#FDE047", href: "/shop/storage-devices" },
  { lead: "Everyday deals worth the", accent: "double-take.", color: "#FDBA74", href: "/shop/deals" },
];

const ROTATE_MS = 3000;

export function ShopVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % HEADLINES.length), ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  const current = HEADLINES[index];

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-neutral-950">
      <video
        ref={videoRef}
        src="/videos/shop-hero-bg.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Overlays tuned to keep multicolor text legible over the footage */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 pt-28 pb-20 lg:px-10">
        {/* Rotating headline — same anchor, crossfading multicolor lines */}
        <div className="relative min-h-[4.2em] max-w-4xl sm:min-h-[3.4em] lg:min-h-[2.6em]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="absolute inset-0 font-display text-[clamp(2.5rem,6.5vw,5.25rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white"
            >
              {current.lead}{" "}
              <span
                style={{ color: current.color, textShadow: `0 0 40px ${current.color}55` }}
              >
                {current.accent}
              </span>
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
