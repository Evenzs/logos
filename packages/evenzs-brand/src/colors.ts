/**
 * Evenzs Brand Color Palette
 *
 * Full token set used across all brand components.
 * Import individual tokens or the full palette object.
 */

export const colors = {
  // ── Backgrounds ──────────────────────────────────────────────────────────
  /** Primary dark background — deep navy */
  navy:      '#0B1220',
  /** Slightly lighter navy for gradients / layered surfaces */
  navyDeep:  '#121B2B',
  /** Near-black with a cool undertone for overlays */
  obsidian:  '#0F131A',

  // ── Gold ramp ────────────────────────────────────────────────────────────
  /** Core brand gold */
  gold:      '#D4AF37',
  /** Bright highlight gold — used on star tips, shimmer */
  goldLight: '#F0D870',
  /** Mid-tone gold for secondary strokes */
  goldMid:   '#C9A230',
  /** Deep shadow gold */
  goldDark:  '#8B6914',
  /** Translucent gold for glass / overlay effects */
  goldGlass: 'rgba(212,175,55,0.18)',

  // ── Neutral ───────────────────────────────────────────────────────────────
  /** Warm off-white for light backgrounds and text on dark */
  ivory:     '#F7F3E9',
  /** Cool grey for secondary text and platinum variant */
  platinum:  '#9CA3AF',
} as const;

export type ColorToken = keyof typeof colors;

// Named re-exports for convenient destructuring
export const {
  navy,
  navyDeep,
  obsidian,
  gold,
  goldLight,
  goldMid,
  goldDark,
  goldGlass,
  ivory,
  platinum,
} = colors;
