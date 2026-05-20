import React from 'react';
import { EvenzsMark, EvenzsAppIcon, EvenzsFavicon, EvenzsMonogram, BRAND } from './EvenzsMark';
import { LogoWordmark } from './LogoWordmark';

/*
  BRAND SHEET — 1:1 reproduction of evenzs1.png reference
  ════════════════════════════════════════════════════════════════════
  LAYOUT (from reference top-to-bottom, left-to-right):

  ROW 1: [Dark hero panel — symbol + large wordmark + tagline + 5 pillars]
         [Right: LOGO VARIATIONS — horizontal lockup | stacked lockup]
         [Right: MONOGRAM/ICON | MINIMAL ICON]

  ROW 2: [APP ICONS — 5 variants]
         [FAVICONS — 3 sizes]
         [SAFARI PINNED TAB]

  ROW 3: [Business card mockup dark]
         [Phone mockup with iOS icon]
         [Signage mockup dark]
         [Plane window / champagne mockup]
         [Tagline lockup right panel]

  ROW 4 (bottom bar): [COLOR PALETTE] [TYPOGRAPHY Aa] [BRAND ESSENCE] [TAGLINE LOCKUP gold]
*/

// ── Shared ───────────────────────────────────────────────────────────────────

const FF = "'Poppins', 'Manrope', sans-serif";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: FF, fontWeight: 600, fontSize: 8.5,
      letterSpacing: '0.2em', textTransform: 'uppercase' as const,
      color: '#374151', margin: '0 0 10px',
    }}>
      {children}
    </p>
  );
}

function GoldLine({ width = '100%' }: { width?: number | string }) {
  return (
    <div style={{
      width, height: 1,
      background: 'linear-gradient(90deg, rgba(212,175,55,0.6) 0%, rgba(212,175,55,0.15) 80%, transparent 100%)',
      margin: '8px 0 14px',
    }} />
  );
}

// ── Section 1 — LEFT: Hero dark panel ────────────────────────────────────────

