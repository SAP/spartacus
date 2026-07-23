import { TestBed } from '@angular/core/testing';
import {
  Route,
  UrlMatcher,
  UrlSegment,
  UrlSegmentGroup,
} from '@angular/router';
import { GlobService } from '../../util/glob.service';
import { UrlMatcherService } from './url-matcher.service';

describe('UrlMatcherService', () => {
  let segmentGroup: UrlSegmentGroup;
  let route: Route;
  let service: UrlMatcherService;
  let globService: GlobService;

  beforeEach(() => {
    segmentGroup = { hasChildren: () => false } as UrlSegmentGroup;
    route = {} as Route;

    service = TestBed.inject(UrlMatcherService);
    globService = TestBed.inject(GlobService);
  });

  describe('getFalsy', () => {
    it('should never match', () => {
      const matcher = service.getFalsy();
      expect(matcher(null, null, null)).toBe(null);
    });
  });

  describe('getFromPaths', () => {
    it('should match empty path', () => {
      const matcher = service.getFromPaths(['']);
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
      const matcher = service.getFromPaths(['']);
      const segments = [{ path: 'test' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = null;
      expect(result).toEqual(expected as any);
    });

    it('should match simple path', () => {
      const matcher = service.getFromPaths(['test/route']);
      const segments = [{ path: 'test' }, { path: 'route' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test' }, { path: 'route' }],
        posParams: {},
      };
      expect(result).toEqual(expected as any);
    });

    it('should match path with params', () => {
      const matcher = service.getFromPaths(['test/:param']);
      const segments = [{ path: 'test' }, { path: 'value' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test' }, { path: 'value' }],
        posParams: { param: { path: 'value' } },
      };
      expect(result).toEqual(expected as any);
    });

    it('should match first path', () => {
      const matcher = service.getFromPaths(['test1/:param1', 'test2/:param2']);
      const segments = [{ path: 'test1' }, { path: 'value' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test1' }, { path: 'value' }],
        posParams: { param1: { path: 'value' } },
      };
      expect(result).toEqual(expected as any);
    });

    it('should match second path', () => {
      const matcher = service.getFromPaths(['test1/:param1', 'test2/:param2']);
      const segments = [{ path: 'test2' }, { path: 'value' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test2' }, { path: 'value' }],
        posParams: { param2: { path: 'value' } },
      };
      expect(result).toEqual(expected as any);
    });

    it('should match prefix path', () => {
      const matcher = service.getFromPaths(['test']);
      const segments = [{ path: 'test' }, { path: 'route' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = {
        consumed: [{ path: 'test' }],
        posParams: {},
      };
      expect(result).toEqual(expected as any);
    });

    it('should match the first prefix path', () => {
      const matcher = service.getFromPaths(['test', 'test/:param']);
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
      const matcher = service.getFromPaths(['test']);
      const segments = [{ path: 'test' }, { path: 'route' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = null;
      expect(result).toEqual(expected as any);
    });

    it('should NOT match different path', () => {
      route.pathMatch = 'full';
      const matcher = service.getFromPaths(['test1', 'test2']);
      const segments = [{ path: 'test3' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = null;
      expect(result).toEqual(expected as any);
    });
  });

  describe('getOpposite', () => {
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
      const matcher = service.getOpposite(inputMatcher);
      const segments = [{ path: 'test' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = null;
      expect(result).toEqual(expected as any);
    });

    it('should match what the input matcher would not match', () => {
      const matcher = service.getOpposite(inputMatcher);
      const segments = [{ path: 'test2' }] as UrlSegment[];
      const result = matcher(segments, segmentGroup, route);
      const expected = { consumed: segments, posParams: {} };
      expect(result).toEqual(expected as any);
    });
  });

  describe('getCombined', () => {
    let inputMatcherA: UrlMatcher;
    let inputMatcherB: UrlMatcher;

    beforeEach(() => {
      // accepts every path that starts from 'testA'
      inputMatcherA = (segments: UrlSegment[]) => {
        return segments[0].path === 'testA'
          ? { consumed: segments, posParams: {} }
          : null;
      };

      // accepts every path that starts from 'testB'
      inputMatcherB = (segments: UrlSegment[]) => {
        return segments[0].path === 'testB'
          ? { consumed: segments, posParams: {} }
          : null;
      };
    });

    it('should match for any of given matchers', () => {
      const matcher = service.getCombined([inputMatcherA, inputMatcherB]);
      const segmentsA = [{ path: 'testA' }] as UrlSegment[];
      const segmentsB = [{ path: 'testB' }] as UrlSegment[];
      expect(matcher(segmentsA, segmentGroup, route)).toBeTruthy();
      expect(matcher(segmentsB, segmentGroup, route)).toBeTruthy();
    });

    it('should not match for all of given matchers', () => {
      const matcher = service.getCombined([inputMatcherA, inputMatcherB]);
      const segmentsC = [{ path: 'testC' }] as UrlSegment[];
      expect(matcher(segmentsC, segmentGroup, route)).toBe(null);
    });
  });

  describe('getFromGlob', () => {
    it('should call GlobService.getValidator', () => {
      spyOn(globService, 'getValidator');
      service.getFromGlob(['/test/pattern']);
      expect(globService.getValidator).toHaveBeenCalledWith(['/test/pattern']);
    });

    it('should call glob matcher with full path prepended with slash', () => {
      const mockGlobValidator = jasmine.createSpy().and.returnValue(true);
      spyOn(globService, 'getValidator').and.returnValue(mockGlobValidator);

      const urlMatcher = service.getFromGlob([]);
      const testSegments = [
        { path: 'test' },
        { path: 'segments' },
      ] as UrlSegment[];
      urlMatcher(testSegments, null, null);
      expect(mockGlobValidator).toHaveBeenCalledWith('/test/segments');
    });

    it('should match given glob-like patterns', () => {
      spyOn(globService, 'getValidator').and.returnValue(() => true);
      const matcher = service.getFromGlob([]);
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
      const matcher = service.getFromGlob([]);
      expect(matcher([], null, null)).toEqual(null);
    });
  });
});
