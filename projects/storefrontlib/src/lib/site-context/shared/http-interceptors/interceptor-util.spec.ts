import { HttpHeaders } from '@angular/common/http';
import { InterceptorUtil } from './interceptor-util';

fdescribe('InterceptorUtil', () => {
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

  describe('getInterceptorParam', () => {
    it('should return an object from defined headers', () => {
      const headerValue = '{"url":"testUrl","pattern":"bla bla"}';
      const headerName = 'test';
      const headers = new HttpHeaders().set(headerName, headerValue);

      const result = InterceptorUtil.getInterceptorParam(headerName, headers);
      expect(result).toBeTruthy();
      expect(result).toEqual({ url: 'testUrl', pattern: 'bla bla' });
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
