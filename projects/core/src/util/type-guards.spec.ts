import { isNotNull, isNotUndefined } from './type-guards';

describe('Type guards', () => {
  describe('isNotUndefined', () => {
    it('should return false for "undefined" value', () => {
      expect(isNotUndefined(undefined)).toBeFalse();
    });

    it('should return true for "null" value', () => {
      expect(isNotUndefined(null)).toBeTrue();
    });

    it('should return true for falsy string', () => {
      expect(isNotUndefined('')).toBeTrue();
    });

    it('should return true for falsy number', () => {
      expect(isNotUndefined(0)).toBeTrue();
    });

    it('should return true for objects', () => {
      expect(isNotUndefined({ property: 'value' })).toBeTrue();
    });

    it('should return true for false value', () => {
      expect(isNotUndefined(false)).toBeTrue();
    });
  });

  describe('isNotNull', () => {
    it('should return false for "undefined" value', () => {
      expect(isNotNull(undefined)).toBeFalse();
    });

    it('should return false for "null" value', () => {
      expect(isNotNull(null)).toBeFalse();
    });

    it('should return true for falsy string', () => {
      expect(isNotNull('')).toBeTrue();
    });

    it('should return true for falsy number', () => {
      expect(isNotNull(0)).toBeTrue();
    });

    it('should return true for objects', () => {
      expect(isNotNull({ property: 'value' })).toBeTrue();
    });

    it('should return true for false value', () => {
      expect(isNotNull(false)).toBeTrue();
    });
  });
});
