import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Section";
import { KANVA_ACCENTS } from "@/lib/kanva";
import { GROUP_COMPANIES } from "@/lib/investor";

export const metadata: Metadata = {
  title: "Group Companies | Logica Infoway",
  description: "Group and subsidiary companies of Logica Infoway Limited.",
};

const ACCENT_LIST = Object.values(KANVA_ACCENTS);

export default function GroupCompaniesPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* pt-28 clears the fixed KanvaHeader used across the store shell */}
      <Section className="pb-16 pt-28 sm:pt-32">
        <Container size="narrow">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.mint }}>
            Investor
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-neutral-900 lg:text-5xl">
            Group Companies
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Subsidiary companies of Logica Infoway Limited, with audited financial reports on file for FY 2018-19
            through 2022-23.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {GROUP_COMPANIES.map((name, i) => (
              <li
                key={name}
                className="rounded-2xl border border-neutral-200 px-6 py-5 font-display text-base font-semibold"
                style={{ color: ACCENT_LIST[i % ACCENT_LIST.length] }}
              >
                {name}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
