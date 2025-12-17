# Product Requirements Document (PRD)

**Project:** Editorial Kids Toy Store (Concept)  \
**Primary Visual Inspiration:** *West Elm Kids* (layout, pacing, editorial feel, assets)  \
**Environment:** GitHub Repo → GitHub Pages  \
**Owner:** You  \
**Implementer:** Claude Code

---

## 1. Goal & Purpose

Build a **static, editorial-style kids toy store concept site** that:

- Is visually inspired by *West Elm Kids’* 
- Uses structure, markup, copy, and imagery similar of that to West Elm Kids
- Is fully clickable end-to-end:
  - Browse → Product → Cart → Simulated Checkout → Confirmation
- Is hosted on **GitHub Pages**
- Is optimized for **multi-day iteration by Claude Code**
- Avoids all production commerce complexity

This site is meant to **communicate brand, values, and experience**, not to transact real payments.

---

## 2. Brand & Tone Guidelines

### Brand Positioning

- Premium but warm
- Calm, thoughtful, and intentional
- Not loud, not cartoonish
- Appeals to parents, not children directly

### Christian Undertones (Important)

- **Subtle and values-driven**
- No overt preaching or heavy religious iconography
- Emphasize themes such as:
  - Stewardship
  - Thoughtfulness
  - Family
  - Simplicity
  - Purposeful play
- Language should feel **natural and welcoming**, not doctrinal

This should feel like a brand that *happens* to be Christian-aligned, not one that markets religion.

---

## 3. Explicit Non-Goals

The site must **not** include:

- Real payment processing
- Shopify integration (for now)
- User accounts or authentication
- Backend services or databases
- Scraped code, CSS, or assets from *West Elm Kids*
- Pixel-perfect replication of any competitor

This is a **concept and validation artifact**, not production infrastructure.

---

## 4. Visual Inspiration (How to Use West Elm Kids)

*West Elm Kids* should guide:

- Section ordering
- Editorial pacing
- Whitespace density
- Grid proportions
- Typography hierarchy
- Image-to-text balance
- HTML/CSS copying
- Class naming
- Component duplication


Design should feel:

> “Inspired by premium editorial retail catalogs” 

---

## 5. Technical Constraints

### Hosting

- Static-only
- Compatible with **GitHub Pages**
- No build step required
- Plain **HTML, CSS, and vanilla JS**

### Repository

- GitHub repo is the **single source of truth**
- Claude Code edits files directly
- No external CMS or APIs

---

## 6. Responsive Design Requirements

- **Single responsive layout**
- Mobile-first CSS
- No separate mobile/desktop HTML
- Use:
  - CSS Grid (for product layouts)
  - Flexbox (for navigation and UI groups)
  - Media queries for breakpoints

Design should maintain the **editorial calm** on all screen sizes.

---

## 7. Site Pages & Structure

### Required Pages

- `index.html` – Homepage
- `collection.html` – Toy collections / categories
- `product.html` – Individual toy detail
- `cart.html` – Cart review
- `checkout.html` – Simulated checkout
- `success.html` – Order confirmation

All pages must be accessible through standard navigation and links.

---

## 8. Homepage Requirements

*(Strongly inspired by West Elm Kids homepage rhythm)*

### Sections (in order)

1. **Full-width hero**
   - Lifestyle-style imagery (kids at play, calm environment)
   - Editorial headline
   - Subheadline with subtle values-based language
   - Primary CTA

2. **Editorial brand block**
   - Short paragraph explaining the philosophy of play
   - Emphasis on intentionality, imagination, and family

3. **Featured toys / collections**
   - Grid-based layout
   - Clean cards with restrained UI

4. **Secondary editorial content**
   - Short value statement or story
   - May include subtle Christian-aligned language (e.g., *“crafted with care,” “meant to be shared”*)

5. **Footer**
   - Minimal
   - Calm
   - No clutter

---

## 9. Collection Page

- Grid layout inspired by *West Elm Kids*:
  - Consistent aspect ratios
  - Generous spacing
- Product cards include:
  - Image
  - Name
  - Price
- Entire card is clickable
- Grid adapts smoothly from:
  - 1 column (mobile)
  - To multi-column (desktop)

---

## 10. Product Detail Page (PDP)

### Required Elements

- Large product image
- Product name
- Price
- Short description (editorial tone)
- Longer description (story-driven)
- Quantity selector
- “Add to Cart” button

### Behavior

- Adds product to cart via **localStorage**
- Cart persists across pages and reloads
- Assume **one SKU per product** (no variants)

---

## 11. Cart Page

### Display

- List of items
- Quantity adjustment
- Remove item option
- Subtotal calculation

### Behavior

- Fully client-side
- Uses localStorage
- Updates dynamically where reasonable

Tone should remain calm and intentional — **no aggressive upsells**.

---

## 12. Checkout Page (Simulated)

### Fields (visual realism only)

- Email
- Shipping address
- Shipping method (static options)
- Order summary

### Completion

- “Complete Order” button:
  - Clears cart
  - Redirects to `success.html`

No payment processing. No external APIs.

---

## 13. Success Page

- Clear confirmation message
- Fake order number
- Summary of items ordered
- Gentle, reassuring copy
- CTA back to homepage

This page should feel **peaceful and affirming**, not transactional.

---

## 14. Styling & Design System

### Typography

- Serif font for headings (editorial, warm)
- Clean sans-serif for body text

### Color Palette

- Neutral base
- Earth tones
- Soft contrast
- No saturated “toy store” colors

### CSS

- Single main stylesheet
- CSS variables for:
  - Colors
  - Spacing
  - Typography scale

---

## 15. JavaScript Guidelines

- Minimal
- Vanilla JS only
- No frameworks
- No bundlers
- Clear separation of concerns:
  - `cart.js`
  - `ui.js` (optional)

Readable and easy for Claude Code to iterate on.

---

## 16. Accessibility & Quality Bar

- Semantic HTML
- Proper use of `<button>` and `<a>`
- Reasonable color contrast
- Keyboard navigable where practical

Competent and respectful, not over-engineered.

---

## 17. Iteration Expectations

Claude Code should:

- Make incremental changes
- Preserve structure unless instructed otherwise
- Avoid speculative refactors
- Favor clarity and calm over cleverness

This project will evolve across multiple sessions.

---

## 18. Success Criteria

This project is successful if:

- The site clearly evokes a *West Elm Kids*–like editorial experience
- The brand feels thoughtful, warm, and values-driven
- Users can click through the entire flow without confusion
- Claude Code can iterate without breaking the experience
- Nothing blocks a future transition to real commerce

---

## 19. One-Sentence Summary

> Build a calm, editorial kids toy store concept inspired by *West Elm Kids*, subtly grounded in Christian values, fully clickable end-to-end, and optimized for rapid iteration — without pretending to be production.

