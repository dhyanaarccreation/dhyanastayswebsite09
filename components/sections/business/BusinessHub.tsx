"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Home,
  IndianRupee,
  HardHat,
  Hotel,
  Star,
  Users,
  Briefcase,
  Heart,
  Sparkles,
  Send,
  Bot,
  ArrowRight,
  Check,
  TrendingUp,
  Camera,
  BadgeCheck,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { CapabilityBadge } from "@/components/ui/CapabilityBadge";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { ContactSection } from "@/components/sections/contact/ContactSection";

// Business Hub — /business. Ported from the Dhyana Stays Application
// prototype's Business nav section (hosts, investors, consultancy clients,
// influencers, careers) and adapted to this site's design tokens.
//
// Rule 3 (PROJECT_BRIEF.md §6): the programme copy below — investment models
// and revenue splits, influencer tiers, careers/volunteer blurbs, rolling-ad
// copy — comes from the Application prototype, NOT from the approved Master
// Content Document. Treat it as placeholder copy pending client sign-off; the
// on-page PlaceholderNotes say so too.
// Rule 1: the business assistant is a keyword-matching demo (no AI, no
// backend), so it carries a "demo" CapabilityBadge.
// Outbound CTAs point at routes that exist on THIS site (/contact,
// /why-dhyana) rather than the Application's /become-a-host, /consultancy/*,
// /careers routes. /contact?as=partner|host preselects the Partnership / Host
// category of the Contact form. The standalone /for-hosts page was removed, so
// hosting enquiries go through the Contact form's Host category.

const PARTNER_ENQUIRY = "/contact?as=partner";
const HOST_ENQUIRY = "/contact?as=host";

const tabs = [
  { key: "host", label: "Host & List", icon: Home },
  { key: "invest", label: "Invest", icon: IndianRupee },
  { key: "consultancy", label: "Consultancy", icon: HardHat },
  { key: "influencers", label: "Influencers", icon: Star },
  { key: "careers", label: "Careers", icon: Briefcase },
] as const;
type TabKey = (typeof tabs)[number]["key"];

interface Card {
  icon: typeof Home;
  title: string;
  desc: string;
  cta: string;
  href: string;
}

const cards: Record<TabKey, Card[]> = {
  host: [
    { icon: Home, title: "List your property", desc: "Tell us about your stay — our systematic checks and a manager call get you approved fast.", cta: "Start listing", href: HOST_ENQUIRY },
    { icon: BadgeCheck, title: "Become a host", desc: "New to hosting? We guide you from first photo to first guest, with quality standards that earn the Curated badge.", cta: "Join as a host", href: HOST_ENQUIRY },
  ],
  invest: [],
  consultancy: [
    { icon: HardHat, title: "Architecture consultancy", desc: "Master plans, drawings, BOQ and site supervision for resorts, tiny houses and eco stays.", cta: "Enquire about architecture", href: PARTNER_ENQUIRY },
    { icon: Hotel, title: "Hospitality consultancy", desc: "Business plans, revenue models, branding and operations manuals for your property.", cta: "Enquire about hospitality", href: PARTNER_ENQUIRY },
  ],
  influencers: [
    { icon: Camera, title: "Influencer program", desc: "Stay free at curated properties, earn on your promo code, and co-create content with our team.", cta: "Apply as influencer", href: "/business/apply-influencer" },
  ],
  careers: [
    { icon: Briefcase, title: "Careers at Dhyana", desc: "Engineering, operations, curation, field inspection — build India's most loved stay platform.", cta: "Ask about open roles", href: PARTNER_ENQUIRY },
    { icon: Heart, title: "Volunteer with us", desc: "Farm work-exchanges, festival crews and community projects at partner properties.", cta: "Apply to volunteer", href: "/contact" },
  ],
};

const tiers = [
  { name: "Nano", range: "5k – 25k followers", perks: ["1 free stay / quarter", "10% promo code", "Feature on our page"] },
  { name: "Micro", range: "25k – 150k followers", perks: ["Free stay + experiences monthly", "15% promo code + payouts", "Campaign briefs & brand kit"] },
  { name: "Macro", range: "150k+ followers", perks: ["Curated trips, all covered", "Revenue share on campaigns", "Dedicated manager"] },
];

