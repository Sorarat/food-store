import { initializeFoodSets } from "../js/foodSetController.js";
import { getFoodSetItems } from "../js/foodSetModel.js";
import { renderFoodSet } from "../js/foodSetView.js";

// Mock the necessary functions
jest.mock("../js/foodSetModel.js", () => ({
  getFoodSetItems: jest.fn(),
}));

jest.mock("../js/foodSetView.js", () => ({
  renderFoodSet: jest.fn(),
}));

describe("Food Set Controller", () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    getFoodSetItems.mockReset();
    renderFoodSet.mockReset();
  });

  it("should call getFoodSetItems and renderFoodSet with correct data", () => {
    const mockMenuItems = [
      { name: "Red Set", price: 50, pic: "assets/redFood.jpg" },
      { name: "Green Set", price: 40, pic: "assets/greenFood.jpg" },
    ];
    getFoodSetItems.mockReturnValue(mockMenuItems);

    initializeFoodSets();

    expect(getFoodSetItems).toHaveBeenCalledTimes(1);

    expect(renderFoodSet).toHaveBeenCalledWith(mockMenuItems);
  });

  it("should render correct number of food items", () => {
    const mockMenuItems = [
      { name: "Red Set", price: 50, pic: "assets/redFood.jpg" },
      { name: "Green Set", price: 40, pic: "assets/greenFood.jpg" },
      { name: "Blue Set", price: 30, pic: "assets/blueFood.jpg" },
    ];
    getFoodSetItems.mockReturnValue(mockMenuItems);

    initializeFoodSets();

    // check if renderFoodSet was called with the correct number of items
    expect(renderFoodSet).toHaveBeenCalledWith(mockMenuItems);
    expect(renderFoodSet.mock.calls[0][0].length).toBe(3); // Should have 3 items
  });

  it("should handle empty menu items correctly", () => {
    const mockMenuItems = [];
    getFoodSetItems.mockReturnValue(mockMenuItems);

    initializeFoodSets();

    //check if renderFoodSet was called with an empty array
    expect(renderFoodSet).toHaveBeenCalledWith(mockMenuItems);
  });
});
