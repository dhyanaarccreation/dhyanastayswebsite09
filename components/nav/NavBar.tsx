"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// DHN-12 — Sticky Navigation & Mobile Menu (POC)
// Dropdown structure per PROJECT_BRIEF.md §3. Placeholder links — wire up
// dropdowns with Framer Motion once the section pages have real content.

const PRIMARY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/experience-beyond-stay", label: "Experience" },
  { href: "/curated-stays", label: "Curated Stays" },
  { href: "/services/travellers", label: "Services" },
  { href: "/ai-trip-planner", label: "AI Planner" },
  { href: "/services/hosts", label: "For Hosts" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Dhyana Stays
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          {PRIMARY_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="opacity-80 hover:opacity-100">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/app"
          className="hidden rounded-full bg-black px-5 py-2 text-sm font-medium text-white md:inline-block dark:bg-white dark:text-black"
        >
          Explore the App
        </Link>

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
          {PRIMARY_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
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
