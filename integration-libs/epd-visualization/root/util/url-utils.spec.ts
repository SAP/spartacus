import { getUrl, isHttpOrHttps } from './url-utils';
describe('UrlUtils', () => {
  describe('getUrl', () => {
    it('should return object for parsable input', () => {
      expect(getUrl('https://www.google.com/')).toBeInstanceOf(URL);
    });

    it('should return null for input that cannot be parsed as a URL', () => {
      expect(getUrl('not a valid URL')).toBeNull();
    });
  });

  describe('isHttpOrHttps', () => {
    it('should return true for https: protocol', () => {
      expect(isHttpOrHttps(new URL('https://www.google.com/'))).toBeTruthy();
    });

    it('should return true for http: protocol', () => {
      expect(isHttpOrHttps(new URL('http://www.google.com/'))).toBeTruthy();
    });

    it('should return false for data: protocol', () => {
      expect(
        isHttpOrHttps(new URL('data://data:text/plain,some%20data/'))
      ).toBeFalsy();
    });
  });
});
