import { getCookie } from './get-cookie';

describe('getCookie utility', () => {
  it('should get single cookie', () => {
    const cookie = 'testKey=testValue';
    expect(getCookie(cookie, 'testKey')).toBe('testValue');
  });

  it('should not get cookie with the prefix name', () => {
    const cookie = 'customtestKey=testValue';
    expect(getCookie(cookie, 'testKey')).toBe('');
  });

  it('should get the first cookie', () => {
    const cookie = 'testKey=testValue; x=y; a=b';
    expect(getCookie(cookie, 'testKey')).toBe('testValue');
  });

  it('should get the middle cookie', () => {
    const cookie = 'x=y; testKey=testValue; a=b';
    expect(getCookie(cookie, 'testKey')).toBe('testValue');
  });

  it('should get the last cookie', () => {
    const cookie = 'x=y; a=b; testKey=testValue';
    expect(getCookie(cookie, 'testKey')).toBe('testValue');
  });

  it('should return empty string when there is no cookie with given name', () => {
    const cookie = 'x=y; a=b;';
    expect(getCookie(cookie, 'testKey')).toBe('');
  });
});
