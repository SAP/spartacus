import { CartUtilService } from './cart-util.service';

describe('CartUtilService', () => {
  describe('isCreated', () => {
    it('should return false, when argument is empty object', () => {
      expect(CartUtilService.isCreated({})).toBe(false);
    });

    it('should return true, when argument is an non-empty object', () => {
      expect(CartUtilService.isCreated({ guid: 'hash' })).toBe(true);
    });

    it('should return false, when guid is not set', () => {
      expect(CartUtilService.isCreated({ totalItems: 0 })).toBe(false);
      expect(CartUtilService.isCreated({ totalItems: 99 })).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true, when argument is an empty object', () => {
      expect(CartUtilService.isEmpty({})).toBe(true);
    });

    it('should return true, when totalItems property of argument is 0', () => {
      expect(CartUtilService.isEmpty({ totalItems: 0 })).toBe(true);
    });

    it('should return false, when totalItems property of argument is greater than 0', () => {
      expect(CartUtilService.isEmpty({ totalItems: 1 })).toBe(false);
      expect(CartUtilService.isEmpty({ totalItems: 99 })).toBe(false);
    });
  });
});
