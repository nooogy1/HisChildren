/**
 * His Children - Cart Functionality
 * Handles cart state with localStorage persistence
 */

const Cart = {
  STORAGE_KEY: 'hischildren_cart',
  ORDER_KEY: 'hischildren_last_order',

  /**
   * Get all cart items
   * @returns {Array} Array of cart items
   */
  getItems() {
    try {
      const items = localStorage.getItem(this.STORAGE_KEY);
      return items ? JSON.parse(items) : [];
    } catch (e) {
      console.error('Error reading cart:', e);
      return [];
    }
  },

  /**
   * Save items to cart
   * @param {Array} items - Array of cart items
   */
  saveItems(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      this.updateCartCount();
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  },

  /**
   * Add item to cart
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add
   */
  addItem(product, quantity = 1) {
    const items = this.getItems();
    const existingIndex = items.findIndex(item => item.id === product.id);
    // Use sale price if available, otherwise regular price
    const effectivePrice = product.salePrice || product.price;

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: effectivePrice,
        originalPrice: product.price,
        salePrice: product.salePrice,
        image: product.image,
        collection: product.collection,
        quantity: quantity
      });
    }

    this.saveItems(items);
    return items;
  },

  /**
   * Update item quantity
   * @param {string} productId - Product ID
   * @param {number} quantity - New quantity
   */
  updateQuantity(productId, quantity) {
    const items = this.getItems();
    const index = items.findIndex(item => item.id === productId);

    if (index > -1) {
      if (quantity <= 0) {
        items.splice(index, 1);
      } else {
        items[index].quantity = quantity;
      }
      this.saveItems(items);
    }

    return items;
  },

  /**
   * Remove item from cart
   * @param {string} productId - Product ID
   */
  removeItem(productId) {
    const items = this.getItems().filter(item => item.id !== productId);
    this.saveItems(items);
    return items;
  },

  /**
   * Get cart totals
   * @returns {Object} Subtotal, shipping, and total
   */
  getTotals() {
    const items = this.getItems();
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal >= 75 ? 0 : 8.95) : 0;
    const total = subtotal + shipping;

    return {
      subtotal,
      shipping,
      total,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
    };
  },

  /**
   * Clear all items from cart
   */
  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateCartCount();
  },

  /**
   * Save order details before clearing cart
   */
  saveOrder() {
    const items = this.getItems();
    const totals = this.getTotals();
    const orderNumber = 'HC' + Date.now().toString().slice(-8);

    const order = {
      orderNumber,
      items,
      totals,
      date: new Date().toISOString()
    };

    try {
      localStorage.setItem(this.ORDER_KEY, JSON.stringify(order));
    } catch (e) {
      console.error('Error saving order:', e);
    }

    return order;
  },

  /**
   * Get last order details
   */
  getLastOrder() {
    try {
      const order = localStorage.getItem(this.ORDER_KEY);
      return order ? JSON.parse(order) : null;
    } catch (e) {
      console.error('Error reading order:', e);
      return null;
    }
  },

  /**
   * Update cart count in header
   */
  updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const { itemCount } = this.getTotals();

    countElements.forEach(el => {
      el.textContent = itemCount > 0 ? itemCount : '';
    });
  },

  /**
   * Format price for display
   * @param {number} price - Price in dollars
   * @returns {string} Formatted price string
   */
  formatPrice(price) {
    return '$' + price.toFixed(2);
  }
};

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateCartCount();
});

// ========================================
// Product and Collection Data
// ========================================

