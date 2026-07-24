"use client";

import Image from "next/image";
import { KANVA_ACCENTS, KANVA_PHILOSOPHY } from "@/lib/kanva";

/** Rotating heading — cycles through the company's real value pillars (one
 *  at a time, dropping in and tumbling away) instead of a single static
 *  line. Each phrase is real copy already defined in KANVA_PHILOSOPHY, just
 *  no longer also spelled out as body paragraphs below. */
const ROTATING_HEADINGS = [
  { text: "Built on trust, not just transactions", color: KANVA_ACCENTS.mint },
  ...KANVA_PHILOSOPHY.map((pillar) => ({ text: pillar.title, color: pillar.accent })),
];

function DroppingHeading() {
  return (
    <span className="dropping-heading">
      {ROTATING_HEADINGS.map((item, i) => (
        <span
          key={item.text}
          className={i === ROTATING_HEADINGS.length - 1 ? "dropping-heading-finale" : undefined}
          style={{ color: item.color, animationDelay: `${i * 3}s` }}
        >
          {item.text}
        </span>
      ))}
    </span>
  );
}

/** "Why Logica Infoway" section — just the rotating headline over the real
 *  payment photo background; the supporting copy now lives only in the
 *  heading rotation, not as separate body paragraphs. */
export function KanvaPhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-10 lg:py-28">
      <Image
        src="/images/philosophy-bg-payment.jpg"
        alt=""
        fill
        aria-hidden
        sizes="100vw"
        className="object-cover object-top"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em]">
          <DroppingHeading />
        </h2>
      </div>
    </section>
  );
}
