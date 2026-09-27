import type { LucideIcon } from "lucide-react";

// Shared colourful icon tile — used by Why Dhyana and Experience Beyond Stay.
// One colour family per accent: a vibrant gradient tile with a coloured glow, a
// soft radial colour spot for behind the tile, and a tinted hover border. To
// retune the palette edit ACCENTS here; class names must stay literal strings
// so Tailwind can see them.

export const ACCENTS = {
  sky: {
    tile: "from-sky-400 to-blue-600 shadow-blue-500/30",
    spot: "from-sky-400/25",
    border: "hover:border-sky-400/50",
  },
  emerald: {
    tile: "from-emerald-400 to-green-600 shadow-emerald-500/30",
    spot: "from-emerald-400/25",
    border: "hover:border-emerald-400/50",
  },
  amber: {
    tile: "from-amber-500 to-orange-600 shadow-orange-500/30",
    spot: "from-amber-400/25",
    border: "hover:border-amber-400/50",
  },
  rose: {
    tile: "from-rose-400 to-pink-600 shadow-rose-500/30",
    spot: "from-rose-400/25",
    border: "hover:border-rose-400/50",
  },
  violet: {
    tile: "from-violet-400 to-purple-600 shadow-violet-500/30",
    spot: "from-violet-400/25",
    border: "hover:border-violet-400/50",
  },
  fuchsia: {
    tile: "from-fuchsia-500 to-indigo-600 shadow-indigo-500/30",
    spot: "from-fuchsia-400/25",
    border: "hover:border-fuchsia-400/50",
  },
  teal: {
    tile: "from-teal-400 to-cyan-600 shadow-teal-500/30",
    spot: "from-teal-400/25",
    border: "hover:border-teal-400/50",
  },
} as const;

export type Accent = keyof typeof ACCENTS;

/**
 * Vibrant gradient squircle with a white glyph: a glossy top highlight, a
 * hairline inner ring and a coloured drop-glow. Tilts/scales when an ancestor
 * with the `group` class is hovered (skipped for reduced-motion users).
 */
export function AccentIconTile({ icon: Icon, accent }: { icon: LucideIcon; accent: Accent }) {
  return (
    <span
      data-testid="icon-tile"
      className={`relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg ring-1 ring-white/30 transition-transform duration-300 ring-inset motion-safe:group-hover:-rotate-3 motion-safe:group-hover:scale-105 ${ACCENTS[accent].tile}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-linear-to-b from-white/35 via-white/5 to-transparent"
      />
      <Icon size={26} strokeWidth={1.75} aria-hidden="true" className="relative drop-shadow-sm" />
    </span>
  );
}

/**
 * Soft radial colour wash for the top-left corner of a card. Place it as the
 * first child of a `relative overflow-hidden group` card. Deliberately a plain
 * radial gradient, not a blurred blob: blur filters produced banding artifacts.
 */
export function AccentSpot({ accent }: { accent: Accent }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -top-20 -left-20 size-72 rounded-full bg-radial to-transparent to-70% opacity-80 transition-opacity duration-300 group-hover:opacity-100 ${ACCENTS[accent].spot}`}
    />
  );
}