const Products = {
  'heritage-block-set': {
    id: 'heritage-block-set',
    name: 'The Heritage Block Set',
    price: 68,
    salePrice: null,
    collection: 'Heirloom Wooden',
    collectionSlug: 'heirloom-wooden',
    image: 'images/heritage-block-set.jpg',
    shortDescription: 'Hand-sanded maple blocks in timeless shapes, crafted to be passed down through generations.',
    longDescription: 'Each block in this 24-piece set is cut from sustainably harvested maple and finished with natural beeswax. The simple geometric forms—squares, rectangles, arches, and columns—invite open-ended play and quiet concentration. These are the blocks that build not just towers, but memories.',
    featured: true
  },
  'woodland-animal-family': {
    id: 'woodland-animal-family',
    name: 'Woodland Animal Family',
    price: 45,
    salePrice: 36,
    collection: 'Heirloom Wooden',
    collectionSlug: 'heirloom-wooden',
    image: 'images/woodland-animal-family.jpg',
    shortDescription: 'A gentle gathering of forest friends carved from solid beechwood.',
    longDescription: 'Five woodland creatures—fox, bear, rabbit, owl, and deer—each shaped by hand and smoothed to perfection. Their simple forms encourage imaginative storytelling while their sturdy construction ensures they\'ll witness countless adventures. Natural wood grain makes each set unique.',
    featured: false
  },
  'classic-stacking-rainbow': {
    id: 'classic-stacking-rainbow',
    name: 'Classic Stacking Rainbow',
    price: 52,
    salePrice: null,
    collection: 'Heirloom Wooden',
    collectionSlug: 'heirloom-wooden',
    image: 'images/classic-stacking-rainbow.jpg',
    shortDescription: 'Six nesting arches in soft, natural-dyed hues for endless creative play.',
    longDescription: 'This timeless rainbow stacker uses vegetable-based dyes in muted earth tones—dusty rose, sage, ochre, sky, clay, and cream. The graduated arches nest perfectly and inspire everything from bridges to tunnels to abstract sculptures. A quiet invitation to explore balance and beauty.',
    featured: true
  },
  'timeless-train-set': {
    id: 'timeless-train-set',
    name: 'Timeless Train Set',
    price: 85,
    salePrice: 68,
    collection: 'Heirloom Wooden',
    collectionSlug: 'heirloom-wooden',
    image: 'images/timeless-train-set.jpg',
    shortDescription: 'A complete wooden railway with engine, cars, and curved track pieces.',
    longDescription: 'The gentle click of wooden wheels on wooden track—a sound that spans generations. This 30-piece set includes a steam engine, three cars, track pieces, trees, and a small station. Magnetic couplings allow easy connecting while the smooth beechwood finish invites small hands to explore.',
    featured: false
  },
  'handcrafted-memory-puzzle': {
    id: 'handcrafted-memory-puzzle',
    name: 'Handcrafted Memory Puzzle',
    price: 38,
    salePrice: null,
    collection: 'Heirloom Wooden',
    collectionSlug: 'heirloom-wooden',
    image: 'images/handcrafted-memory-puzzle.jpg',
    shortDescription: 'Twelve matching pairs of nature-inspired illustrations on solid wood tiles.',
    longDescription: 'Turn over a leaf, find its match. These 24 thick wooden tiles feature delicate illustrations of garden treasures—butterflies, acorns, feathers, and flowers. The satisfying weight and smooth edges make this memory game a tactile pleasure as much as a mental one.',
    featured: false
  },
  'architects-dream-set': {
    id: 'architects-dream-set',
    name: "Architect's Dream Set",
    price: 72,
    salePrice: null,
    collection: 'Imagination Builders',
    collectionSlug: 'imagination-builders',
    image: 'images/architects-dream-set.jpg',
    shortDescription: 'Precision-cut building planks for aspiring architects and dreamers.',
    longDescription: 'One hundred smooth planks in three sizes, each cut with exacting precision from sustainable basswood. No connectors, no instructions—just pure possibility. Watch as simple stacking evolves into towers, bridges, and fantastical structures limited only by imagination and patience.',
    featured: false
  },
  'natural-building-planks': {
    id: 'natural-building-planks',
    name: 'Natural Building Planks',
    price: 58,
    salePrice: null,
    collection: 'Imagination Builders',
    collectionSlug: 'imagination-builders',
    image: 'images/natural-building-planks.jpg',
    shortDescription: 'Fifty carefully milled planks for freeform construction and creative exploration.',
    longDescription: 'These planks celebrate the beauty of unfinished wood—each piece showing its own unique grain pattern. The consistent dimensions allow for stable building while the natural variations teach children that beauty lives in imperfection. Stack, balance, create, and begin again.',
    featured: false
  },
  'create-connect-blocks': {
    id: 'create-connect-blocks',
    name: 'Create & Connect Blocks',
    price: 48,
    salePrice: null,
    collection: 'Imagination Builders',
    collectionSlug: 'imagination-builders',
    image: 'images/create-connect-blocks.jpg',
    shortDescription: 'Interlocking wooden blocks with gentle notches for secure building.',
    longDescription: 'The subtle notches on each block create satisfying connections without frustration. Thirty-six pieces in natural maple, each designed to fit together in countless configurations. The result: structures that stand proud and builders who beam with accomplishment.',
    featured: false
  },
  'little-engineer-kit': {
    id: 'little-engineer-kit',
    name: 'Little Engineer Kit',
    price: 65,
    salePrice: 52,
    collection: 'Imagination Builders',
    collectionSlug: 'imagination-builders',
    image: 'images/little-engineer-kit.jpg',
    shortDescription: 'Wheels, axles, and building pieces for creating vehicles that really roll.',
    longDescription: 'Engineering meets artistry in this thoughtfully designed kit. Wooden wheels, axles, chassis pieces, and decorative elements combine to create cars, trucks, and vehicles yet to be invented. The wooden screwdriver and nuts teach cause and effect while building fine motor skills.',
    featured: false
  },
  'magnetic-wonder-tiles': {
    id: 'magnetic-wonder-tiles',
    name: 'Magnetic Wonder Tiles',
    price: 78,
    salePrice: null,
    collection: 'Imagination Builders',
    collectionSlug: 'imagination-builders',
    image: 'images/magnetic-wonder-tiles.jpg',
    shortDescription: 'Geometric wooden tiles with embedded magnets for three-dimensional creation.',
    longDescription: 'Hidden magnets transform flat tiles into soaring structures. This set of forty pieces includes squares, triangles, and special shapes, each crafted from sustainable birch with soft, muted colors. The magnetic click provides instant feedback, while the geometric forms introduce spatial reasoning through play.',
    featured: false
  },
  'oliver-gentle-bear': {
    id: 'oliver-gentle-bear',
    name: 'Oliver the Gentle Bear',
    price: 42,
    salePrice: null,
    collection: 'Storybook Friends',
    collectionSlug: 'storybook-friends',
    image: 'images/oliver-gentle-bear.jpg',
    shortDescription: 'A soft, huggable companion made from organic cotton and filled with natural wool.',
    longDescription: 'Oliver arrived one autumn morning, ready to be a faithful friend. His organic cotton exterior is dyed with plant-based colors, while his wool stuffing comes from small family farms. At 14 inches tall, he\'s the perfect size for carrying on adventures and providing comfort at rest.',
    featured: true
  },
  'luna-comfort-bunny': {
    id: 'luna-comfort-bunny',
    name: 'Luna the Comfort Bunny',
    price: 38,
    salePrice: 30,
    collection: 'Storybook Friends',
    collectionSlug: 'storybook-friends',
    image: 'images/luna-comfort-bunny.jpg',
    shortDescription: 'A gentle rabbit friend with the softest organic cotton and floppy ears made for holding.',
    longDescription: 'Luna understands the importance of quiet moments. Her long, floppy ears are perfectly designed for small hands to hold during naps or car rides. Made entirely from GOTS-certified organic cotton with a lavender sachet hidden in her heart, she brings peace wherever she goes.',
    featured: false
  },
  'sebastian-wise-owl': {
    id: 'sebastian-wise-owl',
    name: 'Sebastian the Wise Owl',
    price: 40,
    salePrice: null,
    collection: 'Storybook Friends',
    collectionSlug: 'storybook-friends',
    image: 'images/sebastian-wise-owl.jpg',
    shortDescription: 'A thoughtful owl companion who watches over bedtime with calm, knowing eyes.',
    longDescription: 'Sebastian keeps watch through the night with his embroidered eyes that never close. This 12-inch guardian is crafted from organic linen and cotton, with wings that wrap around for hugging. His presence reminds little ones that wisdom comes to those who rest well.',
    featured: false
  },
  'rosie-kind-fox': {
    id: 'rosie-kind-fox',
    name: 'Rosie the Kind Fox',
    price: 42,
    salePrice: null,
    collection: 'Storybook Friends',
    collectionSlug: 'storybook-friends',
    image: 'images/rosie-kind-fox.jpg',
    shortDescription: 'A warm-hearted fox with a gentle smile, ready for tea parties and forest adventures.',
    longDescription: 'Rosie brings warmth wherever she wanders. Her russet organic cotton coat and cream-colored belly are soft against small cheeks, while her friendly expression invites endless conversation. She comes with a tiny removable scarf for seasonal dress-up.',
    featured: false
  },
  'theodore-brave-lion': {
    id: 'theodore-brave-lion',
    name: 'Theodore the Brave Lion',
    price: 45,
    salePrice: null,
    collection: 'Storybook Friends',
    collectionSlug: 'storybook-friends',
    image: 'images/theodore-brave-lion.jpg',
    shortDescription: 'A courageous lion friend whose soft mane and steady heart inspire confidence.',
    longDescription: 'Theodore may be king of the savanna, but his heart is gentle. His organic cotton mane frames a face full of quiet courage, reminding little ones that bravery isn\'t about roaring—it\'s about facing each day with kindness. At 15 inches, he\'s substantial enough to lean on.',
    featured: false
  },
  'nature-discovery-kit': {
    id: 'nature-discovery-kit',
    name: 'Nature Discovery Kit',
    price: 55,
    salePrice: null,
    collection: 'Wonder & Learn',
    collectionSlug: 'wonder-learn',
    image: 'images/nature-discovery-kit.jpg',
    shortDescription: 'A wooden collection box with magnifying glass, specimen jars, and nature guide.',
    longDescription: 'Every walk becomes an expedition with this thoughtfully assembled kit. The solid wood collection box holds a real glass magnifying lens, three specimen jars with wooden lids, collection bags, and an illustrated field guide. Encourage the wonder that comes from paying attention to small things.',
    featured: true
  },
  'first-words-letters': {
    id: 'first-words-letters',
    name: 'First Words & Letters',
    price: 42,
    salePrice: null,
    collection: 'Wonder & Learn',
    collectionSlug: 'wonder-learn',
    image: 'images/first-words-letters.jpg',
    shortDescription: 'Tactile wooden letter tiles with simple word-building cards and canvas bag.',
    longDescription: 'Language comes alive through touch. These 52 letter tiles—two complete alphabets—are cut from smooth maple with gently rounded edges. The accompanying word cards feature simple illustrations and large letters, while the canvas storage bag makes learning portable and tidy.',
    featured: false
  },
  'counting-garden-set': {
    id: 'counting-garden-set',
    name: 'Counting Garden Set',
    price: 48,
    salePrice: 38,
    collection: 'Wonder & Learn',
    collectionSlug: 'wonder-learn',
    image: 'images/counting-garden-set.jpg',
    shortDescription: 'Numbered flower pots and wooden vegetables for hands-on counting practice.',
    longDescription: 'Plant one carrot, plant two. This garden-themed counting set includes ten numbered wooden pots and 55 vegetables in five varieties. Children match quantities to numbers while developing fine motor skills through the planting motion. Mathematics blooms naturally through purposeful play.',
    featured: false
  },
  'little-explorers-map': {
    id: 'little-explorers-map',
    name: "Little Explorer's Map",
    price: 35,
    salePrice: null,
    collection: 'Wonder & Learn',
    collectionSlug: 'wonder-learn',
    image: 'images/little-explorers-map.jpg',
    shortDescription: 'A fabric world map with wooden landmark pieces and simple geography cards.',
    longDescription: 'The world unfolds on this soft, quilted map. Twenty wooden landmark pieces—from the Eiffel Tower to Mount Fuji—find their homes across continents, while illustrated cards share simple facts about each place. Roll it up and take your travels anywhere.',
    featured: false
  },
  'seasons-learning-board': {
    id: 'seasons-learning-board',
    name: 'Seasons Learning Board',
    price: 52,
    salePrice: null,
    collection: 'Wonder & Learn',
    collectionSlug: 'wonder-learn',
    image: 'images/seasons-learning-board.jpg',
    shortDescription: 'An interactive wooden board teaching seasons, weather, and daily rhythms.',
    longDescription: 'Each morning brings a moment of connection with this beautiful learning board. Moveable wooden pieces track the season, weather, day of week, and daily rhythm. Hand-painted illustrations celebrate the changing year while establishing comforting routines. Hooks and pegs keep everything in place.',
    featured: false
  }
};

