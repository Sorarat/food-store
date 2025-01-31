export function setupAddToCartListeners() {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const item = JSON.parse(event.target.getAttribute("data-item"));

      addItemToCart(item);
    });
  });
}

export function addItemToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Updated Cart:", cart);
}

export function getCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
}
