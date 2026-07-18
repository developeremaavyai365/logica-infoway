/** Per-section gradients & glows — complement the cinematic hero palette. */

export const KANVA_SECTIONS = {
  brands: {
    section: "relative overflow-hidden bg-[#030304] border-t border-white/[0.06]",
    glow: [
      "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(94,232,168,0.06), transparent 60%)",
      "radial-gradient(ellipse 60% 50% at 15% 80%, rgba(120,192,240,0.05), transparent 55%)",
      "radial-gradient(ellipse 55% 45% at 85% 70%, rgba(196,181,253,0.05), transparent 55%)",
    ],
    border: "",
  },
} as const;

export function SectionGlow({
  style,
  styles,
}: {
  style?: string;
  styles?: readonly string[];
}) {
  const layers = styles ?? (style ? [style] : []);
  return (
    <>
      {layers.map((bg, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: bg }}
        />
      ))}
    </>
  );
}
