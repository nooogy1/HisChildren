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

// Product and Collection data store
let Products = {};
let Collections = {};
let dataLoaded = false;

/**
 * Load products from JSON file
 * @param {string} basePath - Base path for the data folder
 * @returns {Promise} Promise that resolves when data is loaded
 */
async function loadProductData(basePath = '') {
  if (dataLoaded) return Promise.resolve();

  try {
    const response = await fetch(basePath + 'data/products.json');
    const data = await response.json();

    // Convert products array to object keyed by ID
    data.products.forEach(product => {
      Products[product.id] = product;
    });

    // Convert collections array to object keyed by ID
    data.collections.forEach(collection => {
      Collections[collection.id] = {
        ...collection,
        products: data.products
          .filter(p => p.collectionSlug === collection.id)
          .map(p => p.id)
      };
    });

    dataLoaded = true;
  } catch (e) {
    console.error('Error loading product data:', e);
    // Fall back to inline data if fetch fails
    initializeFallbackData();
  }
}

/**
 * Initialize fallback data if JSON load fails
 */
function initializeFallbackData() {
  Products = {
    'heritage-block-set': {
      id: 'heritage-block-set',
      name: 'The Heritage Block Set',
      price: 68,
      salePrice: null,
      collection: 'Heirloom Wooden',
      collectionSlug: 'heirloom-wooden',
      image: 'images/heritage-block-set.jpg',
      shortDescription: 'Hand-sanded maple blocks in timeless shapes, crafted to be passed down through generations.',
      longDescription: 'Each block in this 24-piece set is cut from sustainably harvested maple and finished with natural beeswax.'
    }
    // Minimal fallback - other products would be added as needed
  };

  Collections = {
    'heirloom-wooden': {
      id: 'heirloom-wooden',
      name: 'Heirloom Wooden',
      description: 'Timeless wooden toys crafted to be treasured and passed down through generations.',
      image: 'images/collection-heirloom-wooden.jpg',
      products: ['heritage-block-set']
    }
  };

  dataLoaded = true;
}

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
