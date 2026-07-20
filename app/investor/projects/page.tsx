import type { Metadata } from "next";
import { LuExternalLink, LuFolder } from "react-icons/lu";
import { Container, Section } from "@/components/ui/Section";
import { KANVA_ACCENTS } from "@/lib/kanva";

export const metadata: Metadata = {
  title: "Projects | Logica Infoway",
  description: "CSR projects and technology solutions from Logica Infoway Limited.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* pt-28 clears the fixed KanvaHeader used across the store shell */}
      <Section className="pb-16 pt-28 sm:pt-32">
        <Container size="narrow">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.mint }}>
            Investor
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-neutral-900 lg:text-5xl">
            Projects
          </h1>

          <a
            href="https://www.logicainfoway.com/csr-projects/"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 px-6 py-4 transition-colors hover:bg-neutral-50"
          >
            <span className="flex items-center gap-3">
              <LuFolder className="h-5 w-5 shrink-0" style={{ color: KANVA_ACCENTS.mint }} />
              <span className="font-medium text-neutral-900">CSR Projects — 2024-2025</span>
            </span>
            <LuExternalLink className="h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-900" />
          </a>

          <div className="mt-12 space-y-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.sky }}>
                Super Soul Foundation
              </p>
              <p className="mt-2 text-base leading-relaxed text-neutral-600">
                A charitable organization established in 2020 providing digital literacy programs, empowering
                every child with the tool of education through IT education centers across India. The foundation
                partners with NGOs and government institutions to deliver computer training to underserved youth.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.yellow }}>
                Technology solutions &amp; support services
              </p>
              <p className="mt-2 text-base leading-relaxed text-neutral-600">
                Smart classroom infrastructure, auditorium systems, and conference room setups designed to
                promote interactive learning in the education sector, alongside Annual Maintenance Contracts and
                certified technical support.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
