import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

// Home "About" teaser (DHN-14). Final copy supplied by the project owner on
// 2026-09-25 — it replaces the earlier working copy drawn from
// content-master-chapters.json topic 01.2. The full version lives on /about
// (AboutStory.tsx), which this teaser's CTA leads to.
// The id is the Hero's "scroll down" target (see Hero.tsx) — keep it.
export function AboutTeaser() {
  return (
    <section id="about-dhyana" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        align="center"
        eyebrow="About Dhyana Stays"
        title="Experience Beyond Stay"
        description="Dhyana Stays is more than a stay-booking platform. We curate unique stays, experiences, destinations, and travel stories — bringing every piece of your journey together, so you don't just book a stay, you remember a journey."
      />
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/about">
          Explore Dhyana Stays
          <ArrowRight size={16} />
        </ButtonLink>
      </div>
    </section>
  );
}
