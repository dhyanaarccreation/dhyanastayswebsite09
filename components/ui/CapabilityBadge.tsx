type Capability = "live" | "demo" | "coming-soon";

const STYLES: Record<Capability, string> = {
  live: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  demo: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "coming-soon": "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

const LABELS: Record<Capability, string> = {
  live: "Available now",
  demo: "Showcase / Demo",
  "coming-soon": "Coming soon",
};

/**
 * Every feature demo on the Dhyana Stays website (AI planner, booking flow,
 * live itinerary, etc.) must be honestly labeled per PROJECT_BRIEF.md §1 and §6.
 * Never render a component that "looks real" without one of these badges if
 * the underlying feature isn't actually live yet.
 */
export function CapabilityBadge({ capability }: { capability: Capability }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase ${STYLES[capability]}`}
    >
      {LABELS[capability]}
    </span>
  );
}
