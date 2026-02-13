# Prompt: Eastern Catholic Church Website — Astro

## Project Overview

Build a static church website for an **Eastern Catholic** parish using **Astro** (latest version). The site will be deployed to **Netlify**. No CMS for now — that will be added later. The site should be clean, modern, and welcoming.

**Important context**: Eastern Catholic churches follow the same Byzantine liturgical tradition and feast calendar as Eastern Orthodox churches, but are in full communion with Rome. The site should reflect this identity — Byzantine liturgical heritage with Catholic unity. The parish uses the **Gregorian calendar** for all feasts (not the Julian calendar).

## Pages

The site has 4 pages:

1. **Home** — The homepage has two visual sections:

   **Above the fold**: Full-screen background image (theme-driven) with the church logo and Church title centered prominently and a transparent nav bar at the top. This should feel like a striking, full-bleed landing moment — the logo and image are the entire focus. The logo will be a square svg, and should sit next to the text for the Church name. A small prompt to scroll down should be added, centered at the bottom.

   **On scroll**: As the user scrolls down, the logo transitions smoothly upward (into or near the nav bar area) and the content below is revealed: a welcoming blurb about the church, quick-reference info like service times and address, and a call-to-action pointing visitors to the About page or Calendar. This scroll transition should feel smooth and intentional — use subtle animation (e.g., fade-in for the content sections as they enter the viewport).

2. **About Us** — A page describing the church's history, mission, and beliefs. Placeholder text is fine. Should support a banner image at the top.

3. **Calendar** — A short intro paragraph followed by an embedded Google Calendar iframe. The iframe source URL will be provided later — use a placeholder for now.

4. **Links** — A simple page listing related external websites (other parishes, the eparchy/diocese, Eastern Catholic and Vatican resources, etc.). Each link should have a name, a short description, and the URL. Use placeholder data. Style them as a clean card or list layout. Should support a banner up top

## Shared Layout & Components

- All pages share a **header** with the church name/logo and a navigation bar, and a **footer** with address, phone number, email, facebook and instagram link icons, and copyright.
- Navigation should be responsive — a hamburger menu on mobile.
- Create reusable Astro components for: Layout, Header, Footer, Nav.

## Liturgical Season Theming

This is a key feature. The site's accent color scheme and homepage background image should change automatically based on the **Byzantine liturgical calendar** (Gregorian dates). The colors should be applied to elements like the nav bar, footer background, links, buttons, borders, and any accent styling.

### Theme Categories

There are 7 theme categories. Each has a slug, associated liturgical occasions, and a color palette:

1. **`penitential`** — Advent, Great Lent, fasting periods, Feasts of Martyrs, Feasts of the Cross
   - Colors: Deep red / maroon accents

2. **`pascha`** — Pascha (Easter), Christmas, Theophany
   - Colors: White / gold accents

3. **`christmas`** - Christmas Day
   - Colors: Gold / blue accents

4. **`theophany`** - Theophany (Baptism of our Lord)
   - Colors: Silver / white accent

5. **`pentecost`** — Pentecost season
   - Colors: Green tones

6. **`marian`** — Feasts of the Theotokos (Annunciation, Dormition, etc.)
   - Colors: Blue / white tones

7. **`default`** — Ordinary time / Sundays after Pentecost
   - Colors: Muted, neutral tones that feel consistent with the overall site aesthetic

### Implementation Approach

- **For now**: Create a config/utility file with a simple hardcoded mapping of date ranges to theme slugs. Immovable feasts (Christmas, Annunciation, Dormition, etc.) can use fixed Gregorian dates. Moveable feasts (Great Lent, Pascha, Pentecost) should be hardcoded for the current year with clear comments marking them for annual update.
- **Future enhancement (do not implement now, but design for it)**: The site will eventually pull the current season from the church's Google Calendar via tags/event categories. Design the theming system so the theme slug is the single point of control — if the source of the slug changes from hardcoded dates to a Google Calendar API lookup, nothing else needs to change.
- Use **CSS custom properties (variables)** so the theme color propagates throughout the site from one source. Define each theme's variables in a clear, organized way.
- Expose the current season name somewhere subtle (e.g., a small label in the footer like "Season: Great Lent") so it's easy to verify it's working.

### Extensibility

The theming system should be easy to extend. Adding a new theme category should require only:
1. Adding a new entry to the theme config (slug, display name, CSS variables)
2. Adding a corresponding folder in `public/images/themes/` with a background image
3. Adding the relevant date ranges to the liturgical calendar logic

Similarly, updating an existing theme's colors should be a single-file change. Avoid scattering theme-specific values across multiple components — everything should flow from the centralized theme config and CSS variables.

The homepage full-screen background image should also change based on the current theme. Set up an image directory structure like this:

```
public/
  images/
    themes/
      penitential/    → background.jpg (+ any banner images)
      pascha/    → background.jpg
      christmas/    → background.jpg
      theophany/    → background.jpg
      pentecost/      → background.jpg
      marian/         → background.jpg
      default/        → background.jpg
```

The homepage component should dynamically reference the background image path using the current theme slug: `/images/themes/{slug}/background.jpg`. Include placeholder images or solid color fallbacks with a note about where to add real photos.

## Design & Styling

- **Vibe**: Clean, modern, uncluttered. Respectful and welcoming without being flashy. Examples of the design language we are going for can be found in ./example/instagram
- **Fonts**: Use a clean serif font for primary text, with a clean sans serif for body (see example pictures)
- **CSS approach**: Use plain CSS or scoped Astro styles — no Tailwind, no CSS framework. Keep it simple and maintainable.
- **Responsiveness**: Fully responsive. Mobile-first is preferred.
- **Images**: The home page uses a full-screen background image that changes based on the liturgical theme (see Liturgical Season Theming section). Other pages may have optional banner images.
- **No parallax scrolling, no carousels.** Subtle, tasteful animations are welcome (e.g., fade-ins on scroll, smooth transitions) but keep them restrained and elegant.

## Project Structure

Organize the project cleanly:

```
src/
  components/    → Header, Footer, Nav, etc.
  layouts/       → Base layout
  pages/         → Home, About, Calendar, Links
  styles/        → Global styles, liturgical theme variables per category
  utils/         → Liturgical season date logic and theme resolution
  data/          → Links page data (JSON or similar)
public/
  images/
    themes/
      penitential/   → background.jpg
      great-feast/   → background.jpg
      pentecost/     → background.jpg
      marian/        → background.jpg
      default/       → background.jpg
    general/         → Logo, banners, other site images
```

## Technical Notes

- Use Astro's built-in features — no unnecessary dependencies.
- All pages should be fully static. Minimal client-side JavaScript is acceptable for: the mobile nav toggle, the homepage scroll-based logo transition, and fade-in animations on scroll (use Intersection Observer, no heavy libraries).
- Use semantic HTML throughout.
- Ensure good accessibility basics (alt text placeholders, proper heading hierarchy, focus styles, aria labels on nav).
- Include a basic `README.md` with setup instructions (`npm install`, `npm run dev`, etc.) and notes on how to update the liturgical calendar dates each year (especially moveable feasts), swap in real content, and add theme background images.

## What NOT to include

- No CMS integration (Decap CMS will be added later)
- No bulletin/news page (will be added later with the CMS)
- No contact form
- No analytics
- No blog functionality
