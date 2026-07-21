import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";
import { KANVA_ACCENTS } from "@/lib/kanva";

export const metadata: Metadata = {
  title: "Authorized Person | Logica Infoway",
  description: "Authorized person disclosure of Logica Infoway Limited.",
};

export default function AuthorizedPersonPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* pt-28 clears the fixed KanvaHeader used across the store shell */}
      <Section className="pb-16 pt-28 sm:pt-32">
        <Container size="narrow">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: KANVA_ACCENTS.mint }}>
            Investor
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-neutral-900 lg:text-5xl">
            Authorized Person
          </h1>

          <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-8">
            <Image
              src="/investor/authorized-person.jpg"
              alt="Authorized person"
              width={1200}
              height={800}
              className="h-auto w-full rounded-xl"
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
