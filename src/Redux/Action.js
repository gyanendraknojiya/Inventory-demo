import { SET_CURRENT_USER, SET_CART_ITEMS, TOGGLE_CART } from "./ActionType";
export const setCurrentUser = (data) => {
  return { type: SET_CURRENT_USER, payload: data };
};
export const toggleCart = (data) => {
  return { type: TOGGLE_CART, payload: data };
};

export const setCartItems = (data) => {
  return { type: SET_CART_ITEMS, payload: data };
};
