"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { KANVA_TRUST_STRIP } from "@/lib/kanva";
import { StatCounter } from "@/components/ui/StatCounter";

/** Slim, glanceable stat strip directly under the hero — no long copy. */
export function KanvaTrustStrip() {
  return (
    <section className="relative border-y border-neutral-200 bg-neutral-50">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto grid max-w-[90rem] grid-cols-2 gap-x-6 gap-y-6 px-6 py-8 lg:grid-cols-4 lg:gap-x-10 lg:px-10 lg:py-10"
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
