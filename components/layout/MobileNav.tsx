"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiX } from "react-icons/fi";
import { NAV_ITEMS } from "@/lib/nav";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileNav({ open, onClose, pathname }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Portal target only exists on the client.
  useEffect(() => setMounted(true), []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Scrim */}
          <motion.div
            variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            variants={{ open: { x: 0 }, closed: { x: "100%" } }}
            transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-background shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Logo height={36} href={null} />
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/80 hover:bg-muted"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-2">
              {NAV_ITEMS.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                if (!item.children) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        active ? "bg-muted text-foreground" : "text-foreground/80 hover:bg-muted",
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
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted"
                    >
                      {item.label}
                      <FiChevronDown
                        className={cn("h-5 w-5 transition-transform duration-200", isOpen && "rotate-180")}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 border-l border-border pl-3">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={onClose}
                                className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center justify-between border-t border-border px-4 py-4">
              <span className="text-sm text-muted-foreground">Switch theme</span>
              <ThemeToggle />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
