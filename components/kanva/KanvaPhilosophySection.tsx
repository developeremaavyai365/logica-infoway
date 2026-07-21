"use client";

import { useEffect, useRef, useState } from "react";
import { KANVA_ACCENTS, KANVA_PHILOSOPHY } from "@/lib/kanva";
import { ParallaxLayer } from "@/components/kanva/ParallaxLayer";
import { cn } from "@/lib/utils";

/** Typewriter-style clip reveal for the heading, driven by a plain
 *  IntersectionObserver + CSS transition instead of Framer Motion's
 *  whileInView — that route silently failed to fire even with the element
 *  fully inside the viewport. This is directly debuggable and replays every
 *  time the heading scrolls in or out of view. */
function TypeRevealHeading({ text, color }: { text: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={cn(
        "relative inline-block transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
        inView ? "[clip-path:inset(0_0%_0_0)]" : "[clip-path:inset(0_100%_0_0)]",
      )}
      style={{ color }}
    >
      {text}
      <span
        aria-hidden
        className={cn(
          "absolute right-0 top-[0.08em] bottom-[0.08em] w-[3px] transition-opacity duration-300",
          inView ? "animate-pulse opacity-100" : "opacity-0",
        )}
        style={{ background: "currentColor" }}
      />
    </span>
  );
}

/** "Why Logica Infoway" section — one unified flowing block of copy, no
 *  cards/dividers/boxes separating the individual points. The heading
 *  replays its typewriter reveal every time it scrolls into view (not just
 *  once), per explicit feedback — everything else stays a plain,
 *  non-animated block. */
export function KanvaPhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-10 lg:py-28">
      <ParallaxLayer speed={0.35} scaleDepth>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/philosophy-bg.jpg)" }}
        />
      </ParallaxLayer>
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
          <TypeRevealHeading text="Built on trust, not just transactions" color={KANVA_ACCENTS.mint} />
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
