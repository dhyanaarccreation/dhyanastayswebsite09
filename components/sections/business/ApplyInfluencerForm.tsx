"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Cake,
  Camera,
  AtSign,
  Link2,
  Users,
  Eye,
  PlayCircle,
  FolderOpen,
  Tag,
  Globe,
  Plane,
  IndianRupee,
  Building2,
  Heart,
  Video,
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  Home,
  LayoutDashboard,
  Clock,
  Star,
  UploadCloud,
  TrendingUp,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CapabilityBadge } from "@/components/ui/CapabilityBadge";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";

// /business/apply-influencer — three-step influencer application, ported from
// the Application prototype and adapted to this site's tokens.
//
// Rule 1 + rule 2 (PROJECT_BRIEF.md §6): there is NO backend behind this form
// on the website. Only the Contact and Become-a-Host forms have a real
// /api/leads endpoint (client-approved exception); adding a third real
// submission path needs the same explicit sign-off. So this form validates and
// steps through like the prototype, but never sends anything — it is labelled
// "demo", and the finish screen says so and points to /contact?as=curator (the
// real, working enquiry path) instead of claiming the application was received.
// Rule 3: benefit copy ("48 hours", "no fees") is prototype copy, not
// client-approved — flagged with a PlaceholderNote below.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s]{7,15}$/;

const steps = [
  { key: 1, label: "Personal", title: "Personal Details", subtitle: "Tell us a little about you." },
  { key: 2, label: "Social Media", title: "Social Media", subtitle: "Your reach and where we can see your work." },
  { key: 3, label: "Creator Details", title: "Creator Details", subtitle: "What you create and how you'd like to collaborate." },
] as const;

const contentCategories = [
  "Travel",
  "Food & Culinary",
  "Lifestyle",
  "Wellness & Yoga",
  "Photography",
  "Fashion & Beauty",
  "Adventure & Outdoors",
  "Comedy & Entertainment",
  "Vlogging",
  "Other",
];

const followerRanges = [
  "Below 5,000",
  "5,000 – 25,000 (Nano)",
  "25,000 – 150,000 (Micro)",
  "150,000+ (Macro)",
];

const travelOptions = [
  "Anytime — fully flexible",
  "Weekends only",
  "Specific months only",
  "Rarely available",
];

const collabOptions = [
  { key: "free-stay", label: "Free Stay", icon: Home },
  { key: "paid", label: "Paid", icon: IndianRupee },
  { key: "affiliate", label: "Affiliate", icon: TrendingUp },
  { key: "brand-ambassador", label: "Brand Ambassador", icon: BadgeCheck },
];

const benefits = [
  { icon: Home, title: "Free Stays", desc: "Curated properties, on us." },
  { icon: IndianRupee, title: "Paid Collaborations", desc: "Campaign fees on top of stays." },
  { icon: LayoutDashboard, title: "Creator Dashboard", desc: "Track collabs, credits and payouts." },
  { icon: Users, title: "Exclusive Community", desc: "Network with fellow creators." },
  { icon: Clock, title: "Review Time: 48 Hours", desc: "Fast, human review — always." },
];

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  age: string;
  igUsername: string;
  igLink: string;
  followers: string;
  avgReelViews: string;
  youtubeLink: string;
  portfolioLink: string;
  bestContent: string;
  category: string;
  bio: string;
  languages: string;
  travelAvailability: string;
  collab: string[];
  chargeReel: string;
  chargeStory: string;
  chargePost: string;
  prevCollabs: string;
  whyJoin: string;
  introVideo: string;
  declaration: boolean;
}

const emptyValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  age: "",
  igUsername: "",
  igLink: "",
  followers: "",
  avgReelViews: "",
  youtubeLink: "",
  portfolioLink: "",
  bestContent: "",
  category: "",
  bio: "",
  languages: "",
  travelAvailability: "",
  collab: [],
  chargeReel: "",
  chargeStory: "",
  chargePost: "",
  prevCollabs: "",
  whyJoin: "",
  introVideo: "",
  declaration: false,
};

type Errors = Partial<Record<keyof FormValues, string>>;
type ChangeTarget = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function Label({ children, optional }: { children: ReactNode; optional?: boolean }) {
  return (
    <label className="mb-2 block text-xs font-medium tracking-wider text-foreground/70 uppercase">
      {children} {optional && <span className="normal-case">(optional)</span>}
    </label>
  );
}

function ErrorText({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
      <AlertCircle size={11} /> {error}
    </p>
  );
}

const FIELD_BASE =
  "w-full rounded-xl border bg-background text-sm placeholder:text-foreground/50 focus:outline-none transition-colors";

function fieldClass(error?: string, padding = "py-3 pr-4 pl-10") {
  return `${FIELD_BASE} ${padding} ${
    error ? "border-red-500 focus:border-red-500" : "border-border-subtle focus:border-brand"
  }`;
}

