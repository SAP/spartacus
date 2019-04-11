import { suffixUrlMatcher } from './suffix-url-matcher';
import { UrlSegment } from '@angular/router';

describe('suffixUrlMatcher', () => {
  it('should NOT match path that does not contain marker', () => {
    const urlMatcher = suffixUrlMatcher('test3', 'testParamName');
    const urlSegments = [{ path: 'test1' }, { path: 'test2' }] as UrlSegment[];
    expect(urlMatcher(urlSegments)).toBe(null);
  });

  it('should NOT match path that has marker as last element', () => {
    const urlMatcher = suffixUrlMatcher('test3', 'testParamName');
    const urlSegments = [
      { path: 'test1' },
      { path: 'test2' },
      { path: 'test3' },
    ] as UrlSegment[];
    expect(urlMatcher(urlSegments)).toBe(null);
  });

  it('should match path that has marker and one succeeding segment', () => {
    const urlMatcher = suffixUrlMatcher('test3', 'testParamName');
    const urlSegments = [
      { path: 'test1' },
      { path: 'test2' },
      { path: 'test3' },
      { path: 'test4' },
      { path: 'test5' },
      { path: 'test6' },
    ] as UrlSegment[];
    expect(urlMatcher(urlSegments).consumed).toEqual(urlSegments.slice(0, 4));
  });

  it('should extract succeeding segment of marker as param with given name', () => {
    const urlMatcher = suffixUrlMatcher('test3', 'testParamName');
    const urlSegments = [
      { path: 'test1' },
      { path: 'test2' },
      { path: 'test3' },
      { path: 'test4' },
    ] as UrlSegment[];
    expect(urlMatcher(urlSegments).posParams['testParamName']).toEqual({
      path: 'test4',
    } as UrlSegment);
  });

  it('should extract preceding segments of marker as numbered "urlSegment" params', () => {
    const urlMatcher = suffixUrlMatcher('test3', 'testParamName');
    const urlSegments = [
      { path: 'test1' },
      { path: 'test2' },
      { path: 'test3' },
      { path: 'test4' },
    ] as UrlSegment[];

    const result = urlMatcher(urlSegments);
    expect(result.posParams['urlSegment0']).toEqual({
      path: 'test1',
    } as UrlSegment);
    expect(result.posParams['urlSegment1']).toEqual({
      path: 'test2',
    } as UrlSegment);
  });

  it('should extract preceding segments of marker as params with given name', () => {
    const urlMatcher = suffixUrlMatcher(
      'test3',
      'testParamName',
      'precedingParam'
    );
    const urlSegments = [
      { path: 'test1' },
      { path: 'test2' },
      { path: 'test3' },
      { path: 'test4' },
    ] as UrlSegment[];

    const result = urlMatcher(urlSegments);
    expect(result.posParams['precedingParam0']).toEqual({
      path: 'test1',
    } as UrlSegment);
    expect(result.posParams['precedingParam1']).toEqual({
      path: 'test2',
    } as UrlSegment);
  });
});
