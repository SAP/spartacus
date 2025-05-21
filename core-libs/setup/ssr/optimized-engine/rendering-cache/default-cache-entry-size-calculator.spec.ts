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
      const entry: RenderingEntry = { html: 'test' };
      const expectedSize = 2 * entry.html.length;
      expect(calculator.calculateSize(entry)).toBe(expectedSize);
    });

    it('should calculate error size correctly', () => {
      class CustomError extends Error {}

      const error = new CustomError('test message');
      const entry: RenderingEntry = { err: error };
      const expectedSize =
        2 *
        (error.name.length + error.message.length + (error.stack || '').length);
      expect(calculator.calculateSize(entry)).toBe(expectedSize);
    });

    it('should handle error with missing properties', () => {
      const error = { message: 'test' };
      const entry: RenderingEntry = { err: error };

      const expectedSize = 2 * error.message.length;
      expect(calculator.calculateSize(entry)).toBe(expectedSize);
    });

    it('should handle empty error object', () => {
      const entry: RenderingEntry = { err: {} };
      expect(calculator.calculateSize(entry)).toBe(0); // no expected properties
    });
  });
});
