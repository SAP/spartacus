import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { OppsConfig } from '../../config';
import { OccOppsCouponCodesInterceptor } from './occ-opps-coupon-codes.interceptor';
import { OppsCouponCodesService } from '../opps-coupon-codes.service';
class MockOppsCouponCodesService implements Partial<OppsCouponCodesService> {
  getCouponCodes(): string | undefined | null {
    return 'testCoupon';
  }
}
const url =
  'https://localhost:9002/occ/v2/electronics-spa/cms/pages?lang=en&curr=USD';
const mockOppsConfig: OppsConfig = {
  opps: {
    couponcodes: {
      httpHeaderName: 'mock-coupon-header',
    },
  },
};
const MockWindowRef = {
  isBrowser(): boolean {
    return true;
  },
};

describe('OccCouponCodesInterceptor', () => {
  let httpMock: HttpTestingController;
  let couponService: OppsCouponCodesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OppsConfig, useValue: mockOppsConfig },
        { provide: WindowRef, useValue: MockWindowRef },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OccOppsCouponCodesInterceptor,
          multi: true,
        },
        {
          provide: OppsCouponCodesService,
          useClass: MockOppsCouponCodesService,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    couponService = TestBed.inject(OppsCouponCodesService);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should add request header if coupon codes exists', inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOn(couponService, 'getCouponCodes').and.returnValue('pink,blue');
      http.get(url).subscribe((result) => {
        expect(result).toBeTruthy();
      });
      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      const perHeader = mockReq.request.headers.get('mock-coupon-header');
      expect(perHeader).toBeTruthy();
      expect(perHeader).toEqual('pink,blue');
      mockReq.flush('someData');
    }
  ));
  it('should not add request header if coupon codes doesnot exist', inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOn(couponService, 'getCouponCodes').and.returnValue(null);
      http.get(url).subscribe((result) => {
        expect(result).toBeTruthy();
      });
      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      const perHeader = mockReq.request.headers.get('mock-coupon-header');
      expect(perHeader).toBeFalsy();
      expect(perHeader).toEqual(null);
      mockReq.flush('someData');
    }
  ));
});
