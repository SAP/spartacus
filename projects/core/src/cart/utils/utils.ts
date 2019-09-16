import { Cart } from "../../model/cart.model";

export function isActiveCart(cart: Cart) {
  return typeof cart['saveTime'] === "undefined";
}

export function getCartIdByUserId(cart: Cart, userId: string) {
  if (userId === 'anonymous') {
    return cart.guid;
  }
  return cart.code;
}
