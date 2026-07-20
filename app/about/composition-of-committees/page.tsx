import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Section";
import { KANVA_ACCENTS } from "@/lib/kanva";
import { COMMITTEES } from "@/lib/committees";

export const metadata: Metadata = {
  title: "Composition of Committees | Logica Infoway",
  description: "Composition of the various committees of the Board of Logica Infoway Limited.",
};

const ACCENT_LIST = Object.values(KANVA_ACCENTS);

export default function CompositionOfCommitteesPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* pt-28 clears the fixed KanvaHeader used across the store shell */}
      <Section className="pb-16 pt-28 sm:pt-32">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.mint }}>
            About
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-neutral-900 lg:text-5xl">
            Composition of Various Committees of the Board
          </h1>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {COMMITTEES.map((committee, i) => (
              <div key={committee.name} className="overflow-hidden rounded-2xl border border-neutral-200">
                <div
                  className="px-5 py-3"
                  style={{ backgroundColor: `${ACCENT_LIST[i % ACCENT_LIST.length]}14` }}
                >
                  <h2
                    className="font-display text-base font-semibold"
                    style={{ color: ACCENT_LIST[i % ACCENT_LIST.length] }}
                  >
                    {committee.name}
                  </h2>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {committee.members.map((member) => (
                      <tr key={member.name + member.role} className="border-t border-neutral-100">
                        <td className="px-5 py-3 font-medium text-neutral-900">{member.name}</td>
                        <td className="px-5 py-3 text-right text-neutral-500">{member.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
