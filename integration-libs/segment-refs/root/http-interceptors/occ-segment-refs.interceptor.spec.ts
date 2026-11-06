import {
  HttpClient,
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { SegmentRefsConfig } from '../config/segment-refs-config';
import { OccSegmentRefsInterceptor } from './occ-segment-refs.interceptor';

const url =
  'https://localhost:9002/occ/v2/electronics-spa/cms/pages?lang=en&curr=USD';
const mockSegmentRefsConfig: SegmentRefsConfig = {
  segmentRefs: {
    httpHeaderName: 'mock-Segmentrefs',
  },
};
const MockWindowRef1 = {
  localStorage: {
    setItem: (_key: string, _value: string) => {},
  },
  isBrowser(): boolean {
    return true;
  },
  location: {
    href: 'http://localhost:4200/electronics-spa/en/USD/?segmentrefs=footwear,bags',
  },
};
const MockWindowRef2 = {
  localStorage: {
    getItem: (_key: string): string => {
      return 'footwear,bags';
    },
  },
  isBrowser(): boolean {
    return true;
  },
  location: {
    href: 'http://localhost:4200/electronics-spa/en/USD/',
  },
};
const MockWindowRef3 = {
  localStorage: {
    getItem: (_key: string): null => {
      return null;
    },
  },
  isBrowser(): boolean {
    return true;
  },
  location: {
    href: 'http://localhost:4200/electronics-spa/en/USD/',
  },
};
const MockWindowRef4 = {
  isBrowser(): boolean {
    return false;
  },
  location: {
    href: 'http://localhost:4200/electronics-spa/en/USD/?segmentrefs=footwear',
  },
};
const MockWindowRef5 = {
  localStorage: {
    getItem: (_key: string): null => null,
  },
  isBrowser(): boolean {
    return true;
  },
  location: {
    href: null,
  },
};
const mockSegmentRefsConfigNoHeader: SegmentRefsConfig = { segmentRefs: {} };

describe('OccSegmentRefsInterceptor', () => {
  describe('launch storefront with url containing segmentrefs', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: SegmentRefsConfig, useValue: mockSegmentRefsConfig },
          { provide: WindowRef, useValue: MockWindowRef1 },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: OccSegmentRefsInterceptor,
            multi: true,
          },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
      httpMock.verify();
    });
    it('should add request header if segmentrefs exists in url', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(url).subscribe((result) => {
          expect(result).toBeTruthy();
        });
        const mockReq = httpMock.expectOne((req) => {
          return req.method === 'GET';
        });
        const perHeader = mockReq.request.headers.get('mock-Segmentrefs');
        expect(perHeader).toBeTruthy();
        expect(perHeader).toEqual('footwear,bags');
        mockReq.flush('someData');
      }
    ));
  });

  describe('launch storefront with url not containing segmentrefs but previous histroty exists', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: SegmentRefsConfig, useValue: mockSegmentRefsConfig },
          { provide: WindowRef, useValue: MockWindowRef2 },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: OccSegmentRefsInterceptor,
            multi: true,
          },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
      httpMock.verify();
    });
    it('should add request header if segmentrefs exists in local storage', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(url).subscribe((result) => {
          expect(result).toBeTruthy();
        });
        const mockReq = httpMock.expectOne((req) => {
          return req.method === 'GET';
        });
        const perHeader = mockReq.request.headers.get('mock-Segmentrefs');
        expect(perHeader).toBeTruthy();
        expect(perHeader).toEqual('footwear,bags');
        mockReq.flush('someData');
      }
    ));
  });

  describe('launch storefront with url not containing segmentrefs and no previous history of segmentRefs', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: SegmentRefsConfig, useValue: mockSegmentRefsConfig },
          { provide: WindowRef, useValue: MockWindowRef3 },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: OccSegmentRefsInterceptor,
            multi: true,
          },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
      httpMock.verify();
    });
    it('should not add request header if segmentrefs doesnot exists', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(url).subscribe((result) => {
          expect(result).toBeTruthy();
        });
        const mockReq = httpMock.expectOne((req) => {
          return req.method === 'GET';
        });
        const perHeader = mockReq.request.headers.get('mock-Segmentrefs');
        expect(perHeader).toBeFalsy();
        expect(perHeader).toEqual(null);
        mockReq.flush('someData');
      }
    ));
  });

  describe('when isBrowser returns false', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: SegmentRefsConfig, useValue: mockSegmentRefsConfig },
          { provide: WindowRef, useValue: MockWindowRef4 },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: OccSegmentRefsInterceptor,
            multi: true,
          },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
      httpMock.verify();
    });
    it('should not add request header when not running in browser', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(url).subscribe((result) => {
          expect(result).toBeTruthy();
        });
        const mockReq = httpMock.expectOne((req) => req.method === 'GET');
        const perHeader = mockReq.request.headers.get('mock-Segmentrefs');
        expect(perHeader).toBeNull();
        mockReq.flush('someData');
      }
    ));
  });

  describe('when httpHeaderName is not configured', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: SegmentRefsConfig,
            useValue: mockSegmentRefsConfigNoHeader,
          },
          { provide: WindowRef, useValue: MockWindowRef1 },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: OccSegmentRefsInterceptor,
            multi: true,
          },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
      httpMock.verify();
    });
    it('should not add request header when httpHeaderName is not configured', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(url).subscribe((result) => {
          expect(result).toBeTruthy();
        });
        const mockReq = httpMock.expectOne((req) => req.method === 'GET');
        const perHeader = mockReq.request.headers.get('mock-Segmentrefs');
        expect(perHeader).toBeNull();
        mockReq.flush('someData');
      }
    ));
  });

  describe('when location href is null', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: SegmentRefsConfig, useValue: mockSegmentRefsConfig },
          { provide: WindowRef, useValue: MockWindowRef5 },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: OccSegmentRefsInterceptor,
            multi: true,
          },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
      httpMock.verify();
    });
    it('should not add request header when href is null', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(url).subscribe((result) => {
          expect(result).toBeTruthy();
        });
        const mockReq = httpMock.expectOne((req) => req.method === 'GET');
        const perHeader = mockReq.request.headers.get('mock-Segmentrefs');
        expect(perHeader).toBeNull();
        mockReq.flush('someData');
      }
    ));
  });
});
