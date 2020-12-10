import { BARE_PIZZA_PRICE, pizzaSizes } from "./pizzaData";
import { calcPizzaPrice } from "./calcPrice";

describe("calcPrice", () => {
  it("returns BARE_PIZZA_PRICE if no ingredients selected", () => {
    expect(
      calcPizzaPrice({
        pizzaSize: pizzaSizes[0].slug,
        cheeseType: [],
        vegetableType: [],
        meatType: [],
      })
    ).toEqual(BARE_PIZZA_PRICE);
  });

  it("returns 511 if all valuable ingredients selected", () => {
    expect(
      calcPizzaPrice({
        pizzaSize: pizzaSizes[1].slug,
        cheeseType: ["mozarella", "cheddar", "dor_blue"],
        vegetableType: ["tomato", "mushroom", "bell_pepper"],
        meatType: ["bacon", "pepperoni", "ham"],
      })
    ).toEqual(511);
  });
});
