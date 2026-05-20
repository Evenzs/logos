import type { CSSProperties } from 'react';

export const BRAND = {
  navy:      '#0B1220',
  navyDeep:  '#121B2B',
  obsidian:  '#0F131A',
  gold:      '#D4AF37',
  goldLight: '#F0D870',
  goldMid:   '#C9A230',
  goldDark:  '#8B6914',
  goldGlass: 'rgba(212,175,55,0.18)',
  ivory:     '#F7F3E9',
  platinum:  '#9CA3AF',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
//  CHAMPAGNE FLUTE — premium filled shape
//
//  Design: real flute proportions
//  - Bowl: wide at rim, tapers continuously to a narrow stem junction
//  - Stem: very thin, single-width
//  - Base: wide, low, slightly curved foot
//  - Fill: gradient from dark edge → bright mid → dark edge (glass illusion)
//  - Liquid: golden fill in lower 65% of bowl
//  - Highlights: left specular streak + rim ellipse + base glint
//
//  Local coordinate space: 44 wide × 108 tall
//  Rim at top (y=0), base foot bottom at y=108
// ─────────────────────────────────────────────────────────────────────────────
function Flute({
  id, x, y, scale = 1, rotate = 0, gold, goldLight, goldDark,
}: {
  id: string; x: number; y: number; scale?: number; rotate?: number;
  gold: string; goldLight: string; goldDark: string;
}) {
  // ── Geometry constants (in local 44×108 space) ──
  const rw = 44;   // rim width
  const sw = 5.0;  // stem width (narrow)
  const fw = 40;   // base foot width
  const bh = 64;   // bowl height (rim to stem top)
  const sh = 26;   // stem height
  const fh = 4.5;  // base foot height

  // Bowl taper: left edge goes from x=0 at top → x=(rw-sw)/2 at bottom
  // Right edge: from x=rw at top → x=(rw+sw)/2 at bottom
  // Using cubic bezier with slight inward curve for elegance
  const lx1 = 1.5, ly1 = bh * 0.35;
  const lx2 = (rw - sw) / 2 - 1, ly2 = bh * 0.78;
  const rx1 = rw - 1.5, ry1 = bh * 0.35;
  const rx2 = (rw + sw) / 2 + 1, ry2 = bh * 0.78;

  const bowl = `
    M 0 2
    C ${lx1} ${ly1} ${lx2} ${ly2} ${(rw-sw)/2} ${bh}
    L ${(rw+sw)/2} ${bh}
    C ${rx2} ${ry2} ${rx1} ${ry1} ${rw} 2
    Z
  `;

  // Rim ellipse (the open top, slight perspective)
  const rim = `M 0 2 C 0 6.5 ${rw} 6.5 ${rw} 2 C ${rw} -2.5 0 -2.5 0 2 Z`;

  // Stem: thin rectangle from bowl bottom to base top
  const stemX = (rw - sw) / 2;
  const stemTop = bh;
  const stemBot = bh + sh;

  // Base foot: gentle convex curve, wider than stem
  const footX = (rw - fw) / 2;
  const footY = stemBot;
  const foot = `
    M ${footX} ${footY}
    C ${footX} ${footY + fh * 0.6} ${rw/2 - fw/2} ${footY + fh} ${rw/2} ${footY + fh}
    C ${rw/2 + fw/2} ${footY + fh} ${rw - footX} ${footY + fh * 0.6} ${rw - footX} ${footY}
    Z
  `;

  // Champagne liquid fill (lower portion of bowl)
  const liqTop = bh * 0.26;
  const liqBot = bh * 0.98;
  // Liquid left/right bounds at each y — mirroring the bowl taper
  const liqLeftAt  = (y: number) => (rw - sw) / 2 * (y / bh) + 1.5 * (1 - y/bh);
  const liqRightAt = (y: number) => rw - liqLeftAt(y);
  const liqL1 = liqLeftAt(liqTop);
  const liqR1 = liqRightAt(liqTop);
  const liqL2 = liqLeftAt(liqBot);
  const liqR2 = liqRightAt(liqBot);

  const liquid = `
    M ${liqL1} ${liqTop}
    C ${liqL1 * 0.7} ${liqTop + (liqBot-liqTop)*0.35}
      ${liqL2 * 0.9} ${liqTop + (liqBot-liqTop)*0.7}
      ${liqL2} ${liqBot}
    L ${liqR2} ${liqBot}
    C ${liqR2 + (rw - liqR2) * 0.1} ${liqTop + (liqBot-liqTop)*0.7}
      ${liqR1 + (rw - liqR1) * 0.3} ${liqTop + (liqBot-liqTop)*0.35}
      ${liqR1} ${liqTop}
    Z
  `;

  const pivX = rw / 2 * scale;
  const pivY = (bh + sh + fh) * scale;
  const tfm = rotate
    ? `translate(${x} ${y}) rotate(${rotate} ${pivX} ${pivY}) scale(${scale})`
    : `translate(${x} ${y}) scale(${scale})`;

  return (
    <g transform={tfm}>
      <defs>
        {/* Horizontal glass gradient — dark edges, luminous center */}
        <linearGradient id={`${id}g`} x1="0" y1="0" x2={rw} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"    stopColor={goldDark}  stopOpacity="0.72" />
          <stop offset="16%"   stopColor={gold}      stopOpacity="0.90" />
          <stop offset="34%"   stopColor={goldLight} stopOpacity="0.95" />
          <stop offset="50%"   stopColor={goldLight} stopOpacity="0.22" />
          <stop offset="66%"   stopColor={goldLight} stopOpacity="0.95" />
          <stop offset="84%"   stopColor={gold}      stopOpacity="0.90" />
          <stop offset="100%"  stopColor={goldDark}  stopOpacity="0.72" />
        </linearGradient>
        {/* Liquid fill — vertical warm gold */}
        <linearGradient id={`${id}liq`} x1="0" y1={liqTop} x2="0" y2={liqBot} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={goldLight} stopOpacity="0.72" />
          <stop offset="55%"  stopColor={gold}      stopOpacity="0.82" />
          <stop offset="100%" stopColor={goldDark}  stopOpacity="0.65" />
        </linearGradient>
        {/* Rim radial glow */}
        <radialGradient id={`${id}rim`} cx={rw/2} cy="2" r={rw/2} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={goldLight} stopOpacity="0.8" />
          <stop offset="100%" stopColor={gold}      stopOpacity="0.2" />
        </radialGradient>
        {/* Base glint */}
        <radialGradient id={`${id}base`} cx={rw/2} cy={stemBot + fh*0.5} r={fw/2} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={goldLight} stopOpacity="0.6" />
          <stop offset="100%" stopColor={gold}      stopOpacity="0.25" />
        </radialGradient>
      </defs>

      {/* ── Bowl body (filled glass) */}
      <path d={bowl} fill={`url(#${id}g)`} />

      {/* ── Champagne liquid */}
      <path d={liquid} fill={`url(#${id}liq)`} />

      {/* ── Meniscus line — surface of champagne */}
      <path
        d={`M ${liqL1 + 1} ${liqTop} Q ${rw/2} ${liqTop - 3} ${liqR1 - 1} ${liqTop}`}
        fill="none" stroke={goldLight} strokeWidth="0.85" opacity="0.82"
      />

      {/* ── Bowl outline — crisp edge gives glass structure */}
      <path d={bowl} fill="none" stroke={gold} strokeWidth="1.15" strokeLinejoin="round" opacity="0.92" />

      {/* ── Rim ellipse — open mouth of glass */}
      <path d={rim} fill={`url(#${id}rim)`} opacity="0.52" />
      <path d={`M 0.5 2 C 0.5 5.8 ${rw-0.5} 5.8 ${rw-0.5} 2`}
        fill="none" stroke={goldLight} strokeWidth="1.05" opacity="0.78" />

      {/* ── Primary specular highlight — left inner wall */}
      <path
        d={`M ${rw*0.14} 8 C ${rw*0.12} ${bh*0.3} ${rw*0.13} ${bh*0.6} ${rw*0.16} ${bh*0.88}`}
        fill="none" stroke={goldLight} strokeWidth="2.6" strokeLinecap="round" opacity="0.52"
      />
      {/* ── Secondary specular — narrower, brighter center */}
      <path
        d={`M ${rw*0.20} 7 C ${rw*0.19} ${bh*0.28} ${rw*0.20} ${bh*0.55} ${rw*0.22} ${bh*0.82}`}
        fill="none" stroke={goldLight} strokeWidth="1.1" strokeLinecap="round" opacity="0.72"
      />

      {/* ── Stem */}
      <rect x={stemX} y={stemTop} width={sw} height={sh}
        fill={`url(#${id}g)`} />
      <rect x={stemX} y={stemTop} width={sw} height={sh}
        fill="none" stroke={gold} strokeWidth="0.7" opacity="0.7" />

      {/* ── Base foot */}
      <path d={foot} fill={`url(#${id}base)`} />
      <path d={foot} fill="none" stroke={gold} strokeWidth="0.9" strokeLinejoin="round" opacity="0.75" />

      {/* ── Base top glint line */}
      <path
        d={`M ${footX + 2} ${footY + 1} Q ${rw/2} ${footY - 0.5} ${rw - footX - 2} ${footY + 1}`}
        fill="none" stroke={goldLight} strokeWidth="0.7" opacity="0.55"
      />
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PREMIUM BUBBLES — champagne sparkle trail
//  "Rises" upward from the toasting point (between the glasses)
//  Pattern: ascending arcs, not random dots
//  Each bubble: small circle with inner highlight for depth
// ─────────────────────────────────────────────────────────────────────────────
function BubbleTrail({
  x, y, gold, goldLight,
}: { x: number; y: number; gold: string; goldLight: string }) {
  // Bubble positions: [cx, cy, radius, opacity] relative to origin (x,y)
  const bubbles = [
    // Primary cluster — close to glass rim (rising from toast point)
    [0,   0,    3.2, 0.92],
    [-6,  -9,   2.4, 0.80],
    [7,   -7,   2.0, 0.74],
    [-12, -18,  1.7, 0.65],
    [4,   -20,  1.4, 0.60],
    [13,  -14,  1.2, 0.52],
    // Secondary — mid-rise
    [-8,  -30,  1.0, 0.45],
    [10,  -28,  0.9, 0.42],
    [-16, -26,  0.8, 0.38],
    [18,  -22,  0.7, 0.35],
    // Tertiary — high rise, very subtle
    [-4,  -38,  0.7, 0.30],
    [8,   -40,  0.6, 0.26],
    [-14, -36,  0.55, 0.22],
    [16,  -34,  0.5, 0.20],
    [0,   -44,  0.5, 0.18],
  ];

  return (
    <g transform={`translate(${x} ${y})`}>
      {bubbles.map(([bx, by, r, op], i) => (
        <g key={i}>
          {/* Outer bubble ring */}
          <circle cx={bx} cy={by} r={r} fill="none" stroke={gold} strokeWidth="0.55" opacity={op} />
          {/* Inner fill — very subtle */}
          <circle cx={bx} cy={by} r={r * 0.55} fill={goldLight} opacity={op * 0.35} />
          {/* Specular fleck at top-left of each bubble */}
          {r > 1.2 && (
            <circle cx={bx - r * 0.3} cy={by - r * 0.3} r={r * 0.18} fill={goldLight} opacity={op * 0.7} />
          )}
        </g>
      ))}
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PREMIUM JET — clean filled silhouette, A380-class proportions
//
//  Drawn in LOCAL space, pointing RIGHT (+x direction).
//  Then rotated to heading angle at the arc tip.
//
//  The jet must:
//  - feel integrated, not pasted-on
//  - be clearly recognizable as a wide-body commercial aircraft
//  - scale to 30–38 units wingspan in the 140×140 mark
//  - have filled wings + fuselage with subtle shading
//  - be oriented so it appears to be climbing/ascending
//
//  Local space: fuselage along x-axis, nose at x=+max, tail at x=0
//  Wings span in y-axis: upper wing at y<0, lower wing at y>0
// ─────────────────────────────────────────────────────────────────────────────
function PremiumJet({
  id, cx, cy, heading = -42, ws = 34, gold, goldLight, goldDark,
}: {
  id: string; cx: number; cy: number;
  heading?: number; ws?: number;  // ws = wingspan in parent coords
  gold: string; goldLight: string; goldDark: string;
}) {
  // Design wingspan = 100 units, scale so rendered wingspan = ws
  const s = ws / 100;

  // ── Fuselage ──────────────────────────────────────────────────────────────
  // Total fuselage length: 140 units local (140*s rendered)
  // Nose: sharp taper from x=140 to x=120 over width 0→6
  // Body: tube from x=10 to x=120, height ±5.5
  // Tail: tapers from x=10 to x=0 over width 5.5→2
  const fuse = `
    M ${0*s}   ${2.2*s}
    C ${8*s}   ${3.5*s}  ${30*s}  ${5*s}    ${60*s}  ${5.5*s}
    C ${90*s}  ${5.5*s}  ${118*s} ${5*s}    ${132*s} ${2.5*s}
    C ${137*s} ${1.2*s}  ${140*s} ${0}      ${140*s} ${0}
    C ${140*s} ${0}      ${137*s} ${-1.2*s} ${132*s} ${-2.5*s}
    C ${118*s} ${-5*s}   ${90*s}  ${-5.5*s} ${60*s}  ${-5.5*s}
    C ${30*s}  ${-5*s}   ${8*s}   ${-3.5*s} ${0*s}   ${-2.2*s}
    Z
  `;

  // ── Upper deck hump (A380 / Emirates wide-body feature) ──
  const hump = `
    M ${40*s}  ${-5.5*s}
    C ${48*s}  ${-8.5*s}  ${72*s}  ${-9*s}   ${92*s}  ${-6*s}
    C ${72*s}  ${-5.8*s}  ${48*s}  ${-5.6*s} ${40*s}  ${-5.5*s}
    Z
  `;

  // ── Main swept wings ──────────────────────────────────────────────────────
  // Wing root at x=70, chord ~30 units local
  // Swept leading edge: x decreases toward tip
  // Wing tip at ~y=±50 (=±50*s rendered)
  // Lower trailing edge sweeps back
  const wingU = `
    M ${80*s}  ${-5.2*s}
    C ${74*s}  ${-8*s}    ${58*s}  ${-22*s}  ${44*s}  ${-36*s}
    C ${42*s}  ${-40*s}   ${42*s}  ${-48*s}  ${46*s}  ${-50*s}
    C ${50*s}  ${-52*s}   ${54*s}  ${-50*s}  ${54*s}  ${-48*s}
    C ${60*s}  ${-38*s}   ${72*s}  ${-22*s}  ${82*s}  ${-5.2*s}
    Z
  `;
  const wingD = `
    M ${80*s}  ${5.2*s}
    C ${74*s}  ${8*s}     ${58*s}  ${22*s}   ${44*s}  ${36*s}
    C ${42*s}  ${40*s}    ${42*s}  ${48*s}   ${46*s}  ${50*s}
    C ${50*s}  ${52*s}    ${54*s}  ${50*s}   ${54*s}  ${48*s}
    C ${60*s}  ${38*s}    ${72*s}  ${22*s}   ${82*s}  ${5.2*s}
    Z
  `;

  // ── Horizontal stabilizers (tail) ────────────────────────────────────────
  const stabU = `
    M ${20*s}  ${-4.5*s}
    C ${15*s}  ${-7*s}    ${6*s}   ${-16*s}  ${2*s}   ${-22*s}
    C ${1*s}   ${-24*s}   ${2*s}   ${-25*s}  ${4*s}   ${-24.5*s}
    C ${8*s}   ${-20*s}   ${16*s}  ${-10*s}  ${22*s}  ${-4.5*s}
    Z
  `;
  const stabD = `
    M ${20*s}  ${4.5*s}
    C ${15*s}  ${7*s}     ${6*s}   ${16*s}   ${2*s}   ${22*s}
    C ${1*s}   ${24*s}    ${2*s}   ${25*s}   ${4*s}   ${24.5*s}
    C ${8*s}   ${20*s}    ${16*s}  ${10*s}   ${22*s}  ${4.5*s}
    Z
  `;

  // ── Vertical tail fin ─────────────────────────────────────────────────────
  const fin = `
    M ${12*s}  ${-4*s}
    C ${14*s}  ${-7*s}    ${18*s}  ${-18*s}  ${22*s}  ${-22*s}
    C ${25*s}  ${-24*s}   ${27*s}  ${-23*s}  ${26*s}  ${-20*s}
    C ${24*s}  ${-16*s}   ${20*s}  ${-9*s}   ${16*s}  ${-4*s}
    Z
  `;

  // ── Engine nacelles (4 engines — 2 per wing, A380-style) ────────────────
  // Each engine: rounded tube shape under wing
  type Engine = { ex: number; ey: number; er: number; el: number };
  const engines: Engine[] = [
    // Upper wing engines (negative y)
    { ex: 60, ey: -22, er: 6, el: 14 },
    { ex: 48, ey: -36, er: 4.5, el: 11 },
    // Lower wing engines (positive y)
    { ex: 60, ey:  22, er: 6, el: 14 },
    { ex: 48, ey:  36, er: 4.5, el: 11 },
  ];

  return (
    <g transform={`translate(${cx} ${cy}) rotate(${heading})`}>
      <defs>
        <linearGradient id={`${id}fw`} x1="0" y1={`${-52*s}`} x2="0" y2={`${52*s}`} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={goldLight} stopOpacity="0.95" />
          <stop offset="40%"  stopColor={gold}      stopOpacity="1" />
          <stop offset="100%" stopColor={goldDark}  stopOpacity="0.82" />
        </linearGradient>
        <linearGradient id={`${id}ff`} x1="0" y1={`${-6*s}`} x2="0" y2={`${6*s}`} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={goldLight} stopOpacity="0.98" />
          <stop offset="55%"  stopColor={gold}      stopOpacity="1" />
          <stop offset="100%" stopColor={goldDark}  stopOpacity="0.85" />
        </linearGradient>
        <filter id={`${id}shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx={0.8*s} dy={0.8*s} stdDeviation={1.5*s} floodColor={goldDark} floodOpacity="0.5" />
        </filter>
      </defs>

      <g filter={`url(#${id}shadow)`}>
        {/* Wings (behind fuselage) */}
        <path d={wingU} fill={`url(#${id}fw)`} />
        <path d={wingD} fill={`url(#${id}fw)`} />

        {/* Wing leading-edge highlights */}
        <path
          d={`M ${80*s} ${-5.5*s} C ${70*s} ${-14*s} ${56*s} ${-32*s} ${46*s} ${-48*s}`}
          fill="none" stroke={goldLight} strokeWidth={`${1.1*s}`} strokeLinecap="round" opacity="0.55"
        />
        <path
          d={`M ${80*s} ${5.5*s} C ${70*s} ${14*s} ${56*s} ${32*s} ${46*s} ${48*s}`}
          fill="none" stroke={goldLight} strokeWidth={`${1.1*s}`} strokeLinecap="round" opacity="0.55"
        />

        {/* Horizontal stabilizers */}
        <path d={stabU} fill={`url(#${id}fw)`} />
        <path d={stabD} fill={`url(#${id}fw)`} />

        {/* Vertical fin */}
        <path d={fin} fill={`url(#${id}fw)`} />
        <path d={fin} fill="none" stroke={goldLight} strokeWidth={`${0.5*s}`} opacity="0.45" />

        {/* Engine nacelles */}
        {engines.map(({ ex, ey, er, el }, i) => {
          const ecx = ex * s;
          const ecy = ey * s;
          const ew = el * s;
          const eh = er * s;
          return (
            <g key={i}>
              <ellipse cx={ecx - ew*0.1} cy={ecy} rx={ew * 0.6} ry={eh}
                fill={goldDark} opacity="0.92" />
              <rect x={ecx - ew*0.65} y={ecy - eh} width={ew*1.3} height={eh*2}
                rx={eh} fill={goldDark} opacity="0.88" />
              {/* Intake ring */}
              <ellipse cx={ecx + ew*0.6} cy={ecy} rx={eh*0.6} ry={eh}
                fill={goldLight} opacity="0.38" />
              <ellipse cx={ecx + ew*0.6} cy={ecy} rx={eh*0.6} ry={eh}
                fill="none" stroke={gold} strokeWidth={`${0.45*s}`} opacity="0.6" />
            </g>
          );
        })}

        {/* Fuselage (top layer) */}
        <path d={fuse}     fill={`url(#${id}ff)`} />
        <path d={hump}     fill={goldLight} opacity="0.45" />
        <path d={fuse}     fill="none" stroke={goldLight} strokeWidth={`${0.55*s}`} opacity="0.65" />

        {/* Fuselage top highlight */}
        <path
          d={`M ${12*s} ${-5.2*s} C ${50*s} ${-6.5*s} ${100*s} ${-6.5*s} ${128*s} ${-4*s}`}
          fill="none" stroke={goldLight} strokeWidth={`${1.4*s}`} strokeLinecap="round" opacity="0.58"
        />

        {/* Cockpit windshield */}
        <path
          d={`M ${134*s} ${-2.2*s} C ${137*s} ${-2.2*s} ${139*s} ${-1*s} ${140*s} ${0} C ${139*s} ${1*s} ${137*s} ${2.2*s} ${134*s} ${2.2*s} Z`}
          fill={goldDark} opacity="0.55"
        />
        <path
          d={`M ${135*s} ${-1.6*s} C ${138*s} ${-1.2*s} ${139.5*s} ${-0.5*s} ${140*s} ${0}`}
          fill="none" stroke={goldLight} strokeWidth={`${0.6*s}`} strokeLinecap="round" opacity="0.4"
        />

        {/* Cabin window row */}
        {[42, 52, 62, 72, 82, 92, 102, 112, 122].map((wx, i) => (
          <ellipse key={i}
            cx={`${wx*s}`} cy={`${-4.2*s}`}
            rx={`${1.3*s}`} ry={`${0.85*s}`}
            fill={goldDark} opacity="0.42"
          />
        ))}
      </g>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  CELESTIAL STAR — shining point at arc terminus
//  Four-pointed star with soft radial glow
// ─────────────────────────────────────────────────────────────────────────────
function CelestialStar({
  cx, cy, r = 4.5, gold, goldLight,
}: { cx: number; cy: number; r?: number; gold: string; goldLight: string }) {
  const id = `star${Math.round(cx)}${Math.round(cy)}`;
  // 4-pointed star path: alternating outer r and inner r*0.38 points
  const pts: [number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.38;
    pts.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
  }
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ') + ' Z';

  return (
    <g>
      <defs>
        <radialGradient id={`${id}glow`} cx={cx} cy={cy} r={r * 3.5} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={goldLight} stopOpacity="0.35" />
          <stop offset="40%"  stopColor={gold}      stopOpacity="0.12" />
          <stop offset="100%" stopColor={gold}      stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Outer glow halo */}
      <circle cx={cx} cy={cy} r={r * 3.5} fill={`url(#${id}glow)`} />
      {/* Mid glow */}
      <circle cx={cx} cy={cy} r={r * 1.6} fill={goldLight} opacity="0.12" />
      {/* Star body */}
      <path d={d} fill={goldLight} opacity="0.92" />
      {/* Bright center point */}
      <circle cx={cx} cy={cy} r={r * 0.22} fill={goldLight} opacity="0.98" />
      {/* Cross flares */}
      <line x1={cx - r*1.8} y1={cy} x2={cx + r*1.8} y2={cy}
        stroke={goldLight} strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
      <line x1={cx} y1={cy - r*1.8} x2={cx} y2={cy + r*1.8}
        stroke={goldLight} strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  EVENZS MARK — master composition
//
//  ViewBox: 0 0 140 140
//
//  COMPOSITION (matching reference image):
//
//  1. HALF-MOON ARC — wraps BELOW and around glasses
//     Center: (70, 72)  Radius: 58
//     This is a "lower crescent" — arc runs from lower-left to upper-right
//     Start point (arc bottom-left): (20, 102) — lower-left
//     End point (arc tip upper-right): (115, 24) — where jet sits
//     SVG arc large-arc=1, sweep=1 (clockwise) for the bottom wrap
//
//  2. CELESTIAL STAR — at arc endpoint (115, 24) — left terminus
//
//  3. GLASSES — centered in frame, leaning toward each other
//     Left glass:  base ~(38, 108), leans right  (+7°)
//     Right glass: base ~(90, 108), leans left   (-7°)
//     Both glasses share same base Y, creating symmetry
//
//  4. BUBBLE TRAIL — rises from the toasting point between glasses (~x=68, y=28)
//
//  5. JET — at arc terminus (top-right ~115,24), heading upper-right, 34px wingspan
//
//  COLOR NOTE: full gold on dark, gold-mid on light
// ─────────────────────────────────────────────────────────────────────────────
interface MarkProps {
  size?: number;
  dark?: boolean;
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function EvenzsMark({
  size = 80,
  dark = true,
  animated = false,
  className = '',
  style,
}: MarkProps) {
  const uid = `em${dark ? 'd' : 'l'}${Math.round(size)}`;
  const G = {
    gold:      dark ? BRAND.gold      : BRAND.goldMid,
    goldLight: dark ? BRAND.goldLight : BRAND.gold,
    goldDark:  dark ? BRAND.goldDark  : BRAND.goldDark,
  };

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="Evenzs"
      role="img"
    >
      <defs>
        {/* Arc gradient — left terminus dim, right terminus bright */}
        <linearGradient id={`${uid}arc`} x1="18" y1="78" x2="122" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={G.gold}      stopOpacity="0.28" />
          <stop offset="40%"  stopColor={G.gold}      stopOpacity="0.72" />
          <stop offset="80%"  stopColor={G.goldLight} stopOpacity="0.92" />
          <stop offset="100%" stopColor={G.goldLight} stopOpacity="1" />
        </linearGradient>
        {/* Ambient glow at jet position */}
        <radialGradient id={`${uid}jetglow`} cx="82" cy="26" r="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={G.goldLight} stopOpacity="0.22" />
          <stop offset="100%" stopColor={G.goldLight} stopOpacity="0" />
        </radialGradient>
        {/* Glass rim ambient */}
        <radialGradient id={`${uid}rimglow`} cx="70" cy="30" r="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={G.goldLight} stopOpacity="0.06" />
          <stop offset="100%" stopColor={G.goldLight} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Ambient glow at jet position */}
      <circle cx="82" cy="26" r="26" fill={`url(#${uid}jetglow)`} />
      {/* ── Soft glow between glasses (toast moment) */}
      <ellipse cx="70" cy="32" rx="36" ry="26" fill={`url(#${uid}rimglow)`} />

      {/* ═══════════════════════════════════════════════════════════════════
          HALF-MOON ARC — ∩ arch shape, rises UPWARD from glass bases
          Two endpoints sit at the base level of the glasses.
          The arc curves UP and OVER, peaking above — like a halo or orbital
          ring framing the glasses from the outside.

          Arc math:
            Center: (70, 88)  Radius: 54
            Left terminus:  (70 - 54, 88) = (16, 88)
            Right terminus: (70 + 54, 88) = (124, 88)
            Top of arch:    (70, 88 - 54) = (70, 34) — above the glasses

          SVG path: M 16 88 A 54 54 0 0 1 124 88
            sweep-flag=1 draws clockwise → goes DOWN (wrong)
          SVG path: M 16 88 A 54 54 0 0 0 124 88
            sweep-flag=0 draws counter-clockwise → goes UP (correct ∩)

          Gradient: left terminus dim → right terminus bright (star)
          Celestial star at right terminus (124, 88)
          ═══════════════════════════════════════════════════════════════════ */}
      <path
        d="M 18 78 A 52 52 0 0 0 122 78"
        stroke={`url(#${uid}arc)`}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
        className={animated ? 'flow-line' : ''}
      />

      {/* ── CELESTIAL STAR at arc right terminus (122, 78) */}
      <CelestialStar cx={122} cy={78} r={4.2} gold={G.gold} goldLight={G.goldLight} />

      {/* ══════════════════════════════════════════════════════════════════
          CHAMPAGNE GLASSES — close together, toasting
          Both bases share the same Y, centered in the frame.
          Left glass leans +14° right, right glass leans -14° left.
          Rims nearly touch at center top — cinematic toast moment.

          Flute local space: 44w, total height = bh(64)+sh(26)+fh(4.5) = 94.5
          Scale: 0.52 → rendered: 22.9w × 49.1h

          Target base-center X:
            Left:  x = 58  → translate x = 58 - 22.9/2 = 46.5
            Right: x = 80  → translate x = 80 - 22.9/2 = 68.5
          Target base Y: 84  → translate y = 84 - 49.1 = 34.9 ≈ 32
          (adjusted slightly for rotation pivot shift)
          ══════════════════════════════════════════════════════════════════ */}

      {/* Left flute — leaning right toward toast */}
      <Flute
        id={`${uid}L`}
        x={38}
        y={50}
        scale={0.52}
        rotate={14}
        gold={G.gold}
        goldLight={G.goldLight}
        goldDark={G.goldDark}
      />

      {/* Right flute — leaning left toward toast */}
      <Flute
        id={`${uid}R`}
        x={72}
        y={44}
        scale={0.54}
        rotate={-14}
        gold={G.gold}
        goldLight={G.goldLight}
        goldDark={G.goldDark}
      />

      {/* Bubble trail from toast contact point */}
      <BubbleTrail
        x={70}
        y={32}
        gold={G.gold}
        goldLight={G.goldLight}
      />

      {/* Jet above glasses, right of center */}
      <PremiumJet
        id={`${uid}P`}
        cx={82}
        cy={26}
        heading={-32}
        ws={28}
        gold={G.gold}
        goldLight={G.goldLight}
        goldDark={G.goldDark}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  APP ICON
// ─────────────────────────────────────────────────────────────────────────────
export function EvenzsAppIcon({
  size = 64,
  variant = 'dark',
  className = '',
  style,
}: {
  size?: number;
  variant?: 'dark' | 'gold' | 'light' | 'circle' | 'platinum';
  className?: string;
  style?: CSSProperties;
}) {
  const uid = `ai${variant}${Math.round(size)}`;
  const isGold     = variant === 'gold';
  const isLight    = variant === 'light';
  const isPlatinum = variant === 'platinum';
  const isCircle   = variant === 'circle';

  const bgA = isGold ? '#D4AF37' : isLight ? '#F7F3E9' : isPlatinum ? '#B8BFC8' : '#121B2B';
  const bgB = isGold ? '#8B6914' : isLight ? '#EDE5D0' : isPlatinum ? '#6B7280' : '#0B1220';
  const gold      = isGold ? '#0B1220' : BRAND.gold;
  const goldLight = isGold ? '#121B2B' : BRAND.goldLight;
  const goldDark  = isGold ? '#040810' : BRAND.goldDark;
  const rx = isCircle ? 70 : 24;

  return (
    <svg width={size} height={size} viewBox="0 0 140 140" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} style={style}
      aria-label="Evenzs app icon">
      <defs>
        <linearGradient id={`${uid}bg`} x1="0" y1="0" x2="140" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={bgA} />
          <stop offset="100%" stopColor={bgB} />
        </linearGradient>
        <linearGradient id={`${uid}shine`} x1="0" y1="0" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="white" stopOpacity="0.06" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}arc`} x1="18" y1="78" x2="122" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={gold}      stopOpacity="0.28" />
          <stop offset="40%"  stopColor={gold}      stopOpacity="0.72" />
          <stop offset="80%"  stopColor={goldLight} stopOpacity="0.92" />
          <stop offset="100%" stopColor={goldLight} stopOpacity="1" />
        </linearGradient>
        <radialGradient id={`${uid}jg`} cx="82" cy="30" r="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={goldLight} stopOpacity="0.2" />
          <stop offset="100%" stopColor={goldLight} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}rg`} cx="70" cy="42" r="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={goldLight} stopOpacity="0.05" />
          <stop offset="100%" stopColor={goldLight} stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${uid}clip`}>
          <rect width="140" height="140" rx={rx} />
        </clipPath>
      </defs>

      <rect width="140" height="140" rx={rx} fill={`url(#${uid}bg)`} />
      <rect width="140" height="140" rx={rx} fill={`url(#${uid}shine)`} />

      <g clipPath={`url(#${uid}clip)`}>
        <circle cx="82" cy="30" r="28" fill={`url(#${uid}jg)`} />
        <ellipse cx="70" cy="42" rx="36" ry="26" fill={`url(#${uid}rg)`} />

        <path d="M 18 78 A 52 52 0 0 0 122 78"
          stroke={`url(#${uid}arc)`} strokeWidth="3" strokeLinecap="round" fill="none" />

        <CelestialStar cx={122} cy={78} r={4.2} gold={gold} goldLight={goldLight} />

        <Flute id={`${uid}L`} x={38} y={50} scale={0.52} rotate={14}
          gold={gold} goldLight={goldLight} goldDark={goldDark} />
        <Flute id={`${uid}R`} x={72} y={44} scale={0.54} rotate={-14}
          gold={gold} goldLight={goldLight} goldDark={goldDark} />

        <BubbleTrail x={70} y={48} gold={gold} goldLight={goldLight} />

        {/* Jet repositioned to fit fully within the icon boundary */}
        <PremiumJet id={`${uid}P`} cx={80} cy={28} heading={-32} ws={28}
          gold={gold} goldLight={goldLight} goldDark={goldDark} />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  FAVICON
// ─────────────────────────────────────────────────────────────────────────────
export function EvenzsFavicon({
  size = 32,
  className = '',
  style,
}: { size?: number; className?: string; style?: CSSProperties }) {
  const uid = `fv${Math.round(size)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <defs>
        <linearGradient id={`${uid}arc`} x1="18" y1="78" x2="122" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={BRAND.gold}      stopOpacity="0.28" />
          <stop offset="100%" stopColor={BRAND.goldLight} stopOpacity="1" />
        </linearGradient>
        <clipPath id={`${uid}clip`}>
          <rect width="140" height="140" rx="27" />
        </clipPath>
      </defs>
      <rect width="140" height="140" rx="27" fill={BRAND.navy} />
      <g clipPath={`url(#${uid}clip)`}>
        <path d="M 18 78 A 52 52 0 0 0 122 78"
          stroke={`url(#${uid}arc)`} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <CelestialStar cx={122} cy={78} r={4.2} gold={BRAND.gold} goldLight={BRAND.goldLight} />
        <Flute id={`${uid}L`} x={38} y={50} scale={0.52} rotate={14}
          gold={BRAND.gold} goldLight={BRAND.goldLight} goldDark={BRAND.goldDark} />
        <Flute id={`${uid}R`} x={72} y={44} scale={0.54} rotate={-14}
          gold={BRAND.gold} goldLight={BRAND.goldLight} goldDark={BRAND.goldDark} />
        <BubbleTrail x={70} y={48} gold={BRAND.gold} goldLight={BRAND.goldLight} />
        <PremiumJet id={`${uid}P`} cx={80} cy={28} heading={-32} ws={28}
          gold={BRAND.gold} goldLight={BRAND.goldLight} goldDark={BRAND.goldDark} />
      </g>
    </svg>
  );
}

export function EvenzsIconMinimal({ size = 40, dark = true, className = '' }: { size?: number; dark?: boolean; className?: string }) {
  return <EvenzsMark size={size} dark={dark} className={className} />;
}

export function EvenzsMonogram({ size = 64, dark = true, className = '' }: { size?: number; dark?: boolean; className?: string }) {
  return <EvenzsMark size={size} dark={dark} className={className} />;
}
