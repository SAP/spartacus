import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RequestCallback } from 'i18next-http-backend';
import { getLoadPath, i18nextGetHttpClient } from './i18next-init';

const testUrl = 'testUrl';

describe('i18nextGetHttpClient should return a http client that', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let req: TestRequest;
  let testCallback: RequestCallback;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

    const func = i18nextGetHttpClient(httpClient);
    testCallback = jasmine.createSpy('testCallback');
    func({}, testUrl, {}, testCallback);
    req = httpMock.expectOne({ url: testUrl, method: 'GET' });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests for responseType text', () => {
    expect(req.request.responseType).toBe('text');
  });

  it('forwards success response to i18next callback', () => {
    req.flush('testResponse');

    expect(testCallback).toHaveBeenCalledWith(null, {
      status: 200,
      data: 'testResponse',
    });
  });

  it('forwards failure response to i18next callback', () => {
    const error = 'test error message';
    const statusText = 'Not Found';
    const status = 404;
    const expectedHttpErrorResponse = new HttpErrorResponse({
      status,
      error,
      statusText,
      url: testUrl,
    });

    req.flush(error, {
      status,
      statusText,
    });
    expect(testCallback).toHaveBeenCalledWith(expectedHttpErrorResponse, {
      status,
      // a workaround for https://github.com/i18next/i18next-http-backend/issues/82
      data: null as any,
    });
  });
});

describe('getLoadPath', () => {
  describe('in non-server platform', () => {
    const serverRequestOrigin = '';

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
