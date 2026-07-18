"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  action,
  light = false,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  action?: { label: string; href: string };
  /** Use white text — for sections with a dark video/photo background. */
  light?: boolean;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="flex flex-wrap items-end justify-between gap-4"
    >
      <div>
        <motion.p
          variants={fadeUp}
          className="text-[12px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: accent }}
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className={cn(
            "mt-3 font-display text-3xl font-semibold tracking-[-0.03em] lg:text-4xl",
            light ? "text-white" : "text-neutral-900",
          )}
        >
          {title}
        </motion.h2>
      </div>
      {action && (
        <motion.div variants={fadeUp}>
          <Link
            href={action.href}
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
              light ? "text-white/70 hover:text-white" : "text-neutral-500 hover:text-neutral-900",
            )}
          >
            {action.label}
            <LuArrowRight className="h-4 w-4" style={{ color: accent }} />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
