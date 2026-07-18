"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LuArrowRight, LuPlay } from "react-icons/lu";
import type { KanvaFilmSegment } from "@/lib/kanva";
import { useIsTouchDevice } from "@/lib/device";
import { StatCounter } from "@/components/ui/StatCounter";
import { LogoWall } from "@/components/ui/LogoBadge";
import { cn } from "@/lib/utils";

export function KanvaFilmSection({ segment }: { segment: KanvaFilmSegment }) {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isTouch = useIsTouchDevice();
  const [tapped, setTapped] = useState(false);
  const {
    video,
    backgroundVideo,
    backgroundVideoFit = "cover",
    tag,
    line1,
    line2,
    accent,
    cta,
    ariaLabel,
    videoFit = "cover",
    stats,
    brandLogos,
  } = segment;

  // On touch devices, hold off autoplay until the visitor taps — avoids
  // multiple simultaneously-decoding videos burning mobile data/battery.
  const gateAutoplay = isTouch && !tapped;

  useEffect(() => {
    const fg = videoRef.current;
    const bg = bgVideoRef.current;
    const target = fg ?? bg;
    if (!target || !video || gateAutoplay) return;

    const playAll = () => {
      bg?.play().catch(() => {});
      fg?.play().catch(() => {});
    };

    const pauseAll = () => {
      bg?.pause();
      fg?.pause();
    };

    playAll();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playAll();
        else pauseAll();
      },
      { threshold: 0.2 },
    );
    observer.observe(target);

    const onVisible2 = () => {
      if (document.visibilityState === "visible") playAll();
    };

    document.addEventListener("visibilitychange", onVisible2);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisible2);
    };
  }, [video, backgroundVideo, gateAutoplay]);

  return (
    <section
      aria-label={ariaLabel}
      className="relative h-[100svh] min-h-[32rem] w-full overflow-hidden bg-neutral-950"
    >
      {backgroundVideo && (
        <video
          ref={bgVideoRef}
          src={backgroundVideo}
          muted
          loop
          playsInline
          autoPlay={!gateAutoplay}
          preload="metadata"
          className={cn(
            "absolute inset-0 h-full w-full",
            backgroundVideoFit === "contain"
              ? "object-contain object-center"
              : "object-cover",
          )}
        />
      )}
      {video ? (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          autoPlay={!gateAutoplay}
          preload="metadata"
          className={cn(
            "absolute inset-0 h-full w-full",
            videoFit === "contain" ? "object-contain object-center" : "object-cover",
          )}
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 30% 20%, ${accent}22, transparent 60%), #050507`,
          }}
        />
      )}

      {video && gateAutoplay && (
        <button
          type="button"
          onClick={() => setTapped(true)}
          aria-label={`Play — ${ariaLabel}`}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm ring-1 ring-white/30"
            style={{ color: accent }}
          >
            <LuPlay className="h-6 w-6 translate-x-0.5" fill="currentColor" />
          </span>
        </button>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

      <div className="relative z-10 mx-auto flex h-full max-w-[90rem] flex-col justify-end px-6 pb-14 pt-28 lg:justify-center lg:px-10 lg:pb-20 lg:pt-32">
        <div className="max-w-3xl">
          {tag && (
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: accent }}
            >
              {tag}
            </p>
          )}

          <h2 className={cn("font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white", tag ? "mt-4" : "")}>
            {line1}
            <br />
            <span style={{ color: accent }}>{line2}</span>
          </h2>

          <Link
            href={cta.href}
            className="group/cta relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_12px_40px_var(--cta-glow)] active:scale-[0.98]"
            style={{ backgroundColor: accent, ["--cta-glow" as string]: `${accent}80` }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-full" />
            <span className="relative">{cta.label}</span>
            <LuArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
          </Link>

          {stats && stats.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-white lg:text-3xl">
                    <StatCounter value={s.value} />
                  </p>
                  <p className="mt-1 max-w-[11rem] text-xs leading-snug text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {brandLogos && brandLogos.length > 0 && (
            <div className="mt-10 max-w-xl border-t border-white/10 pt-8">
              <LogoWall items={brandLogos} caption="and many more brands" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
