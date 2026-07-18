"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LuArrowRight, LuVolume2, LuVolumeX, LuPlay, LuPause } from "react-icons/lu";
import { SHOWCASE_CATEGORIES } from "@/lib/showcase";
import Magnet from "@/components/reactbits/Magnet";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";

/**
 * Full-screen brand film that showcases Logica's product categories.
 *
 * Drop your video at:  public/videos/logica-showcase.mp4
 * (optional poster):   public/videos/logica-showcase.jpg
 *
 * If the file is missing, the section still looks intentional: the animated
 * brand gradient + overlay content act as a graceful fallback.
 */

const VIDEO_SRC = "/videos/logica-showcase.mp4";
const POSTER_SRC = "/videos/logica-showcase.jpg";

const line = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function CategoryMarquee() {
  const items = SHOWCASE_CATEGORIES.map((c) => c.title);
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <motion.div
        className="flex shrink-0 items-center gap-8 pr-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-white/60">{t}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  // Pause when scrolled out of view (perf + battery).
  useEffect(() => {
    const v = videoRef.current;
    const s = sectionRef.current;
    if (!v || !s) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(s);
    return () => io.disconnect();
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Logica product showcase film"
      className="relative h-screen w-full overflow-hidden bg-neutral-950"
    >
      {/* animated brand gradient — fallback + backdrop behind the video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 70% 20%, rgba(56,189,248,0.28) 0%, transparent 55%), radial-gradient(120% 120% at 20% 90%, rgba(34,197,94,0.28) 0%, transparent 55%), linear-gradient(120deg,#04140f 0%,#061a2e 55%,#0b1020 100%)",
        }}
      />

      {/* the film */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={POSTER_SRC}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* cinematic overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

      {/* content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[100rem] flex-col justify-end px-6 pb-16 lg:px-16 lg:pb-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-3xl"
        >
          <motion.div variants={line} className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-white/40" />
            <ShinyText
              text="LOGICA INFOWAY"
              speed={4}
              spread={90}
              color="rgba(255,255,255,0.7)"
              shineColor="#38bdf8"
              className="text-xs font-semibold tracking-[0.34em]"
            />
          </motion.div>

          <BlurText
            text="Every device your business needs, delivered."
            animateBy="words"
            direction="top"
            delay={70}
            stepDuration={0.4}
            className="font-display text-[clamp(2.25rem,5.5vw,4.75rem)] font-bold leading-[1.02] tracking-tight text-white [text-wrap:balance]"
          />

          <motion.p variants={line} className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Laptops, phones, printers, networking and enterprise IT — sourced, configured and
            supported across India. One partner, trusted since 1995.
          </motion.p>

          <motion.div variants={line} className="mt-8 flex flex-wrap items-center gap-4">
            <Magnet padding={70} magnetStrength={4}>
              <a
                href="/shop"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-neutral-900 shadow-lg transition-shadow hover:shadow-xl"
              >
                Explore Products
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnet>
            <a
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Talk to Sales
            </a>
          </motion.div>
        </motion.div>

        {/* category marquee */}
        <motion.div variants={line} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">
          <CategoryMarquee />
        </motion.div>
      </div>

      {/* controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 lg:bottom-8 lg:right-8">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur transition-colors hover:bg-white/10"
        >
          {playing ? <LuPause className="h-4 w-4" /> : <LuPlay className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur transition-colors hover:bg-white/10"
        >
          {muted ? <LuVolumeX className="h-4 w-4" /> : <LuVolume2 className="h-4 w-4" />}
        </button>
      </div>
    </section>
  );
}
