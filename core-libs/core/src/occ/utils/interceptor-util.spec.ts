import { HttpHeaders, HttpRequest } from '@angular/common/http';

import { InterceptorUtil } from './interceptor-util';

describe('InterceptorUtil', () => {
  describe('createHeader', () => {
    it('should create new headers object', () => {
      const headerName = 'test';
      const mockObject = { url: 'testUrl', pattern: 'bla bla' };
      const result = InterceptorUtil.createHeader(headerName, mockObject);
      expect(result).toBeTruthy();

      const header = result.get(headerName);
      expect(header).toBeTruthy();
      expect(header).toEqual(JSON.stringify(mockObject));
    });
    it('should append a header', () => {
      const headerName = 'test';
      const mockObject = { url: 'testUrl', pattern: 'bla bla' };
      const headers = new HttpHeaders().set('Authorization', 'bearer bla-bla');
      const result = InterceptorUtil.createHeader(
        headerName,
        mockObject,
        headers
      );

      expect(result).toBeTruthy();
      const allHeaders = result.keys();
      expect(allHeaders).toBeTruthy();
      expect(allHeaders.length).toEqual(2);
    });
  });

  describe(`removeHeader`, () => {
    it(`should remove a header`, () => {
      let request = new HttpRequest('GET', 'http://test.com');
      const headerName = 'X';
      request = request.clone({
        setHeaders: {
          headerName: `true`,
        },
      });

      request = InterceptorUtil.removeHeader(headerName, request);
      expect(request.headers.get(headerName)).toBeFalsy();
    });
  });

  describe('getInterceptorParam', () => {
    it('should return an object from defined headers', () => {
      const headerValue = 'true';
      const headerName = 'test';
      const headers = new HttpHeaders().set(headerName, headerValue);

      const result = InterceptorUtil.getInterceptorParam(headerName, headers);
      expect(result).toBeTruthy();
      expect(result).toEqual(true);
    });
    it('should return undefined when no header is found', () => {
      const result = InterceptorUtil.getInterceptorParam(
        'test',
        new HttpHeaders()
      );
      expect(result).toBeFalsy();
    });
  });
});
