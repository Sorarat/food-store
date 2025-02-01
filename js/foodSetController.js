import { getFoodSetItems } from "./foodSetModel.js";
import { renderFoodSet } from "./foodSetView.js";

// Function to initialize the page
export function initializeFoodSets() {
  const menuItems = getFoodSetItems();
  renderFoodSet(menuItems);
}
