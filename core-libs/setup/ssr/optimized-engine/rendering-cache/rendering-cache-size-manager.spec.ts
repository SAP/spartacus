import { ExpressServerLogger } from '@spartacus/setup/ssr';
import { SsrOptimizationOptions } from '../ssr-optimization-options';
import { RenderingCacheSizeManager } from './rendering-cache-size-manager';
import { RenderingEntry } from './rendering-cache.model';

describe('RenderingCacheSizeManager', () => {
  let mockLogger: ExpressServerLogger;
  let mockCalculator: { calculateSize: jest.Mock };
  let options: SsrOptimizationOptions;
  let renderingCacheSizeManager: RenderingCacheSizeManager;

  beforeEach(() => {
    mockLogger = {
      error: jest.fn(),
      log: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
    };
    mockCalculator = { calculateSize: jest.fn() };
    options = {
      cacheSizeMemory: 1000,
      logger: mockLogger,
      cacheEntrySizeCalculator: mockCalculator,
    };
    renderingCacheSizeManager = new RenderingCacheSizeManager(options);
  });

  describe('constructor', () => {
    it('should initialize with valid options', () => {
      expect(renderingCacheSizeManager).toBeDefined();
    });

    it('should log error when `options.cacheEntrySizeCalculator.calculateSize` is not a function', () => {
      options.cacheEntrySizeCalculator = undefined;
      new RenderingCacheSizeManager(options);
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Invalid SSR config `options.cacheEntrySizeCalculator`! It should be an object with the `calculateSize()` method.',
        {}
      );
    });

    it('should log error when `options.cacheSizeMemory` is undefined', () => {
      options.cacheSizeMemory = undefined;
      new RenderingCacheSizeManager(options);
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Invalid SSR config `options.cacheSizeMemory`! It should be a number greater than 0.',
        {}
      );
    });

    it('should log error when `options.cacheSizeMemory` is 0', () => {
      options.cacheSizeMemory = 0;
      new RenderingCacheSizeManager(options);
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Invalid SSR config `options.cacheSizeMemory`! It should be a number greater than 0.',
        {}
      );
    });

    it('should log error when `options.cacheSizeMemory` is lower than 0', () => {
      options.cacheSizeMemory = -1;
      new RenderingCacheSizeManager(options);
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Invalid SSR config `options.cacheSizeMemory`! It should be a number greater than 0.',
        {}
      );
    });
  });

  describe('calculateEntrySize', () => {
    it('should calculate entry size using provided calculator', () => {
      const entry = {} as RenderingEntry;
      mockCalculator.calculateSize.mockReturnValue(100);
      expect(renderingCacheSizeManager.calculateEntrySize(entry)).toBe(100);
      expect(mockCalculator.calculateSize).toHaveBeenCalledWith(entry);
    });
  });

  describe('hasSpaceForEntrySize', () => {
    it('should return true when there is enough space', () => {
      renderingCacheSizeManager.trackEntrySize(800);
      expect(renderingCacheSizeManager.hasSpaceForEntrySize(200)).toBe(true);
    });

    it('should return false when there is not enough space', () => {
      renderingCacheSizeManager.trackEntrySize(800);
      expect(renderingCacheSizeManager.hasSpaceForEntrySize(201)).toBe(false);
    });
  });

  describe('isEntryLargerThanCacheLimit', () => {
    it('should return true when entry size exceeds cache limit', () => {
      expect(renderingCacheSizeManager.isEntryLargerThanCacheLimit(1500)).toBe(
        true
      );
    });

    it('should return false when entry size is exactly the cache limit', () => {
      expect(renderingCacheSizeManager.isEntryLargerThanCacheLimit(1000)).toBe(
        false
      );
    });

    it('should return false when entry size is within cache limit', () => {
      expect(renderingCacheSizeManager.isEntryLargerThanCacheLimit(500)).toBe(
        false
      );
    });
  });

  describe('trackEntrySize', () => {
    it('should track entry size correctly', () => {
      renderingCacheSizeManager.trackEntrySize(500);
      expect(renderingCacheSizeManager.hasSpaceForEntrySize(400)).toBe(true);
      expect(renderingCacheSizeManager.hasSpaceForEntrySize(600)).toBe(false);
    });

    it('should handle MAX_SAFE_INTEGER overflow', () => {
      renderingCacheSizeManager.trackEntrySize(Number.MAX_SAFE_INTEGER);
      renderingCacheSizeManager.trackEntrySize(1);
      expect(mockLogger.error).toHaveBeenCalledWith(
        'RenderingCacheSizeManager: the used size is greater than the MAX_SAFE_INTEGER value! This should never happen!',
        {}
      );
    });
  });

  describe('untrackEntrySize', () => {
    it('should untrack entry size correctly', () => {
      renderingCacheSizeManager.trackEntrySize(500);
      expect(renderingCacheSizeManager.hasSpaceForEntrySize(800)).toBe(false);
      renderingCacheSizeManager.untrackEntrySize(300);
      expect(renderingCacheSizeManager.hasSpaceForEntrySize(800)).toBe(true);
    });

    it('should handle negative size', () => {
      renderingCacheSizeManager.trackEntrySize(100);
      renderingCacheSizeManager.untrackEntrySize(101);
      expect(mockLogger.error).toHaveBeenCalledWith(
        'RenderingCacheSizeManager: the used size is negative! This should never happen!',
        {}
      );
    });
  });
});
