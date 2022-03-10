import { Cart } from '@spartacus/cart/base/root';
import { OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT } from '@spartacus/core';
import {
  isVoucherError,
  voucherExceededError,
  voucherInvalidError,
  getCartIdByUserId,
  isCartError,
  isCartNotFoundError,
  isEmail,
  isEmpty,
  isJustLoggedIn,
  isSelectiveCart,
  isTempCartId,
} from './utils';

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

    it('should return empty string if cart empty', () => {
      expect(getCartIdByUserId({}, OCC_USER_ID_CURRENT)).toEqual('');
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

  describe('isVoucherError', () => {
    it('should return true when it is normal voucher error', () => {
      expect(
        isVoucherError({
          type: 'VoucherOperationError',
        })
      ).toEqual(true);
    });

    it('should return false for different type', () => {
      expect(
        isVoucherError({
          type: 'CartError',
        })
      ).toEqual(false);
    });
  });

  describe('voucherExceededError', () => {
    it('should return true when it is normal voucher exceeded error', () => {
      expect(
        voucherExceededError({
          message: 'coupon.already.redeemed',
        })
      ).toEqual(true);
    });

    it('should return false for a different error message', () => {
      expect(
        voucherExceededError({
          message: 'coupon.invalid.code.provided',
        })
      ).toEqual(false);
    });
  });

  describe('voucherInvalidError', () => {
    it('should return true when it is normal voucher exceeded error', () => {
      expect(
        voucherInvalidError({
          message: 'coupon.invalid.code.provided',
        })
      ).toEqual(true);
    });

    it('should return false for a different error message', () => {
      expect(
        voucherInvalidError({
          message: 'coupon.expired',
        })
      ).toEqual(false);
    });
  });

  describe('isCartError', () => {
    it('should return true when error type is CartError', () => {
      expect(isCartError({ type: 'CartError' })).toEqual(true);
    });

    it('should return true when error type is CartAddressError', () => {
      expect(isCartError({ type: 'CartAddressError' })).toEqual(true);
    });

    it('should return true when error type is CartEntryError', () => {
      expect(isCartError({ type: 'CartEntryError' })).toEqual(true);
    });

    it('should return true when error type is CartEntryGroupError', () => {
      expect(isCartError({ type: 'CartEntryGroupError' })).toEqual(true);
    });

    it('should return false on different error reason', () => {
      expect(isCartError({ type: 'otherError' })).toEqual(false);
    });
  });

  describe('isEmail', () => {
    it('should return false for empty email', () => {
      let result = isEmail('');
      expect(result).toBe(false);

      result = isEmail(undefined);
      expect(result).toBe(false);
    });

    it('should return false for incorrect email', () => {
      const result = isEmail('test@email');
      expect(result).toBe(false);
    });

    it('should return true for correct email', () => {
      const result = isEmail('test@email.com');
      expect(result).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('should return true for undefined', () => {
      const result = isEmpty(undefined);
      expect(result).toBe(true);
    });

    it('should return true for null', () => {
      const result = isEmpty(null);
      expect(result).toBe(true);
    });

    it('should return true for empty object', () => {
      const result = isEmpty({});
      expect(result).toBe(true);
    });

    it('should return false for correct cart', () => {
      const result = isEmpty({ code: 'testCode' });
      expect(result).toBe(false);
    });
  });

  describe('isJustLoggedIn', () => {
    it('should only return true after user change', () => {
      // set to anonymous value as other tests altered that value
      const result = isJustLoggedIn(OCC_USER_ID_CURRENT, OCC_USER_ID_ANONYMOUS);
      expect(result).toBe(true);
    });

    it('should return false when previous user is identical', () => {
      // simulate that we got current user after initialization
      const result = isJustLoggedIn(OCC_USER_ID_CURRENT, OCC_USER_ID_CURRENT);
      expect(result).toBe(false);
    });

    it('should return false when user not login', () => {
      // simulate that we got current user after initialization
      const result = isJustLoggedIn(OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT);
      expect(result).toBe(false);
    });
  });
});
