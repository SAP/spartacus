import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Route,
  UrlMatcher,
  UrlSegment,
  UrlSegmentGroup,
} from '@angular/router';
import { UrlMatcherFactoryService } from './url-matcher-factory.service';

describe('UrlMatcherFactoryService', () => {
  let segmentGroup: UrlSegmentGroup;
  let route: Route;
  let factory: UrlMatcherFactoryService;

  beforeEach(() => {
    segmentGroup = { hasChildren: () => false } as UrlSegmentGroup;
    route = {} as Route;

    TestBed.configureTestingModule({
      providers: [UrlMatcherFactoryService],
    });

    factory = TestBed.get(UrlMatcherFactoryService as Type<
      UrlMatcherFactoryService
    >);
  });

  describe('getMultiplePathsUrlMatcher', () => {
    it('should match empty path', () => {
      const matcher = factory.getMultiplePathsUrlMatcher(['']);
      const segments = [] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [],
        posParams: {},
      };
      expect(result).toEqual(expected as any);
    });

    it('should not match empty path', () => {
      route.pathMatch = 'full';
      const matcher = factory.getMultiplePathsUrlMatcher(['']);
      const segments = [{ path: 'test' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = null;
      expect(result).toEqual(expected as any);
    });

    it('should match simple path', () => {
      const matcher = factory.getMultiplePathsUrlMatcher(['test/route']);
      const segments = [{ path: 'test' }, { path: 'route' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test' }, { path: 'route' }],
        posParams: {},
      };
      expect(result).toEqual(expected as any);
    });

    it('should match path with params', () => {
      const matcher = factory.getMultiplePathsUrlMatcher(['test/:param']);
      const segments = [{ path: 'test' }, { path: 'value' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test' }, { path: 'value' }],
        posParams: { param: { path: 'value' } },
      };
      expect(result).toEqual(expected as any);
    });

    it('should match first path', () => {
      const matcher = factory.getMultiplePathsUrlMatcher([
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
      const matcher = factory.getMultiplePathsUrlMatcher([
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
      const matcher = factory.getMultiplePathsUrlMatcher(['test']);
      const segments = [{ path: 'test' }, { path: 'route' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test' }],
        posParams: {},
      };
      expect(result).toEqual(expected as any);
    });

    it('should match the first prefix path', () => {
      const matcher = factory.getMultiplePathsUrlMatcher([
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
      const matcher = factory.getMultiplePathsUrlMatcher(['test']);
      const segments = [{ path: 'test' }, { path: 'route' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = null;
      expect(result).toEqual(expected as any);
    });

    it('should NOT match different path', () => {
      route.pathMatch = 'full';
      const matcher = factory.getMultiplePathsUrlMatcher(['test1', 'test2']);
      const segments = [{ path: 'test3' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = null;
      expect(result).toEqual(expected as any);
    });
  });

  describe('getOppositeUrlMatcher', () => {
    let inputMatcher: UrlMatcher;

    beforeEach(() => {
      // accepts every path that starts from 'test'
      inputMatcher = (segments: UrlSegment[]) => {
        return segments[0].path === 'test'
          ? { consumed: segments, posParams: {} }
          : null;
      };
    });

    it('should not match what the input matcher would match', () => {
      const matcher = factory.getOppositeUrlMatcher(inputMatcher);
      const segments = [{ path: 'test' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = null;
      expect(result).toEqual(expected as any);
    });

    it('should match what the input matcher would not match', () => {
      const matcher = factory.getOppositeUrlMatcher(inputMatcher);
      const segments = [{ path: 'test2' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = { consumed: segments, posParams: {} };
      expect(result).toEqual(expected as any);
    });
  });
});
