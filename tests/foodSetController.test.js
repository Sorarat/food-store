import { initializeFoodSets } from "../js/foodSetController.js";
import * as foodSetModel from "../js/foodSetModel.js";
import * as foodSetView from "../js/foodSetView.js";

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
    foodSetModel.getFoodSetItems.mockReset();
    foodSetView.renderFoodSet.mockReset();
  });

  it("should call getFoodSetItems and renderFoodSet with correct data", () => {
    const mockMenuItems = [
      { name: "Red Set", price: 50, pic: "assets/redFood.jpg" },
      { name: "Green Set", price: 40, pic: "assets/greenFood.jpg" },
    ];
    foodSetModel.getFoodSetItems.mockReturnValue(mockMenuItems);

    initializeFoodSets();

    expect(foodSetModel.getFoodSetItems).toHaveBeenCalledTimes(1);

    expect(foodSetView.renderFoodSet).toHaveBeenCalledWith(mockMenuItems);
  });

  it("should render correct number of food items", () => {
    const mockMenuItems = [
      { name: "Red Set", price: 50, pic: "assets/redFood.jpg" },
      { name: "Green Set", price: 40, pic: "assets/greenFood.jpg" },
      { name: "Blue Set", price: 30, pic: "assets/blueFood.jpg" },
    ];
    foodSetModel.getFoodSetItems.mockReturnValue(mockMenuItems);

    initializeFoodSets();

    // check if renderFoodSet was called with the correct number of items
    expect(foodSetView.renderFoodSet).toHaveBeenCalledWith(mockMenuItems);
    expect(foodSetView.renderFoodSet.mock.calls[0][0].length).toBe(3); // Should have 3 items
  });

  it("should handle empty menu items correctly", () => {
    const mockMenuItems = [];
    foodSetModel.getFoodSetItems.mockReturnValue(mockMenuItems);

    initializeFoodSets();

    //check if renderFoodSet was called with an empty array
    expect(foodSetView.renderFoodSet).toHaveBeenCalledWith(mockMenuItems);
  });
});
