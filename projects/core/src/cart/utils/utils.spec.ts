import { Cart } from '../../model/cart.model';
import {
  getCartIdByUserId,
  getWishlistName,
  isCartIdGuid,
  isCartNotFoundError,
  isSelectiveCart,
  isTempCartId,
} from './utils';
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

  describe('getWishlistName', () => {
    it('should return wishlist name', () => {
      expect(getWishlistName('Id123')).toEqual(`wishlistId123`);
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

  describe('isSelectiveCart', () => {
    it('should return true for cartId starting with "selectivecart"', () => {
      expect(isSelectiveCart('selectivecart-electronicsspa-5435435')).toEqual(
        true
      );
    });

    it('should return false for normal cart code', () => {
      expect(isSelectiveCart('54374645')).toEqual(false);
    });
  });

  describe('isCartNotFoundError', () => {
    it('should return true when it is normal cart notFound error', () => {
      expect(
        isCartNotFoundError({
          reason: 'notFound',
          subject: '123456',
          subjectType: 'cart',
        })
      ).toEqual(true);
    });

    it('should return false for different entities', () => {
      expect(
        isCartNotFoundError({
          reason: 'notFound',
          subject: '123456',
          subjectType: 'product',
        })
      ).toEqual(false);
    });

    it('should return false on different error reason', () => {
      expect(
        isCartNotFoundError({
          reason: 'incorrectValue',
          subject: '123456',
          subjectType: 'cart',
        })
      ).toEqual(false);
    });

    it('should return false for selective cart notFound error', () => {
      expect(
        isCartNotFoundError({
          reason: 'notFound',
          subject: 'selectivecart-electronicsspa-123456',
          subjectType: 'cart',
        })
      ).toEqual(false);
    });
  });

  describe('isCartIdGuid', () => {
    it('should return true for guid string format', () => {
      expect(isCartIdGuid('199016e0-2822-45f1-b6cc-fd6b55444b1d')).toEqual(
        true
      );
    });

    it('should return false for random cart code', () => {
      expect(isCartIdGuid('199016e0-2822-45f1-b6cc-fd6b55444b1')).toEqual(
        false
      );
    });

    it('should return false for selective cart code', () => {
      expect(isCartIdGuid('selectivecart-electronicsspa-123456')).toEqual(
        false
      );
    });

    it('should return false for temp cart code', () => {
      expect(isCartIdGuid('temp-test')).toEqual(false);
    });

    it('should return false for wishlist code', () => {
      expect(isCartIdGuid('wishlistId123')).toEqual(false);
    });

    it('should return false for logged user cart code', () => {
      expect(isCartIdGuid('00001117')).toEqual(false);
    });
  });
});
