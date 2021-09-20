import { isCartNotFoundError, isSelectiveCart } from './utils';

describe('Cart utils', () => {
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
});