// The three Dhyana investment & partnership models
const investModels = [
  {
    name: "Landowner Partnership",
    tagline: "You own the land. We build the business.",
    forWho: ["Farm owners", "Estate owners", "Hill & beachfront land"],
    points: [
      "You provide the land and fund the development",
      "Dhyana does everything else — feasibility, architecture, branding, marketing, bookings and operations",
      "Your idle land becomes a professionally managed hospitality asset",
    ],
    split: { partners: 70, dhyana: 30, partnersLabel: "You keep ~70%", dhyanaLabel: "Dhyana ~30%" },
    splitNote: "",
  },
  {
    name: "Land Leasing Program",
    tagline: "Lease your land. Earn without developing it.",
    forWho: ["Agricultural land", "Unused family land", "Long-term holders"],
    points: [
      "Submit your property — we inspect and approve suitable sites",
      "Dhyana and its investment partners develop and operate it",
      "You receive lease income with zero operational responsibility",
    ],
    split: null,
    splitNote: "Fixed lease income per agreement — fully passive",
  },
  {
    name: "Joint Investment Partnership",
    tagline: "Land + capital + Dhyana = shared success.",
    forWho: ["Investors with capital", "Landowners", "JV partners"],
    points: [
      "Invest in a unit — we match capital with approved land",
      "Dhyana runs end-to-end: design, construction guidance, tech, marketing and operations",
      "Returns paid as a share of operating revenue, split by your legal agreement",
    ],
    split: { partners: 55, dhyana: 45, partnersLabel: "Landowner + investor 50–60%", dhyanaLabel: "Dhyana 40–50%" },
    splitNote: "",
  },
];

// ---------- Rolling ads ----------
// An ad with `tab` switches the hub to that tab instead of navigating away.
const rollingAds: {
  tag: string;
  headline: string;
  copy: string;
  cta: string;
  href?: string;
  tab?: TabKey;
  image: string;
}[] = [
  {
    tag: "Investment",
    headline: "Own a slice of curated hospitality",
    copy: "Three models — partner with your land, lease it, or co-invest capital. Returns paid as a share of operating revenue.",
    cta: "See the models",
    tab: "invest",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=75",
  },
  {
    tag: "Why Dhyana",
    headline: "The benefits of being part of Dhyana Stays",
    copy: "Automated payouts, the Curated badge that converts, regional marketing muscle and 24×7 SOS cover for your guests.",
    cta: "Know the perks",
    href: "/why-dhyana",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1600&q=75",
  },
  {
    tag: "Careers",
    headline: "Build India's most loved stay platform",
    copy: "Engineering, curation, field inspection and operations roles across the south — remote-friendly.",
    cta: "Ask about open roles",
    href: PARTNER_ENQUIRY,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=75",
  },
  {
    tag: "Business",
    headline: "Bring your events, kitchen or fleet",
    copy: "Partners earn from every stay around them — event planners, food kitchens and rental fleets plug straight in.",
    cta: "Become a partner",
    href: PARTNER_ENQUIRY,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=75",
  },
];

// ---------- Chatbot (redirection assistant) ----------
interface Answer {
  match: string[];
  text: string;
  cta: string;
  href: string;
}
const answers: Answer[] = [
  { match: ["list", "property", "host"], text: "To list your property, tell us about it through the contact form — after our checks, a manager calls you for approval.", cta: "Start listing", href: HOST_ENQUIRY },
  { match: ["invest", "roi", "return", "plan", "land", "lease"], text: "We have three models: Landowner Partnership (you keep ~70%), Land Leasing (fixed passive income), and Joint Investment (partners share 50–60%, Dhyana takes 40–50% for running everything). All three are on this page under Invest — our desk will map you to the right one.", cta: "Talk to the investment desk", href: PARTNER_ENQUIRY },
  { match: ["architect", "design", "consult", "build"], text: "Our architecture team does master plans, drawings and BOQ; the hospitality team does business plans and branding. Enquire about either consultancy.", cta: "Enquire about consultancy", href: PARTNER_ENQUIRY },
  { match: ["event", "wedding", "planner"], text: "Event planners join as partners — your packages get booked by travellers across our stays. The partner team will onboard you.", cta: "Apply as event partner", href: PARTNER_ENQUIRY },
  { match: ["bike", "rental", "vehicle", "car"], text: "Rental providers plug their fleet into stay bookings with doorstep delivery. Apply and our partner team takes it from there.", cta: "Apply as rental partner", href: PARTNER_ENQUIRY },
  { match: ["food", "kitchen", "cook", "restaurant"], text: "Food partners serve pre-booked meals to guests — with named cooks guests can choose. Apply and we'll verify your kitchen.", cta: "Apply as food partner", href: PARTNER_ENQUIRY },
  { match: ["influencer", "creator", "instagram", "promo"], text: "Our influencer program has Nano, Micro and Macro tiers — free curated stays, promo-code earnings and campaign collabs, tracked in your own dashboard.", cta: "Apply as influencer", href: "/business/apply-influencer" },
  { match: ["job", "career", "hiring", "work"], text: "We're hiring across engineering, operations and curation — and we love field people who know their regions.", cta: "Ask about open roles", href: PARTNER_ENQUIRY },
  { match: ["volunteer"], text: "Volunteers join farm work-exchanges, festival crews and community projects at partner properties. Tell us your interests.", cta: "Apply to volunteer", href: "/contact" },
];
const fallback: Answer = {
  match: [],
  text: "I can point you to hosting, investing, consultancy, event/bike/food partnerships, the influencer program, careers or volunteering — which one sounds like you?",
  cta: "Contact us instead",
  href: "/contact",
};

