# Reunion Hershey – Design System

## Color Palette

### Primary Colors
- **Background (Dark/Primary):** `#090A09` — main background for all pages and sections
- **Text/Accent (Light Cream):** `#EDEDE0` — primary text, CTAs, accents, highlights

### Neutral Colors
- **Background (Primary):** `#090A09`
- **Background (Secondary):** `#090A09` (same, can use opacity variations if needed)
- **Text (Primary):** `#EDEDE0`
- **Text (Secondary):** `#EDEDE0` (with opacity if needed for secondary text)
- **Border/Divider:** `#EDEDE0`

### Additional Notes
- **Two-color minimalist system:** Dark background with light cream text/accents throughout
- Consider opacity variations: `#EDEDE0` at 50-75% for secondary text, 100% for primary

---

## Typography

### Font Families
- **Heading Font:** Servus (files: `fonts/servustest-light.otf`, `fonts/servustest-regular.otf`, `fonts/servustest-bold.otf`) — weights: Light, Regular, Bold
- **Secondary Font:** Platypi (file: `fonts/Platypi-VariableFont_wght.ttf`) — variable weight font
- **Body Font:** Literata (file: `fonts/Literata-Variable.ttf`) — variable weight font

### Font Scale
| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| H1 | Servus | 64px (4rem) | Light | 1.2 | -0.5px |
| H2 | Servus | 48px (3rem) | Light | 1.3 | -0.25px |
| H3 | Servus | 32px (2rem) | Regular | 1.4 | 0px |
| H4 | Servus | 24px (1.5rem) | Regular | 1.4 | 0px |
| Body | Literata | 16px (1rem) | Regular | 1.6 | 0px |
| Body Small | Literata | 14px (0.875rem) | Regular | 1.5 | 0px |
| Caption | Literata | 12px (0.75rem) | Regular | 1.4 | 0.5px |
| Label / Small Text | Platypi | 14px (0.875rem) | Regular | 1.4 | 0.25px |

---

## Spacing & Layout

### Spacing Scale
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 96px
```

### Container & Padding
- **Max Content Width:** 1280px
- **Padding (Desktop):** 40px
- **Padding (Tablet):** 24px
- **Padding (Mobile):** 16px

### Grid
- **Columns:** 12
- **Gap:** 24px

---

## Visual References

### Navigation Bar
![Navigation](./screenshots/nav-reunion.png)

**Layout & Structure:**
- **Fixed/Sticky:** Fixed at top
- **Height:** ~60-70px
- **Background:** `#090A09`
- **Layout:** Logo (left) + Nav links (center) + Social icons (right)

**Typography & Colors:**
- **Nav Link Font:** Servus, 14–16px, Regular
- **Text Color:** `#EDEDE0`
- **Logo:** Decorative R icon with sunburst/floral motif
- **Social Icons:** Instagram + Facebook, right-aligned

**Spacing:**
- **Horizontal Padding:** 40px (desktop)
- **Gap between items:** 24–32px

---

### Hero Section
![Hero Section](./screenshots/hero-reunion.png)

**Layout:**
- **Height:** ~600–700px (viewport height)
- **Background:** `#090A09` with decorative botanical illustration (right side)
- **Content Alignment:** Left-aligned, split layout
- **CTA:** "Book a Reservation" + "Get Directions" buttons below

**Typography:**
- **Main Heading "REUNION":** Servus Light, 64px (4rem), tight letter-spacing
- **Subheading "cocktails + provisions":** Servus Light, 24px (1.5rem)
- **Description text:** Literata Regular, 16px, line-height 1.6
- **All text:** `#EDEDE0`

**Visual Elements:**
- Large decorative "R" with sunburst in background (right side)
- Botanical illustration (leaves/flowers) at bottom right
- Right side: Image or illustration element

---

### About Section
![About Section](./screenshots/about-reunion.png)

**Layout:**
- **Full width:** `#090A09` background
- **Content:** Centered, max-width ~1000px
- **Spacing:** 80px top/bottom padding, 40px sides

**Typography:**
- **Section Heading:** Servus Light, 48px (3rem), centered
- **Body Paragraphs:** Literata Regular, 16px, centered, line-height 1.6
- **Text Color:** `#EDEDE0`

**Visual Elements:**
- Horizontal line separator (top)
- "Explore Our Spaces" subheading with downward arrow (bottom)

---

### Info Section (Location & Hours)
![Info Section](./screenshots/info-reunion.png)

**Layout:**
- **Split layout:** Image (left, ~40%) + Content (right, ~60%)
- **Background:** `#090A09`
- **Padding:** 60–80px
- **Gap between columns:** 40px

**Image:**
- **Restaurant interior photo** (left side, aspect ratio ~4:5)

**Typography & Content:**
- **Heading "Location & Hours":** Servus Light, 48px (3rem)
- **Address:** Literata Regular, 16px
- **Hours detail:** Literata Regular, 14px (with bold "Monday - Thursday" etc.)
- **Secondary text:** Literata Regular, 14px (italicized for special notes)
- **All text:** `#EDEDE0`

