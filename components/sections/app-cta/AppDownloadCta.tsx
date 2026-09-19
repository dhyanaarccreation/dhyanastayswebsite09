import { QrCode } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { CapabilityBadge } from "@/components/ui/CapabilityBadge";

// DHN-24 — App Download / Access CTA (POC). Content basis: Home topic 01.12
// "Final CTA" (approved: Explore/Open App; QR; Host enquiry; Curator enquiry;
// short brand reminder). No app store listing or deployed URL exists yet, so
// the QR/store badges are honest "coming soon" placeholders rather than a
// QR code pointing nowhere real (rule 1) — "Explore the App" links to the
// real, working /app route in this project instead.

export function AppDownloadCta() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="rounded-3xl bg-brand px-8 py-14 text-center text-white sm:px-16">
        <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
          Experience Beyond Stay
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Take Dhyana further, in the app
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80">
          Curated stays, real destinations and an AI-personalised trip — this
          website introduces it, the app is where you plan, book and travel.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/app" variant="inverse">
            Explore the App
          </ButtonLink>
          <div className="flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm text-white/80">
            <QrCode size={18} />
            <span>QR code</span>
            <CapabilityBadge capability="coming-soon" />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-white/15 pt-8 text-sm">
          <ButtonLink href="/contact?as=host" variant="ghost-inverse">
            Host enquiry
          </ButtonLink>
          <ButtonLink href="/contact?as=curator" variant="ghost-inverse">
            Curator enquiry
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
