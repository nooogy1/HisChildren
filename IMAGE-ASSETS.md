# Image Assets Guide

This document lists all images needed for the His Children toy store website. All images should be placed in the `/images/` folder.

## Image Style Guidelines

Based on the PRD and West Elm Kids inspiration:
- **Aesthetic:** Calm, lifestyle-style photography with neutral backgrounds
- **Backgrounds:** Soft whites, creams, light wood surfaces, or simple fabric backdrops
- **Lighting:** Natural, soft, diffused light
- **Composition:** Clean, editorial, generous whitespace
- **Aspect Ratio:** 1:1 (square) for product images, 4:3 for collection banners
- **Mood:** Warm, inviting, unhurried—appeals to parents, not children directly

---

## Collection Banner Images (4 images)

These appear on the homepage and collection overview page. Recommended size: **800x600px** (4:3 ratio)

| Filename | Collection | Suggested Content |
|----------|------------|-------------------|
| `collection-heirloom-wooden.jpg` | Heirloom Wooden | Arrangement of wooden blocks/toys on a light surface, warm natural light, perhaps a child's hand reaching in |
| `collection-imagination-builders.jpg` | Imagination Builders | Stack of wooden planks forming a structure, architectural feel, clean background |
| `collection-storybook-friends.jpg` | Storybook Friends | Group of plush animals arranged together on soft linen or in a basket |
| `collection-wonder-learn.jpg` | Wonder & Learn | Learning materials spread on a table—letters, nature items, maps—inviting exploration |

---

## Product Images (20 images)

These appear on product cards and product detail pages. Recommended size: **800x800px** (1:1 square ratio)

### Heirloom Wooden Collection (5 products)

| Filename | Product Name | Price | Suggested Content |
|----------|--------------|-------|-------------------|
| `heritage-block-set.jpg` | The Heritage Block Set | $68 | 24-piece maple block set with geometric shapes (squares, rectangles, arches, columns), natural wood finish, arranged artfully |
| `woodland-animal-family.jpg` | Woodland Animal Family | $45 | Five carved beechwood animals (fox, bear, rabbit, owl, deer), simple rounded forms, natural grain visible |
| `classic-stacking-rainbow.jpg` | Classic Stacking Rainbow | $52 | Six nesting wooden arches in muted earth tones (dusty rose, sage, ochre, sky, clay, cream), nested or stacked |
| `timeless-train-set.jpg` | Timeless Train Set | $85 | Wooden train with engine, three cars, track pieces, and small station/trees, beechwood finish |
| `handcrafted-memory-puzzle.jpg` | Handcrafted Memory Puzzle | $38 | 24 thick wooden tiles with nature illustrations (butterflies, acorns, feathers, flowers), some face-up showing pairs |

### Imagination Builders Collection (5 products)

| Filename | Product Name | Price | Suggested Content |
|----------|--------------|-------|-------------------|
| `architects-dream-set.jpg` | Architect's Dream Set | $72 | 100 smooth basswood planks in three sizes, stacked or arranged in a simple tower/structure |
| `natural-building-planks.jpg` | Natural Building Planks | $58 | 50 unfinished wood planks showing natural grain variation, loosely arranged |
| `create-connect-blocks.jpg` | Create & Connect Blocks | $48 | 36 maple blocks with subtle notches, some connected to show interlocking feature |
| `little-engineer-kit.jpg` | Little Engineer Kit | $65 | Wooden wheels, axles, chassis pieces, and a wooden screwdriver/nuts, perhaps a simple assembled car |
| `magnetic-wonder-tiles.jpg` | Magnetic Wonder Tiles | $78 | 40 geometric wooden tiles (squares, triangles) in muted colors, some formed into a 3D structure |

### Storybook Friends Collection (5 products)

