import { Cart } from "../../model/cart.model";

export function isActiveCart(cart: Cart) {
  return typeof cart['saveTime'] === "undefined";
}

