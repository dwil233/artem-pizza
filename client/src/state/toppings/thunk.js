import { toppingsError, toppingsRequest, toppingsSuccess } from "./actions";
import { getIngredientTypes } from "../../shared/products.api";

export const fetchToppings = () => async (dispatch) => {
  dispatch(toppingsRequest());
  try {
    await getIngredientTypes().then((types) => {
      const typesWithCorrectPrice = types.map((type) =>
        type.map((item) => ({
          ...item,
          price: Number(item.price),
        }))
      );
      dispatch(toppingsSuccess(typesWithCorrectPrice));
    });
  } catch (e) {
    dispatch(toppingsError(e.message));
  }
};
