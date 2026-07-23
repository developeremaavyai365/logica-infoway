"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LuArrowRight, LuPlay } from "react-icons/lu";
import { KANVA_SHOP_GRID, type KanvaShopGridTile } from "@/lib/kanva";
import { useIsTouchDevice } from "@/lib/device";
import { cn } from "@/lib/utils";

/** Gates autoplay behind a tap on touch devices — desktop keeps scroll-triggered autoplay. */
function useGridVideo(src: string, gate: boolean) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || gate) return;

    const play = () => el.play().catch(() => {});
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else el.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);

    const onVisible = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisible);
    play();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [src, gate]);

  return ref;
}

function TilePlayButton({ accent, label, onClick }: { accent: string; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Play — ${label}`}
      className="absolute inset-0 z-20 flex items-center justify-center"
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm ring-1 ring-white/30"
        style={{ color: accent }}
      >
        <LuPlay className="h-5 w-5 translate-x-0.5" fill="currentColor" />
      </span>
    </button>
  );
}

function gridLayout(count: number) {
  if (count === 4) {
    return {
      desktop:
        "lg:grid-cols-2 lg:grid-rows-2 lg:h-[min(72vh,44rem)] lg:[grid-template-rows:1fr_1fr]",
      mobileTile: "aspect-square min-h-[18rem] sm:min-h-[20rem]",
    };
  }
  if (count === 3) {
    return {
      desktop:
        "lg:grid-cols-3 lg:grid-rows-1 lg:h-[min(72vh,44rem)] lg:[grid-template-rows:1fr]",
      mobileTile: "aspect-square min-h-[18rem] sm:min-h-[20rem]",
    };
  }
  if (count === 2) {
    return {
      desktop:
        "lg:grid-cols-2 lg:grid-rows-1 lg:h-[min(72vh,44rem)] lg:[grid-template-rows:1fr]",
      mobileTile: "aspect-square min-h-[18rem] sm:min-h-[20rem]",
    };
  }
  return {
    desktop: "lg:grid-cols-2 lg:h-[min(72vh,44rem)]",
    mobileTile: "aspect-square min-h-[18rem]",
  };
}

function gridStyle(d: NonNullable<KanvaShopGridTile["desktop"]>) {
  return {
    gridColumn: `${d.colStart} / span ${d.colSpan}`,
    gridRow: `${d.rowStart} / span ${d.rowSpan}`,
  };
}

function ShopGridTile({ tile }: { tile: KanvaShopGridTile }) {
  const isTouch = useIsTouchDevice();
  const [tapped, setTapped] = useState(false);
  const gate = isTouch && !tapped;
  const videoRef = useGridVideo(tile.video, gate);
  const fit = tile.videoFit ?? "contain";

  return (
    <div className="relative flex h-full min-h-[16rem] flex-col overflow-hidden bg-transparent lg:min-h-0">
      <p className="relative z-10 shrink-0 pt-4 text-center font-display text-base font-semibold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-lg lg:pt-5 lg:text-xl">
        {tile.label}
      </p>

      <div className="relative min-h-0 flex-1">
        <video
          ref={videoRef}
          src={tile.video}
          muted
          loop
          playsInline
          autoPlay={!gate}
          preload="metadata"
          aria-label={tile.label}
          className={cn(
            "absolute inset-0 h-full w-full object-center",
            fit === "contain" ? "object-contain" : "object-cover",
          )}
        />
        {gate && <TilePlayButton accent={tile.accent} label={tile.label} onClick={() => setTapped(true)} />}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="relative z-10 flex shrink-0 justify-center px-3 pb-5 pt-2 lg:pb-6">
        <Link
          href={tile.href}
          className="btn-liquid group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_10px_32px_var(--cta-glow)] active:scale-[0.98]"
          style={
            {
              backgroundColor: tile.accent,
              ["--cta-glow" as string]: `${tile.accent}80`,
              "--liquid": "#0a0a0a",
              "--liquid-ink": "#fff",
            } as React.CSSProperties
          }
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-full" />
          <span className="relative">Shop now</span>
          <LuArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
        </Link>
      </div>
    </div>
  );
}

function ShopGridTileLabeled({
  tile,
  flat = false,
}: {
  tile: KanvaShopGridTile;
  flat?: boolean;
}) {
  const isTouch = useIsTouchDevice();
  const [tapped, setTapped] = useState(false);
  const gate = isTouch && !tapped;
  const videoRef = useGridVideo(tile.video, gate);
  const fit = tile.videoFit ?? "contain";

  return (
    <div className="relative h-full w-full overflow-hidden bg-transparent">
      <video
        ref={videoRef}
        src={tile.video}
        muted
        loop
        playsInline
        autoPlay={!gate}
        preload="metadata"
        aria-label={tile.label}
        style={tile.objectPosition ? { objectPosition: tile.objectPosition } : undefined}
        className={cn(
          "absolute inset-0 h-full w-full",
          tile.objectPosition ? undefined : "object-center",
          fit === "contain" ? "object-contain" : "object-cover",
        )}
      />
      {gate && <TilePlayButton accent={tile.accent} label={tile.label} onClick={() => setTapped(true)} />}

      {!flat && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
      )}

      <p className="absolute inset-x-0 top-0 z-10 pt-4 text-center font-display text-base font-semibold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-lg lg:pt-5 lg:text-xl">
        {tile.label}
      </p>

      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-3 pb-5 lg:pb-6">
        <Link
          href={tile.href}
          className="btn-liquid group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_10px_32px_var(--cta-glow)] active:scale-[0.98]"
          style={
            {
              backgroundColor: tile.accent,
              ["--cta-glow" as string]: `${tile.accent}80`,
              "--liquid": "#0a0a0a",
              "--liquid-ink": "#fff",
            } as React.CSSProperties
          }
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover/cta:translate-x-full" />
          <span className="relative">Shop now</span>
          <LuArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
        </Link>
      </div>
    </div>
  );
}

function SectionBackground({ src }: { src: string }) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/45" aria-hidden />
    </>
  );
}

export interface KanvaShopGridProps {
  tiles?: KanvaShopGridTile[];
  className?: string;
  /** Optional full-section background image behind the grid. */
  backgroundImage?: string;
  /** Drop card chrome (dark footer gradient) so videos sit on the background. */
  flat?: boolean;
  /** Edge-to-edge full-viewport tiles with no padding or gaps. */
  full?: boolean;
}

export function KanvaShopGrid({
  tiles = KANVA_SHOP_GRID,
  className,
  backgroundImage,
  flat = false,
  full = false,
}: KanvaShopGridProps) {
  const isBento = tiles.length > 0 && tiles.every((tile) => tile.desktop);

  if (isBento) {
    const mobileTiles = [...tiles].sort(
      (a, b) => (a.mobileOrder ?? 0) - (b.mobileOrder ?? 0),
    );

    return (
      <section
        className={cn(
          "relative z-10 overflow-hidden px-6 py-10 lg:px-10 lg:py-14",
          backgroundImage ? "bg-neutral-950" : "bg-[#030304]",
          className,
        )}
      >
        {backgroundImage && <SectionBackground src={backgroundImage} />}

        <div className="relative z-10 mx-auto max-w-[90rem]">
          <div className="hidden h-[44rem] grid-cols-12 grid-rows-2 gap-4 lg:grid lg:gap-5">
            {tiles.map((tile) => (
              <div key={tile.id} className="min-h-0" style={gridStyle(tile.desktop!)}>
                <ShopGridTile tile={tile} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:hidden">
            {mobileTiles.map((tile) => (
              <div key={tile.id} className="aspect-[3/4] min-h-[18rem]">
                <ShopGridTile tile={tile} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const sorted = [...tiles].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const layout = gridLayout(sorted.length);

  if (full) {
    return (
      <section
        className={cn(
          "relative overflow-hidden bg-neutral-950",
          "h-[100svh] min-h-[32rem] w-full",
          className,
        )}
      >
        {backgroundImage && <SectionBackground src={backgroundImage} />}

        <div
          className={cn(
            "relative z-10 grid h-full",
            sorted.length === 3
              ? "grid-cols-1 sm:grid-cols-3"
              : sorted.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1",
          )}
        >
          {sorted.map((tile) => (
            <div key={tile.id} className="relative h-full min-h-0 overflow-hidden">
              <ShopGridTileLabeled tile={tile} flat={flat} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden px-4 py-10 sm:px-6 lg:px-10 lg:py-16",
        backgroundImage ? "bg-neutral-950" : "bg-[#030304]",
        className,
      )}
    >
      {backgroundImage && <SectionBackground src={backgroundImage} />}

      <div className="relative z-10 mx-auto max-w-[90rem]">
        <div className={cn("grid grid-cols-1 gap-3 sm:gap-4 lg:gap-5", layout.desktop)}>
          {sorted.map((tile) => (
            <div
              key={tile.id}
              className={cn(
                "h-full min-h-0 overflow-hidden",
                layout.mobileTile,
                "lg:aspect-auto lg:min-h-0",
              )}
            >
              <ShopGridTileLabeled tile={tile} flat={flat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
