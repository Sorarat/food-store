export function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items-container");
  container.innerHTML = "";

  if (cartItems.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  cartItems.forEach((item) => {
    const cartItemHTML = `
      <div class="w-48 h-80 bg-gray-50 shadow-sm dark:bg-gray-800 dark:border-gray-700 relative">
        <a href="#">
          <img class="object-cover w-full h-44" src="${
            item.pic || "assets/redFood.jpg"
          }" alt="${item.name}" />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${
              item.name
            }</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">฿${
            item.price
          }</p>
        </div>
      </div>
    `;
    container.innerHTML += cartItemHTML;
  });
}
