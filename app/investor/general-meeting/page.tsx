import type { Metadata } from "next";
import { LuExternalLink, LuFolder } from "react-icons/lu";
import { Container, Section } from "@/components/ui/Section";
import { KANVA_ACCENTS } from "@/lib/kanva";
import { GENERAL_MEETING_PERIODS } from "@/lib/investor";

export const metadata: Metadata = {
  title: "General Meeting | Logica Infoway",
  description: "Notices and outcomes of general meetings of Logica Infoway Limited, by fiscal year.",
};

export default function GeneralMeetingPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* pt-28 clears the fixed KanvaHeader used across the store shell */}
      <Section className="pb-16 pt-28 sm:pt-32">
        <Container size="narrow">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.mint }}>
            Investor
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-neutral-900 lg:text-5xl">
            General Meeting
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Notices and outcomes are organized by fiscal year on the source site — each period below opens the
            real listing of documents on logicainfoway.com.
          </p>

          <ul className="mt-10 divide-y divide-neutral-200 rounded-2xl border border-neutral-200">
            {GENERAL_MEETING_PERIODS.map((period) => (
              <li key={period.url}>
                <a
                  href={period.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-neutral-50"
                >
                  <span className="flex items-center gap-3">
                    <LuFolder className="h-5 w-5 shrink-0" style={{ color: KANVA_ACCENTS.mint }} />
                    <span className="font-medium text-neutral-900">{period.label}</span>
                  </span>
                  <LuExternalLink className="h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-900" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
