"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  LuArrowRight,
  LuAppWindow,
  LuBuilding2,
  LuGamepad2,
  LuHardDrive,
  LuHeadphones,
  LuLaptop,
  LuMonitor,
  LuNetwork,
  LuPrinter,
  LuSmartphone,
  LuTablet,
} from "react-icons/lu";
import { SHOWCASE_CATEGORIES, type ShowcaseCategory } from "@/lib/showcase";
import { cn } from "@/lib/utils";
import laptopFront from "@/public/products/laptop-front.png";
import Aurora from "@/components/reactbits/Aurora";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";
import Magnet from "@/components/reactbits/Magnet";
import GlareHover from "@/components/reactbits/GlareHover";

const icons: Record<string, React.ReactNode> = {
  laptop: <LuLaptop />,
  phone: <LuSmartphone />,
  tablet: <LuTablet />,
  printer: <LuPrinter />,
  monitor: <LuMonitor />,
  network: <LuNetwork />,
  accessories: <LuHeadphones />,
  storage: <LuHardDrive />,
  gaming: <LuGamepad2 />,
  enterprise: <LuBuilding2 />,
  software: <LuAppWindow />,
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

function lighten(hex: string, amt = 0.4) {
  const h = hex.replace("#", "");
  const num = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = Math.round(((num >> 16) & 255) + (255 - ((num >> 16) & 255)) * amt);
  const g = Math.round(((num >> 8) & 255) + (255 - ((num >> 8) & 255)) * amt);
  const b = Math.round((num & 255) + (255 - (num & 255)) * amt);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const kicker = (cat: ShowcaseCategory) =>
  cat.title === "Enterprise Solutions" ? "Solutions" : "Product range";

/* Vivid slide backdrop built from the category gradient. */
function slideBg([from, via, to]: [string, string, string]) {
  return `radial-gradient(120% 130% at 68% 28%, ${via}66 0%, transparent 58%), linear-gradient(120deg, ${from} 0%, ${via} 48%, ${to} 100%)`;
}

/* ---------- Product visual: platform + shadow + glare + float ---------- */
function ProductVisual({
  cat,
  parallaxX,
  parallaxY,
  dir,
}: {
  cat: ShowcaseCategory;
  parallaxX: ReturnType<typeof useSpring>;
  parallaxY: ReturnType<typeof useSpring>;
  dir: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ x: parallaxX, y: parallaxY }}
      className="relative flex items-center justify-center"
    >
      <div
        className="pointer-events-none absolute h-[34rem] w-[34rem] rounded-full blur-[100px]"
        style={{ backgroundColor: cat.theme.glow, opacity: 0.4 }}
      />
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <GlareHover
          width="auto"
          height="auto"
          background="transparent"
          borderColor="transparent"
          borderRadius="2.5rem"
          glareColor="#ffffff"
          glareOpacity={0.3}
          glareAngle={-40}
          glareSize={220}
          transitionDuration={900}
          className="!border-0 !bg-transparent p-4"
        >
          {cat.photo ? (
            <Image
              src={laptopFront}
              alt={cat.title}
              priority
              className="w-[34rem] max-w-[46vw] drop-shadow-[0_55px_80px_rgba(0,0,0,0.5)]"
            />
          ) : cat.image ? (
            <Image
              src={cat.image}
              alt={cat.title}
              width={580}
              height={480}
              className="w-[32rem] max-w-[44vw] object-contain drop-shadow-[0_55px_80px_rgba(0,0,0,0.5)]"
            />
          ) : (
            <span
              className="grid h-80 w-80 place-items-center rounded-[3rem] border border-white/15 bg-white/[0.06] backdrop-blur-md [&>svg]:h-44 [&>svg]:w-44"
              style={{ color: "#fff", boxShadow: `0 40px 90px ${cat.theme.glow}44` }}
            >
              {icons[cat.icon]}
            </span>
          )}
        </GlareHover>
        <div className="mx-auto mt-1 h-9 w-2/3 rounded-[50%] bg-black/50 blur-2xl" />
      </motion.div>
    </motion.div>
  );
}

/* ---------- Slide ---------- */
const textContainer: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
  exit: {},
};
const line: Variants = {
  enter: { opacity: 0, y: 26 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.3 } },
};

