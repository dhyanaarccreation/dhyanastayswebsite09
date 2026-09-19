/**
 * Visible (not just in-code) disclosure for sample/unapproved content, per
 * PROJECT_BRIEF.md §6 rule 3 ("mark clearly as placeholder copy — pending
 * client draft"). Mirrors the disclosure pattern already used in the
 * client's own UI reference ("Curator stats shown are demo data...").
 */
export function PlaceholderNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-xs text-foreground/50 italic">{children}</p>;
}
