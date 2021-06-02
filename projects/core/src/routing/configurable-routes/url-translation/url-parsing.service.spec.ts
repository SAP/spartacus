import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlParsingService } from './url-parsing.service';

describe('UrlParsingService', () => {
  let service: UrlParsingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UrlParsingService],
    });
    service = TestBed.inject(UrlParsingService);
  });

  describe('getPrimarySegments', () => {
    it('should return single segment of single-segment url', () => {
      expect(service.getPrimarySegments('test-path')).toEqual(['test-path']);
    });

    it('should return segments of relative url', () => {
      expect(service.getPrimarySegments('some/test/path')).toEqual([
        'some',
        'test',
        'path',
      ]);
    });

    it('should return segments of url, including params segments', () => {
      expect(service.getPrimarySegments('test/:param/path')).toEqual([
        'test',
        ':param',
        'path',
      ]);
    });

    it('should return segments of absolute url without generating leading empty segment', () => {
      expect(service.getPrimarySegments('/some/test/path')).toEqual([
        'some',
        'test',
        'path',
      ]);
    });

    it('should return segments of url and ignore its query params', () => {
      expect(service.getPrimarySegments('test/path?query1=value1')).toEqual([
        'test',
        'path',
      ]);
    });

    it('should return segments of url and ignore its hash fragment', () => {
      expect(service.getPrimarySegments('test/path?#hash-fragment')).toEqual([
        'test',
        'path',
      ]);
    });

    it('should return segments of url and ignore its query params and hash fragment', () => {
      expect(
        service.getPrimarySegments('test/path?query1=value1#hash-fragment')
      ).toEqual(['test', 'path']);
    });

    it('should return primary segments of url and ignore its secondary outlets segments (case 1)', () => {
      expect(
        service.getPrimarySegments(
          'test/path/(secondaryOutlet:secondary-test-path)'
        )
      ).toEqual(['test', 'path']);
    });

    it('should return primary segments of url and ignore its secondary outlets segments (case 2)', () => {
      expect(
        service.getPrimarySegments(
          'test/path(secondaryOutlet:secondary-test-path)'
        )
      ).toEqual(['test', 'path']);
    });

    it('should return primary segments of url and ignore its secondary outlets segments (case 3)', () => {
      expect(
        service.getPrimarySegments(
          'test/(path//secondaryOutlet:secondary-test-path)'
        )
      ).toEqual(['test', 'path']);
    });

    it('should return primary segments of url and ignore its secondary outlets segments (case 4)', () => {
      expect(
        service.getPrimarySegments(
          'test/(primary:path//secondaryOutlet:secondary-test-path)'
        )
      ).toEqual(['test', 'path']);
    });

    it('should return primary segments of url and ignore its query params, hash fragment and secondary outlets segments', () => {
      expect(
        service.getPrimarySegments(
          'test/(primary:path//secondaryOutlet:secondary-test-path)?query1=value1#hash-fragment'
        )
      ).toEqual(['test', 'path']);
    });
  });

  describe('matchPath', () => {
    it('should match URL string with path string', () => {
      expect(service.matchPath('test/url/123', 'test/url/:param')).toBe(true);
    });

    it('should match URL string with path array', () => {
      expect(service.matchPath('test/url/123', ['test', 'url', ':param'])).toBe(
        true
      );
    });

    it('should match URL array with path string', () => {
      expect(service.matchPath(['test', 'url', '123'], 'test/url/:param')).toBe(
        true
      );
    });

    it('should match URL array with path array', () => {
      expect(
        service.matchPath(['test', 'url', '123'], ['test', 'url', ':param'])
      ).toBe(true);
    });

    it('should not match URL array with path array', () => {
      expect(
        service.matchPath(['test', '123'], ['test', 'url', ':param'])
      ).toBe(false);
    });

    it('should not match URL string with path array', () => {
      expect(service.matchPath('test/url/123', ['test', 'url'])).toBe(false);
    });

    it('should not match URL string with path string', () => {
      expect(service.matchPath('test/url', 'test/url/:param')).toBe(false);
    });

    it('should not match empty URL string with path string', () => {
      expect(service.matchPath('', 'test')).toBe(false);
    });

    it('should match empty URL string with empty path string', () => {
      expect(service.matchPath('', '')).toBe(true);
    });

    it('should match empty URL string with empty array', () => {
      expect(service.matchPath('', [])).toBe(true);
    });

    it('should match empty URL array with empty path array', () => {
      expect(service.matchPath([], [])).toBe(true);
    });

    it('should match empty URL array with empty path string', () => {
      expect(service.matchPath([], '')).toBe(true);
    });

    it('should match URL string with path string not containing params', () => {
      expect(service.matchPath('test/url/123', 'test/url/123')).toBe(true);
    });

    it('should match URL string with path string containing many params', () => {
      expect(service.matchPath('test/url/123', ':param1/url/:param2')).toBe(
        true
      );
    });
  });
});
