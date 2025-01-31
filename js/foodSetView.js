function renderFoodSet(menuItems) {
  const container = document.getElementById("food-items-container");
  container.innerHTML = ""; // Clear any previous items

  menuItems.forEach((item) => {
    const foodItemHTML = `
      <div class="w-48 h-80 bg-gray-50 shadow-sm dark:bg-gray-800 dark:border-gray-700 relative">
        <a href="#">
          <img class="object-cover w-full h-44" src=${
            item.pic || "assets/redFood.jpg"
          } alt="${item.name}" />
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

          <div class="absolute bottom-0 right-0 w-32">
            <button class="w-full py-2 text-customGreen bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out add-to-cart" 
            data-item='${JSON.stringify({
              name: item.name,
              price: item.price,
            })}'>
            Add to cart
            </button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += foodItemHTML;
  });
}

export { renderFoodSet };
