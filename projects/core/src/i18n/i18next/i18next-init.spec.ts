import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { getLoadPath, i18nextGetHttpClient } from './i18next-init';

describe('i18nextGetHttpClient should return a http client that', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let req: TestRequest;
  let testCallback: Function;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

    const func = i18nextGetHttpClient(httpClient);
    testCallback = jasmine.createSpy('testCallback');
    func('testUrl', null, testCallback, null);
    req = httpMock.expectOne({ url: 'testUrl', method: 'GET' });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests for responseType text', () => {
    expect(req.request.responseType).toBe('text');
  });

  it('forwards success response to i18next callback', () => {
    req.flush('testResponse');
    expect(testCallback).toHaveBeenCalledWith('testResponse', { status: 200 });
  });

  it('forwards failure response to i18next callback', () => {
    req.flush('test error message', { status: 404, statusText: 'Not Found' });
    expect(testCallback).toHaveBeenCalledWith(null, { status: 404 });
  });
});

describe('getLoadPath', () => {
  describe('in non-server platform', () => {
    const serverRequestOrigin = null;

    describe('with relative path starting with "./"', () => {
      const path = './path';

      it('should return the original path', () => {
        expect(getLoadPath(path, serverRequestOrigin)).toBe(path);
      });
    });

    describe('with relative path starting with "/"', () => {
      const path = '/path';

      it('should return the original path', () => {
        expect(getLoadPath(path, serverRequestOrigin)).toBe(path);
      });
    });

    describe('with relative path starting with ""', () => {
      const path = 'path';

      it('should return the original path', () => {
        expect(getLoadPath(path, serverRequestOrigin)).toBe(path);
      });
    });

    describe('with absolute path starting with "http://"', () => {
      const path = 'http://path';

      it('should return the original path', () => {
        expect(getLoadPath(path, serverRequestOrigin)).toBe(path);
      });
    });

    describe('with absolute path starting with "https://"', () => {
      const path = 'https://path';

      it('should return the original path', () => {
        expect(getLoadPath(path, serverRequestOrigin)).toBe(path);
      });
    });
  });

  describe('in server platform', () => {
    const serverRequestOrigin = 'http://server.com';

    describe('with relative path starting with "./"', () => {
      const path = './path';

      it('should return the original path prepended with server request origin', () => {
        expect(getLoadPath(path, serverRequestOrigin)).toBe(
          'http://server.com/path'
        );
      });
    });

    describe('with relative path starting with "/"', () => {
      const path = '/path';

      it('should return the original path prepended with server request origin', () => {
        expect(getLoadPath(path, serverRequestOrigin)).toBe(
          'http://server.com/path'
        );
      });
    });

    describe('with relative path starting with ""', () => {
      const path = 'path';

      it('should return the original path prepended with server request origin', () => {
        expect(getLoadPath(path, serverRequestOrigin)).toBe(
          'http://server.com/path'
        );
      });
    });

    describe('with absolute path starting with "http://"', () => {
      const path = 'http://path';

      it('should return the original path', () => {
        expect(getLoadPath(path, serverRequestOrigin)).toBe(path);
      });
    });

    describe('with absolute path starting with "https://"', () => {
      const path = 'https://path';

      it('should return the original path', () => {
        expect(getLoadPath(path, serverRequestOrigin)).toBe(path);
      });
    });
  });
});
