"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";
import laptopFront from "@/public/products/laptop-front.png";

/* The 3D scene can't be server-rendered (WebGL is client-only), so load it
   lazily on the client with a lightweight skeleton while it initializes. */
const DeviceScene = dynamic(() => import("@/components/hero/DeviceScene"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

function SceneSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-56 w-56 animate-pulse rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}

/* ---------- Desktop: pinned, scroll-driven 3D choreography ---------- */
function DesktopHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  // The 3D rig reads scroll progress every frame via this ref (avoids
  // re-rendering React on scroll — the animation lives entirely in the canvas).
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  // Text beats — tied to the same scroll timeline as the rig.
  const beat1 = useTransform(scrollYProgress, [0, 0.14, 0.24, 0.32], [1, 1, 0.3, 0]);
  const beat1Y = useTransform(scrollYProgress, [0, 0.3], [0, -24]);
  const beat2 = useTransform(scrollYProgress, [0.3, 0.4, 0.52, 0.62], [0, 1, 1, 0]);
  const beat2Y = useTransform(scrollYProgress, [0.3, 0.62], [24, -24]);
  const beat3 = useTransform(scrollYProgress, [0.62, 0.74, 1], [0, 1, 1]);
  const beat3Y = useTransform(scrollYProgress, [0.62, 0.78], [24, 0]);

  return (
    <section ref={wrapRef} className="relative h-[280vh]">
      {/* Full-viewport sticky stage. Text zones are inset to clear the fixed
          Header + BrowseBar (~7.5rem) at the top. */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ambient brand glow */}
        <div className="pointer-events-none absolute inset-0 bg-brand-radial" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

        {/* real 3D devices */}
        <div className="absolute inset-0">
          <DeviceScene progressRef={progressRef} />
        </div>

        {/* Beat 1 — headline (top, clear of the fixed chrome) */}
        <motion.div
          style={{ opacity: beat1, y: beat1Y }}
          className="pointer-events-none absolute inset-x-0 top-[9.5rem] z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center drop-shadow-[0_2px_24px_hsl(var(--background))]"
        >
          <h1 className="font-display text-display-xl font-bold tracking-tight text-foreground [text-wrap:balance]">
            Powerful laptops, <span className="text-gradient">honest prices.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Enterprise-grade IT, delivered across India. Trusted by government and corporates since 1995.
          </p>
        </motion.div>

        {/* Beat 2 — phone (top) */}
        <motion.div
          style={{ opacity: beat2, y: beat2Y }}
          className="pointer-events-none absolute inset-x-0 top-[9.5rem] z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center drop-shadow-[0_2px_24px_hsl(var(--background))]"
        >
          <h2 className="font-display text-display-lg font-bold tracking-tight text-foreground [text-wrap:balance]">
            Now in your <span className="text-gradient">hand.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground sm:text-xl">
            The latest 5G smartphones — compare and shop the full lineup.
          </p>
        </motion.div>

        {/* Beat 3 — final CTA (bottom, clear of the device cluster) */}
        <motion.div
          style={{ opacity: beat3, y: beat3Y }}
          className="pointer-events-auto absolute inset-x-0 bottom-12 z-20 mx-auto flex max-w-2xl flex-col items-center px-6 text-center drop-shadow-[0_2px_24px_hsl(var(--background))]"
        >
          <h2 className="font-display text-display-lg font-bold tracking-tight text-foreground [text-wrap:balance]">
            One store. <span className="text-gradient">Every device.</span>
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground sm:text-lg">
            Laptops, phones, tablets and more — one trusted store since 1995.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" href="/shop" rightIcon={<LuArrowRight />}>Shop the Range</Button>
            <Button size="lg" variant="outline" href="/shop/deals">Explore Deals</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Mobile / reduced-motion: lightweight stacked hero ---------- */
function MobileHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-brand-radial" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-xl px-4 py-14 text-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.h1 variants={fadeUp} className="font-display text-display-md text-foreground">
            Powerful laptops, <span className="text-gradient">honest prices.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-sm text-muted-foreground">
            Enterprise-grade IT, delivered across India. Trusted since 1995.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6">
            <Image
              src={laptopFront}
              alt="ASUS VivoBook laptop"
              priority
              className="mx-auto w-72 drop-shadow-2xl"
            />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3">
            <Button size="lg" href="/shop/laptops" rightIcon={<LuArrowRight />} fullWidth>
              Shop Laptops
            </Button>
            <Button size="lg" variant="outline" href="/shop/deals" fullWidth>
              Today&apos;s Deals
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function Hero() {
  // `undefined` until measured so we never flash the wrong hero on first paint.
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setDesktop(mq.matches && !reduced.matches);
    update();
    mq.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  // Render the mobile hero as the SSR/first-paint default (cheap, no WebGL).
  if (desktop === null) return <MobileHero />;
  return desktop ? <DesktopHero /> : <MobileHero />;
}
