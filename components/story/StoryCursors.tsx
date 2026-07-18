"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

const TAGS = [
  { name: "Laptops", color: "#facc15", x: 12, y: 18 },
  { name: "Phones", color: "#fb923c", x: 72, y: 12 },
  { name: "Printers", color: "#f472b6", x: 82, y: 38 },
  { name: "Networking", color: "#38bdf8", x: 18, y: 42 },
  { name: "Monitors", color: "#4ade80", x: 8, y: 68 },
  { name: "Storage", color: "#a78bfa", x: 55, y: 72 },
  { name: "Accessories", color: "#2dd4bf", x: 78, y: 58 },
  { name: "AMC", color: "#f87171", x: 38, y: 82 },
];

function CursorTag({ name, color, x, y, progress }: { name: string; color: string; x: number; y: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.3], [0.8, 1]);

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: `${x}%`, top: `${y}%`, opacity, scale }}
    >
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="drop-shadow-sm">
        <path d="M1 1L1 15L5 11L8 18L10 17L7 10L13 10L1 1Z" fill={color} stroke="white" strokeWidth="1.2" />
      </svg>
      <span
        className="ml-3 -mt-4 inline-block rounded-md px-2 py-0.5 text-xs font-medium text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        {name}
      </span>
    </motion.div>
  );
}

export function FloatingTags({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {TAGS.map((t) => (
        <CursorTag key={t.name} {...t} progress={progress} />
      ))}
    </div>
  );
}

const TEAM = [
  { name: "Sales", color: "#38bdf8", x: 22, y: 35 },
  { name: "Deploy", color: "#a78bfa", x: 68, y: 40 },
];

export function TeamTags({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {TEAM.map((t) => (
        <CursorTag key={t.name} {...t} progress={progress} />
      ))}
    </div>
  );
}
