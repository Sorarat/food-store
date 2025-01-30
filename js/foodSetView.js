// function renderMenu(menuItems) {
//   const container = document.getElementById("food-items-container");
//   container.innerHTML = ""; // Clear any previous items

//   menuItems.forEach((item) => {
//     const foodItemHTML = `
//       <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 m-4 w-40 h-96">
//         <a href="#">
//           <img class="rounded-t-lg" src="assets/food.jpg" alt="${item.name}" />
//         <div class="p-5">
//           <a href="#">
//             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${item.name}</h5>
//           </a>
//           <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">฿${item.price}</p>
//         </div>
//       </div>
//     `;
//     container.innerHTML += foodItemHTML; // Append the food item to the container
//   });
// }

// export { renderMenu };

function renderMenu(menuItems) {
  const container = document.getElementById("food-items-container");
  container.innerHTML = ""; // Clear any previous items

  menuItems.forEach((item) => {
    const foodItemHTML = `
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 m-4 w-64 h-96">
        <a href="#">
          <img class="rounded-t-lg w-full h-48 object-cover" src="assets/food.jpg" alt="${item.name}" />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${item.name}</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">฿${item.price}</p>
        </div>
      </div>
    `;
    container.innerHTML += foodItemHTML; // Append the food item to the container
  });
}

export { renderMenu };