const Collections = {
  'heirloom-wooden': {
    id: 'heirloom-wooden',
    name: 'Heirloom Wooden',
    description: 'Timeless wooden toys crafted to be treasured and passed down through generations. Each piece celebrates the beauty of natural materials and the joy of simple, open-ended play.',
    image: 'images/collection-heirloom-wooden.jpg',
    shortDescription: 'Timeless toys crafted to be treasured for generations',
    products: ['heritage-block-set', 'woodland-animal-family', 'classic-stacking-rainbow', 'timeless-train-set', 'handcrafted-memory-puzzle']
  },
  'imagination-builders': {
    id: 'imagination-builders',
    name: 'Imagination Builders',
    description: 'Construction sets that transform simple pieces into extraordinary creations. Perfect for budding architects, engineers, and dreamers who see possibility in every plank and block.',
    image: 'images/collection-imagination-builders.jpg',
    shortDescription: 'Construction sets for aspiring architects and dreamers',
    products: ['architects-dream-set', 'natural-building-planks', 'create-connect-blocks', 'little-engineer-kit', 'magnetic-wonder-tiles']
  },
  'storybook-friends': {
    id: 'storybook-friends',
    name: 'Storybook Friends',
    description: 'Soft companions crafted from organic materials, ready for a lifetime of love. Each friend is designed to comfort, inspire stories, and become a treasured companion through all of childhood\'s adventures.',
    image: 'images/collection-storybook-friends.jpg',
    shortDescription: 'Soft companions ready for a lifetime of love',
    products: ['oliver-gentle-bear', 'luna-comfort-bunny', 'sebastian-wise-owl', 'rosie-kind-fox', 'theodore-brave-lion']
  },
  'wonder-learn': {
    id: 'wonder-learn',
    name: 'Wonder & Learn',
    description: 'Thoughtful tools that nurture curiosity and celebrate the joy of discovery. Learning happens naturally here—through exploration, hands-on experience, and the simple pleasure of figuring things out.',
    image: 'images/collection-wonder-learn.jpg',
    shortDescription: 'Thoughtful tools that nurture curiosity and discovery',
    products: ['nature-discovery-kit', 'first-words-letters', 'counting-garden-set', 'little-explorers-map', 'seasons-learning-board']
  }
};

