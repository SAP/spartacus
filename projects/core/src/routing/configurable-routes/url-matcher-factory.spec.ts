import { UrlSegmentGroup, UrlSegment, Route } from '@angular/router';
import { UrlMatcherFactory } from './url-matcher-factory';

describe('PathsUrlMatcherFactory', () => {
  describe('create', () => {
    let segmentGroup: UrlSegmentGroup;
    let route: Route;

    beforeEach(() => {
      segmentGroup = { hasChildren: () => false } as UrlSegmentGroup;
      route = {} as Route;
    });

    it('should match simple path', () => {
      const matcher = UrlMatcherFactory.getPathsUrlMatcher(['test/route']);
      const segments = [{ path: 'test' }, { path: 'route' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test' }, { path: 'route' }],
        posParams: {},
      };
      expect(result).toEqual(expected as any);
    });

    it('should match path with params', () => {
      const matcher = UrlMatcherFactory.getPathsUrlMatcher(['test/:param']);
      const segments = [{ path: 'test' }, { path: 'value' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test' }, { path: 'value' }],
        posParams: { param: { path: 'value' } },
      };
      expect(result).toEqual(expected as any);
    });

    it('should match first path', () => {
      const matcher = UrlMatcherFactory.getPathsUrlMatcher([
        'test1/:param1',
        'test2/:param2',
      ]);
      const segments = [{ path: 'test1' }, { path: 'value' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test1' }, { path: 'value' }],
        posParams: { param1: { path: 'value' } },
      };
      expect(result).toEqual(expected as any);
    });

    it('should match second path', () => {
      const matcher = UrlMatcherFactory.getPathsUrlMatcher([
        'test1/:param1',
        'test2/:param2',
      ]);
      const segments = [{ path: 'test2' }, { path: 'value' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test2' }, { path: 'value' }],
        posParams: { param2: { path: 'value' } },
      };
      expect(result).toEqual(expected as any);
    });

    it('should match prefix path', () => {
      const matcher = UrlMatcherFactory.getPathsUrlMatcher(['test']);
      const segments = [{ path: 'test' }, { path: 'route' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test' }],
        posParams: {},
      };
      expect(result).toEqual(expected as any);
    });

    it('should match the first prefix path', () => {
      const matcher = UrlMatcherFactory.getPathsUrlMatcher([
        'test',
        'test/:param',
      ]);
      const segments = [{ path: 'test' }, { path: 'value' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test' }],
        posParams: {},
      };
      expect(result).toEqual(expected as any);
    });

    it('should NOT match prefix path when route has "pathMatch: full"', () => {
      route.pathMatch = 'full';
      const matcher = UrlMatcherFactory.getPathsUrlMatcher(['test']);
      const segments = [{ path: 'test' }, { path: 'route' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = null;
      expect(result).toEqual(expected as any);
    });

    it('should NOT match different path', () => {
      route.pathMatch = 'full';
      const matcher = UrlMatcherFactory.getPathsUrlMatcher(['test1', 'test2']);
      const segments = [{ path: 'test3' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = null;
      expect(result).toEqual(expected as any);
    });
  });
});
