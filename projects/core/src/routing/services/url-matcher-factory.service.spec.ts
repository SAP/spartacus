import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Route,
  UrlMatcher,
  UrlSegment,
  UrlSegmentGroup,
} from '@angular/router';
import { GlobService } from '../../util/glob.service';
import { UrlMatcherFactoryService } from './url-matcher-factory.service';

describe('UrlMatcherFactoryService', () => {
  let segmentGroup: UrlSegmentGroup;
  let route: Route;
  let factory: UrlMatcherFactoryService;
  let globService: GlobService;

  beforeEach(() => {
    segmentGroup = { hasChildren: () => false } as UrlSegmentGroup;
    route = {} as Route;

    factory = TestBed.get(UrlMatcherFactoryService as Type<
      UrlMatcherFactoryService
    >);
    globService = TestBed.get(GlobService);
  });

  describe('getFalsyUrlMatcher', () => {
    it('should never match', () => {
      const matcher = factory.getFalsyUrlMatcher();
      expect(matcher(null, null, null)).toBe(null);
    });
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

  describe('getGlobUrlMatcher', () => {
    it('should call GlobService.getValidator', () => {
      spyOn(globService, 'getValidator');
      factory.getGlobUrlMatcher(['/test/pattern']);
      expect(globService.getValidator).toHaveBeenCalledWith(['/test/pattern']);
    });

    it('should call glob matcher with full path prepended with slash', () => {
      const mockGlobValidator = jasmine.createSpy().and.returnValue(true);
      spyOn(globService, 'getValidator').and.returnValue(mockGlobValidator);

      const urlMatcher = factory.getGlobUrlMatcher([]);
      const testSegments = [
        { path: 'test' },
        { path: 'segments' },
      ] as UrlSegment[];
      urlMatcher(testSegments, null, null);
      expect(mockGlobValidator).toHaveBeenCalledWith('/test/segments');
    });

    it('should match given glob-like patterns', () => {
      spyOn(globService, 'getValidator').and.returnValue(() => true);
      const matcher = factory.getGlobUrlMatcher([]);
      const testSegments = [
        { path: 'test' },
        { path: 'segments' },
      ] as UrlSegment[];
      expect(matcher(testSegments, null, null)).toEqual({
        consumed: testSegments,
        posParams: {},
      });
    });

    it('should not match given glob-like patterns', () => {
      spyOn(globService, 'getValidator').and.returnValue(() => false);
      const matcher = factory.getGlobUrlMatcher([]);
      expect(matcher([], null, null)).toEqual(null);
    });
  });
});
