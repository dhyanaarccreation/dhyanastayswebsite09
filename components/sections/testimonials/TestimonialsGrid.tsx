import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";

// DHN-23 — Testimonials Slider (POC, built as a responsive grid). Content
// basis: Home topic 01.11 (approved: Traveller; Host; Curator stories;
// written/video; verified outcomes where available; responsive
// carousel/grid). No real, permissioned testimonials exist yet (Appendix C of
// the Master Content Document requires testimonials to be "genuine,
// permissioned and correctly attributed" before launch) — quotes below are
// generic sample placeholders, deliberately not attributed to invented named
// people, so nothing here could be mistaken for a real endorsement.

const SAMPLE_TESTIMONIALS = [
  {
    role: "Traveller",
    quote: "Sample quote — pending a client-approved traveller testimonial.",
  },
  {
    role: "Host",
    quote: "Sample quote — pending a client-approved host testimonial.",
  },
  {
    role: "Travel Curator",
    quote: "Sample quote — pending a client-approved curator testimonial.",
  },
];

export function TestimonialsGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Testimonials" title="Trust, in real voices" align="center" />

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {SAMPLE_TESTIMONIALS.map(({ role, quote }) => (
          <div key={role} className="rounded-2xl border border-border-subtle bg-surface p-6">
            <Quote size={20} className="text-brand/50" />
            <p className="mt-4 text-sm leading-6 opacity-70 italic">{quote}</p>
            <p className="mt-4 text-xs font-semibold tracking-[0.15em] text-brand uppercase">
              {role}
            </p>
          </div>
        ))}
      </div>

      <PlaceholderNote>
        Sample layout only — no testimonial shown here is a real quote.
        Genuine, permissioned traveller, host and curator feedback will
        replace these before launch.
      </PlaceholderNote>
    </section>
  );
}
