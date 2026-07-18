"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

/** Footer with Kanva homepage styling when on `/`. */
export function SiteFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <Footer
      className={cn(
        isHome && "border-border bg-white",
      )}
    />
  );
}
