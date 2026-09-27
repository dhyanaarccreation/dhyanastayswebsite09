// Sample data for the Curated Stays showcase (DHN-16) — shared by the
// /curated-stays page (CuratedStaysShowcase) and the Home explorer
// (components/sections/home/HomeStaysExplorer). Property names, places and
// blurbs are POC layout data only (rule 3); photos are Unsplash stock — see
// the source list below and the PlaceholderNote where they are shown.
//
// Photos in public/images/stays/ are Unsplash STOCK images standing in for real
// property photography (pending) — they do not depict these properties. Swap
// each file in place (same filename) when real photography arrives. Sources:
//   canopy-tiny-house.jpg          unsplash 1587061949409-02df41d5e562
//   nila-wellness-retreat.jpg      unsplash 1506126613408-eca07ce68773
//   glass-pavilion.jpg             unsplash 1613490493576-7fde63acd811
//   heritage-courtyard-villa.jpg   unsplash 1524230572899-a752b3835840 (loose match)
//   vaksana-farms.jpg              unsplash 1500382017468-9049fed747ef
//   salt-and-sky-beach-villa.jpg   unsplash 1582719508461-905c673771fd

export const CATEGORIES = ["All", "Tiny House", "Farm Stay", "Wellness Retreat", "Luxury Villa", "Heritage Home"] as const;

export type Category = (typeof CATEGORIES)[number];

export const SAMPLE_STAYS: {
  name: string;
  location: string;
  category: Exclude<Category, "All">;
  highlight: string;
  image: string;
  alt: string;
}[] = [
  {
    name: "The Canopy Tiny House",
    location: "Auroville, Tamil Nadu",
    category: "Tiny House",
    highlight: "A minimalist retreat built around ancient mango trees.",
    image: "/images/stays/canopy-tiny-house.jpg",
    alt: "Sample photo: a timber cabin among tall trees",
  },
  {
    name: "Nila Wellness Retreat",
    location: "Palakkad, Kerala",
    category: "Wellness Retreat",
    highlight: "Ayurvedic therapies with a resident wellness team.",
    image: "/images/stays/nila-wellness-retreat.jpg",
    alt: "Sample photo: a person meditating at sunrise",
  },
  {
    name: "The Glass Pavilion",
    location: "Wayanad, Kerala",
    category: "Luxury Villa",
    highlight: "Floor-to-ceiling glass architecture over a private pool.",
    image: "/images/stays/glass-pavilion.jpg",
    alt: "Sample photo: a modern glass-fronted villa beside a pool",
  },
  {
    name: "Heritage Courtyard Villa",
    location: "Karaikudi, Tamil Nadu",
    category: "Heritage Home",
    highlight: "A restored Chettinad mansion with original courtyards.",
    image: "/images/stays/heritage-courtyard-villa.jpg",
    alt: "Sample photo: a white arched corridor",
  },
  {
    name: "Vaksana Farms",
    location: "Near Tindivanam, Tamil Nadu",
    category: "Farm Stay",
    highlight: "A working organic farm reimagined as four unique stays.",
    image: "/images/stays/vaksana-farms.jpg",
    alt: "Sample photo: farmland at sunset",
  },
  {
    name: "Salt & Sky Beach Villa",
    location: "Gokarna, Karnataka",
    category: "Luxury Villa",
    highlight: "A clifftop villa with an infinity deck over the Arabian Sea.",
    image: "/images/stays/salt-and-sky-beach-villa.jpg",
    alt: "Sample photo: a sea-view pool deck with loungers and umbrellas",
  },
];
