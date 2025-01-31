import { getFoodSetItems } from "./foodSetModel.js";
import { renderFoodSet } from "./foodSetView.js";

// Function to initialize the page
function initialize() {
  const menuItems = getFoodSetItems();
  renderFoodSet(menuItems);
}

export { initialize };
