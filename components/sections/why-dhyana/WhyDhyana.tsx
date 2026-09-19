import { Filter, BadgeCheck, BookOpen, Sparkles, Users, Wand2, Route } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// DHN-17 — Why Dhyana Differentiator Section (POC). Content basis: Home topic
// 01.8 (approved bullets, in order: Less noise; handpicked stays;
// storytelling; curated experiences; trusted curators; AI planning; complete
// journey), captioned using Chapter 09's approved one-line topic purposes
// (09.1-09.7 map 1:1 to these bullets).

const DIFFERENTIATORS = [
  {
    icon: Filter,
    title: "Less noise",
    caption: "Intentional curation narrows discovery so you spend more time understanding suitable places, not scrolling past them.",
  },
  {
    icon: BadgeCheck,
    title: "Handpicked stays",
    caption: "Properties are selected using an internal quality philosophy rather than simply maximising listing count.",
  },
  {
    icon: BookOpen,
    title: "Storytelling",
    caption: "Video, photos, architecture, amenities and destination context help you understand what you're choosing.",
  },
  {
    icon: Sparkles,
    title: "Curated experiences",
    caption: "Food, culture, nature, adventure, wellness and events extend the journey beyond the room.",
  },
  {
    icon: Users,
    title: "Trusted curators",
    caption: "Handpicked creators provide destination stories and first-hand inspiration, clearly identified and permissioned.",
  },
  {
    icon: Wand2,
    title: "AI planning",
    caption: "AI converts preferences and inspiration into a personalised plan you can customise from a Travel Guide itinerary.",
  },
  {
    icon: Route,
    title: "Complete journey",
    caption: "Dhyana connects discovery, stay selection, experiences, itinerary planning and app-based booking and support.",
  },
] as const;

export function WhyDhyana() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Why Dhyana"
        title="Practical differentiation, not vague claims"
        align="center"
      />

      <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {DIFFERENTIATORS.map(({ icon: Icon, title, caption }) => (
          <div key={title} className="flex gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Icon size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-6 opacity-70">{caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
