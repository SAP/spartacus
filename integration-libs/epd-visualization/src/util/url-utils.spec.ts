import { getUrl, isHttpOrHttps, isOrigin } from './url-utils';

describe('getUrl', () => {
  it('should return object for parsable input', () => {
    expect(getUrl('https://www.google.com/')).toBeInstanceOf(URL);
  });

  it('should return null for input that cannot be parsed as a URL', () => {
    expect(getUrl('not a valid URL')).toBeNull();
  });

  it('should return null for undefined input', () => {
    expect(getUrl(undefined)).toBeNull();
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

describe('isOrigin', () => {
  it('should return true for URLs containing just origin portion', () => {
    expect(isOrigin(new URL('https://www.google.com'))).toEqual(true);
    expect(isOrigin(new URL('https://www.google.com/'))).toEqual(true);
    expect(isOrigin(new URL('http://localhost:8000'))).toEqual(true);
  });

  it('should fail for URLs containing path components', () => {
    expect(isOrigin(new URL('http://localhost:8000/a'))).toEqual(false);
  });

  it('should fail for URLs containing query strings', () => {
    expect(isOrigin(new URL('https://www.google.com?q=searchstring'))).toEqual(
      false
    );
  });
});
