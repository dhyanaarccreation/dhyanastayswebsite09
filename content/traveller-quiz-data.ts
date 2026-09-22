// Traveller DNA — question bank for the gamified preference survey (DHN-54?
// — conflicts with Travel Guides, see PROJECT_BRIEF.md §4's second
// amendment). Transcribed verbatim from the standalone prototype artifact
// (https://claude.ai/artifact/Gcu7EsFaBs39i4anQJYbAt) into typed data the
// TravellerQuiz component renders from. Keep copy out of the component per
// PROJECT_BRIEF.md §5 ("content/ ... keep copy out of components").

export type ArchetypeKey =
  | "wanderer"
  | "together"
  | "adrenaline"
  | "stillness"
  | "aesthete"
  | "connoisseur"
  | "rootseeker"
  | "celebrant";

export type OptionTags = Partial<Record<ArchetypeKey, number>>;

export interface QuizOption {
  v: string;
  l: string;
  e?: string;
  tags?: OptionTags;
  /** Small eyebrow label shown above a scenario-style option, e.g. "OPTION A". */
  sub?: string;
}

export type QuestionType = "single" | "multi" | "short" | "long";

export interface QuizQuestion {
  id: number;
  sec: number;
  type: QuestionType;
  q: string;
  sub?: string;
  optional?: boolean;
  scenario?: boolean;
  max?: number;
  opts?: QuizOption[];
  showIf?: { q: number; not: string };
}

export interface QuizSection {
  n: number;
  title: string;
  icon: string;
}

export interface Archetype {
  name: string;
  emoji: string;
  tagline: string;
  desc: string;
  rec: string[];
}

function O(v: string, l: string, e?: string, tags?: OptionTags, sub?: string): QuizOption {
  return { v, l, e, tags, sub };
}