| Filename | Product Name | Price | Suggested Content |
|----------|--------------|-------|-------------------|
| `oliver-gentle-bear.jpg` | Oliver the Gentle Bear | $42 | 14-inch organic cotton bear in warm honey/caramel tones, soft and huggable, simple embroidered features |
| `luna-comfort-bunny.jpg` | Luna the Comfort Bunny | $38 | Cream/white organic cotton bunny with long floppy ears, gentle expression, soft and comforting |
| `sebastian-wise-owl.jpg` | Sebastian the Wise Owl | $40 | 12-inch linen/cotton owl in grey-brown tones, large embroidered eyes, wings that wrap around |
| `rosie-kind-fox.jpg` | Rosie the Kind Fox | $42 | Russet/orange organic cotton fox with cream belly, friendly expression, small removable scarf |
| `theodore-brave-lion.jpg` | Theodore the Brave Lion | $45 | 15-inch golden/tan lion with soft mane, cream face, gentle embroidered expression |

### Wonder & Learn Collection (5 products)

| Filename | Product Name | Price | Suggested Content |
|----------|--------------|-------|-------------------|
| `nature-discovery-kit.jpg` | Nature Discovery Kit | $55 | Wooden box containing magnifying glass, three specimen jars with wooden lids, collection bags, field guide |
| `first-words-letters.jpg` | First Words & Letters | $42 | 52 maple letter tiles spread out or in canvas bag, some word cards with illustrations visible |
| `counting-garden-set.jpg` | Counting Garden Set | $48 | Ten numbered wooden pots with wooden vegetables (carrots, radishes, etc.) being "planted" |
| `little-explorers-map.jpg` | Little Explorer's Map | $35 | Soft quilted fabric world map with wooden landmark pieces (Eiffel Tower, mountains, etc.) placed on it |
| `seasons-learning-board.jpg` | Seasons Learning Board | $52 | Wooden board with moveable pieces showing seasons, weather icons, days of week—hand-painted illustrations |

---

## Optional Hero/Banner Images

These could enhance the homepage but the site currently uses CSS/SVG placeholders:

| Filename | Location | Suggested Content |
|----------|----------|-------------------|
| `hero-main.jpg` | Homepage hero | Children playing calmly with wooden toys, natural light, lifestyle feel, soft focus background |
| `hero-about.jpg` | About/brand section | Hands crafting wooden toys, or family moment with toys, warm and intentional |

---

## Current Placeholder Approach

The site currently uses inline SVG graphics as placeholders. These show abstract representations of each product type in the brand's muted color palette. The SVGs will automatically be replaced when you add the actual `.jpg` files to the `/images/` folder and update the HTML.

To replace a placeholder:
1. Add your image to `/images/` with the exact filename listed above
2. In the corresponding HTML file, replace the `<svg>...</svg>` block with:
   ```html
   <img src="../images/[filename].jpg" alt="[Product Name]">
   ```
   (or `src="images/[filename].jpg"` for root-level pages)

---

## Image Checklist

- [ ] `collection-heirloom-wooden.jpg`
- [ ] `collection-imagination-builders.jpg`
- [ ] `collection-storybook-friends.jpg`
- [ ] `collection-wonder-learn.jpg`
- [ ] `heritage-block-set.jpg`
- [ ] `woodland-animal-family.jpg`
- [ ] `classic-stacking-rainbow.jpg`
- [ ] `timeless-train-set.jpg`
- [ ] `handcrafted-memory-puzzle.jpg`
- [ ] `architects-dream-set.jpg`
- [ ] `natural-building-planks.jpg`
- [ ] `create-connect-blocks.jpg`
- [ ] `little-engineer-kit.jpg`
- [ ] `magnetic-wonder-tiles.jpg`
- [ ] `oliver-gentle-bear.jpg`
- [ ] `luna-comfort-bunny.jpg`
- [ ] `sebastian-wise-owl.jpg`
- [ ] `rosie-kind-fox.jpg`
- [ ] `theodore-brave-lion.jpg`
- [ ] `nature-discovery-kit.jpg`
- [ ] `first-words-letters.jpg`
- [ ] `counting-garden-set.jpg`
- [ ] `little-explorers-map.jpg`
- [ ] `seasons-learning-board.jpg`

**Total: 24 images** (4 collection banners + 20 product images)
