import { UrlSegment } from '@angular/router';
import { getSuffixUrlMatcher } from './suffix-url-matcher';

describe('getSuffixUrlMatcher', () => {
  describe('without given `precedingParamName`', () => {
    const matcher = getSuffixUrlMatcher({
      marker: 'test3',
      paramName: 'testParamName',
    });

    it('should NOT match path that does not contain marker', () => {
      const urlSegments = [
        { path: 'test1' },
        { path: 'test2' },
      ] as UrlSegment[];
      expect(matcher(urlSegments)).toBe(null);
    });

    it('should NOT match path that has marker as last element', () => {
      const urlSegments = [
        { path: 'test1' },
        { path: 'test2' },
        { path: 'test3' },
      ] as UrlSegment[];

      expect(matcher(urlSegments)).toBe(null);
    });

    it('should match path that has marker and one succeeding segment', () => {
      const urlSegments = [
        { path: 'test1' },
        { path: 'test2' },
        { path: 'test3' },
        { path: 'test4' },
        { path: 'test5' },
        { path: 'test6' },
      ] as UrlSegment[];
      expect(matcher(urlSegments).consumed).toEqual(urlSegments.slice(0, 4));
    });

    it('should extract succeeding segment of marker as param with given name', () => {
      const urlSegments = [
        { path: 'test1' },
        { path: 'test2' },
        { path: 'test3' },
        { path: 'test4' },
      ] as UrlSegment[];
      expect(matcher(urlSegments).posParams['testParamName']).toEqual({
        path: 'test4',
      } as UrlSegment);
    });

    it('should extract preceding segments of marker as numbered "param" params', () => {
      const urlSegments = [
        { path: 'test1' },
        { path: 'test2' },
        { path: 'test3' },
        { path: 'test4' },
      ] as UrlSegment[];

      const result = matcher(urlSegments);
      expect(result.posParams['param0']).toEqual({
        path: 'test1',
      } as UrlSegment);
      expect(result.posParams['param1']).toEqual({
        path: 'test2',
      } as UrlSegment);
    });
  });

  describe('with given `precedingParamName`', () => {
    const matcher = getSuffixUrlMatcher({
      marker: 'test3',
      paramName: 'testParamName',
      precedingParamName: 'precedingParam',
    });

    it('should extract preceding segments of marker as params with given name', () => {
      const urlSegments = [
        { path: 'test1' },
        { path: 'test2' },
        { path: 'test3' },
        { path: 'test4' },
      ] as UrlSegment[];

      const result = matcher(urlSegments);
      expect(result.posParams['precedingParam0']).toEqual({
        path: 'test1',
      } as UrlSegment);
      expect(result.posParams['precedingParam1']).toEqual({
        path: 'test2',
      } as UrlSegment);
    });
  });
});
