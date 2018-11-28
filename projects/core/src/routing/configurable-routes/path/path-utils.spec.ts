import * as pathUtils from './path-utils';

describe('path utils', () => {
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
