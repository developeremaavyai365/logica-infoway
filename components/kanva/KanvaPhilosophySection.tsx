"use client";

import Image from "next/image";
import { KANVA_ACCENTS } from "@/lib/kanva";

/** "Why Logica Infoway" section — just the headline over the real payment
 *  photo background, no hover/rotation effect. */
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
        <h2
          className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em]"
          style={{ color: KANVA_ACCENTS.mint }}
        >
          Built on trust, not just transactions
        </h2>
      </div>
    </section>
  );
}
