import { Focus, BadgeCheck, BookOpen, Compass, UserRoundCheck, WandSparkles, Route, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ACCENTS, AccentIconTile, AccentSpot, type Accent } from "@/components/ui/AccentIconTile";

// DHN-17 — Why Dhyana Differentiator Section (POC). Content basis: Home topic
// 01.8 (approved bullets, in order: Less noise; handpicked stays;
// storytelling; curated experiences; trusted curators; AI planning; complete
// journey), captioned using Chapter 09's approved one-line topic purposes
// (09.1-09.7 map 1:1 to these bullets). Copy and order are unchanged; the
// 2026-09-25 redesign only touches presentation (bento cards, colourful icon
// tiles) — the tile and palette live in components/ui/AccentIconTile.tsx.

const DIFFERENTIATORS: { icon: LucideIcon; accent: Accent; title: string; caption: string }[] = [
  {
    icon: Focus,
    accent: "sky",
    title: "Less noise",
    caption: "Intentional curation narrows discovery so you spend more time understanding suitable places, not scrolling past them.",
  },
  {
    icon: BadgeCheck,
    accent: "emerald",
    title: "Handpicked stays",
    caption: "Properties are selected using an internal quality philosophy rather than simply maximising listing count.",
  },
  {
    icon: BookOpen,
    accent: "amber",
    title: "Storytelling",
    caption: "Video, photos, architecture, amenities and destination context help you understand what you're choosing.",
  },
  {
    icon: Compass,
    accent: "rose",
    title: "Curated experiences",
    caption: "Food, culture, nature, adventure, wellness and events extend the journey beyond the room.",
  },
  {
    icon: UserRoundCheck,
    accent: "violet",
    title: "Trusted curators",
    caption: "Handpicked creators provide destination stories and first-hand inspiration, clearly identified and permissioned.",
  },
  {
    icon: WandSparkles,
    accent: "fuchsia",
    title: "AI planning",
    caption: "AI converts preferences and inspiration into a personalised plan you can customise from a Travel Guide itinerary.",
  },
  {
    icon: Route,
    accent: "teal",
    title: "Complete journey",
    caption: "Dhyana connects discovery, stay selection, experiences, itinerary planning and app-based booking and support.",
  },
];

export function WhyDhyana() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Why Dhyana"
        title="Practical differentiation, not vague claims"
        align="center"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DIFFERENTIATORS.map(({ icon, accent, title, caption }, index) => {
          const isLast = index === DIFFERENTIATORS.length - 1;
          return (
            <article
              key={title}
              className={`group relative overflow-hidden rounded-3xl border border-border-subtle p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${ACCENTS[accent].border} ${
                isLast
                  ? "bg-linear-to-br from-teal-500/10 via-surface to-surface sm:col-span-2 lg:col-span-3 md:flex md:items-center md:gap-8 md:p-8"
                  : "bg-surface"
              }`}
            >
              <AccentSpot accent={accent} />
              <span
                aria-hidden="true"
                className="absolute top-5 right-6 text-xs font-medium tracking-wider text-foreground/30 tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <AccentIconTile icon={icon} accent={accent} />
              <div className={`relative ${isLast ? "mt-5 md:mt-0" : "mt-5"}`}>
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 max-w-prose text-sm leading-6 opacity-70">{caption}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
