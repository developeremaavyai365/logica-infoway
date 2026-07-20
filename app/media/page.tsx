import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";
import { MEDIA_CERTIFICATES, MEDIA_ENTRIES } from "@/lib/media";
import { KANVA_ACCENTS } from "@/lib/kanva";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Media | Logica Infoway",
  description:
    "Awards, brand recognitions, and celebrations at Logica Infoway Limited — real photos and dates from our newsroom.",
};

const ACCENT_LIST = Object.values(KANVA_ACCENTS);

function accentFor(index: number) {
  return ACCENT_LIST[index % ACCENT_LIST.length];
}

/** Group already-sorted entries by year for section headings. */
function groupByYear(entries: typeof MEDIA_ENTRIES) {
  const groups: { year: string; items: typeof MEDIA_ENTRIES }[] = [];
  for (const entry of entries) {
    const year = entry.sortDate.slice(0, 4);
    const last = groups[groups.length - 1];
    if (last && last.year === year) {
      last.items.push(entry);
    } else {
      groups.push({ year, items: [entry] });
    }
  }
  return groups;
}

export default function MediaPage() {
  const sorted = [...MEDIA_ENTRIES].sort((a, b) => (a.sortDate < b.sortDate ? 1 : -1));
  const groups = groupByYear(sorted);

  return (
    <main className="bg-white text-neutral-900">
      {/* Hero */}
      <Section className="pb-10 pt-16 sm:pt-20">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0F9D58]">Newsroom</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-neutral-900 lg:text-5xl">
            Media
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Awards, brand recognitions, and celebrations from across our Kolkata and Delhi offices — real photos
            and dates, straight from our own record.
          </p>
        </Container>
      </Section>

      {/* Chronological entries, grouped by year */}
      <Section className="pt-0">
        <Container>
          <div className="space-y-16">
            {groups.map((group, gi) => (
              <div key={group.year}>
                <h2
                  className="font-display text-3xl font-bold tracking-[-0.02em]"
                  style={{ color: accentFor(gi) }}
                >
                  {group.year}
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((entry, i) => (
                    <article
                      key={entry.title}
                      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                    >
                      <div
                        className={cn(
                          "grid gap-0.5",
                          entry.images.length === 1
                            ? "grid-cols-1"
                            : entry.images.length === 2
                              ? "grid-cols-2"
                              : "grid-cols-3",
                        )}
                      >
                        {entry.images.slice(0, 3).map((src, imgI) => (
                          <div key={src} className="relative aspect-square overflow-hidden bg-neutral-100">
                            <Image
                              src={src}
                              alt={entry.title}
                              fill
                              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              priority={gi === 0 && i === 0 && imgI === 0}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="p-4">
                        <span
                          className="inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                          style={{ backgroundColor: entry.category === "award" ? KANVA_ACCENTS.yellow : KANVA_ACCENTS.sky }}
                        >
                          {entry.category === "award" ? "Award" : "Celebration"}
                        </span>
                        <h3 className="mt-2 font-display text-sm font-semibold leading-snug text-neutral-900">
                          {entry.title}
                        </h3>
                        <p className="mt-1 text-xs text-neutral-500">{entry.date}</p>
                        {entry.images.length > 3 && (
                          <p className="mt-1 text-xs text-neutral-400">+{entry.images.length - 3} more photos</p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Brand recognition / certifications archive */}
      <Section className="border-t border-neutral-200 bg-neutral-50">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">Archive</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-neutral-900">
            Brand recognition &amp; certifications
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {MEDIA_CERTIFICATES.map((cert) => (
              <div
                key={cert.image}
                className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-4"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-neutral-100">
                  <Image src={cert.image} alt={cert.name} fill sizes="80px" className="object-cover" />
                </div>
                <span className="text-center text-xs font-medium text-neutral-500">{cert.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
