/// <reference types="jest" />

import {
  defaultSsrOptimizationOptions,
  SsrOptimizationOptions,
} from '../ssr-optimization-options';
import { RenderingCache } from './rendering-cache';

const options: SsrOptimizationOptions = {
  shouldCacheRenderingResult:
    defaultSsrOptimizationOptions.shouldCacheRenderingResult,
  cacheEntrySizeCalculator:
    defaultSsrOptimizationOptions.cacheEntrySizeCalculator,
  cacheSizeMemory: defaultSsrOptimizationOptions.cacheSizeMemory,
  logger: defaultSsrOptimizationOptions.logger,
};

describe('RenderingCache', () => {
  let renderingCache: RenderingCache;

  beforeEach(() => {
    renderingCache = new RenderingCache(options);
  });

  describe('Handling of cache size limit in bytes', () => {
    beforeEach(() => {
      renderingCache = new RenderingCache({
        ...options,
        cacheSizeMemory: 1000,
      });
    });

    it('should return stored html value and measure size', () => {
      // 72 chars:
      const testHtml =
        '<html><head><title>Test</title></head><body><h1>Hello</h1></body></html>';
      renderingCache.store('test', undefined, testHtml);

      const storedEntry = renderingCache.get('test');

      expect(storedEntry).toEqual({
        err: undefined,
        html: testHtml,
        _size: 144, // 72 chars, each character is assumed to be 2 bytes
      });

      expect(renderingCache['sizeManager']['usedSize']).toBeGreaterThan(0);
    });

    it('should not cache errors by default and size should remain zero', () => {
      const testErr: Error = {
        name: 'test name', // 9 chars
        message: 'test message', // 12 chars
        stack: 'test stack trace', // 16 chars
      };

      renderingCache.store('test', testErr, undefined);

      const storedEntry = renderingCache.get('test');

      expect(storedEntry).toBeUndefined();
      expect(renderingCache['sizeManager']['usedSize']).toBe(0);
    });

    it('should cache errors when configured to do so and measure their size', () => {
      const errorCachingRenderingCache = new RenderingCache({
        ...options,
        cacheSizeMemory: 1000,
        shouldCacheRenderingResult: () => true, // Cache everything including errors
      });

      const testErr: Error = {
        name: 'test name', // 9 chars
        message: 'test message', // 12 chars
        stack: 'test stack trace', // 16 chars
      };
      // total: 37 chars

      errorCachingRenderingCache.store('test', testErr, undefined);

      const storedEntry = errorCachingRenderingCache.get('test');

      expect(storedEntry).toEqual({
        err: testErr,
        html: undefined,
        _size: 74, // 37 chars, each character is assumed to be 2 bytes
      });

      expect(errorCachingRenderingCache['sizeManager']['usedSize']).toBe(74);
    });

    it('should remove oldest entry when cache size exceeds limit', () => {
      const largeHtml = 'a'.repeat(400); // assumed size 800 bytes
      const anotherLargeHtml = 'b'.repeat(300); // assumed size 600 bytes

      renderingCache.store('a', null, largeHtml);
      renderingCache.store('b', null, anotherLargeHtml);

      expect(renderingCache.get('a')).toBeUndefined();
      expect(renderingCache.get('b')).toBeDefined();
      expect(renderingCache['sizeManager']['usedSize']).toBe(300 * 2);
    });

    it('should handle multiple removals if needed', () => {
      const html1 = 'd'.repeat(100); // assumed size 200 bytes
      const html2 = 'o'.repeat(300); // assumed size 600 bytes
      const html3 = 'g'.repeat(450); // assumed size 900 bytes

      renderingCache.store('d', null, html1);
      renderingCache.store('o', null, html2);
      renderingCache.store('g', null, html3);

      expect(renderingCache.get('d')).toBeUndefined();
      expect(renderingCache.get('o')).toBeUndefined();
      expect(renderingCache.get('g')).toBeDefined();
      expect(renderingCache['sizeManager']['usedSize']).toBe(450 * 2);
    });

    it('should not remove entries if cache size is within limit', () => {
      const smallHtml = 'a'.repeat(10); // assumed size 20 bytes

      renderingCache.store('a', null, smallHtml);
      renderingCache.store('b', null, smallHtml);

      expect(renderingCache.get('a')).toBeDefined();
      expect(renderingCache.get('b')).toBeDefined();
      expect(renderingCache['sizeManager']['usedSize']).toBe(20 * 2);
    });

    it('should allow adding entry which has exactly the limit size', () => {
      expect(renderingCache['sizeManager']['usedSize']).toBe(0);

      const bigHtml = 'x'.repeat(500); // assumed size 1000 bytes - which is exactly the limit

      renderingCache.store('largeEntry', null, bigHtml);

      expect(renderingCache.get('largeEntry')).toBeDefined();
      expect(renderingCache['sizeManager']['usedSize']).toBe(1000);
    });

    it('should allow adding multiple entries which together have exactly the limit size', () => {
      expect(renderingCache['sizeManager']['usedSize']).toBe(0);

      const bigHtml1 = 'x'.repeat(200); // assumed size 400 bytes
      const bigHtml2 = 'y'.repeat(300); // assumed size 600 bytes

      renderingCache.store('largeEntry1', null, bigHtml1);
      renderingCache.store('largeEntry2', null, bigHtml2);

      expect(renderingCache.get('largeEntry1')).toBeDefined();
      expect(renderingCache.get('largeEntry2')).toBeDefined();
      expect(renderingCache['sizeManager']['usedSize']).toBe(1000);
    });

    it('should not enter infinite loop when cache is empty and should not cache the entry', () => {
      expect(renderingCache['sizeManager']['usedSize']).toBe(0);

      const bigHtml = 'x'.repeat(501); // assumed size 1002 bytes - which exceeds the limit

      renderingCache.store('largeEntry', null, bigHtml);

      expect(renderingCache.get('largeEntry')).toBeUndefined();
      expect(renderingCache['sizeManager']['usedSize']).toBe(0);
    });

    it('with non-empty cache, should not enter infinite loop when cache is empty and should not cache the entry', () => {
      const smallHtml = 'a'.repeat(10); // assumed size 20 bytes
      renderingCache.store('smallEntry', null, smallHtml);
      expect(renderingCache['sizeManager']['usedSize']).toBe(20);

      const bigHtml = 'x'.repeat(501); // assumed size 1002 bytes - which exceeds the limit
      renderingCache.store('largeEntry', null, bigHtml);

      expect(renderingCache.get('largeEntry')).toBeUndefined();
      expect(renderingCache['sizeManager']['usedSize']).toBe(20);
    });

    it('should release the previous entry size when overwriting an existing cached key', () => {
      const firstHtml = 'a'.repeat(100); // assumed size 200 bytes
      renderingCache.store('a', null, firstHtml);
      expect(renderingCache['sizeManager']['usedSize']).toBe(200);

      const secondHtml = 'b'.repeat(50); // assumed size 100 bytes
      renderingCache.store('a', null, secondHtml);

      // The previous entry's tracked size (200) must be released before
      // tracking the new entry (100). Otherwise `usedSize` drifts upward
      // forever for any key that gets re-stored.
      expect(renderingCache['sizeManager']['usedSize']).toBe(100);
    });

    it('should release the previous entry size when re-rendering with `setAsRendering`', () => {
      renderingCache.store('a', null, 'x'.repeat(100)); // 200 B
      expect(renderingCache['sizeManager']['usedSize']).toBe(200);

      renderingCache.setAsRendering('a'); // engine begins re-render
      renderingCache.store('a', null, 'y'.repeat(100)); // re-render finishes (200 B)

      expect(renderingCache['sizeManager']['usedSize']).toBe(200);
    });

    it('should not evict an unrelated entry when re-rendering an existing key when `setAsRendering` is used', () => {
      const cache = new RenderingCache({
        ...options,
        cacheSizeMemory: 500, // ≥ 2 entries × 200 B with headroom
        ssrFeatureToggles: {
          limitCacheByMemory: true,
        },
      });
      cache.store('a', null, 'x'.repeat(100)); // 200 B
      cache.store('b', null, 'y'.repeat(100)); // 200 B → usedSize 400
      expect(cache.get('a')).toBeDefined();
      expect(cache.get('b')).toBeDefined();

      // Engine begins re-rendering /a (e.g. because of stale TTL):
      cache.setAsRendering('a');
      // Re-render of /a completes with same payload size:
      cache.store('a', null, 'z'.repeat(100));

      // /b must still be in the cache - the re-render of /a should not have
      // evicted it. With the pre-fix accounting, the orphaned 200 B from the
      // first /a entry inflates usedSize to 400 + 200 needed → /b evicted.
      expect(cache.get('a')).toBeDefined();
      expect(cache.get('b')).toBeDefined();
    });
  });

  it('should create rendering cache instance', () => {
    expect(renderingCache).toBeTruthy();
  });

  describe('isRendering', () => {
    it('should return false by default', () => {
      expect(renderingCache.isRendering('test')).toBeFalsy();
    });
    it('should return true for fields marked with setAsRendering', () => {
      renderingCache.setAsRendering('test');
      expect(renderingCache.isRendering('test')).toBeTruthy();
    });

    it('should return false after calling store', () => {
      renderingCache.setAsRendering('test');
      renderingCache.store('test', undefined, undefined);
      expect(renderingCache.isRendering('test')).toBeFalsy();
    });

    it('should return false after calling clear', () => {
      renderingCache.setAsRendering('test');
      renderingCache.clear('test');
      expect(renderingCache.isRendering('test')).toBeFalsy();
    });
  });

  describe('get', () => {
    it('should return stored values', () => {
      renderingCache.store('test', null, 'testHtml');
      expect(renderingCache.get('test')).toEqual({
        err: null,
        html: 'testHtml',
        _size: expect.any(Number),
      });
    });

    it('should return undefined after clear', () => {
      renderingCache.store('test', null, 'testHtml');
      renderingCache.clear('test');
      expect(renderingCache.get('test')).toBeUndefined();
    });
  });

  describe('isReady', () => {
    it('should return false is set as rendering', () => {
      renderingCache.setAsRendering('test');
      expect(renderingCache.isReady('test')).toBeFalsy();
    });
    it('should return true if there is rendering', () => {
      renderingCache.store('test', undefined, 'testHtml');
      expect(renderingCache.isReady('test')).toBeTruthy();
    });
    it('should return false if there is an error', () => {
      renderingCache.store('test', {} as any);
      expect(renderingCache.isReady('test')).toBeFalsy();
    });

    it('should return true if there is an error when configured to cache errors', () => {
      const errorCachingRenderingCache = new RenderingCache({
        ...options,
        shouldCacheRenderingResult: () => true, // Cache everything including errors
      });

      errorCachingRenderingCache.store('test', {} as any);
      expect(errorCachingRenderingCache.isReady('test')).toBeTruthy();
    });
  });

  describe('isFresh', () => {
    it('should return true if ttl is not set', () => {
      expect(renderingCache.isFresh('test')).toBeTruthy();
    });
  });
});

