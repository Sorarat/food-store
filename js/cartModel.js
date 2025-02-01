export function getCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
}

export function saveCartItems(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}
