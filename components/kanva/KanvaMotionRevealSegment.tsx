"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MOTION_SRC = "/motion-reveal/index.html";

interface KanvaMotionRevealSegmentProps {
  /** Hero placement loads immediately; inline defers until near viewport. */
  priority?: "hero" | "inline";
}

function ensureBackgroundVideoLoops(doc: Document) {
  const video = doc.querySelector<HTMLVideoElement>("[data-bgvid], video");
  if (!video) return false;

  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.play().catch(() => {});
  return true;
}

/** Full-screen Logica motion reveal (bundled cinematic sequence). */
export function KanvaMotionRevealSegment({
  priority = "inline",
}: KanvaMotionRevealSegmentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const retryRef = useRef<number | null>(null);
  const isHero = priority === "hero";
  const [iframeSrc, setIframeSrc] = useState<string | undefined>(
    isHero ? undefined : undefined,
  );

  // Defer the heavy 20MB bundle so the page shell paints first.
  useEffect(() => {
    if (!isHero) return;

    const id = window.setTimeout(() => {
      setIframeSrc(MOTION_SRC);
    }, 150);

    return () => window.clearTimeout(id);
  }, [isHero]);

  useEffect(() => {
    if (isHero) return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIframeSrc(MOTION_SRC);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isHero]);

  const handleIframeLoad = () => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;

    if (retryRef.current) window.clearInterval(retryRef.current);

    let attempts = 0;
    retryRef.current = window.setInterval(() => {
      attempts += 1;
      if (ensureBackgroundVideoLoops(doc) || attempts >= 30) {
        if (retryRef.current) window.clearInterval(retryRef.current);
        retryRef.current = null;
      }
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (retryRef.current) window.clearInterval(retryRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Logica Motion Reveal"
      className="relative h-[100svh] min-h-[32rem] w-full overflow-hidden bg-neutral-950"
    >
      {iframeSrc ? (
        <iframe
          ref={iframeRef}
          title="Logica Motion Reveal"
          src={iframeSrc}
          onLoad={handleIframeLoad}
          className={cn("absolute inset-0 h-full w-full border-0")}
          loading={isHero ? "eager" : "lazy"}
          allow="autoplay"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-950" aria-hidden />
      )}
    </section>
  );
}
