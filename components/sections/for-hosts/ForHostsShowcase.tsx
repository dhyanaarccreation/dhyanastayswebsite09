import {
  AlertTriangle,
  CheckCircle2,
  Video,
  Sparkles,
  ClipboardList,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { BecomeHostForm } from "./BecomeHostForm";

// DHN-55 — For Hosts Dedicated Page (POC), recommended in PROJECT_BRIEF.md
// §4 because Chapter 11 FOR HOSTS is far deeper (7 topics: problems,
// solution, onboarding, marketing, consultancy, property management, become
// a host) than the original Services-tab treatment implied. Content basis:
// Chapter 11 one-line topic purposes (11.1-11.7, PROJECT_BRIEF.md §5) — only
// topic purposes are client-approved, so section copy below stays close to
// those purposes rather than inventing detail (rule 3).

const HOST_PROBLEMS = [
  "Fragmented demand across channels",
  "OTA dependence and commission pressure",
  "Difficulty standing out from generic listings",
  "Weak storytelling and positioning",
  "Operational gaps in guest experience",
  "Difficulty reaching the right travellers",
];

const DHYANA_SOLUTION = [
  "Curated discovery instead of a crowded listings grid",
  "Property storytelling through photo, video and narrative",
  "Destination marketing alongside the property itself",
  "Travel Curator collaborations for authentic reach",
  "Support toward a complete guest experience",
];

const ONBOARDING_STEPS = [
  "Initial conversation",
  "Property assessment",
  "Information & media collection",
  "Content preparation",
  "Listing setup",
  "Quality checks",
  "Campaign preparation",
  "Launch",
];

const SUPPORT_AREAS: { icon: typeof Video; title: string; points: string[]; note?: string }[] = [
  {
    icon: Video,
    title: "Marketing",
    points: [
      "Property video and photography",
      "Destination storytelling",
      "Social content",
      "Travel Curator collaborations",
      "Cluster/region campaigns",
    ],
  },
  {
    icon: Sparkles,
    title: "Hospitality Consultancy",
    points: [
      "USP and positioning",
      "Storytelling direction",
      "Guest experience design",
      "Architecture/interior direction",
      "Hospitality standards & operational readiness",
    ],
  },
  {
    icon: ClipboardList,
    title: "Property Management",
    points: ["Guest communication", "Day-to-day operations", "Occupancy optimisation", "Standards & reporting"],
    note: "Where contracted — exact scope and fee are confirmed in the service agreement, not published here.",
  },
];

export function ForHostsShowcase() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-24">
        <SectionHeading
          eyebrow="Become a Host & Business"
          title="Your property, positioned and marketed like a story"
          description="Property onboarding, storytelling, destination marketing, hospitality consultancy and — where contracted — property management."
        />
      </section>

      {/* 11.1 Host Problems / 11.2 Dhyana Solution */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border-subtle bg-surface p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-brand" />
              <h3 className="font-display text-lg font-semibold">Problems hosts face</h3>
            </div>
            <ul className="mt-4 space-y-2 text-sm opacity-80">
              {HOST_PROBLEMS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border-subtle bg-brand-soft p-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-brand" />
              <h3 className="font-display text-lg font-semibold">The Dhyana solution</h3>
            </div>
            <ul className="mt-4 space-y-2 text-sm opacity-80">
              {DHYANA_SOLUTION.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <PlaceholderNote>Dhyana does not guarantee occupancy or revenue outcomes.</PlaceholderNote>
          </div>
        </div>
      </section>

      {/* 11.3 Property Onboarding */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h3 className="font-display text-xl font-semibold">Property onboarding</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 opacity-70">
          An eight-step path from first conversation to launch. Exact timing is an internal
          operations decision, not published here.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ONBOARDING_STEPS.map((step, index) => (
            <li key={step} className="rounded-2xl border border-border-subtle bg-surface p-5">
              <span className="flex size-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                {index + 1}
              </span>
              <p className="mt-3 text-sm font-medium">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 11.4 Marketing / 11.5 Hospitality Consultancy / 11.6 Property Management */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h3 className="font-display text-xl font-semibold">How Dhyana supports hosts</h3>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {SUPPORT_AREAS.map(({ icon: Icon, title, points, note }) => (
            <div key={title} className="rounded-2xl border border-border-subtle bg-surface p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Icon size={20} />
              </div>
              <h4 className="mt-4 font-display text-base font-semibold">{title}</h4>
              <ul className="mt-3 space-y-1.5 text-sm opacity-70">
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {note ? <PlaceholderNote>{note}</PlaceholderNote> : null}
            </div>
          ))}
        </div>
      </section>

      {/* 11.7 Become a Host */}
      <section id="become-a-host" className="mx-auto max-w-5xl px-6 pb-24">
        <SectionHeading eyebrow="Become a Host" title="Tell us about your property" />
        <div className="mt-8">
          <BecomeHostForm />
        </div>
      </section>
    </>
  );
}
