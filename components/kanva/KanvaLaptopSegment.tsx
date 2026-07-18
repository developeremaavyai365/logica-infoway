import { KANVA_LAPTOP_SEGMENT } from "@/lib/kanva";
import { KanvaFilmSection } from "@/components/kanva/KanvaFilmSection";

/** Full-screen laptop film — directly below the hero. */
export function KanvaLaptopSegment() {
  return <KanvaFilmSection segment={KANVA_LAPTOP_SEGMENT} />;
}
