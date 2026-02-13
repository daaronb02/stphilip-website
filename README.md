# St. Philip Byzantine Catholic Church Website

A static website built with [Astro](https://astro.build/) for St. Philip Byzantine Catholic Church. Features an automatic liturgical season theming system that changes colors and hero imagery based on the Byzantine calendar.

## Setup

```sh
npm install
npm run dev       # Start dev server at localhost:4321
npm run build     # Build for production to ./dist/
npm run preview   # Preview production build locally
```

## Project Structure

```
src/
  components/     Header, Footer, Nav, HeroSection, BannerImage, LinkCard
  layouts/        BaseLayout (wraps all pages)
  pages/          Home, About, Calendar, Links
  styles/         Global CSS: reset, typography, theme tokens
  utils/          Liturgical calendar logic + theme definitions
  data/           Links page data (links.json)
public/
  images/
    themes/       Background images per liturgical theme
      penitential/  background.svg
      pascha/       background.svg
      christmas/    background.svg
      theophany/    background.svg
      pentecost/    background.svg
      marian/       background.svg
      default/      background.svg
    general/      Logo and other site images
```

## Liturgical Season Theming

The site automatically changes its color scheme and homepage background based on the current liturgical season. There are 7 themes:

| Theme | When | Colors |
|-------|------|--------|
| `penitential` | Lent, Advent, fasting periods, Cross feasts | Deep maroon + red |
| `pascha` | Pascha (Easter) and Bright Week | Gold + white |
| `christmas` | Christmas through Jan 4 | Gold + deep blue |
| `theophany` | Theophany (Jan 5-14) | Silver-blue + warm white |
| `pentecost` | Pentecost season | Forest green + light green |
| `marian` | Feasts of the Theotokos | Blue + white |
| `default` | Ordinary time | Warm brown + tan |

### How it works

1. `src/utils/liturgical-calendar.ts` — maps date ranges to theme slugs. `getCurrentThemeSlug()` is the single point of control.
2. `src/utils/theme.ts` — defines color palettes for each theme.
3. `src/layouts/BaseLayout.astro` — resolves the theme at build time and injects CSS custom properties via `define:vars`.
4. All components use `var(--theme-primary)` etc., so colors cascade from one place.

### Updating moveable feasts each year

Moveable feasts (Great Lent, Pascha, Pentecost) shift annually. To update:

1. Open `src/utils/liturgical-calendar.ts`
2. Find the **MOVEABLE FEASTS** comment block near the top
3. Calculate new dates from the Pascha date for that year (formulas are in the comments)
4. Update the `start` and `end` MM-DD strings in the `dateRanges` array

### Swapping background images

Replace the SVG placeholders in `public/images/themes/{slug}/` with real photos:

1. Add your image as `background.jpg` (or any format) to the appropriate theme folder
2. Update the `backgroundImage` path in `src/components/HeroSection.astro` if you change the file extension

### Adding a new theme

1. Add an entry to the `themes` object in `src/utils/theme.ts` (slug, display name, color palette)
2. Create `public/images/themes/{new-slug}/background.svg` (or .jpg)
3. Add date ranges in `src/utils/liturgical-calendar.ts`

## Deployment (Netlify)

The site is configured for Netlify deployment via `netlify.toml`.

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Daily build hook**: Set up a Netlify build hook triggered by a daily cron (e.g., via GitHub Actions or Netlify's scheduled functions) to ensure the theme updates on season boundaries without manual redeployment.

### Setting up a daily build hook

1. In Netlify: Site settings > Build & deploy > Build hooks > Add build hook
2. Copy the webhook URL
3. Set up a daily trigger (GitHub Actions cron, IFTTT, cron-job.org, etc.) to POST to that URL

## Tech Stack

- **Astro v5** — static site generator
- **TypeScript** — strict mode
- **Plain CSS** — no frameworks, CSS custom properties for theming
- **Fonts** — Cormorant Garamond (headings) + Inter (body) via Google Fonts
- **Netlify** — deployment target
