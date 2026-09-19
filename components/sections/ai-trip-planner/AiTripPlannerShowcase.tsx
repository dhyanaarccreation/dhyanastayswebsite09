import { CalendarDays, Users2, PartyPopper, Wallet, Sparkles, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CapabilityBadge } from "@/components/ui/CapabilityBadge";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { ButtonLink } from "@/components/ui/Button";

// DHN-20 — AI Trip Planner Showcase, static demo only (POC). Content basis:
// Home topic 01.7 (approved: Destination/dates; travellers; occasion; budget;
// stay/experience preferences; AI itinerary preview; customise in app; AI Trip
// Guide; release-status label). Per PROJECT_BRIEF.md §1/§6 rule 1, this is a
// non-interactive static demo — no live AI call, no form that pretends to
// generate anything. Preference fields and the itinerary preview are fixed
// sample content.

const PREFERENCES = [
  { icon: MapPin, label: "Destination", value: "Auroville & Pondicherry" },
  { icon: CalendarDays, label: "Dates", value: "12 – 16 Nov" },
  { icon: Users2, label: "Travellers", value: "2 adults" },
  { icon: PartyPopper, label: "Occasion", value: "Anniversary" },
  { icon: Wallet, label: "Budget", value: "₹₹₹ Comfortable" },
];

const SAMPLE_ITINERARY = [
  { day: "Day 1", plan: "Check into a tiny house stay in Auroville, sunset at the Matrimandir viewpoint." },
  { day: "Day 2", plan: "Farm-to-table breakfast, backwater kayaking, evening at a curated food experience." },
  { day: "Day 3", plan: "Wellness morning (yoga + Ayurvedic therapy), afternoon heritage walk in Pondicherry." },
  { day: "Day 4", plan: "Free morning, checkout, curator-recommended lunch stop on the way home." },
];

export function AiTripPlannerShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-wrap items-center gap-3">
        <SectionHeading eyebrow="AI Trip Planner" title="Preferences in, a personalised plan out" />
        <CapabilityBadge capability="demo" />
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-6 opacity-70">
        Dhyana AI understands destination, dates, traveller profile, budget and
        preferences to assist hospitality — not replace it. The panel below is a
        fixed sample, not a live generator.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <div className="rounded-3xl border border-border-subtle bg-surface p-6 lg:col-span-2">
          <h3 className="font-display text-lg font-semibold">Trip preferences</h3>
          <dl className="mt-5 space-y-4">
            {PREFERENCES.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Icon size={16} />
                </div>
                <div>
                  <dt className="text-xs opacity-50">{label}</dt>
                  <dd className="text-sm font-medium">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-3xl border border-border-subtle bg-surface p-6 lg:col-span-3">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-brand" />
            <h3 className="font-display text-lg font-semibold">Sample AI itinerary preview</h3>
          </div>
          <ol className="mt-5 space-y-4">
            {SAMPLE_ITINERARY.map(({ day, plan }) => (
              <li key={day} className="flex gap-4 border-b border-border-subtle pb-4 last:border-0 last:pb-0">
                <span className="w-16 shrink-0 text-sm font-semibold text-brand">{day}</span>
                <span className="text-sm leading-6 opacity-80">{plan}</span>
              </li>
            ))}
          </ol>
          <PlaceholderNote>
            Sample itinerary shown for layout purposes — recommendations are
            distinct from confirmed availability, which lives in the app.
          </PlaceholderNote>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <ButtonLink href="/ai-trip-planner" variant="secondary">
          More about the AI Trip Planner
        </ButtonLink>
        <div className="flex items-center gap-2 text-sm opacity-70">
          <span>AI Trip Guide</span>
          <CapabilityBadge capability="coming-soon" />
        </div>
      </div>
    </section>
  );
}
