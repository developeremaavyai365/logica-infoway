"use client";

import { motion, type Variants } from "framer-motion";

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

/** reactbits-style "BlurText" word reveal — each word blurs/fades/rises into
 *  place in sequence, GPU-cheap (opacity/transform/filter only). */
const wordReveal: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function BlurTextHeading({
  text,
  className,
  color,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  /** Inline text color — overrides/complements any color set via className. */
  color?: string;
  as?: "h2" | "h3";
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      variants={wordContainer}
      className={className}
      style={color ? { color } : undefined}
      aria-label={text}
    >
      {text.split(" ").map((word, i, arr) => (
        <motion.span
          key={i}
          variants={wordReveal}
          className="inline-block will-change-[filter,transform]"
          style={i < arr.length - 1 ? { marginRight: "0.25em" } : undefined}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/** reactbits-style "GradientText" shimmer — animated gradient sweep clipped
 *  through the text. Pass two accent colors to match the section's palette. */
export function GradientShimmer({
  text,
  className,
  from,
  to,
}: {
  text: string;
  className?: string;
  from: string;
  to: string;
}) {
  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: `linear-gradient(90deg, ${from}, ${to}, ${from})`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
      animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
    >
      {text}
    </motion.span>
  );
}
