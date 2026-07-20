"use client";

import { usePathname } from "next/navigation";

/** Routes that use the cinematic KanvaHeader instead of the corporate chrome. */
const CINEMATIC_PREFIXES = ["/shop", "/product", "/cart", "/wishlist", "/compare", "/account", "/media", "/about"];

function usesCinematicChrome(pathname: string) {
  if (pathname === "/") return true;
  return CINEMATIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

/** Hides corporate chrome on cinematic pages (home + shop). Footer always renders when hideOnHome is false. */
export function SiteChrome({
  children,
  hideOnHome = true,
}: {
  children: React.ReactNode;
  hideOnHome?: boolean;
}) {
  const pathname = usePathname();
  if (hideOnHome && usesCinematicChrome(pathname)) return null;
  return <>{children}</>;
}
