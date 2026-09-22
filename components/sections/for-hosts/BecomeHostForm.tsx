"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// 11.7 Become a Host — enquiry form. Fields match PROJECT_BRIEF.md §5's
// approved topic purpose exactly: "property, location, contact, type,
// approximate inventory, current status and partnership interest; include
// consent/privacy." Submits to POST /api/leads (formType: "hostEnquiry"),
// which appends a row to the "Host Enquiries" sheet of the server-side
// leads workbook — see lib/leads.ts and README.md "Lead capture" for why
// this form has a real API call unlike the rest of this POC (rule 2).

const PROPERTY_TYPES = ["Villa", "Farm Stay", "Heritage Home", "Tiny House", "Wellness Retreat", "Other"] as const;

const CURRENT_STATUS_OPTIONS = [
  "Not yet listed anywhere",
  "Listed on OTAs",
  "Independently operating",
  "Already in conversation with Dhyana",
] as const;

const PARTNERSHIP_INTERESTS = [
  "Full listing & marketing",
  "Hospitality consultancy",
  "Property management (where contracted)",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function BecomeHostForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);

  function toggleInterest(value: string) {
    setInterests((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      formType: "hostEnquiry",
      propertyName: form.get("propertyName"),
      location: form.get("location"),
      contactName: form.get("contactName"),
      email: form.get("email"),
      phone: form.get("phone"),
      propertyType: form.get("propertyType"),
      inventory: form.get("inventory"),
      status: form.get("status"),
      interest: interests,
      notes: form.get("notes"),
      consent: form.get("consent") === "on",
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
        <p className="mt-2 text-sm opacity-70">
          Your enquiry has been recorded. Our team reviews new property enquiries and will
          follow up at the email or phone number you provided.
        </p>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="opacity-70">Property name</span>
          <input
            required
            name="propertyName"
            type="text"
            placeholder="e.g. Mango Grove Cottage"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="opacity-70">Location</span>
          <input
            required
            name="location"
            type="text"
            placeholder="e.g. Coorg, Karnataka"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          <span className="opacity-70">Your name</span>
          <input
            required
            name="contactName"
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
        <label className="text-sm">
          <span className="opacity-70">Phone</span>
          <input
            required
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          <span className="opacity-70">Property type</span>
          <select
            required
            name="propertyType"
            defaultValue=""
            className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Select type
            </option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="opacity-70">Approx. inventory (rooms/units)</span>
          <input
            name="inventory"
            type="number"
            min={1}
            placeholder="e.g. 6"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          <span className="opacity-70">Current status</span>
          <select
            required
            name="status"
            defaultValue=""
            className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Select status
            </option>
            {CURRENT_STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm opacity-70">Partnership interest</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PARTNERSHIP_INTERESTS.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                interests.includes(interest) ? "bg-brand text-white" : "bg-brand-soft text-foreground/70"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-4 block text-sm">
        <span className="opacity-70">Anything else we should know? (optional)</span>
        <textarea
          name="notes"
          rows={3}
          className="mt-1 w-full rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm"
        />
      </label>

      <label className="mt-4 flex items-start gap-2 text-xs opacity-70">
        <input required name="consent" type="checkbox" className="mt-0.5" />
        <span>
          I consent to Dhyana Stays storing and using this information to respond to my
          enquiry, per the{" "}
          <Link href="/legal/privacy-policy" className="text-brand hover:underline">
            Privacy Policy
          </Link>
          .
        </span>
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
        {status === "submitting" ? "Sending…" : "Submit enquiry"}
      </Button>
    </form>
  );
}
