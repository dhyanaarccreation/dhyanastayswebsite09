import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_STYLES: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-strong",
  secondary:
    "bg-surface text-foreground border border-border-subtle hover:bg-brand-soft",
  ghost: "text-foreground hover:bg-brand-soft",
};

const BASE_STYLES =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${BASE_STYLES} ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    />
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${BASE_STYLES} ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    />
  );
}
