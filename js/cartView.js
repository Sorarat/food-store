import { calculateTotalPrice } from "./cartController.js";

function createTableHeader() {
  return `
    <div class="flex p-4 bg-white gap-x-6 mb-5">
      <div class="w-2/5 text-md md:text-lg font-semibold text-gray-900">Item</div>
      <div class="w-1/5 text-md md:text-lg font-semibold text-gray-900">Price</div>
      <div class="w-1/5 text-md md:text-lg font-semibold text-gray-900">Quantity</div>
      <div class="w-1/5 text-md md:text-lg font-semibold text-gray-900">Total</div>
    </div> `;
}

function createCartHTML(item) {
  const itemTotal = item.price * item.quantity;

  return `
      <div class="flex p-4 bg-white gap-x-6 mb-4">
        <div class="w-2/5 text-gray-900 ">${item.name}</div>
        <div class="w-1/5 text-gray-900">฿${item.price}</div>
        <div class="w-1/5 text-gray-900">x${item.quantity}</div>
        <div class="w-1/5 font-bold text-gray-900">
          ฿${itemTotal}
        </div>
      </div>
    `;
}

function createDiscountRow(discountMessage) {
  return `
  <div class="flex p-4 bg-white mb-3 ">
    <div class="w-full text-center font-bold text-gray-700">
      ${discountMessage}
    </div>
  </div> `;
}

function createTotalPriceRow(grandTotal) {
  return `
  <div class="flex p-4 bg-white">
    <div class="w-2/5"></div>
    <div class="w-1/5"></div>
    <div class="w-1/5 font-bold text-gray-700">Total</div>
    <div class="w-1/5 font-bold text-gray-700">฿${grandTotal}</div>
  </div> `;
}

function createMemberDiscountRadioButton() {
  return `
    <div class="flex items-center gap-4 p-4">
      <p class="text-lg text-gray-700 mr-4">Do you have a membership card?</p>
      <div>
        <input type="radio" id="member-yes" name="membership" value="yes" class="w-5 h-5" />
        <label for="member-yes" class="text-gray-700 text-lg">Yes</label>
        
        <input type="radio" id="member-no" name="membership" value="no" class="w-5 h-5 ml-5" />
        <label for="member-no" class="text-gray-700 text-lg">No</label>
      </div>
    </div>
  `;
}

function createCheckoutButton() {
  return ` 
  <div class="flex justify-center p-4 mt-4">
    <button id="checkoutButton" class="bg-customGreen text-white font-medium px-10 py-2 rounded-md hover:bg-customDarkGreen transition ease-in-out duration-300">
      Checkout
    </button>
  </div> `;
}

function createCheckoutModal() {
  return `
  <div id="checkoutModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center hidden">
    <div class="bg-white p-10 rounded-md shadow-2xl max-w-md w-full mx-4 modal-entrance">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-green-600 mb-4">🎉 Purchase Successful!</h2>
        <p class="text-gray-600">Your items have been successfully purchased. Thank you for shopping with us!</p>
      </div>
      <div class="mt-6 flex justify-center">
        <button id="closeModalButton" class="px-6 py-2 bg-customGreen hover:bg-customDarkGreen text-white rounded-lg transition duration-300">
          Close
        </button>
      </div>
    </div>
  </div>`;
}
export function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items-container");
  container.innerHTML = ""; // Clear the container before rendering new items

  if (cartItems.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  // Add header row
  container.innerHTML = createTableHeader();

  // Add cart items
  cartItems.forEach((item) => {
    container.innerHTML += createCartHTML(item);
  });

  // add membership radio buttons
  container.innerHTML += createMemberDiscountRadioButton();

  // Add placeholders for discount message and total price
  container.innerHTML += `<div id="discount-message"></div>`;
  container.innerHTML += `<div id="total-price-row"></div>`;

  // Function to update the price based on membership selection
  const updateTotalPrice = () => {
    const hasMembership = document.getElementById("member-yes").checked;
    const { grandTotal, discountMessage } = calculateTotalPrice(
      cartItems,
      hasMembership
    );

    document.getElementById("total-price-row").innerHTML =
      createTotalPriceRow(grandTotal);
    document.getElementById("discount-message").innerHTML = discountMessage
      ? createDiscountRow(discountMessage)
      : "";
  };

  // Add event listeners to the radio buttons
  setTimeout(() => {
    document.querySelectorAll('input[name="membership"]').forEach((radio) => {
      radio.addEventListener("change", updateTotalPrice);
    });
  }, 0);

  // add checkout button
  container.innerHTML += createCheckoutButton();

  // create the modal
  container.innerHTML += createCheckoutModal();

  // Add event listener to show modal when "Checkout" button is clicked
  document.getElementById("checkoutButton").addEventListener("click", () => {
    document.getElementById("checkoutModal").classList.remove("hidden");
  });

  // Add event listener to close modal when "Close" button is clicked
  document.getElementById("closeModalButton").addEventListener("click", () => {
    document.getElementById("checkoutModal").classList.add("hidden");
  });
}
