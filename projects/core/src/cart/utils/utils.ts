import { Cart } from '../../model/cart.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';

export function getCartIdByUserId(cart: Cart, userId: string) {
  if (userId === OCC_USER_ID_ANONYMOUS) {
    return cart.guid;
  }
  return cart.code;
}
