import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Section";
import { KANVA_ACCENTS } from "@/lib/kanva";
import { COMPANY } from "@/lib/site";
import {
  BUSINESS_DESCRIPTION,
  MISSION_STATEMENT,
  NAME_HISTORY,
  OVERVIEW_FINANCIALS,
  OVERVIEW_SCALE,
  REGISTERED_OFFICE,
} from "@/lib/about";

export const metadata: Metadata = {
  title: "Overview | Logica Infoway",
  description:
    "Logica Infoway Limited — company overview: incorporation history, scale, mission, and financials.",
};

const SCALE_STATS = [
  { value: OVERVIEW_SCALE.offices, label: "Offices" },
  { value: OVERVIEW_SCALE.retailStores, label: "Retail stores" },
  { value: OVERVIEW_SCALE.distributionCentres, label: "Distribution centres" },
  { value: OVERVIEW_SCALE.cities, label: "Cities" },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero — pt-28 clears the fixed KanvaHeader used across the store shell */}
      <Section className="pb-10 pt-28 sm:pt-32">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.mint }}>
            Overview
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-neutral-900 lg:text-5xl">
            {COMPANY.legalName}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">{BUSINESS_DESCRIPTION}</p>
        </Container>
      </Section>

      {/* Scale — as of a specific date, not presented as a live count */}
      <Section className="pt-0">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SCALE_STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center">
                <p className="font-display text-3xl font-bold text-neutral-900 lg:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-neutral-400">As of {OVERVIEW_SCALE.asOf}.</p>
        </Container>
      </Section>

      {/* Incorporation & name history */}
      <Section className="border-t border-neutral-200 bg-neutral-50">
        <Container size="narrow">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">Our history</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
            Incorporation &amp; name history
          </h2>
          <ol className="mt-8 space-y-6 border-l border-neutral-200 pl-6">
            {NAME_HISTORY.map((entry) => (
              <li key={entry.date} className="relative">
                <span
                  className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full"
                  style={{ backgroundColor: KANVA_ACCENTS.mint }}
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">{entry.date}</p>
                <p className="mt-1 font-display text-lg font-semibold text-neutral-900">{entry.name}</p>
                <p className="text-sm text-neutral-500">{entry.event}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Mission */}
      <Section>
        <Container size="narrow">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.sky }}>
            Our mission
          </p>
          <p className="mt-3 font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-neutral-900 lg:text-3xl">
            {MISSION_STATEMENT}
          </p>
        </Container>
      </Section>

      {/* Financial performance + registered office + identifiers */}
      <Section className="border-t border-neutral-200 bg-neutral-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
                Financial performance
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                In {OVERVIEW_FINANCIALS.year}, the company achieved a profit before tax of{" "}
                <span className="font-semibold text-neutral-900">{OVERVIEW_FINANCIALS.profitBeforeTax}</span>,
                surpassing the prior year&apos;s{" "}
                <span className="font-semibold text-neutral-900">
                  {OVERVIEW_FINANCIALS.priorYearProfitBeforeTax}
                </span>{" "}
                in Financial Year {OVERVIEW_FINANCIALS.priorYear}.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
                Registered office
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{REGISTERED_OFFICE.address}</p>
              <p className="mt-1 text-xs text-neutral-400">{REGISTERED_OFFICE.relocatedNote}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
            <span>
              CIN <span className="font-medium text-neutral-900">{COMPANY.cin}</span>
            </span>
            <span>
              GSTIN <span className="font-medium text-neutral-900">{COMPANY.gstin}</span>
            </span>
            <span>
              Telephone <span className="font-medium text-neutral-900">{COMPANY.telephone}</span>
            </span>
          </div>
        </Container>
      </Section>
    </main>
  );
}
