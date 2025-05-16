import { DefaultCacheEntrySizeCalculator } from './default-cache-entry-size-calculator';
import { RenderingEntry } from './rendering-cache.model';

describe('DefaultCacheEntrySizeCalculator', () => {
  let calculator: DefaultCacheEntrySizeCalculator;

  beforeEach(() => {
    calculator = new DefaultCacheEntrySizeCalculator();
  });

  describe('calculateSize', () => {
    it('should return 0 for empty entry', () => {
      const entry: RenderingEntry = {};
      expect(calculator.calculateSize(entry)).toBe(0);
    });

    it('should calculate HTML size correctly', () => {
      const entry: RenderingEntry = { html: 'test' }; // 4 chars
      // Each character is assumed to be 2 bytes
      expect(calculator.calculateSize(entry)).toBe(8); // 4 chars * 2 bytes
    });

    it('should calculate error size correctly', () => {
      class CustomError extends Error {}

      const error = new CustomError('test message');
      const entry: RenderingEntry = { err: error };
      // Size of name + message + stack
      const expectedSize =
        2 *
        (Buffer.byteLength(error.name, 'utf8') +
          Buffer.byteLength(error.message, 'utf8') +
          Buffer.byteLength(error.stack || '', 'utf8'));
      expect(calculator.calculateSize(entry)).toBe(expectedSize);
    });

    it('should handle error with missing properties', () => {
      const error = { message: 'test' }; // 4 chars
      const entry: RenderingEntry = { err: error };
      expect(calculator.calculateSize(entry)).toBe(8); // 4 chars * 2 bytes
    });

    it('should handle empty error object', () => {
      const entry: RenderingEntry = { err: {} };
      expect(calculator.calculateSize(entry)).toBe(0); // no expected properties
    });
  });
});
