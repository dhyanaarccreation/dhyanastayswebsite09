import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// DHN-14 — About Dhyana Section (POC). Content basis: Home topic 01.2 "What
// is Dhyana?" (content-master-chapters.json, chapter 01 — approved bullets:
// Brand definition; problem/opportunity; curated proposition; link to About).
// The Website/Application comparison reuses the approved guiding principle
// from PROJECT_BRIEF.md §1, not invented copy.

const JOURNEY_COMPARISON: { website: string; application: string }[] = [
  { website: "Discover", application: "Plan" },
  { website: "Understand", application: "Personalise" },
  { website: "Trust", application: "Book" },
  { website: "Desire", application: "Travel" },
  { website: "—", application: "Manage" },
];

export function AboutDhyana() {
  return (
    <section id="about-dhyana" className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
      <div>
        <SectionHeading
          eyebrow="What is Dhyana?"
          title="The website explains. The application executes."
        />
        <p className="mt-6 text-base leading-7 opacity-80">
          Dhyana Stays is a curated hospitality ecosystem connecting distinctive
          properties, real destinations and meaningful experiences — not another
          crowded listing site. Travellers face fragmented, noisy discovery, while
          quality properties and local experiences often struggle to be found by
          the people who&apos;d love them.
        </p>
        <p className="mt-4 text-base leading-7 opacity-80">
          Dhyana curates the stay, the destination and the experience into one
          journey, then lets you personalise it with AI and take it further in
          the app.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
        >
          Read our full story
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="rounded-3xl border border-border-subtle bg-surface p-8 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-semibold tracking-[0.15em] text-brand uppercase">
              <th className="pb-4">Website (here)</th>
              <th className="pb-4">Application</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {JOURNEY_COMPARISON.map((row) => (
              <tr key={row.application}>
                <td className="py-3 opacity-80">{row.website}</td>
                <td className="py-3 font-medium">{row.application}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 text-xs opacity-60">
          No booking, payments or live AI planning happen on this website — every
          feature demo here is honestly labelled and routes to the app for the
          real thing.
        </p>
      </div>
    </section>
  );
}
