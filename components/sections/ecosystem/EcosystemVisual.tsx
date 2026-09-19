import { Plane, Home as HomeIcon, Compass, Leaf } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// DHN-21 — Dhyana Ecosystem Visual (POC). Content basis: Home topic 01.9
// (approved: Traveller; Host; Travel Curator; Experience Provider; Dhyana;
// future architecture/investor/local-community relationships where approved),
// captions from Chapter 10's approved one-line topic purposes (10.1-10.5).

const STAKEHOLDERS = [
  {
    icon: Plane,
    title: "Traveller",
    caption: "Discovers stays and experiences, uses Guides and AI, builds an itinerary and completes the journey in the app.",
  },
  {
    icon: HomeIcon,
    title: "Host",
    caption: "Provides a stay and participates through onboarding, storytelling, demand generation and hospitality support.",
  },
  {
    icon: Compass,
    title: "Travel Curator",
    caption: "Creates destination stories, explores curated stays and can refer travellers through approved mechanisms.",
  },
  {
    icon: Leaf,
    title: "Experience Provider",
    caption: "Supplies local food, culture, nature, adventure, wellness, activities or events.",
  },
] as const;

export function EcosystemVisual() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Ecosystem" title="One connected model" align="center" />

      <div className="mt-14 flex flex-col items-center">
        <div className="rounded-2xl bg-brand px-8 py-5 text-center text-white shadow-lg">
          <p className="font-display text-xl font-semibold">Dhyana</p>
          <p className="mt-1 max-w-xs text-xs text-white/80">
            Connects curation, storytelling, technology, partnerships and the
            traveller journey.
          </p>
        </div>

        <div className="mt-4 h-8 w-px bg-border-subtle" />

        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAKEHOLDERS.map(({ icon: Icon, title, caption }) => (
            <div
              key={title}
              className="rounded-2xl border border-border-subtle bg-surface p-6 text-center"
            >
              <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 opacity-70">{caption}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center text-xs opacity-50 italic">
        Future participants — such as investors or local-community
        partnerships — will be added here only once those relationships are
        approved.
      </p>
    </section>
  );
}
