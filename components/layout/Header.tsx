"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiHeart, FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
import { NAV_ITEMS, type NavItem } from "@/lib/nav";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/** Desktop nav item — plain link, or a hover/focus dropdown when it has children. */
function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const active = isActive(pathname, item.href);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-foreground text-background"
            : "text-foreground/80 hover:bg-muted hover:text-foreground",
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        className={cn(
          "flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
          active ? "text-foreground" : "text-foreground/80 hover:bg-muted hover:text-foreground",
        )}
      >
        {item.label}
        <FiChevronDown
          className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full z-50 w-72 pt-2"
          >
            <div className="overflow-hidden rounded-xl border border-border bg-card p-2 shadow-elevated">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
                >
                  <span className="block text-sm font-medium text-foreground">{child.label}</span>
                  {child.description && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {child.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Icon button with an optional numeric badge (cart / wishlist). */
function IconAction({
  href,
  label,
  icon,
  count,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
    >
      {icon}
      {count !== undefined && (
        <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: logo */}
        <Logo height={40} priority />

        {/* Center: desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle className="hidden sm:inline-flex" />
          <IconAction href="/account" label="Account" icon={<FiUser className="h-5 w-5" />} />
          <IconAction href="/wishlist" label="Wishlist" icon={<FiHeart className="h-5 w-5" />} count={0} />
          <IconAction href="/cart" label="Cart" icon={<FiShoppingCart className="h-5 w-5" />} count={1} />

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          >
            <FiMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}
