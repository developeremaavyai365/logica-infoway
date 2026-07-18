"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const logoBadgeContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const badge: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Large logo-forward white card — real logo when we have the file, a bold
 *  name-only card otherwise (never a fabricated logo). Grayscale at rest,
 *  full color on hover. */
export function LogoBadge({
  name,
  logo,
  className,
}: {
  name: string;
  logo?: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={badge}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={
        className ??
        "group flex h-28 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white px-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:h-32"
      }
    >
      {logo ? (
        <div className="relative h-10 w-full sm:h-12">
          {logo.endsWith(".svg") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              alt={name}
              className="mx-auto h-full w-auto object-contain grayscale transition-all duration-300 ease-out group-hover:grayscale-0"
            />
          ) : (
            <Image
              src={logo}
              alt={name}
              fill
              sizes="200px"
              className="object-contain grayscale transition-all duration-300 ease-out group-hover:grayscale-0"
            />
          )}
        </div>
      ) : (
        <span className="font-display text-lg font-bold text-neutral-800 sm:text-xl">{name}</span>
      )}
      {logo && (
        <span className="text-center text-xs font-medium leading-snug text-neutral-500">{name}</span>
      )}
    </motion.div>
  );
}

/** Labeled grid of LogoBadges — exact same pattern used by the "Trusted by" /
 *  "Recognized by" trust wall. */
export function LogoWall({
  label,
  caption,
  items,
}: {
  label?: string;
  caption?: string;
  items: { name: string; logo?: string }[];
}) {
  return (
    <div>
      {label && <p className="text-[13px] font-bold uppercase tracking-[0.24em] text-neutral-400">{label}</p>}
      <motion.div
        variants={logoBadgeContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", label && "mt-5")}
      >
        {items.map((item) => (
          <LogoBadge key={item.name} name={item.name} logo={item.logo} />
        ))}
      </motion.div>
      {caption && <p className="mt-4 text-sm text-neutral-400">{caption}</p>}
    </div>
  );
}