// ========================================
// Product Helper Functions
// ========================================

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Object|null} Product object or null
 */
function getProduct(id) {
  return Products[id] || null;
}

/**
 * Get collection by ID
 * @param {string} id - Collection ID
 * @returns {Object|null} Collection object or null
 */
function getCollection(id) {
  return Collections[id] || null;
}

/**
 * Get all products in a collection
 * @param {string} collectionId - Collection ID
 * @returns {Array} Array of product objects
 */
function getCollectionProducts(collectionId) {
  const collection = Collections[collectionId];
  if (!collection) return [];
  return collection.products.map(id => Products[id]).filter(Boolean);
}

/**
 * Get all products
 * @returns {Array} Array of all product objects
 */
function getAllProducts() {
  return Object.values(Products);
}

/**
 * Get all collections
 * @returns {Array} Array of all collection objects
 */
function getAllCollections() {
  return Object.values(Collections);
}

/**
 * Calculate percentage off for sale items
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {number} Percentage off (rounded)
 */
function calculatePercentOff(originalPrice, salePrice) {
  if (!salePrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Check if a product is on sale
 * @param {Object} product - Product object
 * @returns {boolean} True if product is on sale
 */
function isOnSale(product) {
  return product.salePrice && product.salePrice < product.price;
}

/**
 * Get effective price for a product (sale price if available, otherwise regular price)
 * @param {Object} product - Product object
 * @returns {number} Effective price
 */
function getEffectivePrice(product) {
  return isOnSale(product) ? product.salePrice : product.price;
}

/**
 * Render price HTML for a product
 * @param {Object} product - Product object
 * @param {boolean} showSaleLabel - Whether to show "Sale" label
 * @returns {string} HTML string for price display
 */
function renderPriceHTML(product, showSaleLabel = true) {
  if (isOnSale(product)) {
    const percentOff = calculatePercentOff(product.price, product.salePrice);
    return `
      <span class="price-wrapper price-on-sale">
        ${showSaleLabel ? '<span class="sale-badge">Sale</span>' : ''}
        <span class="price-original">$${product.price}</span>
        <span class="price-sale">$${product.salePrice}</span>
        <span class="price-percent-off">${percentOff}% off</span>
      </span>
    `;
  }
  return `<span class="price-wrapper">$${product.price}</span>`;
}

/**
 * Render a product card HTML
 * @param {Object} product - Product object
 * @param {string} basePath - Base path for links and images
 * @returns {string} HTML string for product card
 */
function renderProductCard(product, basePath = '') {
  const priceHTML = isOnSale(product)
    ? `<p class="product-card-price price-on-sale">
        <span class="price-original">$${product.price}</span>
        <span class="price-sale">$${product.salePrice}</span>
        <span class="sale-badge">Sale</span>
       </p>`
    : `<p class="product-card-price">$${product.price}</p>`;

  return `
    <a href="${basePath}products/${product.id}.html" class="product-card${isOnSale(product) ? ' product-on-sale' : ''}">
      <div class="product-card-image">
        <img src="${basePath}${product.image}" alt="${product.name}">
      </div>
      <div class="product-card-info">
        <h3 class="product-card-name">${product.name}</h3>
        ${priceHTML}
      </div>
    </a>
  `;
}

/**
 * Render products grid for a collection
 * @param {string} collectionId - Collection ID
 * @param {string} containerId - DOM element ID to render into
 * @param {string} basePath - Base path for links and images
 */
function renderCollectionProducts(collectionId, containerId, basePath = '') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const products = getCollectionProducts(collectionId);
  container.innerHTML = products.map(p => renderProductCard(p, basePath)).join('');
}

/**
 * Load products - kept for compatibility but data is now inline
 * @param {string} basePath - Base path (ignored, kept for API compatibility)
 * @returns {Promise} Resolves immediately
 */
function loadProductData(basePath = '') {
  return Promise.resolve();
}
