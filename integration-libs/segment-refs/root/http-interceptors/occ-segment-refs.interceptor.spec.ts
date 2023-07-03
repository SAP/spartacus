import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
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
const MockWindowRefWithSegmentRefs = {
  isBrowser(): boolean {
    return true;
  },
  location: {
    href: 'http://localhost:4200/electronics-spa/en/USD/?segmentrefs=footwear,bags',
  },
};
const MockWindowRefWithoutSegmentRefs = {
  isBrowser(): boolean {
    return true;
  },
  location: {
    href: 'http://localhost:4200/electronics-spa/en/USD/',
  },
};

describe('OccSegmentRefsInterceptor with segmentrefs', () => {
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SegmentRefsConfig, useValue: mockSegmentRefsConfig },
        { provide: WindowRef, useValue: MockWindowRefWithSegmentRefs },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OccSegmentRefsInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should add request header if segmentrefs exists', inject(
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

describe('OccSegmentRefsInterceptor without segmentrefs', () => {
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SegmentRefsConfig, useValue: mockSegmentRefsConfig },
        { provide: WindowRef, useValue: MockWindowRefWithoutSegmentRefs },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OccSegmentRefsInterceptor,
          multi: true,
        },
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
