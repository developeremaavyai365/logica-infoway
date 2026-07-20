import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";
import { KANVA_ACCENTS } from "@/lib/kanva";
import { BOARD_MEMBERS } from "@/lib/board";

export const metadata: Metadata = {
  title: "Board of Directors & KMP | Logica Infoway",
  description: "Board of Directors and Key Managerial Personnel of Logica Infoway Limited.",
};

export default function BoardOfDirectorsPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* pt-28 clears the fixed KanvaHeader used across the store shell */}
      <Section className="pb-16 pt-28 sm:pt-32">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.mint }}>
            About
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-neutral-900 lg:text-5xl">
            Board of Directors &amp; Key Managerial Personnel
          </h1>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {BOARD_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-6 text-center transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              >
                <div className="relative h-28 w-28 overflow-hidden rounded-full bg-neutral-100">
                  <Image src={member.photo} alt={member.name} fill sizes="112px" className="object-cover" />
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold text-neutral-900">{member.name}</h2>
                <p className="mt-1 text-sm font-semibold" style={{ color: KANVA_ACCENTS.sky }}>
                  {member.designation}
                </p>
                <ul className="mt-3 space-y-1 text-xs leading-relaxed text-neutral-500">
                  {member.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
