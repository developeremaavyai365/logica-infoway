"use client";

import { useCountUp } from "@/lib/useCountUp";

/** Splits "30+ yrs", "₹500+", "10K+", "8" into prefix/number/suffix. */
const STAT_PATTERN = /^(\D*)([\d,]*\d(?:\.\d+)?)(.*)$/;

export interface StatCounterProps {
  /** Pre-formatted stat string, e.g. "30+ yrs", "₹500+", "8". */
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Renders a stat value, animating the numeric portion as a count-up from 0
 * the first time it scrolls into view (once, no loop). Falls back to plain
 * static text when the value has no numeric part (e.g. "Corp & Govt").
 */
export function StatCounter({ value, duration, className }: StatCounterProps) {
  const match = value.match(STAT_PATTERN);

  if (!match || !match[2]) {
    return <span className={className}>{value}</span>;
  }

  const [, prefix, numRaw, suffix] = match;
  const numeric = parseFloat(numRaw.replace(/,/g, ""));
  const decimals = numRaw.includes(".") ? numRaw.split(".")[1].length : 0;

  const { ref, display } = useCountUp<HTMLSpanElement>({ end: numeric, duration, decimals });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
