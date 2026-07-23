"use client";

import Image from "next/image";
import { KANVA_ACCENTS, KANVA_PHILOSOPHY } from "@/lib/kanva";

/** Explosive hover heading — a dual radial-gradient burst fires outward
 *  behind the text on hover (see .explosive-text in globals.css), replacing
 *  the earlier scroll-triggered typewriter reveal with a pointer-driven one. */
function ExplosiveHeading({ text, color }: { text: string; color: string }) {
  return (
    <span className="explosive-text" style={{ color }}>
      {text}
    </span>
  );
}

/** "Why Logica Infoway" section — one unified flowing block of copy, no
 *  cards/dividers/boxes separating the individual points. The heading bursts
 *  on hover instead of animating on scroll; everything else stays a plain,
 *  non-animated block. */
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
      {/* Light wash keeps the photo visible while giving the text enough contrast */}
      <div className="absolute inset-0 bg-white/85" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em]">
          <ExplosiveHeading text="Built on trust, not just transactions" color={KANVA_ACCENTS.mint} />
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
