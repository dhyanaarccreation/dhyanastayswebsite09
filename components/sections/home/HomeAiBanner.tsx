import Link from "next/link";
import { Bot, Sparkles } from "lucide-react";

// Home-only banner in the style of the Application's "New · AI Trip Planner"
// bar. The website has no live AI (PROJECT_BRIEF.md §6 rule 1), so the copy
// promises only what /ai-trip-planner actually shows — a fixed, labelled
// sample — and the chip says "Showcase", not "Try it".
//
// Colours are fixed (not theme tokens): --brand turns light green in dark mode,
// which would put white text on a pale background.
export function HomeAiBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-6">
      <Link
        href="/ai-trip-planner"
        className="group flex items-center gap-3 rounded-3xl bg-linear-to-r from-[#235233] to-[#2e6f40] px-4 py-4 text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:gap-4 sm:px-6 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15">
          <Bot size={20} aria-hidden="true" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2 text-sm font-semibold">
            AI Trip Planner
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
              Showcase
            </span>
          </span>
          <span className="mt-0.5 block text-xs text-white/80 sm:text-sm">
            Preferences in, a personalised plan out — see a sample day-by-day itinerary.
          </span>
        </span>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold whitespace-nowrap text-[#235233] transition-colors group-hover:bg-white/90">
          <Sparkles size={14} aria-hidden="true" />
          <span className="hidden sm:inline">See a sample plan</span>
          <span className="sm:hidden">Sample</span>
        </span>
      </Link>
    </section>
  );
}
