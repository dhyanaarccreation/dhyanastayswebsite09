import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Youtube, Linkedin } from "lucide-react";

// DHN-27 — Footer refinement (POC). Column structure follows Chapter 16
// FOOTER's approved topics (16.1-16.6: Explore, Services, Company, App,
// Legal, Social Media). Contact facts are the real details found in the
// client's UI Reference PDF — see PROJECT_BRIEF.md context, not placeholders.
// The standalone "Services" column (DHN-19 Services Tabs: For Travellers /
// For Hosts / For Travel Curators) was removed by client decision — For
// Hosts became its own dedicated page (DHN-55) and is listed under Explore
// instead; there is no dedicated page yet for Travellers/Curators services.

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/curated-stays", label: "Curated Stays" },
      { href: "/experiences", label: "Experiences" },
      { href: "/travel-guides", label: "Travel Guides" },
      { href: "/ai-trip-planner", label: "AI Planner" },
      { href: "/for-hosts", label: "Become a Host & Business" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/why-dhyana", label: "Why Dhyana" },
      { href: "/ecosystem", label: "Ecosystem" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "App",
    links: [
      { href: "/app", label: "Access the App" },
      { href: "/app-features", label: "App Features" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy-policy", label: "Privacy Policy" },
      { href: "/legal/terms-and-conditions", label: "Terms & Conditions" },
      { href: "/legal/cancellation-policy", label: "Cancellation Policy" },
      { href: "/legal/cookie-policy", label: "Cookie Policy" },
    ],
  },
];

// Social links are placeholders until the client confirms verified official
// channels (Chapter 16.6) — hrefs point at "#" rather than a guessed handle.
const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-subtle bg-brand-soft">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 text-sm sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-brand" />
          <a href="mailto:dhyanaarccreation@gmail.com" className="opacity-80 hover:opacity-100">
            dhyanaarccreation@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={16} className="text-brand" />
          <span className="opacity-80">+91 96266 89316</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-brand" />
          <span className="opacity-80">Near Auroville, Tamil Nadu – 605101</span>
        </div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 text-sm sm:grid-cols-3 md:grid-cols-5">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 font-display font-semibold">{col.title}</h3>
              <ul className="space-y-2 opacity-80">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border-subtle px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} Dhyana Arc Creation LLP. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href} aria-label={label} className="text-brand/70 hover:text-brand">
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
