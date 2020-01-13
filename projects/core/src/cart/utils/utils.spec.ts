import { getCartIdByUserId } from './utils';
import { Cart } from '../../model/cart.model';
import { OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT } from '../../occ';

describe('Cart utils', () => {
  describe('getCartIdByUserId', () => {
    const cart: Cart = {
      code: 'code',
      guid: 'guid',
    };

    it('should return guid for anonymous user', () => {
      expect(getCartIdByUserId(cart, OCC_USER_ID_ANONYMOUS)).toEqual(cart.guid);
    });

    it('should return cart code for non anonymous user', () => {
      expect(getCartIdByUserId(cart, OCC_USER_ID_CURRENT)).toEqual(cart.code);
    });
  });
});
