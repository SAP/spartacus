import { Cart } from '../../model/cart.model';
import { OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT } from '../../occ';
import { getCartIdByUserId, isTempCartId } from './utils';

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

  describe('isTempCartId', () => {
    it('should return true for id starting with "temp-"', () => {
      expect(isTempCartId('temp-test')).toEqual(true);
    });

    it('should return false for random cart code', () => {
      expect(isTempCartId('54374645')).toEqual(false);
    });

    it('should return false for id "temp"', () => {
      expect(isTempCartId('temp')).toEqual(false);
    });
  });
});
