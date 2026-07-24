"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { StatCounter } from "@/components/ui/StatCounter";
import { cn } from "@/lib/utils";

interface ShopHeroProps {
  eyebrow: string;
  title: string;
  accentWord?: string;
  accent: string;
  subtitle: string;
  video?: string;
  videoFit?: "cover" | "contain";
  /** Static full-bleed hero photo — used instead of `video` when set. */
  image?: string;
  stats?: { value: string; label: string }[];
}

export function ShopHero({
  eyebrow,
  title,
  accentWord,
  accent,
  subtitle,
  video,
  videoFit = "cover",
  image,
  stats,
}: ShopHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasMedia = Boolean(video || image);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [video]);

  return (
    <section
      className={cn(
        "relative flex min-h-[68svh] w-full items-center overflow-hidden pt-[4.5rem]",
        hasMedia ? "bg-neutral-950" : "bg-white",
      )}
    >
      {video ? (
        <>
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-hidden
            className={cn(
              "absolute inset-0 h-full w-full",
              videoFit === "contain" ? "object-contain" : "object-cover",
            )}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </>
      ) : image ? (
        <>
          <Image src={image} alt="" fill priority aria-hidden sizes="100vw" className="object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 30% 20%, ${accent}14, transparent 60%), #ffffff`,
          }}
        />
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-[90rem] px-6 py-16 lg:px-10"
      >
        {eyebrow && (
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: accent }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          variants={fadeUp}
          className={cn(
            "mt-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]",
            hasMedia ? "text-white" : "text-neutral-900",
          )}
        >
          {title}
          {accentWord && (
            <>
              {" "}
              <span style={{ color: accent }}>{accentWord}</span>
            </>
          )}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className={cn(
            "mt-5 max-w-xl text-base leading-relaxed lg:text-lg",
            hasMedia ? "text-white/60" : "text-neutral-500",
          )}
        >
          {subtitle}
        </motion.p>

        {stats && stats.length > 0 && (
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((s) => (
              <p
                key={s.label}
                className={cn(
                  "font-display text-2xl font-bold lg:text-3xl",
                  hasMedia ? "text-white" : "text-neutral-900",
                )}
              >
                <StatCounter value={s.value} />
              </p>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
