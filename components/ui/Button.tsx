import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "ghost-inverse";

// Each variant owns its own complete color set (bg/text/hover) rather than
// being composed via an overriding className — Tailwind's generated
// stylesheet order, not the class-attribute order, decides which of two
// conflicting utilities (e.g. two "text-*" classes) wins, so bolting a color
// override onto an existing variant via className is unreliable (this broke
// the Hero's primary CTA: white-on-white text). Use "inverse"/"ghost-inverse"
// on dark/colored backgrounds instead of overriding "primary"/"ghost".
const VARIANT_STYLES: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-strong",
  secondary:
    "bg-surface text-foreground border border-border-subtle hover:bg-brand-soft",
  ghost: "text-foreground hover:bg-brand-soft",
  inverse: "bg-white text-brand-strong hover:bg-white/90",
  "ghost-inverse": "border border-white/30 text-white hover:bg-white/10",
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
