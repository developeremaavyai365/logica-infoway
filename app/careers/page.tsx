import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Section";
import { KANVA_ACCENTS } from "@/lib/kanva";
import { COMPANY, OFFICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers | Logica Infoway",
  description: "Careers at Logica Infoway Limited — our people philosophy and how to reach us.",
};

const CITIES = Array.from(new Set(OFFICES.map((o) => o.city)));

export default function CareersPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero — pt-28 clears the fixed KanvaHeader used across the store shell */}
      <Section className="pb-10 pt-28 sm:pt-32">
        <Container size="narrow">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.violet }}>
            Careers
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-neutral-900 lg:text-5xl">
            Build with {COMPANY.legalName}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            We&apos;re a computer hardware, networking, and IT solutions company operating out of{" "}
            {CITIES.length} cities across India, trusted since 1995.
          </p>
        </Container>
      </Section>

      {/* Real company philosophy statement, from the official Careers page */}
      <Section className="border-t border-neutral-200 bg-neutral-50">
        <Container size="narrow">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">Our philosophy</p>
          <p className="mt-4 font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-neutral-900 lg:text-3xl">
            &ldquo;{COMPANY.philosophy}&rdquo;
          </p>
        </Container>
      </Section>

      {/* Where we operate — real office cities */}
      <Section>
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">Where we operate</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
            Offices across India
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {OFFICES.map((office) => (
              <div key={office.city} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <p className="font-display text-base font-semibold text-neutral-900">{office.city}</p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">{office.address}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Open roles — honest placeholder, no fabricated listings */}
      <Section className="border-t border-neutral-200 bg-neutral-50">
        <Container size="narrow">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.sky }}>
            Open roles
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
            No open positions listed right now
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
            We don&apos;t have any roles posted at the moment. If you&apos;d like to be considered for
            future openings, send your resume to the email below and our team will reach out when a
            relevant position opens up.
          </p>
          <a
            href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("Career interest — Logica Infoway")}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: KANVA_ACCENTS.mint }}
          >
            Email your resume to {COMPANY.email}
          </a>
        </Container>
      </Section>
    </main>
  );
}