export const SECTIONS: QuizSection[] = [
  { n: 1, title: "Traveller Identity", icon: "🧭" },
  { n: 2, title: "Why You Travel", icon: "🌅" },
  { n: 3, title: "Travel Behaviour", icon: "📅" },
  { n: 4, title: "Kind Of Stay", icon: "🏡" },
  { n: 5, title: "Stay Preferences", icon: "✨" },
  { n: 6, title: "Special Occasions", icon: "🎉" },
  { n: 7, title: "Getting There", icon: "🚗" },
  { n: 8, title: "Trip Planning", icon: "🗺️" },
  { n: 9, title: "Finding & Booking", icon: "🔍" },
  { n: 10, title: "The Dhyana Question", icon: "🪷" },
  { n: 11, title: "Price Sense", icon: "💰" },
  { n: 12, title: "Gut Check", icon: "🎯" },
  { n: 13, title: "Your Voice", icon: "💭" },
];

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1, sec: 1, type: "single", q: "Which type of traveller are you?",
    opts: [
      O("solo", "Solo Traveller", "🧍", { wanderer: 2 }), O("couple", "Couple Traveller", "❤️", { together: 2 }),
      O("family", "Family Traveller", "👨‍👩‍👧", { together: 1, rootseeker: 1 }), O("backpacker", "Backpacker", "🎒", { adrenaline: 2, wanderer: 1 }),
      O("group", "Friends / Group Traveller", "👥", { celebrant: 2 }), O("business", "Business Traveller", "💼", { connoisseur: 2 }),
      O("wellness", "Wellness / Retreat Traveller", "🧘", { stillness: 2 }), O("content", "Experience / Content Traveller", "📸", { aesthete: 2 }),
      O("adventure", "Adventure Traveller", "🏕️", { adrenaline: 2 }), O("other", "Other", "✨"),
    ],
  },
  {
    id: 2, sec: 1, type: "single", q: "What is your age group?",
    opts: [O("u18", "Under 18"), O("18-24", "18–24"), O("25-34", "25–34"), O("35-44", "35–44"), O("45-54", "45–54"), O("55p", "55+")],
  },
  {
    id: 3, sec: 1, type: "single", optional: true, q: "How do you identify?", sub: "Totally optional — skip if you'd rather not say.",
    opts: [O("male", "Male"), O("female", "Female"), O("prefer-not", "Prefer not to say"), O("other", "Other")],
  },
  {
    id: 4, sec: 1, type: "single", q: "Where do you usually travel from?",
    opts: [O("same-city", "Same city"), O("same-state", "Same state"), O("another-state", "Another state"), O("another-country", "Another country")],
  },
  {
    id: 5, sec: 1, type: "single", q: "Who do you usually travel with?",
    opts: [
      O("alone", "Mostly alone", "🧍"), O("partner", "Partner", "❤️"), O("friends", "Friends", "👥"),
      O("family", "Family", "👨‍👩‍👧"), O("colleagues", "Colleagues", "💼"), O("depends", "Different people depending on the trip", "🎲"),
    ],
  },

  {
    id: 6, sec: 2, type: "multi", max: 3, q: "What is usually the main reason for your trip?", sub: "Choose up to 3.",
    opts: [
      O("explore", "Explore a new place", "🌴", { wanderer: 1, rootseeker: 1 }), O("escape", "Escape from my regular routine", "😌", { stillness: 1 }),
      O("someone-special", "Spend time with someone special", "❤️", { together: 2 }), O("family-time", "Family time", "👨‍👩‍👧", { together: 1 }),
      O("celebrate", "Celebrate something", "🎉", { celebrant: 2 }), O("relax", "Relax / Mental reset", "🧘", { stillness: 2 }),
      O("adventure", "Adventure", "🏔️", { adrenaline: 2 }), O("photo", "Photography / Content creation", "📸", { aesthete: 2 }),
      O("food", "Food & local culture", "🍜", { rootseeker: 2 }), O("work", "Work", "💼", { connoisseur: 1 }),
      O("workation", "Workation", "🧑‍💻", { connoisseur: 1 }), O("spiritual", "Wellness / Spiritual experience", "🧘", { stillness: 2 }), O("other", "Other", "✨"),
    ],
  },
  {
    id: 7, sec: 2, type: "single", q: "Imagine a completely free weekend. What would you most likely choose?",
    opts: [
      O("beach", "Beach", "🏖️", { together: 1, stillness: 1 }), O("forest", "Forest / Nature", "🌳", { stillness: 2 }),
      O("mountains", "Mountains", "🏔️", { adrenaline: 2 }), O("countryside", "Countryside / Farm", "🌾", { rootseeker: 1 }),
      O("city", "City exploration", "🏙️", { aesthete: 1 }), O("heritage", "Heritage / Culture", "🏛️", { rootseeker: 2 }),
      O("wellness-retreat", "Wellness retreat", "🧘", { stillness: 2 }), O("unique-stay", "Stay somewhere unique and different", "🏡", { aesthete: 2 }),
    ],
  },
  {
    id: 8, sec: 2, type: "multi", max: 3, q: "What makes a trip feel memorable to you?", sub: "Choose up to 3.",
    opts: [
      O("place", "The place itself"), O("people", "The people I travel with"), O("stay", "The stay"), O("food", "Food"),
      O("nature", "Nature"), O("activities", "Activities"), O("architecture", "Architecture / design"), O("privacy", "Privacy"),
      O("adventure", "Adventure"), O("culture", "Local culture"), O("unexpected", "Unexpected experiences"), O("photos", "Photos / memories"),
    ],
  },

  {
    id: 9, sec: 3, type: "single", q: "How often do you travel?",
    opts: [O("lt1", "Less than once a year"), O("1-2", "1–2 times a year"), O("3-5", "3–5 times a year"), O("6-10", "6–10 times a year"), O("gt10", "More than 10 times a year")],
  },
  {
    id: 10, sec: 3, type: "single", q: "How long is your typical trip?",
    opts: [O("1d", "1 day"), O("2d1n", "2 days / 1 night"), O("3-4d", "3–4 days"), O("5-7d", "5–7 days"), O("1-2w", "1–2 weeks"), O("gt2w", "More than 2 weeks")],
  },
  {
    id: 11, sec: 3, type: "multi", max: 3, q: "When do you usually travel?", sub: "Choose up to 3.",
    opts: [
      O("weekends", "Weekends"), O("long-weekends", "Long weekends"), O("public-holidays", "Public holidays"), O("vacations", "During vacations"),
      O("whenever", "Whenever I get time"), O("work", "Work-related travel"), O("advance", "I plan specific trips months in advance"),
    ],
  },
  {
    id: 12, sec: 3, type: "single", q: "How far in advance do you usually plan a trip?",
    opts: [O("last-minute", "Same day / last minute"), O("1-3d", "1–3 days"), O("1-2w", "1–2 weeks"), O("2-4w", "2–4 weeks"), O("1-3m", "1–3 months"), O("gt3m", "More than 3 months")],
  },

  {
    id: 13, sec: 4, type: "multi", q: "Which types of stays would you be interested in?", sub: "Choose as many as you like.",
    opts: [
      O("premium-hotel", "Premium Hotel", "🏨"), O("private-villa", "Private Villa", "🏡"), O("beach-house", "Beach House", "🌴"),
      O("farm-stay", "Farm Stay", "🌾"), O("forest-stay", "Forest / Nature Stay", "🌳"), O("glamping", "Glamping", "🏕️"),
      O("heritage", "Heritage Property", "🕌"), O("themed-villa", "Themed Villa", "🏰"), O("homestay", "Homestay", "🏠"),
      O("wellness-retreat", "Wellness Retreat", "🧘"), O("pool-villa", "Pool Villa", "🌊"), O("mountain-stay", "Mountain Stay", "🏔️"),
      O("unique-city", "Unique City Stay", "🏙️"), O("cabin", "Cabin / Cottage", "🛖"), O("unusual", "Unusual / Experimental Stay", "🪐"), O("other", "Other", "✨"),
    ],
  },
  {
    id: 14, sec: 4, type: "single", scenario: true, q: "Which sounds more exciting to you?",
    opts: [
      O("a", "A beautiful room in a great hotel", undefined, { connoisseur: 1 }, "OPTION A"),
      O("b", "A unique stay that itself becomes part of the trip", undefined, { aesthete: 2, wanderer: 1 }, "OPTION B"),
    ],
  },
  {
    id: 15, sec: 4, type: "single", q: "Would you travel specifically to experience a unique stay?",
    opts: [O("definitely", "Definitely", undefined, { aesthete: 2 }), O("probably", "Probably", undefined, { aesthete: 1 }), O("maybe", "Maybe"), O("probably-not", "Probably not"), O("no", "No")],
  },
  {
    id: 16, sec: 4, type: "single", q: "Which would attract you more?",
    opts: [
      O("lowest-price", "Lowest possible price", "💰"), O("value", "Good value for money", "⚖️", { connoisseur: 1 }),
      O("experience", "Better experience", "✨", { aesthete: 1 }), O("luxury", "Premium / luxury experience", "🏆", { connoisseur: 2 }),
      O("unique", "A completely unique experience", "🌟", { aesthete: 2 }),
    ],
  },

  {
    id: 17, sec: 5, type: "multi", max: 5, q: "What matters most when choosing accommodation?", sub: "Choose your top 5.",
    opts: [
      O("price", "Price"), O("location", "Location"), O("cleanliness", "Cleanliness"), O("safety", "Safety"), O("privacy", "Privacy"),
      O("reviews", "Reviews"), O("architecture", "Architecture / design"), O("interior", "Interior"), O("nature", "Nature"), O("view", "View"),
      O("pool", "Swimming pool"), O("food", "Food"), O("activities", "Activities"), O("service", "Service"), O("room-size", "Room size"),
      O("wifi", "Wi-Fi"), O("parking", "Parking"), O("pet-friendly", "Pet-friendly"), O("unique", "Unique experience"), O("instagram", "Instagram-worthy appearance"),
    ],
  },
  {
    id: 18, sec: 5, type: "single", q: "How important is the design/architecture of a stay?",
    opts: [
      O("not", "Not important"), O("slightly", "Slightly important"), O("important", "Important", undefined, { aesthete: 1 }),
      O("very", "Very important", undefined, { aesthete: 2 }), O("main", "It's one of the main reasons I choose a stay", undefined, { aesthete: 3 }),
    ],
  },
  {
    id: 19, sec: 5, type: "single", scenario: true, q: "Which would you choose?",
    opts: [
      O("a", "₹3,000/night — a normal hotel", undefined, { connoisseur: 1 }, "OPTION A"),
      O("b", "₹5,000/night — a unique stay + memorable experience", undefined, { aesthete: 2 }, "OPTION B"),
      O("depends-exp", "Depends on the experience", undefined, { aesthete: 1 }, "IT DEPENDS"),
      O("depends-loc", "Depends on the location", undefined, { rootseeker: 1 }, "IT DEPENDS"),
    ],
  },
  {
    id: 20, sec: 5, type: "multi", max: 4, q: "What would make you pay more for a stay?", sub: "Choose up to 4.",
    opts: [
      O("location", "Better location"), O("room", "Better room"), O("privacy", "Privacy"), O("pool", "Pool"), O("view", "Amazing view"),
      O("architecture", "Unique architecture"), O("activities", "Special activities"), O("food", "Food experience"),
      O("personalised", "Personalised experience"), O("occasion", "Special occasion setup"), O("nothing", "Nothing — I prefer budget stays"),
    ],
  },

  {
    id: 21, sec: 6, type: "single", q: "Do you ever travel specifically for a special occasion?",
    opts: [O("frequently", "Yes, frequently"), O("sometimes", "Sometimes"), O("rarely", "Rarely"), O("never", "Never")],
  },
  {
    id: 22, sec: 6, type: "multi", max: 4, showIf: { q: 21, not: "never" }, q: "What occasions?", sub: "Choose up to 4.",
    opts: [
      O("birthday", "Birthday", "🎂"), O("anniversary", "Anniversary", "❤️"), O("proposal", "Proposal", "💍"), O("couple-getaway", "Couple getaway", "💑"),
      O("family-celebration", "Family celebration", "👨‍👩‍👧"), O("graduation", "Graduation", "🎓"), O("friends", "Friends' celebration", "🥳"),
      O("team-event", "Team / company event", "💼"), O("reset", "Personal reset", "🧘"), O("other", "Other", "✨"),
    ],
  },
  {
    id: 23, sec: 6, type: "multi", max: 4, showIf: { q: 21, not: "never" }, q: "If a stay could prepare a personalised experience for your occasion, what would you want?", sub: "Choose up to 4.",
    opts: [
      O("decoration", "Room decoration"), O("dinner", "Special dinner"), O("cake", "Cake"), O("activity", "Private activity"),
      O("photography", "Photography"), O("surprise", "Surprise arrangement"), O("couple", "Couple experience"),
      O("adventure", "Adventure activity"), O("wellness", "Wellness experience"), O("custom", "Something completely customised"),
    ],
  },

  {
    id: 24, sec: 7, type: "single", q: "How do you usually reach your destination?",
    opts: [
      O("car", "Own car", "🚗"), O("bike", "Own bike", "🏍️"), O("rental", "Rental bike/scooter", "🛵"), O("taxi", "Taxi/cab", "🚕"),
      O("bus", "Bus", "🚌"), O("train", "Train", "🚆"), O("flight", "Flight", "✈️"), O("public", "Public transport", "🚏"),
    ],
  },
  {
    id: 25, sec: 7, type: "single", q: "Once you reach the destination, how do you usually move around?",
    opts: [O("own", "Own vehicle"), O("rental", "Rental vehicle"), O("taxi", "Taxi"), O("public", "Public transport"), O("walking", "Walking"), O("mix", "Mix of everything")],
  },
  {
    id: 26, sec: 7, type: "single", q: "Would you prefer a stay that helps arrange your local transportation?",
    opts: [O("definitely", "Definitely"), O("maybe", "Maybe"), O("no", "No")],
  },

  {
    id: 27, sec: 8, type: "multi", max: 3, q: "How do you normally discover places to visit?", sub: "Choose up to 3.",
    opts: [
      O("instagram", "Instagram"), O("youtube", "YouTube"), O("google", "Google Search"), O("maps", "Google Maps"), O("friends", "Friends / family"),
      O("blogs", "Travel blogs"), O("influencers", "Travel influencers"), O("booking", "Booking websites"), O("ai", "AI tools"),
      O("reddit", "Reddit / online communities"), O("random", "I discover places randomly"),
    ],
  },
  {
    id: 28, sec: 8, type: "single", q: "How do you normally create your itinerary?",
    opts: [
      O("myself", "I plan everything myself"), O("friends", "Friends/family plan it"), O("instagram", "Instagram"), O("youtube", "YouTube"),
      O("google", "Google"), O("blogs", "Travel blogs"), O("agency", "Travel agency"), O("ai", "AI tools like ChatGPT"), O("flow", "I don't plan — I go with the flow"),
    ],
  },
  {
    id: 29, sec: 8, type: "single", q: "Would you use an AI travel planner if it could create a personalised trip based on your preferences?",
    opts: [O("definitely", "Definitely"), O("probably", "Probably"), O("maybe", "Maybe"), O("probably-not", "Probably not"), O("no", "No")],
  },
  {
    id: 30, sec: 8, type: "multi", max: 5, q: "What would you want an AI travel planner to help with?", sub: "Choose up to 5.",
    opts: [
      O("stays", "Find stays"), O("restaurants", "Find restaurants"), O("attractions", "Find attractions"), O("itinerary", "Build itinerary"),
      O("transport", "Transportation"), O("budget", "Budget planning"), O("activities", "Activities"), O("hidden", "Hidden places"),
      O("local", "Local experiences"), O("time", "Time optimisation"), O("booking", "Booking"), O("weather", "Weather-based planning"),
    ],
  },

  {
    id: 31, sec: 9, type: "single", q: "Where do you normally discover your accommodation?",
    opts: [
      O("booking", "Booking websites"), O("google", "Google"), O("instagram", "Instagram"), O("youtube", "YouTube"), O("friends", "Friends / family"),
      O("influencers", "Travel influencers"), O("direct", "Directly from hotel/villa website"), O("agency", "Travel agency"), O("airbnb", "Airbnb-type platforms"), O("other", "Other"),
    ],
  },
  {
    id: 32, sec: 9, type: "single", q: "How do you usually book?",
    opts: [
      O("platform", "Booking platform"), O("website", "Hotel's own website"), O("whatsapp", "WhatsApp"), O("phone", "Phone call"),
      O("dm", "Instagram / DM"), O("agent", "Travel agent"), O("walkin", "Walk-in"), O("other", "Other"),
    ],
  },
  {
    id: 33, sec: 9, type: "multi", max: 4, q: "What makes you trust a stay before booking?", sub: "Choose up to 4.",
    opts: [
      O("reviews", "Reviews"), O("photos", "Photos"), O("videos", "Videos"), O("rating", "Google rating"), O("influencer", "Influencer recommendation"),
      O("friend", "Friend recommendation"), O("brand", "Brand reputation"), O("website", "Website"), O("price", "Price"),
      O("cancellation", "Cancellation policy"), O("verified", "Verified property"),
    ],
  },
  {
    id: 34, sec: 9, type: "multi", max: 4, q: "What makes you hesitate before booking?", sub: "Choose up to 4.",
    opts: [
      O("few-reviews", "Too few reviews"), O("bad-photos", "Bad photos"), O("location", "Unclear location"), O("hidden-charges", "Hidden charges"),
      O("expensive", "Expensive price"), O("poor-website", "Poor website"), O("no-cancel", "No cancellation"), O("no-trust", "No trust in the property"),
      O("fake", "Fake-looking reviews"), O("info", "Not enough information"),
    ],
  },

  {
    id: 35, sec: 10, type: "single", scenario: true, q: "Imagine a platform where you don't simply book a room — you choose a stay based on the experience you want. Which would you choose?",
    opts: [
      O("ocean", "I want to wake up next to the ocean.", "🌊", { together: 1, stillness: 1 }),
      O("forest", "I want to disappear into nature.", "🌳", { stillness: 2 }),
      O("romantic", "I want a romantic escape.", "❤️", { together: 2 }),
      O("reset", "I want to reset myself.", "🧘", { stillness: 2 }),
      O("group", "I want a place for my group.", "🎉", { celebrant: 2 }),
      O("visual", "I want a visually unforgettable place.", "📸", { aesthete: 2 }),
      O("local", "I want to experience local life.", "🏡", { rootseeker: 2 }),
      O("different", "I want to stay somewhere completely different.", "🏰", { aesthete: 1, adrenaline: 1 }),
    ],
  },
  {
    id: 36, sec: 10, type: "single", scenario: true, q: "Which statement describes you best?",
    opts: [
      O("dest", "The destination matters more than the stay.", undefined, { rootseeker: 1 }, "STATEMENT A"),
      O("equal", "The stay matters as much as the destination.", undefined, { aesthete: 1, connoisseur: 1 }, "STATEMENT B"),
      O("stay-drives", "I would choose a destination because of the stay.", undefined, { aesthete: 2 }, "STATEMENT C"),
    ],
  },

  {
    id: 37, sec: 11, type: "single", q: "For a 2-person weekend trip, what would you normally spend per night on accommodation?",
    opts: [
      O("lt2000", "Under ₹2,000"), O("2000-3500", "₹2,000–₹3,500"), O("3500-5000", "₹3,500–₹5,000"),
      O("5000-8000", "₹5,000–₹8,000"), O("8000-15000", "₹8,000–₹15,000"), O("gt15000", "₹15,000+"),
    ],
  },
  {
    id: 38, sec: 11, type: "single", q: "If the stay offered a significantly better experience, how much more would you consider paying?",
    opts: [O("none", "I wouldn't pay more"), O("10", "Up to 10% more"), O("10-25", "10–25% more"), O("25-50", "25–50% more"), O("gt50", "More than 50%")],
  },

  {
    id: 39, sec: 12, type: "single", scenario: true, q: "Two Instagram posts show up. Which would you click first?",
    opts: [
      O("a", "Stay A — ₹2,500/night · 4.7★ · 800 reviews", undefined, undefined, "CLICK FIRST"),
      O("b", "Stay B — ₹5,000/night · 4.5★ · 120 reviews · completely unique architecture", undefined, undefined, "CLICK FIRST"),
      O("both", "Both", undefined, undefined, "CLICK FIRST"), O("photos", "Depends on the photos", undefined, undefined, "CLICK FIRST"),
    ],
  },
  {
    id: 40, sec: 12, type: "single", scenario: true, q: "...and which one would you actually book?",
    opts: [
      O("a", "Stay A — the well-reviewed, lower-priced option", undefined, undefined, "ACTUALLY BOOK"),
      O("b", "Stay B — the unique, pricier option", undefined, undefined, "ACTUALLY BOOK"),
      O("research", "I would research both", undefined, undefined, "ACTUALLY BOOK"), O("neither", "Neither", undefined, undefined, "ACTUALLY BOOK"),
    ],
  },
  {
    id: 41, sec: 12, type: "single", scenario: true, q: "You have ₹10,000 for a weekend. Would you rather spend:",
    opts: [
      O("a", "₹3,000 on accommodation + ₹7,000 on food/activities", undefined, undefined, "OPTION A"),
      O("b", "₹7,000 on an amazing stay + ₹3,000 on everything else", undefined, undefined, "OPTION B"),
      O("depends", "Depends on the trip", undefined, undefined, "IT DEPENDS"),
    ],
  },

  { id: 42, sec: 13, type: "short", optional: true, q: "What is one thing you wish hotels/stays did better?" },
  { id: 43, sec: 13, type: "long", optional: true, q: "What is the most memorable stay you have ever experienced, and why?" },
  { id: 44, sec: 13, type: "long", optional: true, q: "If you could design your perfect stay, what would it look like?" },
  { id: 45, sec: 13, type: "long", optional: true, q: "What is one travel problem you wish someone would solve?" },
];

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  wanderer: {
    name: "The Free Wanderer", emoji: "🧭", tagline: "Happiest with no fixed plan and a new horizon.",
    desc: "You travel to feel the shift of a new place, not to check boxes. Structure can wait — the road decides.",
    rec: ["Homestay", "Unique City Stay", "Unusual / Experimental Stay"],
  },
  together: {
    name: "The Togetherness Seeker", emoji: "❤️", tagline: "The people you're with matter more than the itinerary.",
    desc: "Trips are how you protect the relationships that matter. A quiet villa with the right person beats a packed schedule alone.",
    rec: ["Private Villa", "Pool Villa", "Beach House"],
  },
  adrenaline: {
    name: "The Horizon Chaser", emoji: "🏔️", tagline: "You travel for the version of yourself that shows up outdoors.",
    desc: "Altitude, adrenaline, open trails — you'd rather come back tired and alive than rested and unchanged.",
    rec: ["Glamping", "Mountain Stay", "Forest / Nature Stay"],
  },
  stillness: {
    name: "The Stillness Seeker", emoji: "🧘", tagline: "Your best trips are the ones that quiet your mind.",
    desc: "You travel to exhale. Nature, silence and a slower pace matter more to you than a packed sightseeing list.",
    rec: ["Wellness Retreat", "Forest / Nature Stay", "Farm Stay"],
  },
  aesthete: {
    name: "The Design Aesthete", emoji: "📸", tagline: "If the stay isn't unforgettable, why go?",
    desc: "For you, the stay is the destination. Architecture, light and atmosphere shape the whole trip — and you'll happily pay more for it.",
    rec: ["Themed Villa", "Heritage Property", "Unusual / Experimental Stay"],
  },
  connoisseur: {
    name: "The Comfort Connoisseur", emoji: "🏆", tagline: "You want it done properly — comfort, service, no surprises.",
    desc: "You're not chasing the cheapest option or the flashiest one — you want dependable quality and good value, every time.",
    rec: ["Premium Hotel", "Pool Villa", "Private Villa"],
  },
  rootseeker: {
    name: "The Culture Rootseeker", emoji: "🌾", tagline: "You travel to taste, listen to and live a place, briefly.",
    desc: "Food stalls, local rhythms, real conversations — you measure a trip by how close it got you to how people actually live there.",
    rec: ["Homestay", "Farm Stay", "Heritage Property"],
  },
  celebrant: {
    name: "The Celebration Curator", emoji: "🎉", tagline: "Your best trips happen with a full group and a reason to celebrate.",
    desc: "Birthdays, reunions, big wins — you travel to mark moments, and the stay needs enough room for everyone's energy.",
    rec: ["Private Villa", "Themed Villa", "Beach House"],
  },
};

export const ARCH_ORDER: ArchetypeKey[] = [
  "aesthete", "stillness", "together", "adrenaline", "rootseeker", "celebrant", "connoisseur", "wanderer",
];
