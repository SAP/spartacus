import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../config/occ-config';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
  CustomerCouponNotification,
} from '../../../model/customer-coupon.model';
import { OccCustomerCouponAdapter } from './occ-customer-coupon.adapter';

const userId = 'mockUseId';

const endpoint = '/users';
const couponCode = 'testcouponcode';
const customerCouponEndpoint = '/customercoupons';
const notificationEndpoint = '/notification';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  site: {
    baseSite: '',
  },
};

describe('OccCustomerCouponAdapter', () => {
  let service: OccCustomerCouponAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCustomerCouponAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccCustomerCouponAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('get MyCoupons', () => {
    it('should load customer search results for given user id', () => {
      const PAGE_SIZE = 5;
      const currentPage = 1;
      const sort = 'byDate';
      const customerCoupon: CustomerCoupon = {
        couponId: 'coupon1',
        name: 'coupon 1',
        startDate: new Date(),
        endDate: new Date(),
        status: 'Effective',
        description: '',
        notificationOn: '',
        solrFacets: '',
      };
      const couponSearchResult: CustomerCouponSearchResult = {
        coupons: [customerCoupon],
        sorts: {},
        pagination: {},
      };

      service
        .getMyCoupons(userId, PAGE_SIZE, currentPage, sort)
        .subscribe(result => {
          expect(result).toEqual(couponSearchResult);
        });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === endpoint + `/${userId}` + customerCouponEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(couponSearchResult);
    });
  });

  describe('turn on notification', () => {
    it('should subscribes to a coupon notification for a given user id and coupon code', () => {
      const customerCoupon: CustomerCoupon = {
        couponId: 'coupon1',
        name: 'coupon 1',
        startDate: new Date(),
        endDate: new Date(),
        status: 'Effective',
        description: '',
        notificationOn: '',
        solrFacets: '',
      };
      let result;
      const customerCouponNotification: CustomerCouponNotification = {
        coupon: customerCoupon,
        customer: {},
        status: '',
      };
      service
        .turnOnNotification(userId, couponCode)
        .subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            endpoint +
              `/${userId}` +
              customerCouponEndpoint +
              `/${couponCode}` +
              notificationEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(customerCouponNotification);
      expect(result).toEqual(customerCouponNotification);
    });
  });

  describe('turn off notification', () => {
    it('should unsubscribes from a coupon notification for a given user id and coupon code', () => {
      let result;
      service
        .turnOffNotification(userId, couponCode)
        .subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'DELETE' &&
          req.url ===
            endpoint +
              `/${userId}` +
              customerCouponEndpoint +
              `/${couponCode}` +
              notificationEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    });
  });
});
