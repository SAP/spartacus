import { Cart } from '../../model/cart.model';
import { USERID_ANONYMOUS } from '../../occ/utils/occ-constants';

export function getCartIdByUserId(cart: Cart, userId: string) {
  if (userId === USERID_ANONYMOUS) {
    return cart.guid;
  }
  return cart.code;
}
