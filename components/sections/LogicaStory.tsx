"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  ShopMockup,
  CatalogPanel,
  TimelineCollage,
  FlowDiagram,
  FleetTree,
} from "@/components/story/StoryMockups";
import { FloatingTags, TeamTags } from "@/components/story/StoryCursors";
import logoSm from "@/public/logo-sm.png";

const SCENES = 9;
const TOTAL_VH = SCENES * 100;

/** Opacity-style scene window: fade in → hold → fade out. */
function useSceneOpacity(p: MotionValue<number>, a: number, b: number, fade = 0.05) {
  return useTransform(p, [a - fade, a, b - fade, b], [0, 1, 1, 0]);
}

function Headline({ children, opacity, y }: { children: React.ReactNode; opacity: MotionValue<number>; y?: MotionValue<number> }) {
  return (
    <motion.h2
      style={{ opacity, y }}
      className="mx-auto max-w-4xl text-center font-display text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-neutral-900 [text-wrap:balance]"
    >
      {children}
    </motion.h2>
  );
}

function StoryChrome() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex items-center justify-end px-8 py-6 lg:px-12">
      <a
        href="/contact"
        className="pointer-events-auto rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
      >
        Talk to sales
      </a>
    </div>
  );
}

const CLIENTS = ["Dell", "HP", "Lenovo", "ASUS", "Cisco", "Samsung", "Apple", "Microsoft"];

export function LogicaStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Scene windows (0–1 scroll progress)
  const s0 = useSceneOpacity(scrollYProgress, 0.0, 0.11);
  const s1 = useSceneOpacity(scrollYProgress, 0.09, 0.23);
  const s2 = useSceneOpacity(scrollYProgress, 0.21, 0.35);
  const s3 = useSceneOpacity(scrollYProgress, 0.33, 0.47);
  const s4 = useSceneOpacity(scrollYProgress, 0.45, 0.57);
  const s5 = useSceneOpacity(scrollYProgress, 0.55, 0.67);
  const s6 = useSceneOpacity(scrollYProgress, 0.65, 0.77);
  const s7 = useSceneOpacity(scrollYProgress, 0.75, 0.87);
  const s8 = useSceneOpacity(scrollYProgress, 0.85, 1.0);

  const s1y = useTransform(scrollYProgress, [0.09, 0.18], [60, 0]);
  const mockupY = useTransform(scrollYProgress, [0.12, 0.22], [120, 0]);
  const markScale = useTransform(scrollYProgress, [0.0, 0.08], [0.85, 1]);

  return (
    <section
      ref={ref}
      style={{ height: `${TOTAL_VH}vh` }}
      className="relative bg-[#F5F5F7]"
      aria-label="Logica platform story"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <StoryChrome />

        {/* ── Scene 0: logo mark ── */}
        <motion.div style={{ opacity: s0, scale: markScale }} className="absolute inset-0 flex items-center justify-center">
          <Image src={logoSm} alt="Logica" width={120} height={120} className="drop-shadow-lg" priority />
        </motion.div>

        {/* ── Scene 1: platform + shop UI ── */}
        <motion.div style={{ opacity: s1 }} className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-16">
          <motion.div style={{ y: s1y }}>
            <Headline opacity={s1}>
              One partner for every device
              <br />
              your business needs
            </Headline>
          </motion.div>
          <motion.div style={{ y: mockupY, opacity: s1 }} className="relative mt-10 w-full">
            {/* brand glow behind mockup */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.35)_0%,rgba(56,189,248,0.2)_40%,transparent_70%)] blur-2xl" />
            <div className="relative flex justify-center">
              <ShopMockup />
            </div>
          </motion.div>
        </motion.div>

        {/* ── Scene 2: split — catalog panel + headline ── */}
        <motion.div style={{ opacity: s2 }} className="absolute inset-0 flex items-center px-6 pt-20 lg:px-16">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex justify-center lg:justify-start">
              <CatalogPanel />
            </div>
            <Headline opacity={s2}>
              Source, configure, and deploy enterprise IT at scale
            </Headline>
          </div>
        </motion.div>

        {/* ── Scene 3: timeline collage ── */}
        <motion.div style={{ opacity: s3 }} className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <div className="mb-10 w-full">
            <TimelineCollage />
          </div>
          <Headline opacity={s3}>
            For thirty years, businesses have juggled dozens of vendors
          </Headline>
        </motion.div>

        {/* ── Scene 4: floating category tags ── */}
        <motion.div style={{ opacity: s4 }} className="absolute inset-0 flex items-center justify-center px-6">
          <FloatingTags progress={s4} />
          <Headline opacity={s4}>Not just another supplier</Headline>
        </motion.div>

        {/* ── Scene 5: team collaboration ── */}
        <motion.div style={{ opacity: s5 }} className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <TeamTags progress={s5} />
          <Headline opacity={s5}>
            <span className="text-neutral-400">Time for real</span>
            <br />
            partnership
          </Headline>
          <motion.p style={{ opacity: s5 }} className="mt-6 text-center text-xl font-semibold text-neutral-900">
            Procurement that finally makes sense
          </motion.p>
        </motion.div>

        {/* ── Scene 6: order flow ── */}
        <motion.div style={{ opacity: s6 }} className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <FlowDiagram />
          <div className="mt-8">
            <Headline opacity={s6}>Quote, procure, deploy, and support</Headline>
          </div>
        </motion.div>

        {/* ── Scene 7: fleet intelligence ── */}
        <motion.div style={{ opacity: s7 }} className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <FleetTree />
          <div className="mt-10">
            <Headline opacity={s7}>Sourcing that knows your fleet</Headline>
          </div>
        </motion.div>

        {/* ── Scene 8: final CTA ── */}
        <motion.div style={{ opacity: s8 }} className="absolute inset-0 overflow-hidden">
          {/* gradient backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#38bdf8_35%,#22c55e_65%,#0f172a_100%)]" />

          <div className="relative flex h-full flex-col items-center justify-center px-6">
            {/* portal visual */}
            <div className="relative mb-10 h-40 w-40">
              <div className="absolute inset-0 rounded-3xl bg-neutral-900/20 backdrop-blur-sm" />
              <div className="absolute inset-3 overflow-hidden rounded-full bg-gradient-to-br from-sky-300 to-emerald-400" />
            </div>

            {/* email-style CTA */}
            <div className="flex w-full max-w-md items-center rounded-full bg-white p-1.5 shadow-2xl">
              <input
                type="email"
                readOnly
                placeholder="you@yourcompany.com"
                className="flex-1 bg-transparent px-5 py-3 text-sm text-neutral-600 outline-none"
              />
              <a
                href="/contact"
                className="shrink-0 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white"
              >
                Get started
              </a>
            </div>

            <p className="mt-12 text-sm text-white/70">Trusted by enterprises across India</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-8 opacity-60">
              {CLIENTS.map((c) => (
                <span key={c} className="text-sm font-semibold text-white">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
