import * as pathUtils from './path-utils';

describe('path utils', () => {
  describe('getSegments', () => {
    it('should return parts of given string splitted with slash', () => {
      expect(pathUtils.getSegments('path')).toEqual(['path']);
      expect(pathUtils.getSegments('/path')).toEqual(['', 'path']);
      expect(pathUtils.getSegments('test-path')).toEqual(['test-path']);
      expect(pathUtils.getSegments('test/path')).toEqual(['test', 'path']);
      expect(pathUtils.getSegments('/test/:param/path')).toEqual([
        '',
        'test',
        ':param',
        'path'
      ]);
      expect(
        pathUtils.getSegments('/test/:param/path?query=queryValue')
      ).toEqual(['', 'test', ':param', 'path?query=queryValue']);
    });
  });

  describe('isParameter', () => {
    it('should return if given string string starting with colon', () => {
      expect(pathUtils.isParam(':test')).toBeTruthy();
      expect(pathUtils.isParam('::test')).toBeTruthy();
      expect(pathUtils.isParam('test')).toBeFalsy();
      expect(pathUtils.isParam('test:')).toBeFalsy();
      expect(pathUtils.isParam('t:est')).toBeFalsy();
    });
  });

  describe('getParameterName', () => {
    it('should return given string without first character', () => {
      expect(pathUtils.getParamName(':test')).toBe('test');
      expect(pathUtils.getParamName('test')).toBe('est');
    });
  });

  describe('ensureLeadingSlash', () => {
    it('should return given string preceded with slash', () => {
      expect(pathUtils.ensureLeadingSlash('/test/path')).toBe('/test/path');
      expect(pathUtils.ensureLeadingSlash('test/path')).toBe('/test/path');
      expect(pathUtils.ensureLeadingSlash('')).toBe('/');
      expect(pathUtils.ensureLeadingSlash('/')).toBe('/');
      expect(pathUtils.ensureLeadingSlash('//')).toBe('//');
      expect(pathUtils.ensureLeadingSlash('//test-path')).toBe('//test-path');
    });
  });

  describe('removeLeadingSlash', () => {
    it('should return given string without leading slash', () => {
      expect(pathUtils.removeLeadingSlash('/test/path')).toBe('test/path');
      expect(pathUtils.removeLeadingSlash('test/path')).toBe('test/path');
      expect(pathUtils.removeLeadingSlash('')).toBe('');
      expect(pathUtils.removeLeadingSlash('/')).toBe('');
      expect(pathUtils.removeLeadingSlash('//')).toBe('/');
      expect(pathUtils.removeLeadingSlash('//test-path')).toBe('/test-path');
    });
  });
});
