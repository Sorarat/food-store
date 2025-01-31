import { calculateTotalPrice } from "./cartController.js";

function createTableHeader() {
  return `
    <div class="flex p-4 bg-gray-50 gap-x-6 mb-5">
      <div class="w-2/5 text-lg font-semibold text-gray-900">Item</div>
      <div class="w-1/5 text-lg font-semibold text-gray-900">Price</div>
      <div class="w-1/5 text-lg font-semibold text-gray-900">Quantity</div>
      <div class="w-1/5 text-lg font-semibold text-gray-900">Total</div>
    </div> `;
}

function createCartHTML(item) {
  const itemTotal = item.price * item.quantity;

  return `
      <div class="flex p-4 bg-gray-50 gap-x-6 mb-4">
        <div class="w-2/5 text-gray-900 dark:text-white">${item.name}</div>
        <div class="w-1/5 text-gray-900 dark:text-white">฿${item.price}</div>
        <div class="w-1/5 text-gray-900 dark:text-white">x${item.quantity}</div>
        <div class="w-1/5 font-bold text-gray-900 dark:text-white">
          ฿${itemTotal}
        </div>
      </div>
    `;
}

function createDiscountRow(discountMessage) {
  return `
  <div class="flex p-4 bg-gray-50 mb-3 ">
    <div class="w-full text-center font-bold text-gray-700">
      ${discountMessage}
    </div>
  </div> `;
}

function createTotalPriceRow(grandTotal) {
  return `
  <div class="flex p-4 bg-gray-50">
    <div class="w-2/5"></div>
    <div class="w-1/5"></div>
    <div class="w-1/5 font-bold text-gray-700">Total</div>
    <div class="w-1/5 font-bold text-gray-700">฿${grandTotal}</div>
  </div> `;
}

function createCheckoutButton() {
  return ` 
  <div class="flex justify-center p-4 mt-4">
    <button class="bg-customGreen text-white font-medium px-10 py-2 rounded-md hover:bg-customDarkGreen transition ease-in-out duration-300">
      Checkout
    </button>
  </div> `;
}

export function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items-container");
  container.innerHTML = ""; // Clear the container before rendering new items

  if (cartItems.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  // add header row
  container.innerHTML = createTableHeader();

  // add cart items
  cartItems.forEach((item) => {
    container.innerHTML += createCartHTML(item);
  });

  // calculate total price and discount
  const { grandTotal, discountMessage } = calculateTotalPrice(cartItems);

  if (discountMessage) {
    container.innerHTML += createDiscountRow(discountMessage);
  }

  // add total price row
  container.innerHTML += createTotalPriceRow(grandTotal);

  container.innerHTML += createCheckoutButton();
}
