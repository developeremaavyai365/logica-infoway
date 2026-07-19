import { KANVA_ACCENTS, KANVA_PHILOSOPHY } from "@/lib/kanva";
import { ParallaxLayer } from "@/components/kanva/ParallaxLayer";

/** Static "Why Logica Infoway" section — one unified flowing block of copy,
 *  no cards/dividers/boxes separating the individual points. Text itself
 *  stays a plain, non-animated block (per earlier feedback); only the
 *  decorative background gradient carries the scroll-parallax effect. */
export function KanvaPhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-10 lg:py-28">
      <ParallaxLayer speed={0.5} scaleDepth>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${KANVA_ACCENTS.mint}0d, transparent 60%)`,
          }}
        />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em]">
          <span className="type-reveal-heading" style={{ color: KANVA_ACCENTS.mint }}>
            Built on trust, not just transactions
          </span>
        </h2>

        <div className="mt-10 space-y-6 text-left">
          {KANVA_PHILOSOPHY.map((pillar) => (
            <p key={pillar.id} className="text-base leading-relaxed text-neutral-600 lg:text-lg">
              <span className="font-display font-semibold" style={{ color: pillar.accent }}>
                {pillar.title}.
              </span>{" "}
              {pillar.copy}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
