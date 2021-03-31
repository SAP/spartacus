import { isNonNullable, isNotUndefined } from './type-guards';

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

  describe('isNonNullable', () => {
    it('should return false for "undefined" value', () => {
      expect(isNonNullable(undefined)).toBeFalse();
    });

    it('should return false for "null" value', () => {
      expect(isNonNullable(null)).toBeFalse();
    });

    it('should return true for falsy string', () => {
      expect(isNonNullable('')).toBeTrue();
    });

    it('should return true for falsy number', () => {
      expect(isNonNullable(0)).toBeTrue();
    });

    it('should return true for objects', () => {
      expect(isNonNullable({ property: 'value' })).toBeTrue();
    });

    it('should return true for false value', () => {
      expect(isNonNullable(false)).toBeTrue();
    });
  });
});
