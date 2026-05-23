# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

## Project Overview

Restaurant website for **Reunion Cocktails + Provisions** in Hershey, PA. Next.js (App Router) + Tailwind CSS. Menu data is currently stubbed with static data; Sanity CMS integration is planned later.

The full design spec lives in `DESIGN.md`. Reference screenshots are in `design-imgs/`.

---

## Design System

### Colors (two-color minimalist)
- **Background:** `#090A09`
- **Text / Accent:** `#EDEDE0` (use opacity variants for secondary text: 60–75%)
- **Borders / Dividers:** `#EDEDE0` (1px solid)

### Typography
| Role | Font | Size | Weight |
|------|------|------|--------|
| H1 | Servus | 64px | Light |
| H2 | Servus | 48px | Light |
| H3–H4 | Servus | 32–24px | Regular |
| Body | Literata | 16px | Regular |
| Labels | Platypi | 14px | Regular |

Fonts are in `public/fonts/` and declared in `src/app/layout.tsx` via `@font-face`. Tailwind font families are configured in `tailwind.config.ts` as `font-servus`, `font-literata`, `font-platypi`.

### Buttons (global)
Outlined only: transparent background, `#EDEDE0` 1–2px border, 0px border-radius, 12px/24px padding. Hover: invert (background `#EDEDE0`, text `#090A09`), 0.2s transition.

### Layout
- Max content width: 1280px
- Desktop padding: 40px | Tablet: 24px | Mobile: 16px
- Breakpoints: mobile <768px, tablet 768–1023px, desktop 1024px+

---

## Architecture

### Routes (`src/app/`)
| Route | Purpose |
|-------|---------|
| `/` | Home — nav, hero, about, location/hours, spaces, FAQ, footer |
| `/menus` | Hub — 5 cards (Brunch, Lunch, Dinner, Bar, Allergens) |
| `/menus/[type]` | Individual menu item grids |
| `/menus/allergens` | Search + toggle-filter all items by allergen |
| `/reservations` | Placeholder |
| `/vibes` | Placeholder |
| `/private-dining` | Placeholder |
| `/events` | Placeholder |

### Components (`src/components/`)
Shared UI lives here: `Navbar`, `Footer`, `Button`, section components for the home page.

### Data (`src/data/`)
Static menu item stubs until Sanity is wired up. Each item has: `name`, `image`, `description`, `price`, `menu_type` (brunch/lunch/dinner/bar), `allergens` (Nuts, Dairy, Gluten, Shellfish, Soy, Vegan, Vegetarian), `slug`.

### Sanity CMS (planned)
Will replace static data. Schema matches the fields above. Integration via `next-sanity`.
