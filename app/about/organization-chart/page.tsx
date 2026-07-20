import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";
import { KANVA_ACCENTS } from "@/lib/kanva";

export const metadata: Metadata = {
  title: "Organization Chart | Logica Infoway",
  description: "Logica Infoway Limited's organizational chart.",
};

export default function OrganizationChartPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* pt-28 clears the fixed KanvaHeader used across the store shell */}
      <Section className="pb-16 pt-28 sm:pt-32">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.mint }}>
            About
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-neutral-900 lg:text-5xl">
            Organization Chart
          </h1>

          <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-8">
            <div className="relative aspect-[1536/726] w-full">
              <Image
                src="/about/organization-chart.jpg"
                alt="Logica Infoway Limited organizational chart"
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
