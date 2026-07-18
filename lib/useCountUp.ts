"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  /** Final value to count up to. */
  end: number;
  /** Total animation length in ms. Defaults to 1800 (within the 1.5–2s target). */
  duration?: number;
  /** Decimal places to keep in the formatted output. */
  decimals?: number;
}

/** Ease-out cubic — fast start, settles into the final value. */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Counts a number up from 0 to `end`, once, the first time the attached
 * element scrolls into view. Uses IntersectionObserver + requestAnimationFrame
 * (no setInterval, no polling). Skips straight to the final value if the
 * visitor prefers reduced motion, or never re-triggers once it has run.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>({
  end,
  duration = 1800,
  decimals = 0,
}: UseCountUpOptions) {
  const ref = useRef<T | null>(null);
  const startedRef = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || startedRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      startedRef.current = true;
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        const startTime = performance.now();
        let raf: number;

        const tick = (now: number) => {
          const t = Math.min((now - startTime) / duration, 1);
          setValue(end * easeOutCubic(t));
          if (t < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setValue(end);
          }
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      // Generous threshold/margin so it reliably fires on short mobile viewports too.
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-IN");

  return { ref, display };
}
