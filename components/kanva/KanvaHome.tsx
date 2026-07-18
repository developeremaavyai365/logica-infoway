import { KanvaHeader } from "@/components/kanva/KanvaHeader";
import { KanvaHero } from "@/components/kanva/KanvaHero";
import { KanvaMotionRevealSegment } from "@/components/kanva/KanvaMotionRevealSegment";
import { KanvaTrustStrip } from "@/components/kanva/KanvaTrustStrip";
import { KanvaPhilosophySection } from "@/components/kanva/KanvaPhilosophySection";
import { KanvaMissionSection } from "@/components/kanva/KanvaMissionSection";
import { KanvaStorySection } from "@/components/kanva/KanvaStorySection";
import { KanvaClosingCta } from "@/components/kanva/KanvaClosingCta";

/** Homepage — otherwise purely informational/company content; all product
 *  showcase/browsing sections live on /shop. KanvaHero is the one exception,
 *  kept here as the main hero (and only here, not duplicated on /shop). */
export function KanvaHome() {
  return (
    <div className="relative isolate overflow-x-hidden bg-white text-neutral-900">
      <KanvaHeader />
      <KanvaHero />
      <KanvaTrustStrip />
      <KanvaPhilosophySection />
      <KanvaMissionSection />
      <KanvaStorySection />
      <KanvaMotionRevealSegment />
      <KanvaClosingCta />
    </div>
  );
}
