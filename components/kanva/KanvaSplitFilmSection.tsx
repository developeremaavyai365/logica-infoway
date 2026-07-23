"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LuArrowRight, LuPlay } from "react-icons/lu";
import type { KanvaFilmSegment } from "@/lib/kanva";
import { useIsTouchDevice } from "@/lib/device";
import { LogoWall } from "@/components/ui/LogoBadge";
import { cn } from "@/lib/utils";

/**
 * Split-screen variant of KanvaFilmSection — copy sits on a plain white half,
 * the segment's video fills the other half full-bleed, with a soft white
 * fade at the seam so the two halves read as one connected layout.
 */
export function KanvaSplitFilmSection({ segment }: { segment: KanvaFilmSegment }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isTouch = useIsTouchDevice();
  const [tapped, setTapped] = useState(false);
  const { video, tag, line1, line2, accent, cta, ariaLabel, videoFit = "contain", brandLogos } = segment;

  const gateAutoplay = isTouch && !tapped;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video || gateAutoplay) return;

    el.play().catch(() => {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);

    const onVisible = () => {
      if (document.visibilityState === "visible") el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [video, gateAutoplay]);

  return (
    <section aria-label={ariaLabel} className="relative grid w-full grid-cols-1 bg-white lg:grid-cols-2">
      {/* Left — plain white half, copy, expanded to fill the column */}
      <div className="relative flex min-h-[28rem] flex-col justify-center bg-white px-6 py-20 sm:px-10 lg:min-h-[100svh] lg:px-16 xl:px-20">
        <div className="max-w-xl">
          {tag && (
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: accent }}
            >
              {tag}
            </p>
          )}

          <h2
            className={cn(
              "font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-900",
              tag ? "mt-4" : "",
            )}
          >
            {line1}
            <br />
            <span style={{ color: accent }}>{line2}</span>
          </h2>

          <Link
            href={cta.href}
            className="btn-liquid group/cta relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_12px_40px_var(--cta-glow)] active:scale-[0.98]"
            style={
              {
                backgroundColor: accent,
                ["--cta-glow" as string]: `${accent}80`,
                "--liquid": "#0a0a0a",
                "--liquid-ink": "#fff",
              } as React.CSSProperties
            }
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-full" />
            <span className="relative">{cta.label}</span>
            <LuArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
          </Link>

          {brandLogos && brandLogos.length > 0 && (
            <div className="mt-10 border-t border-neutral-200 pt-8">
              <LogoWall items={brandLogos} caption="and many more brands" />
            </div>
          )}
        </div>
      </div>

      {/* Right — video half. A soft white fade on the seam edge sinks it
         into the left panel instead of a hard vertical line. */}
      <div className="relative min-h-[22rem] overflow-hidden bg-neutral-100 lg:min-h-[100svh]">
        {video && (
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
              videoFit === "cover" ? "object-cover" : "object-contain",
            )}
          />
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-white to-transparent lg:block lg:w-32"
        />

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
      </div>
    </section>
  );
}
