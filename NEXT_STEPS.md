# Reunion Web — Next Steps

Ordered by priority. Complete blockers before launch.

---

## ✅ Done

- Full site build — home, vibes, private dining, menus hub, individual menu pages, allergen filter
- Sanity CMS schema wired + Studio embedded at `/studio`
- Smooth scroll, slot-machine hover animations, scroll-triggered FadeIn throughout
- Mobile nav — slide-in drawer with hamburger, ESC close, body scroll lock, staggered links
- Full mobile view pass — all pages fixed at 375px and 768px
- Homepage typography system — consistent heading scale, body text, section padding
- Private dining mobile — image-first stacking on all rows (desktop alternating intact)
- GitHub → `0xdysseydigital/reunion-web`
- Vercel → live and auto-deploying on every push

---

## 🟡 Content (required for real launch)

### 1. Sanity — Real Menu Items
Schema is wired. Open the live Vercel URL + `/studio`, enter items, upload food photos.
- Enter all items for: Brunch, Lunch, Dinner, Bar
- Upload a photo per item (or per section minimum)
- Fill allergen tags accurately
- Static fallback data disappears automatically once Sanity has content

### 2. Real Photography
Replace placeholder images across the site with actual restaurant photography.
- Hub cards: Brunch, Lunch, Dinner, Bar background images
- Private dining: all 5 space photos
- Vibes page: hero + 3 interstitial full-screen images
- Menu item photos go directly into Sanity (handled with item #1)

---

## 🟢 Pages (placeholders need decisions)

### 3. Reservations Page
Currently blank. Options:
- Embed OpenTable or Resy widget
- Clean "coming soon" layout with phone/email contact info to hold the spot

### 4. Events Page
Currently blank. Options:
- Sanity-powered events list (new schema type — quick to add)
- Simple placeholder with contact CTA until events are ready

---

## 🔵 SEO & Discoverability

### 5. Open Graph / Social Sharing
Links look bare when shared on social or via text.
- Create a default OG image (1200×630) — logo on dark background
- Add `og:image`, `og:description`, `og:title` metadata to all pages

### 6. Schema.org Structured Data
Add `Restaurant` JSON-LD to the homepage for Google rich results.
Covers: hours, address, cuisine type, reservations link. ~30 min to implement.

### 7. Sitemap + robots.txt
Add `src/app/sitemap.ts` and `src/app/robots.ts` — Next.js auto-generates these.

---

## 🔵 Production Housekeeping

### 8. 404 Page
Add `src/app/not-found.tsx` styled to match the site. Currently shows default Next.js 404.

### 9. Sanity Studio Protection
`/studio` is publicly accessible on the live URL.
- Add middleware password protection, or restrict by IP
- At minimum ensure it's not linked anywhere public-facing

### 10. Analytics
Vercel Analytics — one install, zero config:
```
npm install @vercel/analytics
```
Add `<Analytics />` to `src/app/layout.tsx`. Done.

### 11. Custom Domain
When restaurant opens: Vercel → Settings → Domains → add domain → update DNS at registrar.
Two DNS records, under an hour to propagate.

---

## 🔵 Nice to Have

### 12. Private Dining Inquiry Form
`mailto:` links work but a real form (Resend or Postmark) is more reliable and tracks submissions.

### 13. Loading / Skeleton States
Add `loading.tsx` per route so Sanity fetches show a graceful skeleton instead of a blank flash.

### 14. Accessibility Pass
- Color contrast audit on low-opacity text (brand-cream/35 etc.)
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
| Mobile nav | ✅ Complete |
| Mobile view pass | ✅ Complete |
| Sanity content | 🔲 Empty — needs real menu data |
| Real photography | 🔲 Pending |
| OG / SEO | 🔲 Not started |
| 404 page | 🔲 Not started |
| Analytics | 🔲 Not started |
| GitHub | ✅ `0xdysseydigital/reunion-web` |
| Vercel | ✅ Live, auto-deploy on push |
| Custom domain | 🔲 Add when restaurant opens |
