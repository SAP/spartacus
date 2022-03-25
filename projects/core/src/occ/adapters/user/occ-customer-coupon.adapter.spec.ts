import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  CustomerCoupon,
  CustomerCoupon2Customer,
  CustomerCouponNotification,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';
import { CUSTOMER_COUPON_SEARCH_RESULT_NORMALIZER } from '../../../user/connectors/customer-coupon/converters';
import { ConverterService } from '../../../util/converter.service';
import { OccConfig } from '../../config/occ-config';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OCC_USER_ID_ANONYMOUS } from '../../utils/occ-constants';
import { OccCustomerCouponAdapter } from './occ-customer-coupon.adapter';
import { MockOccEndpointsService } from './unit-test.helper';

const userId = 'mockUseId';

const couponCode = 'testcouponcode';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('OccCustomerCouponAdapter', () => {
  let occCustomerCouponAdapter: OccCustomerCouponAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCustomerCouponAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    occCustomerCouponAdapter = TestBed.inject(OccCustomerCouponAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('get CustomerCoupons', () => {
    const pageSize = 5;
    const currentPage = 1;
    const sort = 'byDate';
    const customerCoupon: CustomerCoupon = {
      couponId: couponCode,
      name: 'coupon 1',
      startDate: '',
      endDate: '',
      status: 'Effective',
      description: '',
      notificationOn: true,
    };
    const couponSearchResult: CustomerCouponSearchResult = {
      coupons: [customerCoupon],
      sorts: [],
      pagination: {},
    };

    it('should use converter', () => {
      occCustomerCouponAdapter
        .getCustomerCoupons(userId, pageSize, currentPage, sort)
        .subscribe();
      httpMock
        .expectOne((req) => {
          return req.method === 'GET';
        })
        .flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(
        CUSTOMER_COUPON_SEARCH_RESULT_NORMALIZER
      );
    });
    it('should load customer search results for given user id', () => {
      occCustomerCouponAdapter
        .getCustomerCoupons(userId, pageSize, currentPage, sort)
        .subscribe((result) => {
          expect(result).toEqual(couponSearchResult);
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'customerCoupons',
        {
          urlParams: { userId: userId },
        }
      );

      expect(mockReq.request.params.get('pageSize')).toEqual(
        pageSize.toString()
      );
      expect(mockReq.request.params.get('currentPage')).toEqual(
        currentPage.toString()
      );
      expect(mockReq.request.params.get('sort')).toEqual(sort);
    });

    it('should return empty result for anonymous user id', () => {
      occCustomerCouponAdapter
        .getCustomerCoupons(OCC_USER_ID_ANONYMOUS, pageSize, currentPage, sort)
        .subscribe((result) => {
          expect(result).toEqual({});
        });

      httpMock.expectNone(
        occEnpointsService.buildUrl('customerCoupons', {
          urlParams: { userId: OCC_USER_ID_ANONYMOUS },
        })
      );
    });
  });

  describe('turn on notification', () => {
    it('should subscribe to a coupon notification for a given user id and coupon code', () => {
      const customerCoupon: CustomerCoupon = {
        couponId: couponCode,
        name: 'coupon 1',
        startDate: '',
        endDate: '',
        status: 'Effective',
        description: '',
        notificationOn: true,
      };
      const customerCouponNotification: CustomerCouponNotification = {
        coupon: customerCoupon,
        customer: {},
        status: '',
      };

      occCustomerCouponAdapter
        .turnOnNotification(userId, couponCode)
        .subscribe((result) => {
          expect(result).toEqual(customerCouponNotification);
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST';
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'couponNotification',
        {
          urlParams: { userId: userId, couponCode: couponCode },
        }
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(customerCouponNotification);
    });
  });

  describe('turn off notification', () => {
    it('should unsubscribes from a coupon notification for a given user id and coupon code', () => {
      occCustomerCouponAdapter
        .turnOffNotification(userId, couponCode)
        .subscribe((result) => expect(result).toEqual(''));

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'DELETE';
      });
      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'couponNotification',
        {
          urlParams: { userId: userId, couponCode: couponCode },
        }
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    });
  });

  describe('claim customer coupon', () => {
    it('should claim a customer coupon for a given user id and coupon code', () => {
      const customerCoupon: CustomerCoupon = {
        couponId: couponCode,
        name: 'coupon 1',
        startDate: '',
        endDate: '',
        status: 'Effective',
        description: '',
        notificationOn: true,
      };
      const customerCoupon2Customer: CustomerCoupon2Customer = {
        coupon: customerCoupon,
        customer: {},
      };

      occCustomerCouponAdapter
        .claimCustomerCoupon(userId, couponCode)
        .subscribe((result) => {
          expect(result).toEqual(customerCoupon2Customer);
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST';
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('claimCoupon', {
        urlParams: {
          userId: userId,
          couponCode: couponCode,
        },
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(customerCoupon2Customer);
    });
  });
});