interface ChatMsg {
  role: "user" | "bot";
  text: string;
  cta?: string;
  href?: string;
}

// Tailwind has no built-in "hide scrollbar" utility.
const NO_SCROLLBAR = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const CARD = "rounded-2xl border border-border-subtle bg-surface";

export function BusinessHub() {
  const [tab, setTab] = useState<TabKey>("host");
  const [ad, setAd] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "bot", text: "Namaste! I'm the business assistant. Ask me anything — listing a property, investing, partnerships, jobs — and I'll point you to the right door." },
  ]);

  const chatRef = useRef<HTMLDivElement>(null);

  // Rolling ads — auto-advance every 5s
  useEffect(() => {
    const t = setInterval(() => setAd((i) => (i + 1) % rollingAds.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Keep the newest reply in view. Scrolls the chat box only, never the page.
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const showTab = (key: TabKey) => {
    setTab(key);
    document.getElementById("business-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const ask = (q: string) => {
    const query = q.trim();
    if (!query) return;
    const lower = query.toLowerCase();
    const found = answers.find((a) => a.match.some((m) => lower.includes(m))) ?? fallback;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: query },
      { role: "bot", text: found.text, cta: found.cta, href: found.href },
    ]);
    setInput("");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ask(input);
  };

  const activeCards = cards[tab];

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-10 text-center">
        <span className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
          Business with Dhyana
        </span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-6xl">
          One door. Every way to grow with us.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
          Host a stay, invest in a project, enquire about our consultancies, plug in your events,
          bikes or kitchen, create with us as an influencer — or join the team.
        </p>
        <div className="mx-auto max-w-2xl">
          <PlaceholderNote>
            Programme details on this page (investment models, revenue shares, influencer tiers,
            careers) are placeholder copy carried over from the Application prototype — pending
            client approval. Nothing here is an offer.
          </PlaceholderNote>
        </div>
      </section>

      {/* Tabs */}
      <section id="business-tabs" className="mx-auto max-w-6xl scroll-mt-24 px-6">
        <div className={`mb-10 flex justify-start gap-2 overflow-x-auto pb-1 lg:justify-center ${NO_SCROLLBAR}`}>
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              aria-pressed={tab === key}
              onClick={() => setTab(key)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === key
                  ? "border-brand bg-brand text-white"
                  : "border-border-subtle bg-surface text-foreground/70 hover:border-brand/40 hover:text-foreground"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Cards for active tab */}
        {activeCards.length > 0 && (
          <div
            className={`grid gap-6 ${
              activeCards.length === 2 ? "md:grid-cols-2" : activeCards.length === 1 ? "mx-auto max-w-xl" : "md:grid-cols-3"
            }`}
          >
            {activeCards.map((c) => (
              <div key={c.title} className={`${CARD} flex flex-col p-6 transition-shadow hover:shadow-md`}>
                <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <c.icon size={20} />
                </span>
                <h2 className="font-display text-base font-semibold">{c.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">{c.desc}</p>
                <ButtonLink href={c.href} className="mt-5">
                  {c.cta} <ArrowRight size={14} />
                </ButtonLink>
              </div>
            ))}
          </div>
        )}

        {/* Invest tab: the three Dhyana investment models */}
        {tab === "invest" && (
          <div className="space-y-12">
            <p className="mx-auto -mt-2 max-w-2xl text-center text-foreground/70">
              Not everyone has land, not everyone has capital, and not everyone has hospitality
              expertise. Dhyana connects all three — pick the model that matches what you bring.
            </p>

            {/* Three models */}
            <div className="grid gap-6 lg:grid-cols-3">
              {investModels.map((m, i) => (
                <div
                  key={m.name}
                  className={`flex flex-col rounded-2xl border p-6 ${
                    i === 2 ? "border-brand/50 bg-brand/5" : "border-border-subtle bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-foreground/70 uppercase">Model {i + 1}</span>
                    {i === 2 && (
                      <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-brand uppercase">
                        <Sparkles size={10} /> Flagship
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-semibold">{m.name}</h3>
                  <p className="mt-0.5 text-xs text-brand italic">“{m.tagline}”</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {m.forWho.map((w) => (
                      <span key={w} className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] text-foreground/70">
                        {w}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-4 flex-1 space-y-2">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-2 text-xs leading-relaxed text-foreground/70">
                        <Check size={13} className="mt-0.5 shrink-0 text-brand" /> {p}
                      </li>
                    ))}
                  </ul>

                  {/* Revenue split */}
                  <div className="mt-5 border-t border-border-subtle pt-4">
                    <p className="mb-2 text-[10px] font-semibold tracking-wider text-foreground/70 uppercase">Revenue sharing</p>
                    {m.split ? (
                      <>
                        <div className="flex h-2.5 overflow-hidden rounded-full">
                          <div className="bg-brand" style={{ width: `${m.split.partners}%` }} />
                          <div className="bg-foreground/30" style={{ width: `${m.split.dhyana}%` }} />
                        </div>
                        <div className="mt-1.5 flex justify-between text-[10px]">
                          <span className="font-semibold text-brand">{m.split.partnersLabel}</span>
                          <span className="font-semibold text-foreground/70">{m.split.dhyanaLabel}</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs font-medium">{m.splitNote}</p>
                    )}
                  </div>

                  <ButtonLink href={PARTNER_ENQUIRY} variant={i === 2 ? "primary" : "secondary"} className="mt-5">
                    Enquire about this model <ArrowRight size={14} />
                  </ButtonLink>
                </div>
              ))}
            </div>
            <PlaceholderNote>
              Indicative splits only — final terms are set by the signed legal agreement, and
              Dhyana does not guarantee returns or occupancy.
            </PlaceholderNote>

            {/* Development process */}
            <div>
              <h3 className="text-center font-display text-2xl font-semibold">How a project comes alive</h3>
              <div className={`mt-6 flex items-center gap-2 overflow-x-auto pb-2 ${NO_SCROLLBAR}`}>
                {["Land evaluation", "Investor matching", "Legal agreements", "Design & planning", "Construction", "Curated inspection", "Platform listing", "Revenue"].map((s, i, arr) => (
                  <div key={s} className="flex shrink-0 items-center gap-2">
                    <div className={`${CARD} px-4 py-3 text-center`}>
                      <p className="text-[10px] font-bold text-brand tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                      <p className="mt-0.5 text-xs font-medium whitespace-nowrap">{s}</p>
                    </div>
                    {i < arr.length - 1 && <ArrowRight size={13} className="shrink-0 text-foreground/70" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Why Dhyana + who can apply */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className={`${CARD} p-6`}>
                <h3 className="flex items-center gap-2 font-display text-base font-semibold">
                  <TrendingUp size={16} className="text-brand" /> Why partner with Dhyana?
                </h3>
                <ul className="mt-4 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
                  {["Land evaluation & feasibility", "Architecture & sustainable design", "Branding & photography", "Guest acquisition & marketing", "Operations & revenue management", "Curated quality inspections", "Technology & AI insights", "End-to-end, not just a listing"].map((w) => (
                    <li key={w} className="flex gap-2 text-xs leading-relaxed text-foreground/70">
                      <Check size={13} className="mt-0.5 shrink-0 text-brand" /> {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${CARD} p-6`}>
                <h3 className="flex items-center gap-2 font-display text-base font-semibold">
                  <Users size={16} className="text-brand" /> Who can apply?
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Landowners", "Individual investors", "Joint venture partners", "Farm owners", "Resort developers", "Hospitality entrepreneurs", "Tourism property owners", "Real estate investors"].map((w) => (
                    <span key={w} className="rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1.5 text-xs text-brand">
                      {w}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-foreground/70">
                  Invest in a unit, lease your land, or co-build — returns are paid as a share of
                  operating revenue, on the split your model defines.
                </p>
              </div>
            </div>

            {/* CTA banner */}
            <div className="rounded-3xl border border-brand/30 bg-linear-to-r from-brand/15 via-surface to-surface p-8 text-center md:p-10">
              <h3 className="font-display text-2xl font-semibold md:text-3xl">
                Build Together. Grow Together. Earn Together.
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-foreground/70">
                Own land, hold capital, or dream of a hospitality business — our investment desk
                will map you to the right model.
              </p>
              <ButtonLink href={PARTNER_ENQUIRY} className="mt-6">
                Start your hospitality journey <ArrowRight size={15} />
              </ButtonLink>
            </div>
          </div>
        )}

        {/* Influencer tab extra: tiers */}
        {tab === "influencers" && (
          <div className="mt-12">
            <h3 className="text-center font-display text-2xl font-semibold">Partner tiers</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {tiers.map((t, i) => (
                <div key={t.name} className={`rounded-2xl border p-6 ${i === 1 ? "border-brand/50 bg-brand/5" : "border-border-subtle bg-surface"}`}>
                  <p className="font-display text-lg font-semibold">{t.name}</p>
                  <p className="mt-0.5 text-xs text-foreground/70">{t.range}</p>
                  <ul className="mt-4 space-y-2">
                    {t.perks.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-foreground/70">
                        <Check size={14} className="mt-0.5 shrink-0 text-brand" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ---------- Rolling ads ---------- */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="relative h-75 overflow-hidden rounded-3xl border border-brand/25 md:h-70">
          {rollingAds.map((a, i) => (
            <div
              key={a.tag}
              inert={i !== ad}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === ad ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={a.image} alt={a.headline} className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/15" />
              <div className="relative z-10 flex h-full max-w-xl flex-col justify-center p-8 md:p-12">
                <span className="mb-3 self-start rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-white/90 uppercase backdrop-blur-sm">
                  {a.tag} · Opportunity
                </span>
                <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">{a.headline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{a.copy}</p>
                {a.tab ? (
                  <button
                    type="button"
                    onClick={() => showTab(a.tab!)}
                    className="mt-5 inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-medium text-brand-strong transition-colors hover:bg-white/90"
                  >
                    {a.cta} <ArrowRight size={14} />
                  </button>
                ) : (
                  <ButtonLink href={a.href!} variant="inverse" className="mt-5 self-start">
                    {a.cta} <ArrowRight size={14} />
                  </ButtonLink>
                )}
              </div>
            </div>
          ))}

          {/* Dots */}
          <div className="absolute right-6 bottom-4 z-20 flex items-center gap-2">
            {rollingAds.map((a, i) => (
              <button
                key={a.tag}
                type="button"
                onClick={() => setAd(i)}
                aria-label={`Show ad: ${a.tag}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === ad ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
        <PlaceholderNote>Ad copy and photography are placeholders pending client-approved content.</PlaceholderNote>
      </section>

      {/* ---------- Business chatbot ---------- */}
      <section className="mx-auto mt-20 max-w-3xl px-6">
        <div className="mb-6 text-center">
          <span className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            <Sparkles size={13} /> Not sure where to start?
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Ask the business assistant</h2>
          <div className="mt-3">
            <CapabilityBadge capability="demo" />
          </div>
          <p className="mx-auto mt-2 max-w-md text-xs text-foreground/70">
            A keyword-matching guide that points you to the right page — not a live AI, and it
            can&apos;t answer detailed questions.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border-subtle bg-surface">
          <div ref={chatRef} className="max-h-90 space-y-4 overflow-y-auto p-5" aria-live="polite">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-4 py-2.5 text-sm text-white">{m.text}</p>
                </div>
              ) : (
                <div key={i} className="flex gap-2.5">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <Bot size={15} />
                  </span>
                  <div className="max-w-[85%]">
                    <p className="rounded-2xl rounded-tl-sm bg-brand-soft px-4 py-2.5 text-sm">{m.text}</p>
                    {m.cta && m.href && (
                      <Link
                        href={m.href}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-strong"
                      >
                        {m.cta} <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Quick chips */}
          <div className={`flex gap-2 overflow-x-auto px-5 pb-3 ${NO_SCROLLBAR}`}>
            {["How do I list my property?", "Minimum investment?", "Apply as influencer", "Food partner", "Jobs at Dhyana"].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="shrink-0 rounded-full border border-border-subtle px-3.5 py-1.5 text-xs text-foreground/70 transition-colors hover:border-brand/40 hover:text-foreground"
              >
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border-subtle p-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Ask the business assistant"
              placeholder="Type your question — “how do I invest?”, “list my events”…"
              className="flex-1 rounded-full border border-border-subtle bg-background px-4 py-2.5 text-sm placeholder:text-foreground/50 focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-strong"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-foreground/70">
          <Users size={11} /> Prefer a human? Send us a message —{" "}
          <Link href="#contact" className="text-brand hover:underline">
            contact us
          </Link>
          .
        </p>
      </section>

      {/* ================= CONTACT ================= */}
      <div className="mt-20 border-t border-border-subtle">
        <ContactSection />
      </div>
    </div>
  );
}
