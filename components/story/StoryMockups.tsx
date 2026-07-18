"use client";

import Image from "next/image";
import laptopFront from "@/public/products/laptop-front.png";

/** Hand-crafted UI mockups — Opacity-style fidelity, Logica content. */

export function ShopMockup() {
  return (
    <div className="w-[min(920px,92vw)] overflow-hidden rounded-t-2xl border border-black/[0.08] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.12)]">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["#22c55e", "#38bdf8", "#eab308"].map((c) => (
              <div key={c} className="h-7 w-7 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span className="text-sm font-medium text-neutral-800">Procurement</span>
          <span className="text-neutral-300">/</span>
          <span className="text-sm text-neutral-500">Laptops</span>
        </div>
        <button type="button" className="rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white">
          Request quote
        </button>
      </div>

      {/* tabs */}
      <div className="flex gap-1 border-b border-black/[0.06] px-4 pt-2">
        {["Catalog", "Compare", "Bulk order", "AMC"].map((t, i) => (
          <span
            key={t}
            className={`rounded-t-lg px-3 py-2 text-xs font-medium ${
              i === 0 ? "bg-neutral-100 text-neutral-900" : "text-neutral-400"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-[200px_1fr_220px]">
        {/* sidebar */}
        <div className="border-r border-black/[0.06] p-4 text-xs">
          <p className="mb-2 font-semibold text-neutral-400">Categories</p>
          {["Laptops", "Phones", "Monitors", "Printers", "Networking", "Storage"].map((c, i) => (
            <p key={c} className={`py-1.5 ${i === 0 ? "font-medium text-neutral-900" : "text-neutral-500"}`}>
              {c}
            </p>
          ))}
        </div>

        {/* main */}
        <div className="flex items-center justify-center bg-neutral-50/80 p-8">
          <Image src={laptopFront} alt="" className="w-56 drop-shadow-xl" />
        </div>

        {/* spec panel */}
        <div className="border-l border-black/[0.06] p-4 text-xs">
          <p className="mb-3 font-semibold text-neutral-900">Specifications</p>
          {[
            ["Processor", "Intel Core i7"],
            ["Memory", "16 GB DDR5"],
            ["Storage", "512 GB SSD"],
            ["Warranty", "3-year onsite"],
          ].map(([k, v]) => (
            <div key={k} className="mb-2 flex justify-between gap-2">
              <span className="text-neutral-400">{k}</span>
              <span className="font-medium text-neutral-800">{v}</span>
            </div>
          ))}
          <div className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-emerald-700">
            <span className="font-semibold">₹49,990</span>
            <span className="ml-1 text-emerald-600/70">excl. GST</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CatalogPanel() {
  return (
    <div className="w-[min(380px,80vw)] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.10)]">
      <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium">Fleet manager</span>
        </div>
        <button type="button" className="rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold text-white">
          Deploy
        </button>
      </div>
      <div className="p-4 text-xs">
        <p className="mb-3 font-semibold text-neutral-400">Configuration</p>
        {[
          ["Quantity", "250 units"],
          ["OS image", "Windows 11 Pro"],
          ["MDM", "Enrolled"],
          ["Delivery", "Pan-India"],
        ].map(([k, v]) => (
          <div key={k} className="mb-2.5 flex justify-between">
            <span className="text-neutral-500">{k}</span>
            <span className="font-medium text-neutral-800">{v}</span>
          </div>
        ))}
        <button type="button" className="mt-3 w-full rounded-lg bg-emerald-500 py-2 text-center font-semibold text-white">
          Approve order
        </button>
      </div>
    </div>
  );
}

const TIMELINE = [
  { year: "1995", label: "Founded", side: "left" as const },
  { year: "2005", label: "Govt contracts", side: "left" as const },
  { year: "2015", label: "Pan-India", side: "left" as const },
  { year: "2020", label: "Enterprise AMC", side: "right" as const },
  { year: "2024", label: "Fleet deployment", side: "right" as const },
  { year: "2026", label: "One platform", side: "right" as const },
];

export function TimelineCollage() {
  return (
    <div className="relative mx-auto w-[min(900px,92vw)]">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          {TIMELINE.filter((t) => t.side === "left").map((t) => (
            <TimelineCard key={t.year} {...t} />
          ))}
        </div>
        <div className="space-y-4 pt-8">
          {TIMELINE.filter((t) => t.side === "right").map((t) => (
            <TimelineCard key={t.year} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineCard({ year, label }: { year: string; label: string; side: "left" | "right" }) {
  return (
    <div className="rounded-xl border border-black/[0.06] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="mb-2 h-16 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-50" />
      <p className="text-[11px] text-neutral-400">
        {year} — {label}
      </p>
    </div>
  );
}

export function FlowDiagram() {
  return (
    <div className="relative mx-auto h-[320px] w-[min(520px,85vw)]">
      {/* main trunk */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neutral-200" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
        Main
      </div>

      {/* nodes */}
      {[
        { label: "Quote", y: 60, x: -120, color: "#737373" },
        { label: "Procure", y: 130, x: 100, color: "#22c55e", branch: true },
        { label: "Deploy", y: 200, x: -100, color: "#38bdf8" },
        { label: "Support", y: 270, x: 80, color: "#a855f7", branch: true },
      ].map((n) => (
        <div key={n.label}>
          {n.branch && (
            <svg className="absolute left-1/2" style={{ top: n.y - 20 }}>
              <path
                d={`M 0 0 Q 40 20 ${n.x > 0 ? n.x - 180 : -n.x + 180} 40`}
                fill="none"
                stroke={n.color}
                strokeWidth="2"
              />
            </svg>
          )}
          <div
            className="absolute left-1/2 rounded-lg border-2 px-4 py-2 text-xs font-semibold shadow-sm"
            style={{
              top: n.y,
              transform: `translate(calc(-50% + ${n.x}px), 0)`,
              borderColor: n.color,
              color: n.color,
              background: "white",
            }}
          >
            {n.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FleetTree() {
  return (
    <div className="relative mx-auto w-[min(480px,85vw)]">
      <div className="mx-auto w-fit rounded-xl border border-black/[0.08] bg-white px-6 py-3 shadow-lg">
        <span className="text-sm text-neutral-500">✦ Recommend fleet for 250 seats</span>
      </div>
      <div className="mx-auto mt-2 h-8 w-px bg-neutral-200" />
      <div className="mx-auto w-fit rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white shadow-lg">
        ThinkPad T14
      </div>
      <div className="relative mx-auto mt-2 h-16 w-px bg-neutral-200">
        <div className="absolute left-1/2 top-1/2 h-px w-48 -translate-x-1/2 bg-neutral-200" />
      </div>
      <div className="flex justify-center gap-8">
        {[
          { label: "Docking", color: "#22c55e" },
          { label: "Monitor", color: "#38bdf8" },
          { label: "Headset", color: "#a855f7" },
        ].map((t) => (
          <div key={t.label} className="rounded-lg border border-black/[0.08] bg-white px-4 py-2 text-xs font-medium shadow-sm">
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: t.color }} />
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
}
