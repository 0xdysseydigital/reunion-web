# Reunion Web — Next Steps

Ordered by priority. Complete blockers before going live.

---

## 🔴 Blockers (do before launch)

### 1. Mobile Nav — Hamburger Menu
The navbar has no collapse behavior on mobile. There is currently no hamburger menu, meaning navigation is broken on small screens. This is the highest-priority UI task.
- Add hamburger toggle to `src/components/Navbar.tsx`
- Slide-out or dropdown menu with all routes
- Match site aesthetic: no border-radius, Platypi labels, cream on dark

### 2. Full Mobile View Pass
Walk every page at 375px and 768px viewports and fix layout issues.
- Pages to check: `/`, `/vibes`, `/menus`, `/menus/[type]`, `/menus/allergens`, `/private-dining`
- Focus areas: hub card grid, sticky section tabs, allergen toggle row, hero text sizing, private dining space rows

### 3. Vercel Deployment
- Connect GitHub repo to Vercel
- Add environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_READ_TOKEN`
- Verify build passes (`npm run build`) locally before pushing
- Decide on custom domain

---

## 🟡 Content (required for a real launch)

### 4. Sanity — Real Menu Items
Schema is already wired. Workflow: open `/studio`, enter items, upload food photos directly in Sanity. Static fallback data disappears automatically once Sanity has content.
- Enter all items for: Brunch, Lunch, Dinner, Bar
- Upload a photo per item (or at minimum per section)
- Fill in allergen tags accurately
- Do this before deploying so the live site launches with real content

### 5. Better Images
Replace all placeholder space images (`/spaces/*.png`, `/images/*.png`) used on menu hub cards, private dining, and vibes with real restaurant photography.
- Hub cards: Brunch, Lunch, Dinner, Bar
- Private dining: all 5 spaces
- Vibes page: hero + interstitial full-screen images
- Once images are in Sanity, the menu item photos come for free

---

## 🟢 Pages (placeholders need real content)

### 6. Reservations Page
Currently a blank placeholder. Options:
- Embed OpenTable or Resy widget
- Or: a clean "coming soon" layout with email/phone contact info to hold the spot

### 7. Events Page
Currently a blank placeholder. Decide on approach:
- Static upcoming events list (editable via Sanity — would need a new schema type)
- Or: simple placeholder with contact CTA until events are ready

---

## 🔵 SEO & Discoverability

### 8. Open Graph / Social Sharing
Add `og:image`, `og:description`, and `og:title` to all page metadata so links render properly when shared on social or via text.
- Create a default OG image (1200×630) — the logo on dark background works
- Add per-page metadata in each `page.tsx`

### 9. Schema.org Structured Data
Add `Restaurant` JSON-LD to the homepage for Google rich results (hours, address, cuisine, reservations link). Takes ~30 minutes and meaningfully improves local SEO.

### 10. Sitemap + robots.txt
Next.js can auto-generate these. Add `src/app/sitemap.ts` and `src/app/robots.ts`.

---

## 🔵 Production Housekeeping

### 11. 404 Page
Add `src/app/not-found.tsx` — a styled page that matches the site. Currently falls back to the default Next.js 404.

### 12. Sanity Studio Protection
The `/studio` route is publicly accessible in production. Options:
- Add a middleware password check
- Or restrict to a specific IP / deploy separately
- At minimum: remove the Studio link from any public navigation

### 13. Analytics
- Vercel Analytics is one `npm install` away and zero config — recommended starting point
- Or add Google Analytics via `next/script` if GA is preferred

---

## 🔵 Nice to Have

### 14. Private Dining Inquiry Form
Currently uses `mailto:` links for the Contact buttons. A real form (with email delivery via Resend or Postmark) would be more reliable and track submissions.

### 15. Loading / Skeleton States
Add `loading.tsx` files in route segments that fetch from Sanity, so there's a graceful skeleton while data loads rather than a blank flash.

### 16. Accessibility Pass
- Check color contrast on low-opacity text (brand-cream/35 etc.)
- Ensure all interactive elements have visible focus states
- Verify keyboard navigation works end to end

---

## Current State Summary

| Page | Status |
|------|--------|
| `/` Home | ✅ Complete |
| `/vibes` | ✅ Complete |
| `/private-dining` | ✅ Complete |
| `/menus` hub | ✅ Complete |
| `/menus/[type]` | ✅ Complete (static data) |
| `/menus/allergens` | ✅ Complete (static data) |
| `/reservations` | 🔲 Placeholder |
| `/events` | 🔲 Placeholder |
| Mobile nav | 🔴 Missing |
| Sanity content | 🔲 Empty |
| Vercel deploy | 🔲 Not done |
