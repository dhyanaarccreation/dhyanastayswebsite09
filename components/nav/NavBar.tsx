"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

// DHN-12 — Sticky Navigation & Mobile Menu (POC)
// Dropdown structure per PROJECT_BRIEF.md §3, amended 2026-09-22 by explicit
// client request: Experience / Curated Stays / Travel Guides / AI Planner
// (previously four flat top-level links) are now one "Experiences" dropdown,
// which also folds in the separate /experiences page (Experiences Showcase
// Grid) that used to only be linked from the footer — see PROJECT_BRIEF.md
// §3 amendment. "Blog" is the other dropdown in this nav — added for the
// Traveller Preference Quiz (received as a patch from another session).
// That patch labeled the quiz DHN-54, which PROJECT_BRIEF.md already uses
// for the Travel Guides Section (built at /travel-guides) — this conflict is
// UNRESOLVED, see the placeholder page at app/(marketing)/traveller-quiz.
// 2026-09-25: the combined "Become a Host & Business" item was replaced by a
// single dedicated "Business" (/business) hub. The standalone "Become a Host"
// item and its /for-hosts page were removed — hosting now lives in the
// Business hub's "Host & List" tab, which routes to the Contact form's Host
// category. See PROJECT_BRIEF.md §3 update.
// 2026-09-25: "Experience Beyond Stay" was also removed from the Experiences
// dropdown at the owner's request. The page (/experience-beyond-stay) and its
// Home section still exist, reachable from the Home section's own link.

type NavLink = { href: string; label: string };
type NavItem = NavLink | { label: string; children: NavLink[] };

function isDropdown(item: NavItem): item is { label: string; children: NavLink[] } {
  return "children" in item;
}

const PRIMARY_LINKS: NavItem[] = [
  { href: "/about", label: "About" },
  {
    label: "Experiences",
    children: [
      { href: "/curated-stays", label: "Curated Stays" },
      { href: "/experiences", label: "All Experiences" },
      { href: "/travel-guides", label: "Travel Guides" },
      { href: "/ai-trip-planner", label: "AI Trip Planner" },
    ],
  },
  { href: "/business", label: "Business" },
  {
    label: "Blog",
    children: [{ href: "/traveller-quiz", label: "Traveller Preference Quiz" }],
  },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="shrink-0 font-display text-lg font-semibold tracking-tight">
          Dhyana<span className="text-brand">Stays</span>
        </Link>

        {/* Tighter gap + nowrap at md: with five items the bar otherwise wraps
            "Become a Host" and the CTA onto two lines around 768px. */}
        <ul className="hidden items-center gap-5 text-sm font-medium whitespace-nowrap md:flex lg:gap-8">
          {PRIMARY_LINKS.map((item) =>
            isDropdown(item) ? (
              <li key={item.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 opacity-80 hover:opacity-100"
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180"
                  />
                </button>
                <ul
                  className="invisible absolute left-0 top-full z-10 mt-2 min-w-56 rounded-xl border border-border-subtle bg-surface p-2 opacity-0 shadow-lg transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
                >
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block rounded-lg px-3 py-2 opacity-80 hover:bg-brand-soft hover:opacity-100"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} className="opacity-80 hover:opacity-100">
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <ButtonLink href="/app" variant="primary" className="hidden whitespace-nowrap md:inline-flex">
          Explore the App
        </ButtonLink>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-4 border-t border-black/5 px-6 py-4 text-sm font-medium md:hidden dark:border-white/10">
          {PRIMARY_LINKS.map((item) =>
            isDropdown(item) ? (
              <li key={item.label}>
                <p className="text-xs font-semibold tracking-wide opacity-50 uppercase">{item.label}</p>
                <ul className="mt-3 flex flex-col gap-3 pl-3">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} onClick={() => setOpen(false)}>
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
          <li>
            <Link href="/app" onClick={() => setOpen(false)} className="font-semibold">
              Explore the App
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