**Buttons:**
- **"Book a Reservation"** button (outlined, `#EDEDE0` border + text)
- **"Get Directions"** button (outlined, `#EDEDE0` border + text)
- **Button specs:** ~120px width, 48px height, 14px font, light border (1–2px)

---

### Craft Cocktails / Spaces Section
![Craft Cocktails](./screenshots/cc-reunion.png)

**Layout:**
- **Full width:** `#090A09` background
- **Content:** Centered, high-quality image/video
- **Spacing:** 60px top/bottom padding

**Visual Elements:**
- **Large fireplace image:** Restaurant interior with fireplace
- **Decorative logo:** R with sunburst + botanical motif (overlay on image, centered)
- **Atmosphere-focused imagery:** Bottles on shelves, warm lighting

**Typography:**
- Minimal text; focus on visual storytelling
- If text present: Servus Light, 36–48px, centered, `#EDEDE0`

---

### FAQ / Accordion Section
![FAQ Section](./screenshots/faq-reunion.png)

**Layout:**
- **Full width:** `#090A09` background
- **Max-width container:** ~900px, centered
- **Padding:** 60px top/bottom, 40px sides

**Typography:**
- **Section Heading "Frequently Asked Questions":** Servus Light, 48px (3rem)
- **Question text:** Literata Regular, 16px
- **Answer text:** Literata Regular, 14px
- **All text:** `#EDEDE0`

**Accordion Component:**
- **Question row:** Full width, with border-bottom (`#EDEDE0`, 1px)
- **Hover state:** Slight opacity change or background shift
- **Open/Close indicator:** Downward chevron/arrow (`▼`), right-aligned
- **Padding per item:** 16px vertical, 24px horizontal
- **Spacing between items:** Border-bottom separator

**States:**
- **Closed:** Question text + arrow icon (right)
- **Open:** Question text + arrow rotated 180° + answer text displayed below
- **Animation:** Smooth 0.3s transition

---

### Footer
![Footer](./screenshots/footer-reunion.png)

**Layout:**
- **Full width:** `#090A09` background with top border (`#EDEDE0`, 1px)
- **Content:** 3-column grid (Copyright | Navigation | Contact)
- **Padding:** 40px sides, 32px top/bottom
- **Gap between columns:** 60px

**Column 1 - Copyright:**
- **Text:** "© 2026 Reunion Cocktails + Provisions"
- **Font:** Literata Regular, 12px
- **Color:** `#EDEDE0` at ~60% opacity

**Column 2 - Navigation Links:**
- **Heading:** "Navigation" (Servus Regular, 14px, bold)
- **Links:** Home, Menus, Reservations, FAQs, Contact
- **Font:** Literata Regular, 12px
- **Link Color:** `#EDEDE0` at ~70% opacity
- **Hover State:** Full opacity
- **Spacing:** 8px between links

**Column 3 - Contact:**
- **Heading:** "Contact" (Servus Regular, 14px, bold)
- **Email:** manager@reunioncocktailsprovisions.com
- **Address:** 1201 W Chocolate Avenue Hershey, PA
- **Font:** Literata Regular, 12px
- **Color:** `#EDEDE0` at ~70% opacity

---

### Buttons (Global Component)
**Primary Button (Outlined):**
- **Background:** Transparent
- **Border:** 1–2px solid `#EDEDE0`
- **Text:** `#EDEDE0`, Servus Regular, 14px
- **Padding:** 12px 24px
- **Border Radius:** 0px (sharp corners)
- **Hover State:** Background `#EDEDE0`, text `#090A09`, smooth transition (0.2s)
- **Cursor:** Pointer

---

---

## Menu Structure (New Design)

### Menu Hub Page (`/menus`)
![Placeholder: Menu Hub](./screenshots/menu-hub.png)

**Layout:**
- **Full width:** `#090A09` background
- **Content:** Grid of 5 cards (2-3 columns on desktop, 1 on mobile)
- **Padding:** 60px top/bottom, 40px sides
- **Gap between cards:** 32px

**Cards:**
- **Dimensions:** Square or ~300x300px per card
- **Background:** `#090A09` with border (`#EDEDE0`, 1px)
- **Image:** Full card, aspect ratio 1:1
- **Overlay text:** Menu type name (Brunch, Lunch, Dinner, Bar, Allergens)
- **Text:** Servus Light, 28px, centered, `#EDEDE0`
- **Hover state:** Slight opacity change on image (0.8), border brightens

**Card Types:**
1. Brunch
2. Lunch
3. Dinner
4. Bar
5. Allergens

**Links:** Each card links to respective page (`/menus/brunch`, `/menus/lunch`, etc.)

---

### Individual Menu Pages (`/menus/[type]`)
**Examples:** `/menus/brunch`, `/menus/lunch`, `/menus/dinner`, `/menus/bar`

