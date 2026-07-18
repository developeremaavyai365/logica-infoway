"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { KANVA_HERO_SLIDES } from "@/lib/kanva";

const INTERVAL = 5500;
const CROSSFADE = 1;

export function KanvaHero() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % KANVA_HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index]);

  useEffect(() => {
    const resume = () => {
      const active = videoRefs.current[index];
      if (active?.paused) active.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", resume);
    return () => document.removeEventListener("visibilitychange", resume);
  }, [index]);

  useEffect(() => {
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section
      aria-label="Logica product showcase film"
      className="relative h-[100svh] min-h-[32rem] w-full overflow-hidden bg-neutral-950"
    >
      {/* Each slide = one video + one headline, kept in sync by shared index */}
      {KANVA_HERO_SLIDES.map((slide, i) => {
        const isActive = i === index;

        return (
          <motion.div
            key={slide.id}
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: CROSSFADE, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 ${isActive ? "z-10" : "z-0 pointer-events-none"}`}
            aria-hidden={!isActive}
          >
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full object-cover"
              src={slide.video}
              muted
              loop
              playsInline
              preload={isActive ? "auto" : "metadata"}
              onLoadedData={(e) => {
                if (isActive) e.currentTarget.play().catch(() => {});
              }}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

            <div className="relative z-10 mx-auto flex h-full max-w-[90rem] flex-col justify-end px-6 pb-14 pt-28 lg:justify-center lg:px-10 lg:pb-20 lg:pt-32">
              <motion.div
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 24,
                }}
                transition={{ duration: CROSSFADE, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                  {slide.line1}
                  <br />
                  <span style={{ color: slide.accent }}>{slide.line2}</span>
                </h1>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
