import { cn } from "@/lib/utils";

/**
 * Section — vertical rhythm wrapper for page blocks.
 * Owns consistent top/bottom padding; pair with <Container> for horizontal bounds.
 */
export function Section({
  className,
  children,
  id,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section id={id} className={cn("py-16 sm:py-22 lg:py-30", className)} {...props}>
      {children}
    </section>
  );
}

/**
 * Container — horizontal max-width + responsive gutters.
 * `size` controls the max width for different content densities.
 */
export function Container({
  className,
  children,
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: "default" | "narrow" | "wide" }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-7xl",
        size === "wide" && "max-w-[88rem]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
