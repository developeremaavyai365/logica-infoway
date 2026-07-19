"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { KANVA_ACCENTS, KANVA_STORY } from "@/lib/kanva";
import { BlurTextHeading, GradientShimmer } from "@/components/kanva/KanvaTextEffects";
import { LogoWall } from "@/components/ui/LogoBadge";
import { ParallaxLayer } from "@/components/kanva/ParallaxLayer";

/** Deeper legacy narrative, lower on the page — real facts only, no invented milestones. */
export function KanvaStorySection() {
  return (
    <section className="relative overflow-hidden border-t border-neutral-200 bg-white px-6 py-24 lg:px-10 lg:py-32">
      <ParallaxLayer speed={0.55} scaleDepth>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 45% at 15% 100%, ${KANVA_ACCENTS.gold}0d, transparent 60%)`,
          }}
        />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto max-w-[90rem]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20"
        >
          <motion.div variants={fadeUp} className="relative">
            {/* Decorative founding-year numeral — real fact (1995), purely visual weight. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-10 select-none font-display text-[7rem] font-bold leading-none text-neutral-900/[0.04] lg:-top-14 lg:text-[10rem]"
            >
              1995
            </span>

            <p className="relative text-[11px] font-semibold uppercase tracking-[0.28em]">
              <GradientShimmer text={KANVA_STORY.eyebrow} from={KANVA_ACCENTS.gold} to={KANVA_ACCENTS.sky} />
            </p>
            <BlurTextHeading
              text={KANVA_STORY.title}
              className="relative mt-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
              color={KANVA_ACCENTS.gold}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="space-y-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] lg:p-8"
          >
            {KANVA_STORY.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-neutral-700 lg:text-lg">
                {p}
              </p>
            ))}
          </motion.div>
        </motion.div>

        {/* Trust wall — deliberately full-width and large; this is the section's
           credibility proof for investors, not a footnote. */}
        <div className="mt-16 space-y-12 lg:mt-20">
          <LogoWall label="Trusted by" items={KANVA_STORY.clients} />
          <LogoWall label="Recognized by" items={KANVA_STORY.awards} />
        </div>
      </div>
    </section>
  );
}
