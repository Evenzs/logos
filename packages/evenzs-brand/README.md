# @evenzs/brand

Official Evenzs brand package — React components for the logo mark, wordmark, app icon, favicon, and the complete color palette.

---

## Installation

This package is hosted on GitHub Packages. You must authenticate before installing.

### 1. Create a GitHub Personal Access Token

Go to **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens** and generate a token with at minimum `read:packages` scope.

### 2. Configure your project's `.npmrc`

Create or edit `.npmrc` in the root of the project that will consume this package:

```
@evenzs:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

Replace `YOUR_GITHUB_PAT` with the token you created above.

> Do not commit your `.npmrc` with a real token. Use an environment variable instead:
> ```
> //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
> ```

### 3. Install

```bash
npm install @evenzs/brand
```

---

## Peer Dependencies

This package requires React 18 or higher. It does not bundle React.

```bash
npm install react react-dom
```

---

## Components

### `EvenzsMark`

The standalone icon/mark — champagne flutes, bubble trail, jet, and arc.

```tsx
import { EvenzsMark } from '@evenzs/brand';

// Default — dark background, 80px
<EvenzsMark />

// On a light background
<EvenzsMark dark={false} />

// Custom size
<EvenzsMark size={120} />

// With animated arc
<EvenzsMark animated />
```

**Props**

| Prop        | Type      | Default | Description                              |
|-------------|-----------|---------|------------------------------------------|
| `size`      | `number`  | `80`    | Width and height in pixels               |
| `dark`      | `boolean` | `true`  | `true` = gold on dark, `false` = on light|
| `animated`  | `boolean` | `false` | Adds a subtle arc flow animation         |
| `className` | `string`  | `''`    | Additional CSS class                     |
| `style`     | `CSSProperties` | —  | Inline style override                  |

---

### `LogoWordmark`

The full logo — mark + "evenzs" wordmark + "FROM TOAST TO TAKEOFF" tagline.

```tsx
import { LogoWordmark } from '@evenzs/brand';

// Default horizontal, dark background, medium size
<LogoWordmark />

// Light background
<LogoWordmark dark={false} />

// Stacked (symbol above text)
<LogoWordmark stacked />

// Hide tagline
<LogoWordmark showTagline={false} />

// Size variants
<LogoWordmark size="xs" />  // smallest
<LogoWordmark size="sm" />
<LogoWordmark size="md" />  // default
<LogoWordmark size="lg" />
<LogoWordmark size="xl" />
<LogoWordmark size="2xl" /> // largest
```

**Props**

| Prop          | Type                                      | Default  | Description                          |
|---------------|-------------------------------------------|----------|--------------------------------------|
| `dark`        | `boolean`                                 | `true`   | Dark or light color scheme           |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'`   | Preset size scale          |
| `showTagline` | `boolean`                                 | `true`   | Show/hide the tagline row            |
| `stacked`     | `boolean`                                 | `false`  | Stack symbol above text              |
| `className`   | `string`                                  | `''`     | Additional CSS class                 |
| `style`       | `CSSProperties`                           | —        | Inline style override                |

---

### `EvenzsAppIcon`

Rounded-rectangle app icon with a background fill — ready for app stores, dashboards, and product surfaces.

```tsx
import { EvenzsAppIcon } from '@evenzs/brand';

// Default — dark navy background, 64px
<EvenzsAppIcon />

// Variants
<EvenzsAppIcon variant="dark" />      // navy gradient (default)
<EvenzsAppIcon variant="gold" />      // gold background, dark mark
<EvenzsAppIcon variant="light" />     // ivory background
<EvenzsAppIcon variant="platinum" />  // grey background
<EvenzsAppIcon variant="circle" />    // fully circular mask

// Custom size
<EvenzsAppIcon size={128} />
```

**Props**

