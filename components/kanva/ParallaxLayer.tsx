"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Depth-parallax wrapper for a section's decorative background layer —
 * inspired by Keith Clark's classic pure-CSS perspective/translateZ parallax,
 * adapted to scroll-linked transforms (via Framer Motion's `useScroll`)
 * instead of hijacking the page's scroll container. The literal technique
 * requires the whole page to become its own `overflow-y: auto` element,
 * which would break window-scroll-driven behavior already in use elsewhere
 * on this site (e.g. the header's scroll-triggered background). This gives
 * the same "layers move at different depths while scrolling" effect while
 * leaving the page's normal scroll — and all real content — untouched.
 */
export function ParallaxLayer({
  children,
  speed = 0.3,
  scaleDepth = false,
  className,
}: {
  children: React.ReactNode;
  /** Fraction of the section's scroll distance the layer drifts — higher
   *  values feel further away ("deep background"), lower values sit closer
   *  to the base content. */
  speed?: number;
  /** Adds a subtle scale breathing (98%→106%) so the layer feels like it's
   *  receding/approaching in depth, not just sliding — closer to the
   *  translateZ "deep background" feel of the original technique. */
  scaleDepth?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = 340 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.06, 0.98]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={scaleDepth ? { y, scale } : { y }}
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {children}
    </motion.div>
  );
}
