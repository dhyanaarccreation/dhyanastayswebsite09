"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

// DHN-26 — Contact & Lead Generation Forms, category-based (POC). Content
// basis: Chapter 15 CONTACT categories (General/Traveller/Host/Travel
// Curator/Partnership) and PROJECT_BRIEF.md §4's explicit note that the form
// changes based on category selection. Contact facts (email/phone/address)
// are the real details found in the client's UI Reference PDF, not
// placeholders. Submits to POST /api/leads (formType: "contact"), which
// appends a row to the "Contact Enquiries" sheet of the server-side leads
// workbook — a scoped exception to the front-end-only rule, see lib/leads.ts
// and README.md "Lead capture".

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

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const searchParams = useSearchParams();
  const preselected = QUERY_PARAM_TO_CATEGORY[searchParams.get("as") ?? ""];
  const [category, setCategory] = useState<CategoryLabel>(preselected ?? "Traveller");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      formType: "contact",
      category,
      name: form.get("name"),
      email: form.get("email"),
      categoryDetail: form.get("categoryDetail"),
      message: form.get("message"),
      // Honeypot — left empty by real visitors, hidden from view below.
      companyWebsite: form.get("companyWebsite"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border-subtle bg-surface p-8 text-center">
        <h3 className="font-display text-xl font-semibold">Thanks — we&apos;ll be in touch</h3>
        <p className="mt-2 text-sm opacity-70">Your enquiry has been recorded and our team will follow up by email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border-subtle bg-surface p-8">
      {/* Honeypot field — visually hidden, real users never fill it. */}
      <input
        type="text"
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

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
            name="name"
            type="text"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="opacity-70">Email</span>
          <input
            required
            name="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="opacity-70">{CATEGORY_FIELDS[category][0].label}</span>
        <input
          name="categoryDetail"
          type="text"
          placeholder={CATEGORY_FIELDS[category][0].placeholder}
          className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
        />
      </label>

      <label className="mt-4 block text-sm">
        <span className="opacity-70">Message</span>
        <textarea
          required
          name="message"
          rows={4}
          className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
        />
      </label>

      {status === "error" ? (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">
          {error} You can also email us directly at{" "}
          <a href="mailto:dhyanaarccreation@gmail.com" className="underline">
            dhyanaarccreation@gmail.com
          </a>
          .
        </p>
      ) : null}

      <Button type="submit" variant="primary" className="mt-6" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send enquiry"}
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
