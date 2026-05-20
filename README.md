# Evenzs Logos

Official Evenzs brand asset repository. Contains the React component library published to GitHub Packages as `@evenzs/brand`, plus the interactive brand sheet reference app.

---

## Repository Structure

```
logos/
├── packages/
│   └── evenzs-brand/            # Publishable npm package (@evenzs/brand)
│       ├── src/
│       │   ├── EvenzsMark.tsx   # Mark, app icon, favicon, and aliases
│       │   ├── LogoWordmark.tsx # Full logo — wordmark and tagline
│       │   ├── colors.ts        # Brand color palette and tokens
│       │   └── index.ts         # Public exports
│       └── package.json
└── src/
    └── components/
        ├── BrandSheet.tsx       # Interactive brand reference app
        ├── EvenzsMark.tsx       # Local dev copy of the mark
        └── LogoWordmark.tsx     # Local dev copy of the wordmark
```

---

## Using `@evenzs/brand` in Your Project

GitHub Packages requires a Personal Access Token (PAT) even for public packages.

### 1. Create a GitHub PAT

Go to **GitHub → Settings → Developer settings → Personal access tokens** and create a token with the `read:packages` scope.

### 2. Add `.npmrc` to your project root

```
@evenzs:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Set `GITHUB_TOKEN` in your environment or `.env.local` (never commit the token directly).

### 3. Install

```bash
npm install @evenzs/brand
```

### 4. Use in React

```tsx
import { EvenzsMark, LogoWordmark, EvenzsAppIcon, colors } from '@evenzs/brand';

// Icon mark
<EvenzsMark size={80} />

// Full logo
<LogoWordmark size="lg" />

// App icon
<EvenzsAppIcon variant="dark" size={64} />

// Color tokens
<div style={{ background: colors.navy, color: colors.ivory }} />
```

See [`packages/evenzs-brand/README.md`](packages/evenzs-brand/README.md) for the full component and props reference.

---

## Packages

### `@evenzs/brand`

| Export              | Description                                      |
|---------------------|--------------------------------------------------|
| `EvenzsMark`        | Standalone icon mark (flutes, jet, arc)          |
| `LogoWordmark`      | Full logo — mark + wordmark + tagline            |
| `EvenzsAppIcon`     | App icon with background, multiple variants      |
| `EvenzsFavicon`     | 32px-optimized favicon                           |
| `EvenzsIconMinimal` | Alias for `EvenzsMark`                           |
| `EvenzsMonogram`    | Alias for `EvenzsMark`                           |
| `colors`            | Full brand palette object                        |
| Named color tokens  | `navy`, `gold`, `goldLight`, `ivory`, etc.       |
| `ColorToken`        | TypeScript type for valid palette keys           |

---

## Brand Reference App

The root of this repo is a Vite + React app that renders the interactive brand sheet — all components, color swatches, and size scales in one view.

```bash
npm install
npm run dev
```

---

## Color Palette

| Token       | Value                   | Usage                        |
|-------------|-------------------------|------------------------------|
| `navy`      | `#0B1220`               | Primary dark background      |
| `navyDeep`  | `#121B2B`               | Gradient / layered surfaces  |
| `obsidian`  | `#0F131A`               | Near-black overlays          |
| `gold`      | `#D4AF37`               | Core brand gold              |
| `goldLight` | `#F0D870`               | Highlights and shimmer       |
| `goldMid`   | `#C9A230`               | Secondary strokes            |
| `goldDark`  | `#8B6914`               | Shadows and depth            |
| `goldGlass` | `rgba(212,175,55,0.18)` | Glass / overlay tints        |
| `ivory`     | `#F7F3E9`               | Light backgrounds and text   |
| `platinum`  | `#9CA3AF`               | Secondary text               |

---

## Publishing a New Version

> Requires a PAT with `write:packages` scope.

```bash
cd packages/evenzs-brand
npm install
npm run build
npm publish
```

Bump the `version` field in `packages/evenzs-brand/package.json` before publishing (follow semver: patch → minor → major).

---

*Property of Evenzs. All rights reserved.*
