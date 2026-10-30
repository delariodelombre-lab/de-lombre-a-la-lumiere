// Gestion du panier - localStorage
// Mode démonstration : les quantités sont limitées à 1 par produit (produits numériques)

const CART_KEY = 'dol_cart_v1';

function getCart() {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) {
    alert('Produit introuvable');
    return false;
  }

  let cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    // Pour les produits numériques, on limite à 1 exemplaire
    alert('Ce guide est déjà dans votre panier.');
    return false;
  }

  cart.push({
    id: product.id,
    title: product.shortTitle || product.title,
    price: product.price,
    emoji: product.coverEmoji,
    qty: 1
  });

  saveCart(cart);
  return true;
}

function removeFromCart(productId) {
  let cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartCount() {
  const countEls = document.querySelectorAll('.cart-count');
  const count = getCartCount();
  countEls.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// Appel au chargement
document.addEventListener('DOMContentLoaded', updateCartCount);