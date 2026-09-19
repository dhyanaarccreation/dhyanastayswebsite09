"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

// DHN-26 — Contact & Lead Generation Forms, category-based (POC). Content
// basis: Chapter 15 CONTACT categories (General/Traveller/Host/Travel
// Curator/Partnership) and PROJECT_BRIEF.md §4's explicit note that the form
// changes based on category selection. Contact facts (email/phone/address)
// are the real details found in the client's UI Reference PDF, not
// placeholders. Front-end only per rule 3 — submission is a local mock
// confirmation state, no real API call.

const CATEGORIES = ["Traveller", "Host", "Travel Curator", "Partnership"] as const;
type CategoryLabel = (typeof CATEGORIES)[number];

const CATEGORY_FIELDS: Record<CategoryLabel, { label: string; placeholder: string }[]> = {
  Traveller: [{ label: "Destination or trip you're planning", placeholder: "e.g. Auroville, Nov trip" }],
  Host: [{ label: "Property name & location", placeholder: "e.g. Mango Grove Cottage, Coorg" }],
  "Travel Curator": [{ label: "Instagram / YouTube channel", placeholder: "@yourhandle" }],
  Partnership: [{ label: "Organisation name", placeholder: "Your company or community" }],
};

const QUERY_PARAM_TO_CATEGORY: Record<string, CategoryLabel> = {
  host: "Host",
  curator: "Travel Curator",
  traveller: "Traveller",
  partner: "Partnership",
};

function ContactForm() {
  const searchParams = useSearchParams();
  const preselected = QUERY_PARAM_TO_CATEGORY[searchParams.get("as") ?? ""];
  const [category, setCategory] = useState<CategoryLabel>(preselected ?? "Traveller");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border-subtle bg-surface p-8 text-center">
        <h3 className="font-display text-xl font-semibold">Thanks — we&apos;ll be in touch</h3>
        <p className="mt-2 text-sm opacity-70">
          This is a POC form: nothing was sent anywhere. A real enquiry route
          will be wired up when the backend is connected.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-3xl border border-border-subtle bg-surface p-8"
    >
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === c ? "bg-brand text-white" : "bg-brand-soft text-foreground/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="opacity-70">Name</span>
          <input
            required
            type="text"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="opacity-70">Email</span>
          <input
            required
            type="email"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="opacity-70">{CATEGORY_FIELDS[category][0].label}</span>
        <input
          type="text"
          placeholder={CATEGORY_FIELDS[category][0].placeholder}
          className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
        />
      </label>

      <label className="mt-4 block text-sm">
        <span className="opacity-70">Message</span>
        <textarea
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
        />
      </label>

      <Button type="submit" variant="primary" className="mt-6">
        Send enquiry
      </Button>
    </form>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="Contact" title="Tell us who you are" />

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-2">
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 text-brand" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <a href="mailto:dhyanaarccreation@gmail.com" className="text-sm opacity-70 hover:underline">
                dhyanaarccreation@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="mt-0.5 text-brand" />
            <div>
              <p className="text-sm font-medium">Call</p>
              <p className="text-sm opacity-70">+91 96266 89316</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 text-brand" />
            <div>
              <p className="text-sm font-medium">HQ</p>
              <p className="text-sm opacity-70">Near Auroville, Tamil Nadu – 605101</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
