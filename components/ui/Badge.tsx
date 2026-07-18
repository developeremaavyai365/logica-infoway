import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "accent" | "highlight" | "success" | "outline";

const variants: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/15 text-accent-foreground dark:text-accent",
  highlight: "bg-highlight/20 text-highlight-foreground dark:text-highlight",
  success: "bg-success/15 text-success",
  outline: "border border-border text-muted-foreground",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Optional leading dot indicator. */
  dot?: boolean;
}

export function Badge({ className, variant = "default", dot, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
