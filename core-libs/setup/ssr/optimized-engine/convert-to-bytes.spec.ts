import { convertToBytes } from './convert-to-bytes';

describe('convertToBytes', () => {
  describe('KB conversion', () => {
    it('should convert KB to bytes correctly', () => {
      expect(convertToBytes(0, 'KB')).toBe(0);
      expect(convertToBytes(0.5, 'KB')).toBe(0.5 * 1024);
      expect(convertToBytes(1, 'KB')).toBe(1024);
      expect(convertToBytes(2, 'KB')).toBe(2048);
    });
  });

  describe('MB conversion', () => {
    it('should convert MB to bytes correctly', () => {
      expect(convertToBytes(0, 'MB')).toBe(0);
      expect(convertToBytes(0.5, 'MB')).toBe(0.5 * 1024 * 1024);
      expect(convertToBytes(1, 'MB')).toBe(1024 * 1024);
      expect(convertToBytes(2, 'MB')).toBe(2 * 1024 * 1024);
    });
  });

  describe('GB conversion', () => {
    it('should convert GB to bytes correctly', () => {
      expect(convertToBytes(0, 'GB')).toBe(0);
      expect(convertToBytes(0.5, 'GB')).toBe(0.5 * 1024 * 1024 * 1024);
      expect(convertToBytes(1, 'GB')).toBe(1024 * 1024 * 1024);
      expect(convertToBytes(2, 'GB')).toBe(2 * 1024 * 1024 * 1024);
    });
  });

  describe('edge cases', () => {
    it('should handle negative numbers', () => {
      expect(convertToBytes(-1, 'KB')).toBe(-1024);
      expect(convertToBytes(-2, 'MB')).toBe(-2 * 1024 * 1024);
      expect(convertToBytes(-3, 'GB')).toBe(-3 * 1024 * 1024 * 1024);
    });
  });

  describe('invalid unit', () => {
    it('should throw an error for invalid unit', () => {
      expect(() => convertToBytes(1, 'TB' as any)).toThrow();
      expect(() => convertToBytes(2, 'something invalid' as any)).toThrow();
    });
  });
});
