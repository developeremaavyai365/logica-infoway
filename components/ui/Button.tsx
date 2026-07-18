"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "highlight";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium " +
  "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90",
  secondary: "bg-muted text-foreground hover:bg-muted/70",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  highlight: "bg-highlight text-highlight-foreground shadow-soft hover:bg-highlight/90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

interface ButtonOwnProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Render as a Next.js link instead of a button. */
  href?: string;
  fullWidth?: boolean;
}

export type ButtonProps = ButtonOwnProps &
  Omit<HTMLMotionProps<"button">, keyof ButtonOwnProps>;

const Spinner = () => (
  <span
    aria-hidden
    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
  />
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      href,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);

    const content = (
      <>
        {loading ? <Spinner /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </>
    );

    // Shared press/hover motion — subtle, premium, not bouncy.
    const motionProps = {
      whileHover: { y: -1 },
      whileTap: { scale: 0.97 },
      transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] as const },
    };

    if (href) {
      return (
        <motion.div {...motionProps} className={cn("inline-flex", fullWidth && "w-full")}>
          <Link href={href} className={classes} aria-disabled={disabled || loading}>
            {content}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
