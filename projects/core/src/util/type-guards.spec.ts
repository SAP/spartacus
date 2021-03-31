import { isNotNullable, isNotUndefined } from './type-guards';

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

  describe('isNotNullable', () => {
    it('should return false for "undefined" value', () => {
      expect(isNotNullable(undefined)).toBeFalse();
    });

    it('should return false for "null" value', () => {
      expect(isNotNullable(null)).toBeFalse();
    });

    it('should return true for falsy string', () => {
      expect(isNotNullable('')).toBeTrue();
    });

    it('should return true for falsy number', () => {
      expect(isNotNullable(0)).toBeTrue();
    });

    it('should return true for objects', () => {
      expect(isNotNullable({ property: 'value' })).toBeTrue();
    });

    it('should return true for false value', () => {
      expect(isNotNullable(false)).toBeTrue();
    });
  });
});
