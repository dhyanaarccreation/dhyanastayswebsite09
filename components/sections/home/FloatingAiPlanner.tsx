import Link from "next/link";
import { Sparkles } from "lucide-react";

// Home-only floating pill, as on nearly every page of the Application — an
// always-visible way into the AI planner. Here it opens the website's labelled
// AI Trip Planner showcase (a fixed sample, not live AI). Icon-only on phones so
// it doesn't cover the hero search field; the label shows from `sm` up.
export function FloatingAiPlanner() {
  return (
    <Link
      href="/ai-trip-planner"
      aria-label="Open the AI Trip Planner showcase"
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface p-2 text-sm font-medium sm:py-2 sm:pr-4 sm:pl-2 shadow-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl sm:right-6 sm:bottom-6 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-500 to-indigo-600 text-white sm:size-8">
        <Sparkles size={15} aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">AI Planner</span>
    </Link>
  );
}
