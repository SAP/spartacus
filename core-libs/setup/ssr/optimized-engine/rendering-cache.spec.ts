import { RenderingCache } from './rendering-cache';

describe('RenderingCache', () => {
  let renderingCache: RenderingCache;

  beforeEach(() => {
    renderingCache = new RenderingCache({});
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
      expect(renderingCache.isReady('test')).toBeTrue();
    });
    it('should return true if there is an error', () => {
      renderingCache.store('test', {} as any);
      expect(renderingCache.isReady('test')).toBeTrue();
    });
  });
});

describe('RenderingCache with ttl', () => {
  let renderingCache: RenderingCache;

  beforeEach(() => {
    renderingCache = new RenderingCache({ ttl: 100 });
  });

  describe('get', () => {
    it('should return timestamp', () => {
      renderingCache.store('test', null, 'testHtml');
      expect(renderingCache.get('test').time).toBeTruthy();
    });
  });
});
