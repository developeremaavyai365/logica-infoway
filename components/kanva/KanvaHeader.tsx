"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import { LuChevronDown } from "react-icons/lu";
import { Logo } from "@/components/brand/Logo";
import { NAV_ITEMS, SHOP_MEGA, type NavItem } from "@/lib/nav";
import { useShopStore } from "@/components/shop/store";
import { cn } from "@/lib/utils";

/** Gradient pairs cycled across the main nav links (nav-pill hover effect). */
const NAV_GRADIENTS: [string, string][] = [
  ["#a955ff", "#ea51ff"],
  ["#56CCF2", "#2F80ED"],
  ["#FF9966", "#FF5E62"],
  ["#80FF72", "#7EE8FA"],
  ["#ffa9c6", "#f434e2"],
  ["#f7971e", "#ffd200"],
];

/** Small numeric badge for the cart/wishlist icons — hidden at 0. */
function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0F9D58] px-1 text-[10px] font-bold text-neutral-950">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function isExternal(href: string) {
  return href.startsWith("http");
}

/** External real logicainfoway.com links open in a new tab — clicking one
 *  shouldn't navigate this site away entirely. */
function externalProps(href: string) {
  return isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

function NavDropdown({
  item,
  pathname,
  variant = "dark",
  gradient,
}: {
  item: NavItem;
  pathname: string;
  variant?: "dark" | "light";
  gradient?: [string, string];
}) {
  const [open, setOpen] = useState(false);
  const active = isActive(pathname, item.href);
  const isShop = item.label === "Shop";
  const megaCategories = isShop ? SHOP_MEGA : item.mega;
  const isMega = Boolean(megaCategories);

  const triggerClass =
    variant === "dark"
      ? "text-white/90 hover:opacity-60"
      : active
        ? "text-foreground"
        : "text-foreground/80 hover:bg-muted hover:text-foreground";

  const panelClass =
    variant === "dark"
      ? "border-white/10 bg-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
      : "border-border bg-card shadow-elevated";

  const linkClass =
    variant === "dark"
      ? "text-white/70 hover:bg-white/[0.06] hover:text-white"
      : "hover:bg-muted";

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.href}
        style={gradient ? ({ "--i": gradient[0], "--j": gradient[1] } as React.CSSProperties) : undefined}
        className={cn("nav-pill flex items-center gap-1 text-sm font-medium", triggerClass)}
      >
        {item.label}
        <LuChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </Link>

      <AnimatePresence>
        {open && (item.children || megaCategories) && (
          <div
            className={cn(
              "pt-3",
              isMega
                ? // Centered on the viewport, not the (narrow, left-of-center)
                  // trigger — an `absolute left-1/2` here would center against
                  // the trigger's own small width and push the wide panel
                  // off-screen. Positioning lives on this plain wrapper, not
                  // the motion.div below — Framer Motion's `y` animation
                  // writes its own inline `transform`, which would silently
                  // clobber a class-based `-translate-x-1/2` on the same
                  // element.
                  "fixed left-1/2 top-[4.5rem] w-[min(64rem,92vw)] -translate-x-1/2"
                : "absolute top-full left-0 w-72",
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
            <div className={cn("overflow-hidden rounded-2xl border p-2", panelClass, isMega && "p-4")}>
              {megaCategories ? (
                <>
                  {isShop && (
                    <Link
                      href="/shop/deals"
                      className={cn(
                        "mb-3 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                        variant === "dark"
                          ? "bg-white/[0.06] text-white hover:bg-white/10"
                          : "bg-muted font-semibold text-foreground",
                      )}
                    >
                      Deal Of The Day
                      <span className="text-xs font-normal text-white/40">Today&apos;s best offer →</span>
                    </Link>
                  )}
                  <div className="gap-x-4 [column-fill:_balance] sm:columns-3 lg:columns-5">
                    {megaCategories.map((cat) => (
                      <div key={cat.label} className="mb-4 break-inside-avoid">
                        {cat.href ? (
                          <Link
                            href={cat.href}
                            {...externalProps(cat.href)}
                            className={cn(
                              "block rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors",
                              variant === "dark" ? "text-white hover:bg-white/[0.06]" : "text-foreground hover:bg-muted",
                            )}
                          >
                            {cat.label}
                          </Link>
                        ) : (
                          <p
                            className={cn(
                              "px-3 py-1.5 text-sm font-semibold",
                              variant === "dark" ? "text-white" : "text-foreground",
                            )}
                          >
                            {cat.label}
                          </p>
                        )}
                        {cat.children && (
                          <div className="mt-0.5">
                            {cat.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                {...externalProps(child.href)}
                                className={cn(
                                  "block rounded-lg px-3 py-1.5 text-[13px] transition-colors",
                                  variant === "dark"
                                    ? "text-white/50 hover:bg-white/[0.06] hover:text-white"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {isShop && (
                    <Link
                      href="/shop"
                      className={cn(
                        "mt-1 block rounded-xl px-4 py-2 text-center text-xs font-medium transition-colors",
                        variant === "dark" ? "text-white/40 hover:text-white/70" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      View all products →
                    </Link>
                  )}
                </>
              ) : (
                item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    {...externalProps(child.href)}
                    className={cn("block rounded-xl px-4 py-2.5 text-sm transition-colors", linkClass)}
                  >
                    <span className={cn("block font-medium", variant === "dark" ? "text-white/90" : "text-foreground")}>
                      {child.label}
                    </span>
                    {child.description && (
                      <span className={cn("mt-0.5 block text-xs", variant === "dark" ? "text-white/40" : "text-muted-foreground")}>
                        {child.description}
                      </span>
                    )}
                  </Link>
                ))
              )}
            </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function KanvaHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { cartCount, wishlist, ready } = useShopStore();
  // Avoid a hydration mismatch: badges reflect localStorage, so they only
  // render their real count once the store has hydrated on the client.
  const cartBadge = ready ? cartCount : 0;
  const wishlistBadge = ready ? wishlist.length : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/[0.08] bg-neutral-950/85 backdrop-blur-xl"
            : "bg-gradient-to-b from-black/50 to-transparent",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between px-6 lg:px-10">
          <Logo height={32} priority onDark />

          {/* Corporate nav — product categories live under Shop only */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex lg:gap-8">
            {NAV_ITEMS.map((item, i) =>
              item.children || item.mega ? (
                <NavDropdown
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  variant="dark"
                  gradient={NAV_GRADIENTS[i % NAV_GRADIENTS.length]}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  style={
                    {
                      "--i": NAV_GRADIENTS[i % NAV_GRADIENTS.length][0],
                      "--j": NAV_GRADIENTS[i % NAV_GRADIENTS.length][1],
                    } as React.CSSProperties
                  }
                  className={cn(
                    "nav-pill text-sm font-medium",
                    isActive(pathname, item.href) ? "text-white" : "text-white/90",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 md:hidden"
            >
              {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
            <Link
              href="/shop"
              aria-label="Search"
              style={{ "--i": "#56CCF2", "--j": "#2F80ED" } as React.CSSProperties}
              className="dock-btn inline-flex h-10 w-10 items-center justify-center rounded-full text-white/90"
            >
              <FiSearch className="dock-icon h-[18px] w-[18px]" />
              <span className="dock-title">Search</span>
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              style={{ "--i": "#a955ff", "--j": "#ea51ff" } as React.CSSProperties}
              className="dock-btn hidden h-10 w-10 items-center justify-center rounded-full text-white/90 sm:inline-flex"
            >
              <FiUser className="dock-icon h-[18px] w-[18px]" />
              <span className="dock-title">Account</span>
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              style={{ "--i": "#ffa9c6", "--j": "#f434e2" } as React.CSSProperties}
              className="dock-btn relative hidden h-10 w-10 items-center justify-center rounded-full text-white/90 sm:inline-flex"
            >
              <FiHeart className="dock-icon h-[18px] w-[18px]" />
              <span className="dock-title">Wishlist</span>
              <CountBadge count={wishlistBadge} />
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              style={{ "--i": "#FF9966", "--j": "#FF5E62" } as React.CSSProperties}
              className="dock-btn relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white"
            >
              <FiShoppingBag className="dock-icon h-[18px] w-[18px]" />
              <span className="dock-title">Cart</span>
              <CountBadge count={cartBadge} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile nav — corporate links; categories under Shop accordion only */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[4.5rem] z-40 max-h-[calc(100vh-4.5rem)] overflow-y-auto border-b border-white/10 bg-neutral-950/95 backdrop-blur-xl md:hidden"
          >
            <nav className="px-4 py-4">
              {NAV_ITEMS.map((item) => {
                if (!item.children && !item.mega) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        isActive(pathname, item.href) ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/[0.06]",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const isOpen = expanded === item.label;
                return (
                  <div key={item.href}>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.06]"
                    >
                      {item.label}
                      <LuChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 border-l border-white/10 pl-3 pb-2">
                            {item.children?.map((child) => (
                              <Link
                                key={child.href + child.label}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-lg px-4 py-2.5 text-sm text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
                              >
                                {child.label}
                              </Link>
                            ))}
                            {item.mega?.map((cat) => (
                              <div key={cat.label} className="mt-2 first:mt-0">
                                {cat.href ? (
                                  <Link
                                    href={cat.href}
                                    {...externalProps(cat.href)}
                                    onClick={() => setMobileOpen(false)}
                                    className="block rounded-lg px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                                  >
                                    {cat.label}
                                  </Link>
                                ) : (
                                  <p className="px-4 py-2 text-sm font-semibold text-white/80">{cat.label}</p>
                                )}
                                {cat.children?.map((child) => (
                                  <Link
                                    key={child.href + child.label}
                                    href={child.href}
                                    {...externalProps(child.href)}
                                    onClick={() => setMobileOpen(false)}
                                    className="block rounded-lg py-2 pl-6 pr-4 text-sm text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
