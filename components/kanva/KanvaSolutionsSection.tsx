import { KANVA_SOLUTIONS_SEGMENT } from "@/lib/kanva";
import { KanvaFilmSection } from "@/components/kanva/KanvaFilmSection";

/** Transition film — bridges storytelling into the product showcase below. */
export function KanvaSolutionsSection() {
  return <KanvaFilmSection segment={KANVA_SOLUTIONS_SEGMENT} />;
}
