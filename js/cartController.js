export function addItemToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // check if the item is already in the cart
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.name == item.name
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }

  // save the updated cart item to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
}

export function calculateTotalPrice(cartItems, hasMembership = false) {
  let total = 0;
  let discountAmount = 0;
  let discountMessage = "";
  const discountItems = ["Orange Set", "Pink Set", "Green Set"];

  for (const item of cartItems) {
    total += item.price * item.quantity;

    // check if the item qualifies for a discount
    if (discountItems.includes(item.name) && item.quantity >= 2) {
      discountAmount = total * 0.05;
    }
  }

  // apply 5% discount if eligible
  if (discountAmount > 0) {
    total -= discountAmount;
    discountMessage = `You received a ฿${discountAmount.toFixed(2)} discount!`;
  }

  // apply 10% membership discount
  if (hasMembership) {
    const memberDiscount = total * 0.1;
    total -= memberDiscount;
    discountMessage += ` And as a member, you got an additional ฿${memberDiscount.toFixed(
      2
    )} off!`;
  }

  return { grandTotal: total.toFixed(2), discountMessage };
}

export function clearLocalStorage() {
  localStorage.removeItem("cart");
}