**Layout:**
- **Full width:** `#090A09` background
- **Header:** Menu type title (Servus Light, 48px), centered
- **Content grid:** Menu items displayed in 2-3 column grid (responsive)
- **Padding:** 60px top/bottom, 40px sides
- **Gap between items:** 32px

**Menu Item Card:**
- **Image:** Top, aspect ratio ~4:3
- **Title:** Servus Regular, 18px, `#EDEDE0`
- **Description (optional):** Literata Regular, 14px, `#EDEDE0` at 80% opacity
- **Price (optional):** Servus Regular, 16px, `#EDEDE0`
- **Allergen badges (if applicable):** Small tags below title
- **Background:** Subtle border or clean card style
- **Hover state:** Slight shadow or opacity shift

**Data Source:** Sanity CMS
- Menu items filtered by `menu_type` (brunch, lunch, dinner, bar)
- Each item contains: name, image, description, price, allergens array

---

### Allergen Search & Filter Page (`/menus/allergens`)

**Layout:**
- **Full width:** `#090A09` background
- **Header:** "Allergen Information" or "Filter by Allergen" (Servus Light, 48px)
- **Padding:** 60px top/bottom, 40px sides

**Search & Filter Section:**
- **Search Input:**
  - Background: Transparent
  - Border: 1px `#EDEDE0`
  - Text: `#EDEDE0`, Literata Regular, 16px
  - Padding: 12px 16px
  - Placeholder: "Search by dish name or allergen..."
  - Focus state: Border brightens
  - Width: 100%, max-width 600px, centered

- **Filter Toggles (below search):**
  - Display as pill buttons or checkboxes
  - Allergen types: Nuts, Dairy, Gluten, Shellfish, Soy, Vegan, Vegetarian
  - Style: Toggle on/off
  - **Off state:** Border `#EDEDE0`, text `#EDEDE0`, background transparent
  - **On state:** Background `#EDEDE0`, text `#090A09`
  - Smooth transition (0.2s)
  - Gap between toggles: 12px
  - Wrap on mobile

**Results Grid:**
- **Cards per row:** 2-3 (responsive)
- **Gap:** 32px
- **Each result card:**
  - Image (top)
  - Dish name (Servus Regular, 18px)
  - Menu type label (Literata Regular, 12px, dimmed)
  - Allergen badges (tags/pills showing which allergens present)
  
**Allergen Badges:**
- **Style:** Pill or square tags
- **Background:** `#EDEDE0` at 15% opacity
- **Text:** `#EDEDE0`, Literata Regular, 11px
- **Padding:** 4px 8px
- **Border Radius:** 4px (slightly rounded)
- **Display:** Inline, wrapping below dish name

**No Results State:**
- **Message:** "No items match your filters" (Literata Regular, 16px, centered)
- **Suggestion:** "Try adjusting your search or filters"

---

## Sanity CMS Schema

### Collection: Menu Items
```
Field Name          | Type      | Required | Description
--------------------|-----------|----------|-------------------------
name                | String    | Yes      | Dish name (e.g., "Eggs Benedict")
image               | Image     | Yes      | Dish photo
description         | Text      | No       | Short description
price               | Number    | No       | Price in USD
menu_type           | String    | Yes      | brunch / lunch / dinner / bar
allergens           | Array     | No       | Multiple-select: Nuts, Dairy, Gluten, Shellfish, Soy, Vegan, Vegetarian
slug                | String    | Yes      | URL-friendly name (auto-generated)
```

### Allergen Types (Enum)
- Nuts
- Dairy
- Gluten
- Shellfish
- Soy
- Vegan
- Vegetarian

---

## Page Routes Summary

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Hero, about, info, spaces, FAQ, footer |
| `/menus` | Menu Hub | 5 cards linking to menu types + allergens |
| `/menus/brunch` | Brunch Menu | Grid of brunch items from Sanity |
| `/menus/lunch` | Lunch Menu | Grid of lunch items from Sanity |
| `/menus/dinner` | Dinner Menu | Grid of dinner items from Sanity |
| `/menus/bar` | Bar Menu | Grid of bar items from Sanity |
| `/menus/allergens` | Allergen Search | Search + filter all items by allergen |
| `/reservations` | Reservations | Placeholder for now |
| `/vibes` | Vibes | Placeholder for now |
| `/private-dining` | Private Dining | Placeholder for now |
| `/events` | Events | Placeholder for now |

---

## Responsive Breakpoints

| Device | Breakpoint | Notes |
|--------|-----------|-------|
| Mobile | 375px–767px | Single column, full-width content, increased touch targets |
| Tablet | 768px–1023px | 2-column grid, adjusted spacing and font sizes |
| Desktop | 1024px+ | Full layout, optimal readability, max-width containers |

---

## Additional Notes & Specifications

- [Any special brand guidelines]
- [Animation preferences]
- [Accessibility requirements]
- [Other considerations]
