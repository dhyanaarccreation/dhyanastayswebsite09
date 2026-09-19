import Link from "next/link";

// DHN-27 — Footer (POC). Structure per PROJECT_BRIEF.md §3 (Footer Architecture).

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Brand",
    links: [
      { href: "/about", label: "About" },
      { href: "/experience-beyond-stay", label: "Experience Beyond Stay" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/curated-stays", label: "Curated Stays" },
      { href: "/experiences", label: "Experiences" },
      { href: "/travel-guides", label: "Travel Guides" },
      { href: "/ai-trip-planner", label: "AI Planner" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/travellers", label: "Travellers" },
      { href: "/services/hosts", label: "Hosts" },
      { href: "/services/travel-curators", label: "Travel Curators" },
    ],
  },
  {
    title: "Application",
    links: [{ href: "/app", label: "Open App" }],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy-policy", label: "Privacy" },
      { href: "/legal/terms-and-conditions", label: "Terms" },
      { href: "/legal/cancellation-policy", label: "Cancellation" },
      { href: "/legal/cookie-policy", label: "Cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-zinc-50 dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 text-sm sm:grid-cols-3 md:grid-cols-6">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 font-semibold">{col.title}</h3>
            <ul className="space-y-2 opacity-80">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/5 px-6 py-6 text-center text-xs opacity-60 dark:border-white/10">
        © {new Date().getFullYear()} Dhyana Stays. All rights reserved.
      </div>
    </footer>
  );
}
