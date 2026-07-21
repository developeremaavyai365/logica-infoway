"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight, LuPhone } from "react-icons/lu";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { KANVA_ACCENTS, KANVA_CLOSING_CTA } from "@/lib/kanva";
import { BlurTextHeading, GradientShimmer } from "@/components/kanva/KanvaTextEffects";
import { ParallaxLayer } from "@/components/kanva/ParallaxLayer";

/** Final conversion moment before the footer — real /shop path + published order line. */
export function KanvaClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-neutral-200 bg-violet-50/50 px-6 py-24 text-center lg:py-32">
      <ParallaxLayer speed={0.55} scaleDepth>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 100%, ${KANVA_ACCENTS.violet}0d, transparent 65%)`,
          }}
        />
      </ParallaxLayer>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative z-10 mx-auto max-w-2xl"
      >
        <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.28em]">
          <GradientShimmer text={KANVA_CLOSING_CTA.eyebrow} from={KANVA_ACCENTS.gold} to={KANVA_ACCENTS.peach} />
        </motion.p>
        <BlurTextHeading
          text={KANVA_CLOSING_CTA.title}
          className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
          color={KANVA_ACCENTS.violet}
        />
        <motion.p variants={fadeUp} className="mt-4 text-base text-neutral-500 lg:text-lg">
          {KANVA_CLOSING_CTA.subtitle}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={KANVA_CLOSING_CTA.primaryCta.href}
            className="inline-flex items-center gap-2.5 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            {KANVA_CLOSING_CTA.primaryCta.label}
            <LuArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={KANVA_CLOSING_CTA.phoneHref}
            className="inline-flex items-center gap-2.5 rounded-full border border-neutral-300 px-7 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-400"
          >
            <LuPhone className="h-4 w-4" />
            {KANVA_CLOSING_CTA.phoneLabel}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
