import { Cart } from '../../model/cart.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';

export function getCartIdByUserId(cart: Cart, userId: string): string {
  if (userId === OCC_USER_ID_ANONYMOUS) {
    return cart.guid;
  }
  return cart.code;
}

/**
 * What is a temporary cart?
 * - frontend only cart entity!
 * - can be identified in store by `temp-` prefix with some unique id (multiple carts can be created at the same time eg. active cart, wishlist)
 *
 * Why we need temporary carts?
 * - to have information about cart creation process (meta flags: loading, error - for showing loader, error message)
 * - to know if there is currently a cart creation process in progress (eg. so, we don't create more than one active cart at the same time)
 * - cart identifiers are created in the backend, so those are only known after cart is created
 *
 * Temporary cart lifecycle
 * - create cart method invoked
 * - new `temp-${uuid}` cart is created with `loading=true` state
 * - backend returns created cart
 * - normal cart entity is saved under correct id (eg. for logged user under cart `code` key)
 * - temporary cart value is set to backend response (anyone observing this cart can read code/guid from it and switch selector to normal cart)
 * - in next tick temporary cart is removed
 */
export function isTempCartId(cartId: string): boolean {
  return cartId.startsWith('temp-');
}
