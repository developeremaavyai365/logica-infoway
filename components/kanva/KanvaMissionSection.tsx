"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { KANVA_ACCENTS, KANVA_MISSION } from "@/lib/kanva";

/** Quiet mid-page breather — deliberate pause after the product showcase.
 *  Copy is the company's real published philosophy statement (Careers page). */
export function KanvaMissionSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-28 lg:py-40">
      <video
        src="/videos/mission-bg.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark wash keeps the video visible while giving the text enough contrast */}
      <div className="absolute inset-0 bg-neutral-950/70" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-[11px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: KANVA_ACCENTS.sky }}
        >
          {KANVA_MISSION.eyebrow}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="masked-heading mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
          style={{ "--mask-image": "url(/images/showcase-computing-bg.png)" } as React.CSSProperties}
        >
          {KANVA_MISSION.title}
        </motion.h2>
        <div className="mt-8 space-y-5">
          {KANVA_MISSION.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-base leading-relaxed text-white/80 lg:text-lg"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
