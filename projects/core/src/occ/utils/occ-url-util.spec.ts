import { urlPathJoin } from './occ-url-util';

describe('urlPathJoin', () => {
  it('should join parts', () => {
    expect(urlPathJoin('test1', 'test2', 'test3')).toEqual('test1/test2/test3');
  });

  it('should omit empty, null and undefined values', () => {
    expect(urlPathJoin('test1', '', 'test2', null, undefined, 'test3')).toEqual(
      'test1/test2/test3'
    );
  });

  it('should NOT double slashes', () => {
    expect(urlPathJoin('test1/', '/test2', '/test3')).toEqual(
      'test1/test2/test3'
    );
  });

  it('should keep correct double slashes', () => {
    expect(urlPathJoin('https://test123', '/occ/v2/', 'test3')).toEqual(
      'https://test123/occ/v2/test3'
    );
  });

  it('should keep preceding and trailing slashes', () => {
    expect(urlPathJoin('/test1/', 'test2', 'test3/')).toEqual(
      '/test1/test2/test3/'
    );
  });
});
