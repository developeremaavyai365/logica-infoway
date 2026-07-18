import {
  KANVA_ACCESSORIES_GRID,
  KANVA_ESSENTIALS_GRID,
  KANVA_SHOP_GRID,
  KANVA_SHOP_SHOWCASE,
} from "@/lib/kanva";
import { KanvaFilmSection } from "@/components/kanva/KanvaFilmSection";
import { KanvaSplitFilmSection } from "@/components/kanva/KanvaSplitFilmSection";
import { KanvaShopGrid } from "@/components/kanva/KanvaShopGrid";
import { KanvaBrandMarquee } from "@/components/kanva/KanvaBrandMarquee";

/** Full-screen mobile film + category video grids below. */
export function KanvaShopShowcase() {
  return (
    <>
      {KANVA_SHOP_SHOWCASE.map((segment) =>
        segment.id === "mobiles" ? (
          <KanvaSplitFilmSection key={segment.id} segment={segment} />
        ) : (
          <KanvaFilmSection key={segment.id} segment={segment} />
        ),
      )}
      <KanvaShopGrid
        tiles={KANVA_SHOP_GRID}
        backgroundImage="/images/showcase-computing-bg.png"
        flat
        full
      />
      <KanvaShopGrid
        tiles={KANVA_ACCESSORIES_GRID}
        backgroundImage="/images/showcase-accessories-bg.png"
        className="border-t border-white/[0.06]"
        flat
        full
      />
      <KanvaShopGrid
        tiles={KANVA_ESSENTIALS_GRID}
        backgroundImage="/images/showcase-accessories-bg.png"
        className="border-t border-white/[0.06]"
        flat
        full
      />
      <KanvaBrandMarquee />
    </>
  );
}