function Slide({
  cat,
  index,
  count,
  dir,
  parallaxX,
  parallaxY,
}: {
  cat: ShowcaseCategory;
  index: number;
  count: number;
  dir: number;
  parallaxX: ReturnType<typeof useSpring>;
  parallaxY: ReturnType<typeof useSpring>;
}) {
  return (
    <motion.div
      key={cat.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0"
    >
      {/* product centered behind, flanked by text/stats */}
      <div className="absolute inset-0 flex items-center justify-center pl-[8%]">
        <ProductVisual cat={cat} parallaxX={parallaxX} parallaxY={parallaxY} dir={dir} />
      </div>

      <div className="relative mx-auto flex h-full max-w-[104rem] items-center justify-between px-6 pt-24 lg:px-16">
        {/* LEFT — text */}
        <motion.div
          variants={textContainer}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative z-10 w-full max-w-md"
        >
          <motion.div variants={line} className="mb-4 flex items-center gap-3">
            <span className="font-display text-lg font-bold tabular-nums text-white/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-white/25" />
            <ShinyText
              text={kicker(cat).toUpperCase()}
              speed={4}
              spread={90}
              color="rgba(255,255,255,0.6)"
              shineColor={lighten(cat.theme.glow, 0.4)}
              className="text-[0.7rem] font-semibold tracking-[0.32em]"
            />
          </motion.div>

          <BlurText
            key={cat.id}
            text={cat.title}
            animateBy="words"
            direction="top"
            delay={90}
            stepDuration={0.4}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.98] tracking-tight text-white"
          />

          <motion.p variants={line} className="mt-5 max-w-sm text-base leading-relaxed text-white/70">
            {cat.description}
          </motion.p>

          <motion.ul variants={line} className="mt-6 space-y-2">
            {cat.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-sm text-white/80">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.theme.glow }} />
                {h}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={line} className="mt-8 flex flex-wrap items-center gap-4">
            <Magnet padding={70} magnetStrength={4}>
              <a
                href={cat.ctaHref}
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 shadow-lg transition-shadow hover:shadow-xl"
              >
                {cat.ctaLabel}
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnet>
            {cat.secondaryLabel && (
              <a
                href={cat.secondaryHref}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {cat.secondaryLabel}
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT — stats rail */}
        <motion.div
          variants={textContainer}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative z-10 hidden flex-col items-end gap-8 pr-6 lg:flex"
        >
          {cat.stats.map((s) => (
            <motion.div key={s.label} variants={line} className="text-right">
              <div className="font-display text-4xl font-bold leading-none text-white xl:text-5xl">
                {s.value}
              </div>
              <div className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                {s.label}
              </div>
            </motion.div>
          ))}
          <motion.div variants={line} className="mt-2 text-right">
            <span className="font-display text-sm tabular-nums text-white/40">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------- Vertical dot navigation (right edge) ---------- */
function DotNav({
  count,
  index,
  glow,
  onGo,
}: {
  count: number;
  index: number;
  glow: string;
  onGo: (i: number) => void;
}) {
  return (
    <div className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to ${SHOWCASE_CATEGORIES[i].title}`}
          onClick={() => onGo(i)}
          className="group grid place-items-center"
        >
          <span
            className="w-1.5 rounded-full transition-all duration-300"
            style={{
              height: i === index ? 26 : 6,
              backgroundColor: i === index ? glow : "rgba(255,255,255,0.3)",
            }}
          />
        </button>
      ))}
    </div>
  );
}

/* ---------- Desktop: pinned, scroll-driven ---------- */
function ShowcaseDesktop({ categories }: { categories: ShowcaseCategory[] }) {
  const N = categories.length;
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const prev = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = clamp(Math.floor(p * N), 0, N - 1);
    if (i !== prev.current) {
      setDir(i > prev.current ? 1 : -1);
      prev.current = i;
      setIndex(i);
    }
  });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const parallaxX = useSpring(rawX, { stiffness: 70, damping: 22 });
  const parallaxY = useSpring(rawY, { stiffness: 70, damping: 22 });
  const onMouseMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 44);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 30);
  };

  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const clamped = clamp(i, 0, N - 1);
    const total = el.offsetHeight - window.innerHeight;
    const p = (clamped + 0.5) / N;
    window.scrollTo({ top: el.offsetTop + p * total, behavior: "smooth" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inView = r.top <= 2 && r.bottom >= window.innerHeight - 2;
      if (!inView) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const cat = categories[index];

  return (
    <section
      ref={sectionRef}
      style={{ height: `${N * 100}vh` }}
      className="relative"
      aria-roledescription="carousel"
      aria-label="Product categories"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-neutral-950" onMouseMove={onMouseMove}>
        {/* vivid gradient backdrop (cross-fades per slide) */}
        <AnimatePresence initial={false}>
          <motion.div
            key={cat.id + "-bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ background: slideBg(cat.theme.gradient) }}
          />
        </AnimatePresence>

        {/* organic aurora light */}
        <AnimatePresence>
          <motion.div
            key={cat.id + "-aurora"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-x-0 bottom-0 h-[70%]"
          >
            <Aurora
              colorStops={[cat.theme.gradient[2], lighten(cat.theme.glow, 0.5), cat.theme.gradient[0]]}
              amplitude={1.0}
              blend={0.6}
              speed={0.5}
            />
          </motion.div>
        </AnimatePresence>

        {/* left vignette for text legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,4,10,0.7) 0%, rgba(3,4,10,0.35) 34%, transparent 62%)",
          }}
        />

        {/* section header */}
        <div className="pointer-events-none absolute left-6 top-24 z-20 lg:left-16 lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
            Explore the range
          </p>
        </div>

        {/* slides */}
        <AnimatePresence custom={dir} initial={false} mode="popLayout">
          <Slide
            key={cat.id}
            cat={cat}
            index={index}
            count={N}
            dir={dir}
            parallaxX={parallaxX}
            parallaxY={parallaxY}
          />
        </AnimatePresence>

        <DotNav count={N} index={index} glow={cat.theme.glow} onGo={goTo} />
      </div>
    </section>
  );
}

/* ---------- Mobile / reduced-motion: full-screen swipe-snap ---------- */
function ShowcaseMobile({ categories }: { categories: ShowcaseCategory[] }) {
  return (
    <section aria-label="Product categories">
      <div className="flex h-screen snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className="relative flex h-screen w-screen shrink-0 snap-center flex-col items-center justify-center overflow-hidden px-7 pt-24 text-center"
            style={{ background: slideBg(cat.theme.gradient) }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-6 right-2 select-none font-display font-bold leading-none text-white"
              style={{ fontSize: "40vw", opacity: 0.07 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative">
              <span
                className="grid h-44 w-44 place-items-center rounded-[2rem] border border-white/15 bg-white/[0.06] [&>svg]:h-24 [&>svg]:w-24"
                style={{ color: "#fff", boxShadow: `0 30px 70px ${cat.theme.glow}44` }}
              >
                {cat.photo ? <Image src={laptopFront} alt={cat.title} className="w-32" /> : icons[cat.icon]}
              </span>
            </div>
            <div className="relative mt-8 flex items-center gap-2">
              <span className="h-px w-6" style={{ backgroundColor: cat.theme.glow }} />
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/70">
                {kicker(cat)}
              </span>
            </div>
            <h2 className="mt-3 font-display text-display-md font-bold text-white">{cat.title}</h2>
            <p className="mt-3 max-w-sm text-base text-white/70">{cat.description}</p>

            <div className="mt-5 flex items-center gap-8">
              {cat.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-[0.6rem] font-semibold uppercase tracking-widest text-white/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-3">
              <a
                href={cat.ctaHref}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-neutral-900"
              >
                {cat.ctaLabel}
                <LuArrowRight className="h-4 w-4" />
              </a>
              {cat.secondaryLabel && (
                <a
                  href={cat.secondaryHref}
                  className="inline-flex h-11 items-center rounded-full border border-white/25 px-5 text-sm font-medium text-white"
                >
                  {cat.secondaryLabel}
                </a>
              )}
            </div>

            <span className="absolute bottom-6 left-6 font-display text-2xl font-bold tabular-nums text-white">
              {String(i + 1).padStart(2, "0")}
              <span className="ml-1 text-sm font-normal text-white/50">
                / {String(categories.length).padStart(2, "0")}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HorizontalProductShowcase({
  categories = SHOWCASE_CATEGORIES,
}: {
  categories?: ShowcaseCategory[];
}) {
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setDesktop(mq.matches && !reduced.matches);
    update();
    mq.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  if (desktop === null) return <ShowcaseMobile categories={categories} />;
  return desktop ? <ShowcaseDesktop categories={categories} /> : <ShowcaseMobile categories={categories} />;
}
