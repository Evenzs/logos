import { EvenzsMark, BRAND } from './EvenzsMark';

/*
  LOGO WORDMARK — 1:1 reference match from evenzs1.png

  In the reference:
  - Symbol sits LEFT of wordmark (horizontal) or ABOVE (stacked)
  - Wordmark: lowercase "evenzs" — very large, wide, geometric
    Font feels like Poppins or Manrope ExtraBold
    Weight: 700-800, tight tracking ~-0.025em
  - Tagline: "FROM TOAST TO TAKEOFF" — small caps, gold, centered
    Flanked by two short gold dash lines: "— FROM TOAST TO TAKEOFF —"
    Sits below the wordmark with breathing room
  - Dark mode: white wordmark on navy
  - Light mode: dark navy wordmark on ivory
*/

interface LogoWordmarkProps {
  dark?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showTagline?: boolean;
  stacked?: boolean;
  className?: string;
  style?: import('react').CSSProperties;
}

const SIZES = {
  xs:  { mark: 30, word: 22, tag: 7.5,  gap: 10, tagGap: 5 },
  sm:  { mark: 40, word: 30, tag: 8,    gap: 12, tagGap: 6 },
  md:  { mark: 52, word: 40, tag: 8.5,  gap: 14, tagGap: 7 },
  lg:  { mark: 68, word: 54, tag: 9.5,  gap: 18, tagGap: 9 },
  xl:  { mark: 88, word: 70, tag: 10.5, gap: 22, tagGap: 11 },
  '2xl': { mark: 112, word: 90, tag: 12, gap: 28, tagGap: 14 },
};

export function LogoWordmark({
  dark = true,
  size = 'md',
  showTagline = true,
  stacked = false,
  className = '',
  style,
}: LogoWordmarkProps) {
  const s = SIZES[size];
  const wordColor = dark ? '#FFFFFF' : BRAND.navy;
  const tagColor = BRAND.gold;
  const dashW = Math.max(14, s.word * 0.28);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: stacked ? 'column' : 'row',
        alignItems: stacked ? 'center' : 'center',
        gap: s.gap,
        ...style,
      }}
    >
      {/* Symbol */}
      <EvenzsMark size={s.mark} dark={dark} />

      {/* Text block */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: stacked ? 'center' : 'flex-start',
      }}>
        {/* Wordmark — "Z" rendered in champagne gold */}
        <span style={{
          fontFamily: "'Poppins', 'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: s.word,
          color: wordColor,
          letterSpacing: '-0.025em',
          lineHeight: 1,
          display: 'block',
        }}>
          even<span style={{ color: BRAND.gold }}>z</span>s
        </span>

        {/* Tagline with flanking dashes */}
        {showTagline && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            marginTop: s.tagGap,
          }}>
            <div style={{
              width: dashW,
              height: 1,
              background: tagColor,
              opacity: 0.8,
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Poppins', 'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: s.tag,
              color: tagColor,
              letterSpacing: '0.18em',
              textTransform: 'uppercase' as const,
              whiteSpace: 'nowrap' as const,
            }}>
              FROM TOAST TO TAKEOFF
            </span>
            <div style={{
              width: dashW,
              height: 1,
              background: tagColor,
              opacity: 0.8,
              flexShrink: 0,
            }} />
          </div>
        )}
      </div>
    </div>
  );
}
