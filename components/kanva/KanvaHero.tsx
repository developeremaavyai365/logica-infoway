"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { KANVA_HERO_SLIDES } from "@/lib/kanva";
import { ParallaxLayer } from "@/components/kanva/ParallaxLayer";

const INTERVAL = 5500;
const CROSSFADE = 1;

/**
 * Pinned scroll-reveal hero — adapted from a classic "movie poster" pin/step
 * scrollytelling pattern (fixed panel, content cross-fades in as you scroll
 * through it) into Framer Motion scroll progress instead of jQuery classes.
 * Scoped to the hero only, not the rest of the homepage: the section reserves
 * extra scroll height, pins its content for that stretch via `sticky`, then
 * releases into normal document flow for every section below. Existing
 * slide-rotation/video-crossfade behavior is untouched — this only adds a
 * scroll-driven reveal of the tag, headline, and CTA on top of it.
 */
export function KanvaHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const filmScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1]);
  const tagOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const tagY = useTransform(scrollYProgress, [0, 0.12], [16, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const headlineScale = useTransform(scrollYProgress, [0.15, 0.4], [1.3, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.5, 0.7], [24, 0]);

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
      ref={sectionRef}
      aria-label="Logica product showcase film"
      className="relative h-[280vh] w-full bg-neutral-950"
    >
      <div className="sticky top-0 h-[100svh] min-h-[32rem] w-full overflow-hidden">
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
              <motion.video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                style={{ scale: filmScale }}
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
              <ParallaxLayer speed={0.35}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
              </ParallaxLayer>

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
                  <motion.p
                    style={{ opacity: tagOpacity, y: tagY }}
                    className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70"
                  >
                    {slide.tag}
                  </motion.p>
                  <motion.h1
                    style={{ opacity: headlineOpacity, scale: headlineScale }}
                    className="mt-3 origin-left font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white"
                  >
                    {slide.line1}
                    <br />
                    <span style={{ color: slide.accent }}>{slide.line2}</span>
                  </motion.h1>
                  <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-8">
                    <Link
                      href={slide.cta.href}
                      className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.03]"
                      style={{ backgroundColor: slide.accent }}
                    >
                      {slide.cta.label}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
