"use client";

import { motion } from "framer-motion";
import { KANVA_ACCENTS, KANVA_PHILOSOPHY } from "@/lib/kanva";
import { ParallaxLayer } from "@/components/kanva/ParallaxLayer";

/** "Why Logica Infoway" section — one unified flowing block of copy, no
 *  cards/dividers/boxes separating the individual points. The heading
 *  replays its typewriter reveal every time it scrolls into view (not just
 *  once), per explicit feedback — everything else stays a plain,
 *  non-animated block. */
export function KanvaPhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-10 lg:py-28">
      <ParallaxLayer speed={0.5} scaleDepth>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${KANVA_ACCENTS.mint}0d, transparent 60%)`,
          }}
        />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em]">
          <motion.span
            className="relative inline-block"
            style={{ color: KANVA_ACCENTS.mint }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: false, amount: 0.1, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          >
            Built on trust, not just transactions
            <motion.span
              aria-hidden
              className="absolute right-0 top-[0.08em] bottom-[0.08em] w-[3px]"
              style={{ background: "currentColor" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 1, 0, 0, 1, 1, 0] }}
              viewport={{ once: false, amount: 0.1, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.7, delay: 1.1, repeat: Infinity, ease: "linear" }}
            />
          </motion.span>
        </h2>

        <div className="mt-10 space-y-6 text-left">
          {KANVA_PHILOSOPHY.map((pillar) => (
            <p key={pillar.id} className="text-base leading-relaxed text-neutral-600 lg:text-lg">
              <span className="font-display font-semibold" style={{ color: pillar.accent }}>
                {pillar.title}.
              </span>{" "}
              {pillar.copy}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
