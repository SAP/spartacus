import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ConfigInitializerService,
  I18nConfig,
  LanguageService,
} from '@spartacus/core';
import { i18n } from 'i18next';
import { RequestCallback } from 'i18next-http-backend';
import { of } from 'rxjs';
import {
  getLoadPath,
  i18nextGetHttpClient,
  i18nextInit,
  SiteContextI18nextSynchronizer,
} from './i18next-init';
import { I18NEXT_INSTANCE } from './i18next-instance';

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

describe('i18nextInit', () => {
  let i18next: i18n;
  let configInitializerService: ConfigInitializerService;
  let languageService: LanguageService;
  let httpClient: HttpClient;
  let siteContextI18nextSynchronizer: SiteContextI18nextSynchronizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LanguageService,
          useValue: { getActive: () => of('en') } as Partial<LanguageService>,
        },
      ],
    });
    i18next = TestBed.inject(I18NEXT_INSTANCE);
    configInitializerService = TestBed.inject(ConfigInitializerService);
    languageService = TestBed.inject(LanguageService);
    httpClient = TestBed.inject(HttpClient);
    siteContextI18nextSynchronizer = TestBed.inject(
      SiteContextI18nextSynchronizer
    );
  });

  describe('when using i18next http backend', () => {
    beforeEach(() => {
      const config: I18nConfig = {
        i18n: {
          backend: {
            loadPath: 'testPath',
          },
        },
      };
      spyOn(configInitializerService, 'getStable').and.returnValue(of(config));
    });

    it('should set i18next config `backend.reloadInterval` to false', () => {
      spyOn(i18next, 'init').and.callThrough();
      i18nextInit(
        i18next,
        configInitializerService,
        languageService,
        httpClient,
        null,
        siteContextI18nextSynchronizer
      )();
      const i18nextConfig = (i18next.init as jasmine.Spy).calls.argsFor(0)[0];
      expect(i18nextConfig.backend.reloadInterval).toBe(false);
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
