/// <reference types="jest" />

import { RenderingCache } from './rendering-cache';
import {
  defaultSsrOptimizationOptions,
  SsrOptimizationOptions,
} from './ssr-optimization-options';

const options: SsrOptimizationOptions = {
  shouldCacheRenderingResult:
    defaultSsrOptimizationOptions.shouldCacheRenderingResult,
};

describe('RenderingCache', () => {
  let renderingCache: RenderingCache;

  beforeEach(() => {
    renderingCache = new RenderingCache(options);
  });

  describe('Handling of cache size limit in bytes', () => {
    const propSize = 10 * 5; // err html size time rendering
    beforeEach(() => {
      renderingCache = new RenderingCache({
        ...options,
        cacheSizeBytesApproximation: 3000,
        ssrFeatureToggles: {
          cacheLimitInBytes: true,
        },
      });
    });

    it('should return stored values and measure size', () => {
      const testHtml =
        '<html><head><title>Test</title></head><body><h1>Hello</h1></body></html>';
      const testErr: Error = { name: 'err', message: 'test err' };

      renderingCache.store('test', testErr, testHtml);

      const storedEntry = renderingCache.get('test');

      expect(storedEntry).toEqual({
        err: testErr,
        html: testHtml,
        size: 133,
      });

      expect(renderingCache['getUsedCacheSize']()).toBeGreaterThan(0);
    });

    it('should remove oldest entry when cache size exceeds limit', () => {
      const expectedCacheSize = 1600;
      const largeHtml = 'a'.repeat(2000);
      const anotherLargeHtml = 'b'.repeat(expectedCacheSize);

      renderingCache.store('a', null, largeHtml);
      renderingCache.store('b', null, anotherLargeHtml);

      expect(renderingCache.get('a')).toBeUndefined();
      expect(renderingCache.get('b')).toBeDefined();
      expect(renderingCache['getUsedCacheSize']()).toBe(
        expectedCacheSize + propSize
      );
    });

    it('should handle multiple removals if needed', () => {
      const expectedCacheSize = 1700;
      const html1 = 'd'.repeat(1500);
      const html2 = 'o'.repeat(1500);
      const html3 = 'g'.repeat(expectedCacheSize);

      renderingCache.store('d', null, html1);
      renderingCache.store('o', null, html2);
      renderingCache.store('g', null, html3);

      expect(renderingCache.get('d')).toBeUndefined();
      expect(renderingCache.get('o')).toBeUndefined();
      expect(renderingCache.get('g')).toBeDefined();
      expect(renderingCache['getUsedCacheSize']()).toBe(
        expectedCacheSize + propSize
      );
    });

    it('should not remove entries if cache size is within limit', () => {
      const smallHtml = 'a'.repeat(10);

      renderingCache.store('a', null, smallHtml);
      renderingCache.store('b', null, smallHtml);

      expect(renderingCache.get('a')).toBeDefined();
      expect(renderingCache.get('b')).toBeDefined();
    });

    it('should not enter infinite loop when cache is empty and should not cache the entry', () => {
      expect(renderingCache['getUsedCacheSize']()).toBe(0);

      const bigHtml = 'x'.repeat(4000);

      renderingCache.store('largeEntry', null, bigHtml);

      expect(renderingCache.get('largeEntry')).toBeUndefined();
      expect(renderingCache['getUsedCacheSize']()).toBe(0);
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
    it('should return true if there is an error', () => {
      renderingCache.store('test', {} as any);
      expect(renderingCache.isReady('test')).toBeTruthy();
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

describe('RenderingCache with cacheSize', () => {
  let renderingCache: RenderingCache;

  beforeEach(() => {
    renderingCache = new RenderingCache({ ...options, cacheSize: 2 });
  });

  describe('get', () => {
    it('should drop elements', () => {
      renderingCache.store('a', null, 'a');
      renderingCache.store('b', null, 'b');
      renderingCache.store('c', null, 'c');
      expect(renderingCache.get('a')).toBeFalsy();
      expect(renderingCache.get('b')).toBeTruthy();
    });

    it('should drop oldest elements', () => {
      renderingCache.store('a', null, 'a');
      renderingCache.store('b', null, 'b');
      renderingCache.store('a', null, 'a1');
      renderingCache.store('c', null, 'c');
      renderingCache.store('a', null, 'a2');
      expect(renderingCache.get('a')).toBeTruthy();
      expect(renderingCache.get('b')).toBeFalsy();
    });

    it('should not drop oldest element, when setting a new value for existing key', () => {
      renderingCache.store('a', null, 'a');
      renderingCache.store('b', null, 'b');
      renderingCache.store('c', null, 'c1');
      renderingCache.store('c', null, 'c2');
      renderingCache.store('c', null, 'c3');
      expect(renderingCache.get('a')).toBeFalsy();
      expect(renderingCache.get('b')).toBeTruthy();
      expect(renderingCache.get('c')).toBeTruthy();
    });
  });

  describe('RenderingCache and shouldCacheRenderingResult', () => {
    let renderingCache: RenderingCache;

    describe('if default shouldCacheRenderingResult', () => {
      it('should cache HTML if avoidCachingErrors is false', () => {
        renderingCache = new RenderingCache({
          ...options,
          ssrFeatureToggles: {
            avoidCachingErrors: false,
          },
        });
        renderingCache.store('a', undefined, 'a');
        expect(renderingCache.get('a')).toEqual({ html: 'a', err: undefined });
      });

      it('should cache HTML if avoidCachingErrors is true', () => {
        renderingCache = new RenderingCache({
          ...options,
          ssrFeatureToggles: {
            avoidCachingErrors: false,
          },
        });
        renderingCache.store('a', undefined, 'a');
        expect(renderingCache.get('a')).toEqual({ html: 'a', err: undefined });
      });

      it('should cache errors if avoidCachingErrors is false', () => {
        renderingCache = new RenderingCache({
          ...options,
          ssrFeatureToggles: {
            avoidCachingErrors: false,
          },
        });
        renderingCache.store('a', new Error('err'), 'a');
        expect(renderingCache.get('a')).toEqual({
          html: 'a',
          err: new Error('err'),
        });
      });

      it('should not cache errors if avoidCachingErrors is true', () => {
        renderingCache = new RenderingCache({
          ...options,
          ssrFeatureToggles: {
            avoidCachingErrors: true,
          },
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
});
