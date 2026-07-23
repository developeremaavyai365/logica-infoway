import type { Metadata } from "next";
import Link from "next/link";
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
            Meet our team
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-500">
            Our Board of Directors and Key Managerial Personnel. Hover a photo for their role — full
            details are listed below each one too.
          </p>

          <ul className="team-grid mt-12">
            {BOARD_MEMBERS.map((member) => (
              <li key={member.name} className="flex w-44 flex-col items-center text-center">
                <div className="team-item" style={{ backgroundImage: `url(${member.photo})` }}>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <p>{member.designation}</p>
                  </div>
                </div>
                <h2 className="mt-4 font-display text-sm font-semibold text-neutral-900">{member.name}</h2>
                <p className="mt-0.5 text-xs font-semibold" style={{ color: KANVA_ACCENTS.sky }}>
                  {member.designation}
                </p>
                <ul className="mt-2 space-y-1 text-[11px] leading-relaxed text-neutral-500">
                  {member.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </li>
            ))}

            <li className="flex w-44 flex-col items-center text-center">
              <Link
                href="/careers"
                className="team-item team-cta"
                style={
                  {
                    backgroundColor: "#e5e5e5",
                    "--team-accent": KANVA_ACCENTS.mint,
                  } as React.CSSProperties
                }
              >
                <div className="team-info">
                  <h3>Want to join us?</h3>
                  <p>Current vacancies</p>
                </div>
              </Link>
              <Link href="/careers" className="mt-4 font-display text-sm font-semibold text-neutral-900 hover:underline">
                Want to join us?
              </Link>
            </li>
          </ul>
        </Container>
      </Section>
    </main>
  );
}
