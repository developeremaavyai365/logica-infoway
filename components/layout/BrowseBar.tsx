"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LuAppWindow,
  LuBluetooth,
  LuBriefcase,
  LuChevronRight,
  LuHardDrive,
  LuHeadphones,
  LuLaptop,
  LuMenu,
  LuMonitor,
  LuComputer,
  LuPrinter,
  LuSearch,
  LuSmartphone,
  LuTruck,
  LuZap,
} from "react-icons/lu";
import { CATEGORIES } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const catIcons: Record<string, React.ReactNode> = {
  deal: <LuZap className="h-4 w-4" />,
  laptop: <LuLaptop className="h-4 w-4" />,
  phone: <LuSmartphone className="h-4 w-4" />,
  accessories: <LuHeadphones className="h-4 w-4" />,
  desktop: <LuComputer className="h-4 w-4" />,
  monitor: <LuMonitor className="h-4 w-4" />,
  printer: <LuPrinter className="h-4 w-4" />,
  storage: <LuHardDrive className="h-4 w-4" />,
  software: <LuAppWindow className="h-4 w-4" />,
  bag: <LuBriefcase className="h-4 w-4" />,
  wireless: <LuBluetooth className="h-4 w-4" />,
};

export function BrowseBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Small delay on leave so the pointer can travel from button to flyout.
  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  return (
    <div className="sticky top-16 z-30 border-b border-border bg-card text-card-foreground">
      <div className="mx-auto flex h-14 max-w-[88rem] items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Browse products + flyout */}
        <div className="relative hidden shrink-0 md:block" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 items-center gap-2 rounded-md bg-brand-gradient px-4 text-sm font-semibold text-white"
          >
            <LuMenu className="h-4 w-4" />
            BROWSE PRODUCTS
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-full z-40 w-64 pt-2"
              >
                <div className="overflow-hidden rounded-xl border border-border bg-card p-2 text-card-foreground shadow-elevated">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted",
                        cat.featured && "font-semibold text-primary",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={cn("text-muted-foreground", cat.featured && "text-primary")}>
                          {catIcons[cat.icon]}
                        </span>
                        {cat.label}
                      </span>
                      <LuChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search */}
        <form onSubmit={onSearch} className="flex h-9 flex-1 items-center overflow-hidden rounded-md bg-background">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search here..."
            aria-label="Search products"
            className="h-full flex-1 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex h-full w-11 items-center justify-center bg-brand-gradient text-white"
          >
            <LuSearch className="h-4 w-4" />
          </button>
        </form>

        {/* Free shipping trust badge */}
        <div className="hidden shrink-0 items-center gap-2 pl-1 sm:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-highlight text-highlight-foreground">
            <LuTruck className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold">Free Shipping</p>
            <p className="text-[10px] text-muted-foreground">On eligible orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}