| Prop        | Type                                                    | Default  | Description              |
|-------------|---------------------------------------------------------|----------|--------------------------|
| `size`      | `number`                                                | `64`     | Width and height in px   |
| `variant`   | `'dark' \| 'gold' \| 'light' \| 'platinum' \| 'circle'` | `'dark'` | Background style         |
| `className` | `string`                                                | `''`     | Additional CSS class     |
| `style`     | `CSSProperties`                                         | —        | Inline style override    |

---

### `EvenzsFavicon`

Compact 32×32-optimized icon for browser tabs and `<link rel="icon">`.

```tsx
import { EvenzsFavicon } from '@evenzs/brand';

<EvenzsFavicon />
<EvenzsFavicon size={16} />
<EvenzsFavicon size={32} />
```

**Props**

| Prop        | Type            | Default | Description           |
|-------------|-----------------|---------|-----------------------|
| `size`      | `number`        | `32`    | Width and height in px|
| `className` | `string`        | `''`    | Additional CSS class  |
| `style`     | `CSSProperties` | —       | Inline style override |

---

### `EvenzsIconMinimal` / `EvenzsMonogram`

Convenience aliases for `EvenzsMark`. Useful when semantic naming matters in your codebase.

```tsx
import { EvenzsIconMinimal, EvenzsMonogram } from '@evenzs/brand';

<EvenzsIconMinimal size={40} />
<EvenzsMonogram size={64} dark={false} />
```

Both accept the same props as `EvenzsMark`.

---

## Color Palette

Import the full palette object or individual named tokens.

```tsx
import { colors } from '@evenzs/brand';

// Access as object
const bg = colors.navy;        // '#0B1220'
const accent = colors.gold;    // '#D4AF37'
```

```tsx
import { navy, gold, goldLight, ivory } from '@evenzs/brand';

// Use directly in styles
<div style={{ background: navy, color: ivory }} />
```

**Full token reference**

| Token       | Value                    | Usage                                      |
|-------------|--------------------------|--------------------------------------------|
| `navy`      | `#0B1220`                | Primary dark background                    |
| `navyDeep`  | `#121B2B`                | Gradient / layered surfaces                |
| `obsidian`  | `#0F131A`                | Near-black overlays                        |
| `gold`      | `#D4AF37`                | Core brand gold — primary accent           |
| `goldLight` | `#F0D870`                | Highlights, star tips, shimmer             |
| `goldMid`   | `#C9A230`                | Secondary strokes, light-mode gold         |
| `goldDark`  | `#8B6914`                | Shadows, depth                             |
| `goldGlass` | `rgba(212,175,55,0.18)`  | Glass / overlay tints                      |
| `ivory`     | `#F7F3E9`                | Warm off-white — light backgrounds, text   |
| `platinum`  | `#9CA3AF`                | Secondary text, platinum variant           |

You can also import `ColorToken` for type-safe token keys:

```tsx
import type { ColorToken } from '@evenzs/brand';

function Chip({ token }: { token: ColorToken }) {
  // token is typed to the exact set of valid keys
}
```

---

## Fonts

The wordmark uses **Poppins** or **Manrope** (whichever is loaded first). Load one of them in the consuming app for the correct rendering:

```html
<!-- In your HTML <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap"
  rel="stylesheet"
/>
```

If neither font is available, the wordmark falls back to `sans-serif`.

---

## Publishing a New Version

1. Make your changes in `src/`.
2. Bump the `version` field in `package.json` (follow semver: `1.0.0` → `1.0.1` for patches, `1.1.0` for new features).
3. Build the package:
   ```bash
   cd packages/evenzs-brand
   npm run build
   ```
4. Publish:
   ```bash
   npm publish
   ```
   No `--access` flag needed — `publishConfig` in `package.json` already points to the private GitHub Packages registry.

---

## Repository

[https://github.com/Evenzs/logos](https://github.com/Evenzs/logos)

---

*Property of Evenzs. All rights reserved. Unauthorized use, reproduction, or distribution is prohibited.*
