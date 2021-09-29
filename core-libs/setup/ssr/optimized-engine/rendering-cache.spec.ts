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

  describe('isFresh', () => {
    it('should return true if ttl is not set', () => {
      expect(renderingCache.isFresh('test')).toBeTruthy();
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

  describe('isFresh', () => {
    let mockedTime: number;

    beforeEach(() => {
      mockedTime = 100;
      spyOn(Date, 'now').and.callFake(() => mockedTime);
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
    renderingCache = new RenderingCache({ cacheSize: 2 });
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
});
