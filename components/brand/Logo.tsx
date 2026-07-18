import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logoLight from "@/public/logo.png";
import logoDark from "@/public/logo-dark.png";

interface LogoProps {
  /** Rendered height in px; width scales to the logo's aspect ratio. */
  height?: number;
  /** Wrap in a link to `href` (default "/"). Pass null to render bare. */
  href?: string | null;
  /** Force the light wordmark (for dark backgrounds like video heroes). */
  onDark?: boolean;
  className?: string;
  priority?: boolean;
}

/**
 * Official Logica wordmark. Swaps black↔white variant purely via CSS so it is
 * correct on first paint in either theme (no JS, no hydration flicker).
 * Colored peak stripes are identical across both assets.
 */
export function Logo({ height = 40, href = "/", onDark, className, priority }: LogoProps) {
  const ratio = 1400 / 834; // native aspect ratio of the exported asset
  const width = Math.round(height * ratio);

  const mark = (
    <span
      className={cn("inline-block shrink-0", className)}
      style={{ width, height }}
      aria-label="Logica Infoway"
    >
      {/* light theme */}
      <Image
        src={logoLight}
        alt="Logica Infoway"
        width={width}
        height={height}
        priority={priority}
        className={cn("h-full w-full object-contain", onDark ? "hidden" : "dark:hidden")}
      />
      {/* dark theme / dark backgrounds */}
      <Image
        src={logoDark}
        alt="Logica Infoway"
        width={width}
        height={height}
        priority={priority}
        className={cn("h-full w-full object-contain", onDark ? "block" : "hidden dark:block")}
      />
    </span>
  );

  if (href === null) return mark;

  return (
    <Link href={href} className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
      {mark}
    </Link>
  );
}
