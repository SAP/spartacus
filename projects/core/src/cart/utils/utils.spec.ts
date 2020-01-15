import { Cart } from '../../model/cart.model';
import { OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT } from '../../occ';
import { getCartIdByUserId, isFreshCartId } from './utils';

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

  describe('isFreshCartId', () => {
    it('should return true for id starting with "fresh-"', () => {
      expect(isFreshCartId('fresh-test')).toEqual(true);
    });

    it('should return false for random cart code', () => {
      expect(isFreshCartId('54374645')).toEqual(false);
    });

    it('should return false for id "fresh"', () => {
      expect(isFreshCartId('fresh')).toEqual(false);
    });
  });
});
