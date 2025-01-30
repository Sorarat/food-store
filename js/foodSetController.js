import { getMenuItems } from "./foodSetModel.js";
import { renderMenu } from "./foodSetView.js";

// Function to initialize the page
function initialize() {
  const menuItems = getMenuItems(); // Get the food items
  renderMenu(menuItems); // Render the menu items
}

export { initialize };