describe('RenderingCache with ttl', () => {
  let renderingCache: RenderingCache;

  beforeEach(() => {
    renderingCache = new RenderingCache({ ...options, ttl: 100 });
  });

  describe('get', () => {
    it('should return timestamp', () => {
      renderingCache.store('test', null, 'testHtml');
      expect(renderingCache.get('test')?.time).toBeTruthy();
    });
  });

  describe('isFresh', () => {
    let mockedTime: number;

    beforeEach(() => {
      mockedTime = 100;
      jest.spyOn(Date, 'now').mockImplementation(() => mockedTime);
    });

    it('should return false for non-existent renders', () => {
      expect(renderingCache.isFresh('test')).toBeFalsy();
    });

    it('should return true if render is in ttl range', () => {
      renderingCache.store('test', null, 'testHtml');
      expect(renderingCache.isFresh('test')).toBeTruthy();
      mockedTime = +50;
      expect(renderingCache.isFresh('test')).toBeTruthy();
    });

    it('should return false if render is outdated', () => {
      renderingCache.store('test', null, 'testHtml');
      mockedTime = +200;
      expect(renderingCache.isFresh('test')).toBeFalsy();
    });
  });
});

describe('RenderingCache and shouldCacheRenderingResult', () => {
  let renderingCache: RenderingCache;

  describe('if default shouldCacheRenderingResult', () => {
    it('should cache HTML', () => {
      renderingCache = new RenderingCache({
        ...options,
      });
      renderingCache.store('a', undefined, 'a');
      expect(renderingCache.get('a')).toEqual({
        html: 'a',
        err: undefined,
        _size: expect.any(Number),
      });
    });

    it('should not cache errors', () => {
      renderingCache = new RenderingCache({
        ...options,
      });
      renderingCache.store('a', new Error('err'), 'a');
      expect(renderingCache.get('a')).toBeFalsy();
    });
  });

  describe('if shouldCacheRenderingResult is not defined', () => {
    beforeEach(() => {
      renderingCache = new RenderingCache({
        ...options,
        shouldCacheRenderingResult: undefined,
      });
    });
    it('should not cache a html', () => {
      renderingCache.store('a', undefined, 'a');
      expect(renderingCache.get('a')).toBeFalsy();
    });

    it('should not cache an error', () => {
      renderingCache.store('a', new Error('err'), 'a');
      expect(renderingCache.get('a')).toBeFalsy();
    });
  });
});
