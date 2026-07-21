"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { KANVA_ACCENTS, KANVA_TRUST_STRIP } from "@/lib/kanva";
import { StatCounter } from "@/components/ui/StatCounter";
import { ParallaxLayer } from "@/components/kanva/ParallaxLayer";

/** Slim, glanceable stat strip directly under the hero — no long copy. */
export function KanvaTrustStrip() {
  return (
    <section className="relative overflow-hidden border-y border-neutral-200 bg-cyan-50/60">
      <ParallaxLayer speed={0.4}>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 50%, ${KANVA_ACCENTS.mint}08, transparent 70%)`,
          }}
        />
      </ParallaxLayer>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative z-10 mx-auto grid max-w-[90rem] grid-cols-2 gap-x-6 gap-y-6 px-6 py-8 lg:grid-cols-4 lg:gap-x-10 lg:px-10 lg:py-10"
      >
        {KANVA_TRUST_STRIP.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp} className="text-center lg:text-left">
            <p className="font-display text-2xl font-bold text-neutral-900 lg:text-3xl">
              <StatCounter value={stat.value} />
            </p>
            <p className="mt-1 text-xs text-neutral-500 lg:text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
