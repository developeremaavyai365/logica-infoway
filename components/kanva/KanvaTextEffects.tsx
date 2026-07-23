"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

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

/** Split-join heading — two halves of a title slide in from opposite edges
 *  and meet in the middle. Built for headings that describe a merge/rename
 *  (old name → new name); pass the exact left/right substrings of `text` to
 *  split on rather than an arbitrary word count. */
export function SplitJoinHeading({
  left,
  right,
  className,
  color,
  as: Tag = "h2",
}: {
  left: string;
  right: string;
  className?: string;
  color?: string;
  as?: "h2" | "h3";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  // Plain IntersectionObserver, not Framer's whileInView — whileInView has
  // silently failed to fire elsewhere in this codebase even with the
  // element fully in viewport. This replays every time it scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
      rootMargin: "0px 0px -10% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag className={className} style={color ? { color } : undefined} aria-label={`${left} ${right}`}>
      <span ref={ref} className="split-join-text">
        <span className={cn("split-join-part split-join-left", inView && "split-join-in")}>{left}</span>{" "}
        <span className={cn("split-join-part split-join-right", inView && "split-join-in")}>{right}</span>
      </span>
    </Tag>
  );
}

/** Split-flap hover heading — text sits invisible (only a thin underline
 *  showing) until hovered, at which point the underline sweeps across and
 *  two half-height duplicates slide in from above/below to reveal it, like
 *  a split-flap display. Pointer-driven (:hover), not scroll-triggered. */
export function SplitFlapHeading({
  text,
  className,
  color,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  color: string;
  as?: "h2" | "h3";
}) {
  return (
    <Tag
      className={cn("split-flap", className)}
      style={{ "--flap-color": color } as React.CSSProperties}
    >
      {text}
      <span className="split-flap-half split-flap-top" data-text={text} aria-hidden />
      <span className="split-flap-half split-flap-bottom" data-text={text} aria-hidden />
    </Tag>
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
