import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion presets. Every section pulls from here so the whole
 * site moves with one consistent rhythm instead of ad-hoc per-component timing.
 */

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Standard reveal: fade + rise. Use with whileInView. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: easeOutExpo } },
};

/** Parent that staggers its children's `show` state. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Small scale/lift for interactive cards. */
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.01, transition: { duration: 0.25, ease: easeOutExpo } },
};

/** Common viewport config so reveals fire once, slightly before fully in view. */
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