const ICON = "absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/60";

export function ApplyInfluencerForm() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step > 1) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const clearError = (name: keyof FormValues) =>
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

  const handleChange = (e: ChangeEvent<ChangeTarget>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setValues((v) => ({ ...v, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setValues((v) => ({ ...v, [name]: value }));
    }
    clearError(name as keyof FormValues);
  };

  const toggleCollab = (key: string) => {
    setValues((v) => ({
      ...v,
      collab: v.collab.includes(key) ? v.collab.filter((c) => c !== key) : [...v.collab, key],
    }));
    clearError("collab");
  };

  // Local preview only — the file is never uploaded anywhere.
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validateStep1 = (): Errors => {
    const e: Errors = {};
    if (!values.fullName.trim()) e.fullName = "Required.";
    if (!values.email.trim()) e.email = "Email is required.";
    else if (!EMAIL_RE.test(values.email)) e.email = "Enter a valid email address.";
    if (!values.phone.trim()) e.phone = "Phone number is required.";
    else if (!PHONE_RE.test(values.phone)) e.phone = "Enter a valid phone number.";
    if (!values.city.trim()) e.city = "Required.";
    if (!values.age.trim()) e.age = "Required.";
    else if (Number(values.age) < 16 || Number(values.age) > 100) e.age = "Must be between 16 and 100.";
    return e;
  };

  const validateStep2 = (): Errors => {
    const e: Errors = {};
    if (!values.igUsername.trim()) e.igUsername = "Required.";
    if (!values.igLink.trim()) e.igLink = "Required.";
    if (!values.followers) e.followers = "Select your follower range.";
    if (!values.avgReelViews.trim()) e.avgReelViews = "Required.";
    if (!values.portfolioLink.trim()) e.portfolioLink = "Required.";
    if (!values.bestContent.trim()) e.bestContent = "Share at least one link.";
    return e;
  };

  const validateStep3 = (): Errors => {
    const e: Errors = {};
    if (!values.category) e.category = "Select a category.";
    if (!values.bio.trim()) e.bio = "Tell us about yourself.";
    if (!values.languages.trim()) e.languages = "Required.";
    if (!values.travelAvailability) e.travelAvailability = "Select your availability.";
    if (values.collab.length === 0) e.collab = "Pick at least one option.";
    if (!values.whyJoin.trim()) e.whyJoin = "Required.";
    if (!values.declaration) e.declaration = "Please confirm the declaration to continue.";
    return e;
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stepErrors = step === 1 ? validateStep1() : step === 2 ? validateStep2() : validateStep3();
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;
    if (step < 3) setStep((s) => s + 1);
    else setSubmitted(true);
  };

  // ---- field renderers (plain functions returning JSX, not components) ----

  const textField = (
    name: Exclude<keyof FormValues, "collab" | "declaration">,
    label: string,
    icon: LucideIcon,
    placeholder: string,
    opts: { type?: string; optional?: boolean; min?: string; max?: string } = {},
  ) => {
    const Icon = icon;
    return (
      <div>
        <Label optional={opts.optional}>{label}</Label>
        <div className="relative">
          <Icon size={16} className={ICON} />
          <input
            type={opts.type}
            min={opts.min}
            max={opts.max}
            name={name}
            value={values[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className={fieldClass(errors[name])}
          />
        </div>
        <ErrorText error={errors[name]} />
      </div>
    );
  };

  const selectField = (
    name: "followers" | "category" | "travelAvailability",
    label: string,
    icon: LucideIcon,
    placeholder: string,
    options: string[],
  ) => {
    const Icon = icon;
    return (
      <div>
        <Label>{label}</Label>
        <div className="relative">
          <Icon size={16} className={`${ICON} z-10`} />
          <select
            name={name}
            value={values[name]}
            onChange={handleChange}
            className={`${fieldClass(errors[name])} appearance-none`}
          >
            <option value="">{placeholder}</option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <ErrorText error={errors[name]} />
      </div>
    );
  };

  const textareaField = (
    name: "bestContent" | "bio" | "prevCollabs" | "whyJoin",
    label: string,
    placeholder: string,
    rows: number,
    opts: { optional?: boolean; icon?: LucideIcon } = {},
  ) => {
    const Icon = opts.icon;
    return (
      <div>
        <Label optional={opts.optional}>{label}</Label>
        <div className="relative">
          {Icon ? <Icon size={16} className="absolute top-4 left-3.5 text-foreground/60" /> : null}
          <textarea
            name={name}
            value={values[name]}
            onChange={handleChange}
            rows={rows}
            placeholder={placeholder}
            className={`${fieldClass(errors[name], Icon ? "py-3 pr-4 pl-10" : "px-4 py-3")} resize-none`}
          />
        </div>
        <ErrorText error={errors[name]} />
      </div>
    );
  };

  const chargeField = (name: "chargeReel" | "chargeStory" | "chargePost", placeholder: string) => (
    <div className="relative">
      <IndianRupee size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-foreground/60" />
      <input
        type="number"
        min="0"
        name={name}
        value={values[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={fieldClass(undefined, "py-3 pr-3 pl-8")}
      />
    </div>
  );

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <Link
          href="/business"
          className="inline-flex items-center gap-1.5 text-xs text-foreground/70 transition-colors hover:text-brand"
        >
          <ArrowLeft size={12} /> Back to Business Hub
        </Link>
      </div>

      <div className="px-6 py-10 text-center md:py-14">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
          <Star size={12} /> Influencer Program
        </div>
        <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
          Apply as an Influencer
        </h1>
        <p className="mx-auto max-w-xl text-sm text-foreground/70 md:text-base">
          Free curated stays, paid collaborations and a creator dashboard — join the DhyanaStays
          creator community in three quick steps.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Form column */}
          <div className="scroll-mt-24 lg:col-span-2" ref={cardRef}>
            {!submitted ? (
              <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm md:p-10">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <CapabilityBadge capability="demo" />
                  <p className="text-xs text-foreground/70">
                    Showcase form — your details are not sent anywhere. To reach the team, use the{" "}
                    <Link href="/contact?as=curator" className="text-brand hover:underline">
                      contact form
                    </Link>
                    .
                  </p>
                </div>

                {/* Step indicator */}
                <div className="mb-2 flex items-center">
                  {steps.map((s, i) => (
                    <div key={s.key} className="flex flex-1 items-center last:flex-none">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                            step >= s.key
                              ? "bg-brand text-white"
                              : "border border-border-subtle bg-brand-soft text-foreground/70"
                          }`}
                        >
                          {step > s.key ? <Check size={16} /> : s.key}
                        </div>
                        <span
                          className={`text-[11px] font-medium whitespace-nowrap ${
                            step >= s.key ? "" : "text-foreground/70"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          className={`mx-3 mb-6 h-0.5 flex-1 rounded-full transition-all ${
                            step > s.key ? "bg-brand" : "bg-border-subtle"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-semibold">{steps[step - 1].title}</h2>
                    <p className="mt-1 text-sm text-foreground/70">{steps[step - 1].subtitle}</p>
                  </div>
                  <span className="ml-4 shrink-0 text-xs tracking-wider text-foreground/70 uppercase">
                    Step {step} of 3
                  </span>
                </div>

                <form className="space-y-6" noValidate onSubmit={handleFormSubmit}>
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        {textField("fullName", "Full Name", User, "Your full name")}
                        {textField("email", "Email", Mail, "you@example.com", { type: "email" })}
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        {textField("phone", "Phone", Phone, "+91 98765 43210", { type: "tel" })}
                        {textField("city", "City", MapPin, "Where you're based")}
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        {textField("age", "Age", Cake, "Your age", { type: "number", min: "16", max: "100" })}
                        <div>
                          <Label optional>Profile Photo</Label>
                          <div className="flex items-center gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-subtle bg-brand-soft">
                              {photoPreview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={photoPreview} alt="Profile preview" className="size-full object-cover" />
                              ) : (
                                <Camera size={17} className="text-foreground/60" />
                              )}
                            </div>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handlePhotoChange}
                            />
                            <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                              <UploadCloud size={15} /> {photoPreview ? "Change" : "Upload"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        {textField("igUsername", "Instagram Username", AtSign, "yourhandle")}
                        {textField("igLink", "Instagram Profile Link", Link2, "instagram.com/yourhandle")}
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        {selectField("followers", "Followers", Users, "Select a range", followerRanges)}
                        {textField("avgReelViews", "Average Reel Views", Eye, "e.g. 25000", { type: "number", min: "0" })}
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        {textField("youtubeLink", "YouTube Link", PlayCircle, "youtube.com/@yourchannel", { optional: true })}
                        {textField("portfolioLink", "Portfolio / Drive Link", FolderOpen, "Link to your portfolio or drive folder")}
                      </div>

                      {textareaField("bestContent", "Best Content Links", "Paste 2–3 links to your best reels or posts, one per line", 3)}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        {selectField("category", "Content Category", Tag, "Select a category", contentCategories)}
                        {textField("languages", "Languages", Globe, "e.g. English, Hindi, Tamil")}
                      </div>

                      {textareaField("bio", "Short Bio", "A couple of lines about you and your content", 3)}

                      {selectField("travelAvailability", "Travel Availability", Plane, "Select your availability", travelOptions)}

                      <div>
                        <Label>Collaboration Preference</Label>
                        <div className="flex flex-wrap gap-2.5">
                          {collabOptions.map((opt) => {
                            const active = values.collab.includes(opt.key);
                            const Icon = opt.icon;
                            return (
                              <button
                                key={opt.key}
                                type="button"
                                aria-pressed={active}
                                onClick={() => toggleCollab(opt.key)}
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                                  active
                                    ? "border-brand bg-brand text-white"
                                    : "border-border-subtle bg-background hover:border-brand/40 hover:bg-brand-soft"
                                }`}
                              >
                                <Icon size={14} /> {opt.label}
                              </button>
                            );
                          })}
                        </div>
                        <ErrorText error={errors.collab} />
                      </div>

                      <div>
                        <Label optional>Expected Charges</Label>
                        <div className="grid grid-cols-3 gap-3">
                          {chargeField("chargeReel", "Per Reel")}
                          {chargeField("chargeStory", "Per Story")}
                          {chargeField("chargePost", "Per Post")}
                        </div>
                        <p className="mt-1.5 text-xs text-foreground/70">
                          Leave blank if you&apos;re open to free-stay collaborations only.
                        </p>
                      </div>

                      {textareaField("prevCollabs", "Previous Brand Collaborations", "Brands you've worked with, if any", 2, {
                        optional: true,
                        icon: Building2,
                      })}

                      {textareaField("whyJoin", "Why do you want to join DhyanaStays?", "What draws you to our stays and community?", 3, {
                        icon: Heart,
                      })}

                      {textField("introVideo", "Intro Video Link", Video, "YouTube or Drive link to a short intro", { optional: true })}

                      <label
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                          errors.declaration ? "border-red-500" : "border-border-subtle hover:border-brand/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="declaration"
                          checked={values.declaration}
                          onChange={handleChange}
                          className="mt-0.5 size-4 shrink-0 accent-brand"
                        />
                        <span className="text-sm leading-relaxed text-foreground/70">
                          I confirm that all the information provided is accurate, and I agree to
                          DhyanaStays&apos; Influencer Program{" "}
                          <Link href="/legal/terms-and-conditions" className="text-brand hover:underline">
                            terms &amp; conditions
                          </Link>
                          .
                        </span>
                      </label>
                      <ErrorText error={errors.declaration} />
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-border-subtle pt-6">
                    {step > 1 ? (
                      <Button type="button" variant="secondary" onClick={goBack}>
                        <ArrowLeft size={15} /> Back
                      </Button>
                    ) : (
                      <span />
                    )}
                    <Button type="submit">
                      {step < 3 ? "Continue" : "Finish demo"}
                      {step < 3 ? <ArrowRight size={16} /> : <Check size={16} />}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="rounded-2xl border border-border-subtle bg-surface p-10 text-center shadow-sm md:p-14">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-brand/20 bg-brand/10">
                  <Check size={26} className="text-brand" />
                </div>
                <div className="mb-4 flex justify-center">
                  <CapabilityBadge capability="demo" />
                </div>
                <h3 className="mb-3 font-display text-2xl font-semibold md:text-3xl">
                  Demo complete — nothing was sent
                </h3>
                <p className="mx-auto mb-2 max-w-md text-sm text-foreground/70">
                  Thanks{values.fullName.trim() ? `, ${values.fullName.trim().split(" ")[0]}` : ""} — this
                  showcase form doesn&apos;t submit applications yet, so the team hasn&apos;t received any of
                  your details.
                </p>
                <p className="mx-auto mb-8 max-w-md text-sm text-foreground/70">
                  To get in touch about the influencer program, send us a message through the contact
                  form.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <ButtonLink href="/contact?as=curator">
                    Contact the team <ArrowRight size={15} />
                  </ButtonLink>
                  <ButtonLink href="/business" variant="secondary">
                    Back to Business Hub
                  </ButtonLink>
                </div>
              </div>
            )}
          </div>

          {/* Sticky benefits column — desktop only */}
          <div className="hidden lg:sticky lg:top-24 lg:block">
            <div className="rounded-2xl border border-border-subtle bg-surface p-8 shadow-sm">
              <h3 className="mb-1 font-display text-lg font-semibold">Why creators choose us</h3>
              <p className="mb-6 text-sm text-foreground/70">Everything you get as a DhyanaStays creator partner.</p>
              <div className="space-y-5">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="flex gap-3.5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-brand/10">
                        <Icon size={17} className="text-brand" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{b.title}</div>
                        <div className="mt-0.5 text-xs text-foreground/70">{b.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-7 flex items-center gap-2 border-t border-border-subtle pt-6 text-xs text-foreground/70">
                <ShieldCheck size={14} className="text-brand" /> Verified partner program, no fees to apply.
              </div>
              <PlaceholderNote>
                Benefits and terms shown are placeholder copy from the Application prototype —
                pending client approval.
              </PlaceholderNote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