function HeroDark() {
  return (
    <div style={{
      background: 'linear-gradient(150deg, #0E1828 0%, #0B1220 60%, #080E18 100%)',
      borderRadius: 16,
      padding: '44px 40px 36px',
      position: 'relative',
      overflow: 'hidden',
      flex: '1 1 420px',
    }}>
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 16,
        backgroundImage: 'linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)',
        backgroundSize: '42px 42px',
      }} />
      {/* Glow top-right */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 260, height: 260,
        background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Large logo lockup */}
        <LogoWordmark dark size="xl" showTagline />

        {/* 5 pillars row */}
        <div style={{
          display: 'flex', gap: 28, marginTop: 36,
          flexWrap: 'wrap' as const,
        }}>
          {[
            { icon: <CelebrationIcon />, label: 'CELEBRATION' },
            { icon: <MovementIcon />,    label: 'MOVEMENT' },
            { icon: <CoordIcon />,       label: 'COORDINATION' },
            { icon: <ExecIcon />,        label: 'EXECUTION' },
            { icon: <ConfIcon />,        label: 'CONFIDENCE' },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <div style={{ color: BRAND.gold, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
              </div>
              <span style={{ fontFamily: FF, fontWeight: 500, fontSize: 7.5, color: '#4B5563', letterSpacing: '0.14em', textTransform: 'uppercase' as const }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section 1 — RIGHT: Logo variations ───────────────────────────────────────

function LogoVariations() {
  return (
    <div style={{ flex: '0 0 360px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SectionTitle>Logo Variations</SectionTitle>
      <GoldLine />

      {/* Row: Horizontal + Stacked */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Horizontal lockup — ivory bg */}
        <div style={{ background: BRAND.ivory, borderRadius: 12, padding: '20px 16px' }}>
          <p style={{ fontFamily: FF, fontSize: 7.5, color: '#9CA3AF', letterSpacing: '0.15em', margin: '0 0 14px', textTransform: 'uppercase' as const }}>HORIZONTAL LOCKUP</p>
          <LogoWordmark dark={false} size="xs" showTagline />
        </div>
        {/* Stacked lockup — ivory bg */}
        <div style={{ background: BRAND.ivory, borderRadius: 12, padding: '20px 16px', display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: FF, fontSize: 7.5, color: '#9CA3AF', letterSpacing: '0.15em', margin: '0 0 14px', textTransform: 'uppercase' as const }}>STACKED LOCKUP</p>
          <LogoWordmark dark={false} size="xs" showTagline stacked />
        </div>
      </div>

      {/* Row: Monogram + Minimal */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Monogram / App icon dark */}
        <div style={{ background: BRAND.ivory, borderRadius: 12, padding: '20px 16px', display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: FF, fontSize: 7.5, color: '#9CA3AF', letterSpacing: '0.15em', margin: '0 0 14px', textTransform: 'uppercase' as const }}>MONOGRAM / ICON</p>
          <EvenzsAppIcon size={80} variant="dark" style={{ borderRadius: 18 }} />
        </div>
        {/* Minimal icon — ivory bg */}
        <div style={{ background: BRAND.ivory, borderRadius: 12, padding: '20px 16px', display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: FF, fontSize: 7.5, color: '#9CA3AF', letterSpacing: '0.15em', margin: '0 0 14px', textTransform: 'uppercase' as const }}>MINIMAL ICON</p>
          <EvenzsMark size={80} dark={false} />
        </div>
      </div>
    </div>
  );
}

// ── Section 2 — App Icons + Favicons + Safari ────────────────────────────────

function AppIconSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 16, alignItems: 'start' }}>
      {/* App icons */}
      <div>
        <SectionTitle>App Icons</SectionTitle>
        <GoldLine />
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', flexWrap: 'wrap' as const }}>
          {/* Rounded square dark */}
          <EvenzsAppIcon size={100} variant="dark" style={{ borderRadius: 22 }} />
          {/* Gold */}
          <EvenzsAppIcon size={100} variant="gold" style={{ borderRadius: 22 }} />
          {/* Light */}
          <EvenzsAppIcon size={100} variant="light" style={{ borderRadius: 22, border: '1px solid rgba(0,0,0,0.08)' }} />
          {/* Circle dark */}
          <EvenzsAppIcon size={100} variant="circle" />
          {/* Circle gold */}
          <EvenzsAppIcon size={100} variant="platinum" style={{ borderRadius: '50%' }} />
        </div>
      </div>

      {/* Favicons */}
      <div>
        <SectionTitle>Favicons</SectionTitle>
        <GoldLine />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <EvenzsFavicon size={64} style={{ borderRadius: 14 }} />
            <span style={{ fontFamily: FF, fontSize: 8, color: '#9CA3AF' }}>64×64</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <EvenzsFavicon size={44} style={{ borderRadius: 10 }} />
            <span style={{ fontFamily: FF, fontSize: 8, color: '#9CA3AF' }}>32×32</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <EvenzsFavicon size={28} style={{ borderRadius: 6 }} />
            <span style={{ fontFamily: FF, fontSize: 8, color: '#9CA3AF' }}>16×16</span>
          </div>
        </div>
      </div>

      {/* Safari pinned tab */}
      <div>
        <SectionTitle>Safari Pinned Tab</SectionTitle>
        <GoldLine />
        <EvenzsAppIcon size={80} variant="circle" />
      </div>
    </div>
  );
}

// ── Section 3 — Mockups row ───────────────────────────────────────────────────

function MockupRow() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.4fr', gap: 14 }}>
      {/* Business card dark */}
      <div style={{
        background: 'linear-gradient(145deg, #111927, #080E18)',
        borderRadius: 14, padding: '28px 24px',
        minHeight: 160, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.025) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <LogoWordmark dark size="xs" showTagline />
        </div>
      </div>

      {/* Phone mockup */}
      <div style={{
        background: '#1C1C1E',
        borderRadius: 14, padding: '14px 12px 18px',
        border: '1.5px solid rgba(255,255,255,0.1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Status bar */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 12, padding: '0 6px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'white' }}>9:41</span>
          <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'white' }}>▶▶▶</span>
        </div>
        {/* App grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, width: '100%', marginBottom: 8 }}>
          {[0,1,2,3,4,5].map(i => (
            i === 3 ? (
              <div key={i} style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '1' }}>
                <EvenzsAppIcon size={56} variant="dark" style={{ width: '100%', height: '100%', borderRadius: 10 }} />
              </div>
            ) : (
              <div key={i} style={{
                borderRadius: 10, aspectRatio: '1',
                background: 'rgba(255,255,255,0.06)',
              }} />
            )
          ))}
        </div>
        <p style={{ fontFamily: FF, fontSize: 8, color: 'white', margin: 0, opacity: 0.8 }}>Evenzs</p>
      </div>

      {/* Signage mockup */}
      <div style={{
        background: 'linear-gradient(160deg, #10192A 0%, #070E18 100%)',
        borderRadius: 14, padding: '28px 24px',
        minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: -40, left: -40, width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 65%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <LogoWordmark dark size="sm" showTagline />
        </div>
      </div>

      {/* Right panel — champagne + copy */}
      <div style={{
        background: 'linear-gradient(170deg, #0C1525 0%, #080E18 100%)',
        borderRadius: 14, padding: '28px 28px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -30, right: -30, width: 180, height: 180,
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Mini logo row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <EvenzsMark size={40} dark />
            <div>
              <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 18, color: 'white', margin: 0, letterSpacing: '-0.02em' }}>evenzs</p>
              <p style={{ fontFamily: FF, fontSize: 7, color: BRAND.gold, margin: '2px 0 0', letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>From Toast to Takeoff</p>
            </div>
          </div>
          <div style={{ height: 1, background: 'rgba(212,175,55,0.15)', marginBottom: 16 }} />
          <p style={{ fontFamily: FF, fontWeight: 300, fontSize: 15, color: 'white', lineHeight: 1.5, margin: '0 0 4px' }}>Every detail.</p>
          <p style={{ fontFamily: FF, fontWeight: 300, fontSize: 15, color: 'white', lineHeight: 1.5, margin: '0 0 4px' }}>Every moment.</p>
          <p style={{ fontFamily: FF, fontWeight: 300, fontSize: 15, color: 'white', lineHeight: 1.5, margin: '0 0 8px' }}>Flawless from</p>
          <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 15, color: BRAND.gold, lineHeight: 1.5, margin: 0 }}>toast to takeoff.</p>
        </div>
      </div>
    </div>
  );
}

// ── Section 4 — Bottom info bar ───────────────────────────────────────────────

function BottomBar() {
  const swatches = [
    { hex: '#0B1220', name: 'MIDNIGHT NAVY' },
    { hex: '#121B2B', name: 'DEEP SAPPHIRE' },
    { hex: '#0F131A', name: 'OBSIDIAN' },
    { hex: '#D4AF37', name: 'CHAMPAGNE GOLD' },
    { hex: '#F7F3E9', name: 'WARM IVORY' },
    { hex: '#9CA3AF', name: 'PLATINUM' },
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return (
    <div style={{
      background: BRAND.ivory,
      borderRadius: 16,
      padding: '24px 28px',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1.2fr 1fr',
      gap: 28,
    }}>
      {/* Color palette */}
      <div>
        <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 9, letterSpacing: '0.2em', color: '#374151', textTransform: 'uppercase' as const, margin: '0 0 14px' }}>
          COLOR PALETTE
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
          {swatches.map(({ hex, name }) => (
            <div key={hex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', background: hex,
                border: hex === '#F7F3E9' ? '1px solid rgba(0,0,0,0.12)' : 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              }} />
              <p style={{ fontFamily: 'monospace', fontSize: 7, color: '#374151', margin: 0, textAlign: 'center' as const }}>{hex}</p>
              <p style={{ fontFamily: FF, fontSize: 6.5, color: '#9CA3AF', margin: 0, textAlign: 'center' as const, letterSpacing: '0.05em' }}>{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 9, letterSpacing: '0.2em', color: '#374151', textTransform: 'uppercase' as const, margin: '0 0 14px' }}>
          TYPOGRAPHY
        </p>
        <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
          <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 52, color: BRAND.navy, lineHeight: 1, letterSpacing: '-0.04em' }}>Aa</span>
          <div>
            <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 9, color: BRAND.gold, letterSpacing: '0.12em', textTransform: 'uppercase' as const, margin: '0 0 4px' }}>POPPINS</p>
            <p style={{ fontFamily: 'monospace', fontSize: 7.5, color: '#6B7280', lineHeight: 1.6, margin: 0, wordBreak: 'break-all' as const, maxWidth: 130 }}>
              {alphabet}
            </p>
          </div>
        </div>
      </div>

      {/* Brand essence */}
      <div>
        <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 9, letterSpacing: '0.2em', color: '#374151', textTransform: 'uppercase' as const, margin: '0 0 14px' }}>
          BRAND ESSENCE
        </p>
        <p style={{ fontFamily: FF, fontSize: 11.5, color: '#374151', lineHeight: 1.65, margin: '0 0 10px' }}>
          Evenzs is the command center behind unforgettable events. We orchestrate every detail with precision, bringing clarity, calm, and confidence to event professionals worldwide.
        </p>
        <p style={{ fontFamily: FF, fontWeight: 600, fontSize: 11.5, color: BRAND.gold, margin: 0 }}>
          From Toast to Takeoff.
        </p>
      </div>

      {/* Tagline lockup gold */}
      <div>
        <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 9, letterSpacing: '0.2em', color: '#374151', textTransform: 'uppercase' as const, margin: '0 0 14px' }}>
          TAGLINE LOCKUP
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 22, color: BRAND.gold, margin: 0, letterSpacing: '0.02em', lineHeight: 1.1 }}>FROM TOAST</p>
          <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 22, color: BRAND.gold, margin: 0, letterSpacing: '0.02em', lineHeight: 1.1 }}>TO TAKEOFF</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <div style={{ flex: 1, height: 1, background: BRAND.gold, opacity: 0.6 }} />
            <EvenzsMark size={18} dark={false} />
            <div style={{ flex: 1, height: 1, background: BRAND.gold, opacity: 0.6 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Small icon SVGs for the 5 pillars ─────────────────────────────────────────

function CelebrationIcon() {
  // Straight-sided flutes, properly geometric
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Left flute */}
      <line x1="8.5"  y1="5"  x2="9"   y2="17" stroke={BRAND.gold} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="13"   y1="5"  x2="10"  y2="17" stroke={BRAND.gold} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 8.5 5 Q 10.8 3.8 13 5" stroke={BRAND.gold} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <line x1="9.5"  y1="17" x2="9.5" y2="23" stroke={BRAND.gold} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="6.5"  y1="23" x2="12.5" y2="23" stroke={BRAND.gold} strokeWidth="1.2" strokeLinecap="round" />
      {/* Right flute */}
      <line x1="16"   y1="4"  x2="17"  y2="16" stroke={BRAND.gold} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="21"   y1="4"  x2="18"  y2="16" stroke={BRAND.gold} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M 16 4 Q 18.5 2.8 21 4" stroke={BRAND.gold} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <line x1="17.5" y1="16" x2="17.5" y2="23" stroke={BRAND.gold} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="14.5" y1="23" x2="20.5" y2="23" stroke={BRAND.gold} strokeWidth="1.3" strokeLinecap="round" />
      {/* Sparkle */}
      <circle cx="14" cy="3"  r="1"   fill={BRAND.goldLight} opacity="0.9" />
      <circle cx="11" cy="2"  r="0.7" fill={BRAND.gold}      opacity="0.7" />
      <circle cx="17" cy="2"  r="0.6" fill={BRAND.gold}      opacity="0.6" />
      {/* Arc */}
      <path d="M 24 21 A 10.5 10.5 0 1 0 22 7" stroke={BRAND.gold} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.65" />
    </svg>
  );
}

function MovementIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M 5 20 L 14 10 L 23 20" stroke={BRAND.gold} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 14 10 L 14 23" stroke={BRAND.gold} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 9 21.5 L 14 19 L 19 21.5" stroke={BRAND.gold} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

function CoordIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="3" stroke={BRAND.gold} strokeWidth="1.3" fill="none" />
      <circle cx="5" cy="6"  r="2" stroke={BRAND.gold} strokeWidth="1.2" fill="none" />
      <circle cx="23" cy="6"  r="2" stroke={BRAND.gold} strokeWidth="1.2" fill="none" />
      <circle cx="5" cy="22" r="2" stroke={BRAND.gold} strokeWidth="1.2" fill="none" />
      <circle cx="23" cy="22" r="2" stroke={BRAND.gold} strokeWidth="1.2" fill="none" />
      <line x1="7" y1="7.5"   x2="11.5" y2="11.5" stroke={BRAND.gold} strokeWidth="1" opacity="0.7" />
      <line x1="21" y1="7.5"  x2="16.5" y2="11.5" stroke={BRAND.gold} strokeWidth="1" opacity="0.7" />
      <line x1="7" y1="20.5"  x2="11.5" y2="16.5" stroke={BRAND.gold} strokeWidth="1" opacity="0.7" />
      <line x1="21" y1="20.5" x2="16.5" y2="16.5" stroke={BRAND.gold} strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

function ExecIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke={BRAND.gold} strokeWidth="1.3" fill="none" />
      <circle cx="14" cy="14" r="6"  stroke={BRAND.gold} strokeWidth="1.2" fill="none" opacity="0.7" />
      <circle cx="14" cy="14" r="2"  fill={BRAND.gold} />
      <line x1="14" y1="4"  x2="14" y2="1"  stroke={BRAND.gold} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="14" y1="24" x2="14" y2="27" stroke={BRAND.gold} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ConfIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M 14 3 L 22 6.5 L 22 14 C 22 19.5, 18.5 23.5, 14 25 C 9.5 23.5, 6 19.5, 6 14 L 6 6.5 Z"
        stroke={BRAND.gold} strokeWidth="1.3" strokeLinejoin="round" fill="none" />
      <path d="M 9.5 14 L 12.5 17 L 18.5 11"
        stroke={BRAND.gold} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// ── iOS sizes panel ───────────────────────────────────────────────────────────

function IOSSizesPanel() {
  const sizes: { label: string; s: number; rx: number }[] = [
    { label: '1024px', s: 88, rx: 20 },
    { label: '512px',  s: 76, rx: 17 },
    { label: '256px',  s: 64, rx: 14 },
    { label: '180px',  s: 56, rx: 13 },
    { label: '152px',  s: 48, rx: 11 },
    { label: '120px',  s: 42, rx: 9 },
    { label: '87px',   s: 36, rx: 8 },
    { label: '76px',   s: 30, rx: 7 },
    { label: '60px',   s: 26, rx: 6 },
    { label: '40px',   s: 22, rx: 5 },
  ];

  return (
    <div style={{
      background: '#09101F',
      borderRadius: 16,
      padding: '24px 28px',
    }}>
      <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 9, letterSpacing: '0.2em', color: BRAND.gold, textTransform: 'uppercase' as const, margin: '0 0 8px' }}>
        iOS App Icon — All Sizes
      </p>
      <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)', marginBottom: 18 }} />
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const, alignItems: 'flex-end' }}>
        {sizes.map(({ label, s, rx }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <EvenzsAppIcon size={s} variant="dark" style={{ borderRadius: rx }} />
            <p style={{ fontFamily: 'monospace', fontSize: 7.5, color: '#374151', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '22px 0 16px' }} />

      {/* All variants */}
      <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 9, letterSpacing: '0.2em', color: BRAND.gold, textTransform: 'uppercase' as const, margin: '0 0 14px' }}>
        All Variants
      </p>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' as const }}>
        {([
          { v: 'dark',     l: 'Navy + Gold' },
          { v: 'gold',     l: 'Gold + Navy' },
          { v: 'light',    l: 'Light Mode' },
          { v: 'circle',   l: 'Circle Dark' },
          { v: 'platinum', l: 'Platinum' },
        ] as const).map(({ v, l }) => (
          <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <EvenzsAppIcon
              size={68}
              variant={v}
              style={{
                borderRadius: v === 'circle' || v === 'platinum' ? 34 : 15,
                border: v === 'light' ? '1px solid rgba(0,0,0,0.1)' : undefined,
                boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
              }}
            />
            <p style={{ fontFamily: FF, fontSize: 8.5, color: '#4B5563', margin: 0 }}>{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Export grid ───────────────────────────────────────────────────────────────

function ExportGrid() {
  const items = [
    { label: 'SVG · Master Mark Dark',      bg: '#0B1220', node: <EvenzsMark size={60} dark /> },
    { label: 'SVG · Master Mark Light',     bg: '#F7F3E9', node: <EvenzsMark size={60} dark={false} /> },
    { label: 'SVG · App Icon · Navy+Gold',  bg: '#070C16', node: <EvenzsAppIcon size={68} variant="dark" style={{ borderRadius: 15 }} /> },
    { label: 'SVG · App Icon · Gold+Navy',  bg: '#070C16', node: <EvenzsAppIcon size={68} variant="gold" style={{ borderRadius: 15 }} /> },
    { label: 'PNG · Horizontal Dark',       bg: '#0B1220', node: <LogoWordmark dark size="xs" showTagline /> },
    { label: 'PNG · Horizontal Light',      bg: '#F7F3E9', node: <LogoWordmark dark={false} size="xs" showTagline /> },
    { label: 'PNG · Stacked Dark',          bg: '#0B1220', node: <LogoWordmark dark size="xs" stacked showTagline /> },
    { label: 'SVG · Favicon 64px',          bg: '#0B1220', node: <EvenzsFavicon size={52} style={{ borderRadius: 12 }} /> },
    { label: 'SVG · Favicon 32px',          bg: '#0B1220', node: <EvenzsFavicon size={36} style={{ borderRadius: 8 }} /> },
    { label: 'SVG · Transparent BG',
      bg: 'repeating-conic-gradient(rgba(255,255,255,0.06) 0% 25%, transparent 0% 50%) 0 0 / 14px 14px',
      node: <EvenzsMark size={60} dark /> },
  ];

  return (
    <div style={{ background: '#09101F', borderRadius: 16, padding: '24px 28px' }}>
      <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 9, letterSpacing: '0.2em', color: BRAND.gold, textTransform: 'uppercase' as const, margin: '0 0 8px' }}>
        Export Package — /svg · /png · /app-icons · /favicons
      </p>
      <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)', marginBottom: 18 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {items.map(({ label, bg, node }) => (
          <div key={label} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{
              background: bg,
              padding: '18px 10px', minHeight: 88,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {node}
            </div>
            <div style={{ padding: '7px 9px', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ fontFamily: FF, fontSize: 7.5, color: '#6B7280', margin: 0, lineHeight: 1.4 }}>{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Master brand sheet ────────────────────────────────────────────────────────

export function BrandSheet() {
  return (
    <div style={{
      background: '#070C16',
      minHeight: '100vh',
      padding: '28px 20px 56px',
      fontFamily: FF,
    }}>
      {/* Load Poppins */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      <div style={{ maxWidth: 1360, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Page label */}
        <p style={{
          fontFamily: FF, fontWeight: 600, fontSize: 8.5,
          letterSpacing: '0.28em', textTransform: 'uppercase' as const,
          color: '#1F2937', textAlign: 'center', margin: '0 0 4px',
        }}>
          Evenzs · Premium Brand Identity System · v1.0
        </p>

        {/* ROW 1: Hero dark (left) + Logo variations (right) */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
          <HeroDark />
          <LogoVariations />
        </div>

        {/* ROW 2: App icons + favicons */}
        <div style={{
          background: BRAND.ivory,
          borderRadius: 16, padding: '24px 28px',
        }}>
          <AppIconSection />
        </div>

        {/* ROW 3: Mockups */}
        <MockupRow />

        {/* ROW 4: Bottom info bar */}
        <BottomBar />

        {/* ROW 5: iOS full size set */}
        <IOSSizesPanel />

        {/* ROW 6: Export grid */}
        <ExportGrid />

        {/* Footer */}
        <div style={{ textAlign: 'center', paddingTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            <EvenzsMark size={32} dark />
          </div>
          <p style={{ fontFamily: FF, fontSize: 8, color: '#111827', letterSpacing: '0.22em', textTransform: 'uppercase' as const, margin: 0 }}>
            Evenzs Brand Identity · Confidential · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
