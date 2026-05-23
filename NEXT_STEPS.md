# Reunion Web — Next Steps

Ordered by priority. Complete blockers before launch.

---

## ✅ Done

- Full site build — home, vibes, private dining, menus, allergens
- Sanity CMS schema wired + Studio at `/studio`
- Smooth scroll, slot-machine hover animations, scroll-triggered FadeIn
- GitHub repo → `0xdysseydigital/reunion-web`
- Vercel deployment live (public repo, env vars set)

---

## 🔴 Blockers (do before launch)

### 1. Mobile Nav — Hamburger Menu
No collapse behavior on mobile. Navigation is broken on small screens.
- Add hamburger toggle to `src/components/Navbar.tsx`
- Slide-out or dropdown menu with all routes
- Match site aesthetic: no border-radius, Platypi labels, cream on dark bg

### 2. Full Mobile View Pass
Walk every page at 375px and 768px and fix layout issues.
- Pages: `/`, `/vibes`, `/menus`, `/menus/[type]`, `/menus/allergens`, `/private-dining`
- Focus areas: hub card grid, sticky section tabs, allergen toggle row, hero text sizing, private dining rows

---

## 🟡 Content (required for real launch)

### 3. Sanity — Real Menu Items
Schema is wired. Go to `/studio` on the live Vercel URL, enter items, upload food photos.
- Enter all items for: Brunch, Lunch, Dinner, Bar
- Upload a photo per item (or per section minimum)
- Fill allergen tags accurately
- Static fallback data disappears automatically once Sanity has content

### 4. Real Photography
Replace placeholder images across the site with actual restaurant photography.
- Hub cards: Brunch, Lunch, Dinner, Bar backgrounds
- Private dining: all 5 space photos
- Vibes page: hero + 3 interstitial full-screen images
- Menu item photos go directly into Sanity

---

## 🟢 Pages (placeholders need decisions)

### 5. Reservations Page
Currently blank. Options:
- Embed OpenTable or Resy widget
- Clean "coming soon" layout with phone/email contact info

### 6. Events Page
Currently blank. Options:
- Sanity-powered events list (needs a new schema type — quick to add)
- Simple placeholder with contact CTA until events are ready

---

## 🔵 SEO & Discoverability

### 7. Open Graph / Social Sharing
Links look bare when shared on social or via text. Add to all pages:
- `og:image` — 1200×630px image (logo on dark background works)
- `og:description` and `og:title` per page

### 8. Schema.org Structured Data
Add `Restaurant` JSON-LD to the homepage for Google rich results.
Covers: hours, address, cuisine type, reservations link. ~30 min to implement.

### 9. Sitemap + robots.txt
Add `src/app/sitemap.ts` and `src/app/robots.ts` — Next.js generates these automatically.

---

## 🔵 Production Housekeeping

### 10. 404 Page
Add `src/app/not-found.tsx` styled to match the site. Currently shows default Next.js 404.

### 11. Sanity Studio Protection
`/studio` is publicly accessible on the live URL. Fix before launch:
- Add middleware password protection, or
- Restrict by IP, or
- At minimum ensure it's not linked anywhere public-facing

### 12. Analytics
Vercel Analytics — one install, zero config:
```
npm install @vercel/analytics
```
Add `<Analytics />` to `src/app/layout.tsx`. Done.

### 13. Custom Domain
When restaurant opens: Vercel → Settings → Domains → add domain → update DNS at registrar.
Two records, under an hour to propagate.

---

## 🔵 Nice to Have

### 14. Private Dining Inquiry Form
`mailto:` links work but a real form (Resend or Postmark) tracks submissions and is more reliable.

### 15. Loading / Skeleton States
Add `loading.tsx` per route so Sanity fetches have a graceful skeleton instead of blank flash.

### 16. Accessibility Pass
- Color contrast on low-opacity text
- Visible focus states on all interactive elements
- Full keyboard navigation check

---

## Current State

| Item | Status |
|------|--------|
| `/` Home | ✅ Complete |
| `/vibes` | ✅ Complete |
| `/private-dining` | ✅ Complete |
| `/menus` hub | ✅ Complete |
| `/menus/[type]` | ✅ Complete (static data) |
| `/menus/allergens` | ✅ Complete (static data) |
| `/reservations` | 🔲 Placeholder |
| `/events` | 🔲 Placeholder |
| Mobile nav | 🔴 Missing — highest priority |
| Sanity content | 🔲 Empty |
| Real photography | 🔲 Pending |
| GitHub | ✅ `0xdysseydigital/reunion-web` |
| Vercel | ✅ Live |
| Custom domain | 🔲 Add when restaurant opens |
