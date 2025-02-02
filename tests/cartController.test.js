import {
  fetchCartItems,
  addItemToCart,
  clearCartItems,
  calculateTotalPrice,
} from "../js/cartController.js";
import { clearCart, getCartItems, saveCartItems } from "../js/cartModel.js";

jest.mock("../js/cartModel.js", () => ({
  getCartItems: jest.fn(),
  saveCartItems: jest.fn(),
  clearCart: jest.fn(),
}));

describe("Testing Cart Controller functions", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("should fetch the cart items", () => {
    const mockCart = [
      { name: "Orange Set", price: 120, quantity: 1 },
      { name: "Green Set", price: 40, quantity: 2 },
    ];
    getCartItems.mockReturnValue(mockCart);

    const result = fetchCartItems();
    expect(result).toEqual(mockCart);
    expect(getCartItems).toHaveBeenCalled();
  });

  it("should return an empty array when no cart items exist", () => {
    getCartItems.mockReturnValue([]);
    const result = fetchCartItems();
    expect(result).toEqual([]);
    expect(getCartItems).toHaveBeenCalled();
  });

  it("should add item to cart", () => {
    const mockCart = [
      { name: "Pink Set", quantity: 3, price: 80 },
      { name: "Red Set", quantity: 2, price: 50 },
    ];
    const newItem = { name: "Orange Set", price: 120 };

    getCartItems.mockReturnValue(mockCart);

    addItemToCart(newItem);

    expect(saveCartItems).toHaveBeenCalledWith([
      { name: "Pink Set", quantity: 3, price: 80 },
      { name: "Red Set", quantity: 2, price: 50 },
      { name: "Orange Set", price: 120, quantity: 1 }, // New item added
    ]);
  });
  it("should increase quantity if item already exists in cart", () => {
    const mockCart = [
      { name: "Pink Set", quantity: 3, price: 80 },
      { name: "Orange Set", quantity: 1, price: 120 },
    ];
    const newItem = { name: "Orange Set", price: 120 };

    getCartItems.mockReturnValue(mockCart);

    addItemToCart(newItem);

    expect(saveCartItems).toHaveBeenCalledWith([
      { name: "Pink Set", quantity: 3, price: 80 },
      { name: "Orange Set", quantity: 2, price: 120 },
    ]);
  });

  it("should clear the cart items", () => {
    clearCartItems();

    expect(clearCart).toHaveBeenCalled();
  });

  // test cases for calculateTotalPrice

  it("should not apply any discount for non-eligible items", () => {
    const mockCart = [
      { name: "Red Set", price: 50, quantity: 2 },
      { name: "Blue Set", price: 30, quantity: 1 },
    ];

    const result = calculateTotalPrice(mockCart);
    expect(result.grandTotal).toBe("130.00");
    expect(result.discountMessage).toBe("");
  });

  it("should apply 5% discount for Orange, Pink or Green sets when quantity >= 2 and for non-membership users", () => {
    const mockCart = [
      { name: "Orange Set", price: 120, quantity: 2 },
      { name: "Pink Set", price: 80, quantity: 1 },
    ];
    const result = calculateTotalPrice(mockCart);
    expect(result.grandTotal).toBe("308.00");
    expect(result.discountMessage).toBe(
      "You received a ฿12.00 discount! (5% off on eligible items)"
    );
  });

  it("should apply only the 10% membership discount when no items qualify for the 5% discount", () => {
    const mockCart = [
      { name: "Purple Set", price: 90, quantity: 2 },
      { name: "Yellow Set", price: 50, quantity: 1 },
    ];

    const result = calculateTotalPrice(mockCart, true);

    expect(result.grandTotal).toBe("207.00");
    expect(result.discountMessage).toBe(
      " As a member, you got an additional ฿23.00 off! (10% off for members)"
    );
  });

  it("should apply 5% discount for eligible items and 10% membership discount", () => {
    const mockCart = [
      { name: "Orange Set", price: 120, quantity: 4 },
      { name: "Yellow Set", price: 50, quantity: 2 },
    ];

    const result = calculateTotalPrice(mockCart, true);
    expect(result.grandTotal).toBe("500.40");
    expect(result.discountMessage).toBe(
      "You received a ฿24.00 discount! (5% off on eligible items) As a member, you got an additional ฿55.60 off! (10% off for members)"
    );
  });

  it("should not apply discount for Orange Set with quantity less than 2", () => {
    const mockCart = [
      { name: "Orange Set", price: 120, quantity: 1 },
      { name: "Red Set", price: 50, quantity: 2 },
    ];
    const result = calculateTotalPrice(mockCart);
    expect(result.grandTotal).toBe("220.00");
    expect(result.discountMessage).toBe("");
  });
});
