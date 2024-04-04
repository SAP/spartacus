import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { OppsConfig } from '../config/opps-config';
import { OccOppsInterceptor } from './occ-opps.interceptor';

const url =
  'https://localhost:9002/occ/v2/electronics-spa/cms/pages?lang=en&curr=USD';
const mockOppsConfig: OppsConfig = {
  opps: {
    httpHeaderName: 'mock-opps',
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
    href: 'http://localhost:4200/electronics-spa/en/USD/?opps=footwear,bags',
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
describe('OccOppsInterceptor', () => {
  describe('launch storefront with url containing opps', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: OppsConfig, useValue: mockOppsConfig },
          { provide: WindowRef, useValue: MockWindowRef1 },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: OccOppsInterceptor,
            multi: true,
          },
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
      httpMock.verify();
    });
    it('should add request header if opps exists in url', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(url).subscribe((result) => {
          expect(result).toBeTruthy();
        });
        const mockReq = httpMock.expectOne((req) => {
          return req.method === 'GET';
        });
        const perHeader = mockReq.request.headers.get('mock-opps');
        expect(perHeader).toBeTruthy();
        expect(perHeader).toEqual('footwear,bags');
        mockReq.flush('someData');
      }
    ));
  });

  describe('launch storefront with url not containing opps but previous histroty exists', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: OppsConfig, useValue: mockOppsConfig },
          { provide: WindowRef, useValue: MockWindowRef2 },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: OccOppsInterceptor,
            multi: true,
          },
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
      httpMock.verify();
    });
    it('should add request header if opps exists in local storage', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(url).subscribe((result) => {
          expect(result).toBeTruthy();
        });
        const mockReq = httpMock.expectOne((req) => {
          return req.method === 'GET';
        });
        const perHeader = mockReq.request.headers.get('mock-opps');
        expect(perHeader).toBeTruthy();
        expect(perHeader).toEqual('footwear,bags');
        mockReq.flush('someData');
      }
    ));
  });

  describe('launch storefront with url not containing opps and no previous history of opps', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: OppsConfig, useValue: mockOppsConfig },
          { provide: WindowRef, useValue: MockWindowRef3 },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: OccOppsInterceptor,
            multi: true,
          },
        ],
      });
      httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
      httpMock.verify();
    });
    it('should not add request header if opps doesnot exists', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get(url).subscribe((result) => {
          expect(result).toBeTruthy();
        });
        const mockReq = httpMock.expectOne((req) => {
          return req.method === 'GET';
        });
        const perHeader = mockReq.request.headers.get('mock-opps');
        expect(perHeader).toBeFalsy();
        expect(perHeader).toEqual(null);
        mockReq.flush('someData');
      }
    ));
  });
});
