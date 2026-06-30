import { isNotNullable, isNotUndefined } from './type-guards';

describe('Type guards', () => {
  describe('isNotUndefined', () => {
    it('should return false for "undefined" value', () => {
      expect(isNotUndefined(undefined)).toBe(false);
    });

    it('should return true for "null" value', () => {
      expect(isNotUndefined(null)).toBe(true);
    });

    it('should return true for falsy string', () => {
      expect(isNotUndefined('')).toBe(true);
    });

    it('should return true for falsy number', () => {
      expect(isNotUndefined(0)).toBe(true);
    });

    it('should return true for objects', () => {
      expect(isNotUndefined({ property: 'value' })).toBe(true);
    });

    it('should return true for false value', () => {
      expect(isNotUndefined(false)).toBe(true);
    });
  });

  describe('isNotNullable', () => {
    it('should return false for "undefined" value', () => {
      expect(isNotNullable(undefined)).toBe(false);
    });

    it('should return false for "null" value', () => {
      expect(isNotNullable(null)).toBe(false);
    });

    it('should return true for falsy string', () => {
      expect(isNotNullable('')).toBe(true);
    });

    it('should return true for falsy number', () => {
      expect(isNotNullable(0)).toBe(true);
    });

    it('should return true for objects', () => {
      expect(isNotNullable({ property: 'value' })).toBe(true);
    });

    it('should return true for false value', () => {
      expect(isNotNullable(false)).toBe(true);
    });
  });
});
