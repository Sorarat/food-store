import { getCartItems, saveCartItems, clearCart } from "./cartModel.js";

export function fetchCartItems() {
  return getCartItems();
}

export function clearCartItems() {
  clearCart();
}

export function addItemToCart(item) {
  let cart = getCartItems();

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
  saveCartItems(cart);
}

export function calculateTotalPrice(cartItems, hasMembership = false) {
  let total = 0;
  let discountAmount = 0;
  let discountMessage = "";
  const discountItems = ["Orange Set", "Pink Set", "Green Set"];
  let discountSubtotal = 0;

  for (const item of cartItems) {
    total += item.price * item.quantity;

    // check if the item qualifies for a discount
    if (discountItems.includes(item.name) && item.quantity >= 2) {
      discountSubtotal += item.price * item.quantity;
    }
  }

  // apply 5% discount if eligible
  if (discountSubtotal > 0) {
    discountAmount = discountSubtotal * 0.05;
    total -= discountAmount;
    discountMessage = `You received a ฿${discountAmount.toFixed(
      2
    )} discount! (5% off on eligible items).`;
  }

  // apply 10% membership discount
  if (hasMembership) {
    const memberDiscount = total * 0.1;
    total -= memberDiscount;
    discountMessage += ` As a member, you got an additional ฿${memberDiscount.toFixed(
      2
    )} off! (10% off for members)`;
  }

  return { grandTotal: total.toFixed(2), discountMessage };
}
