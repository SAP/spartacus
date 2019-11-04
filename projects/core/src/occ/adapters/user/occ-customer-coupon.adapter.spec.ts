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
  CustomerCoupon2Customer,
} from '../../../model/customer-coupon.model';
import { OccCustomerCouponAdapter } from './occ-customer-coupon.adapter';

const userId = 'mockUseId';

const endpoint = '/users';
const couponCode = 'testcouponcode';
const customerCouponEndpoint = '/customercoupons';
const notificationEndpoint = '/notification';
const claimEndPoint = '/claim';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
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

  describe('get CustomerCoupons', () => {
    it('should load customer search results for given user id', () => {
      const PAGE_SIZE = 5;
      const currentPage = 1;
      const sort = 'byDate';
      const customerCoupon: CustomerCoupon = {
        couponId: 'coupon1',
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

      service
        .getCustomerCoupons(userId, PAGE_SIZE, currentPage, sort)
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
    it('should subscribe to a coupon notification for a given user id and coupon code', () => {
      const customerCoupon: CustomerCoupon = {
        couponId: 'coupon1',
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

      service.turnOnNotification(userId, couponCode).subscribe(result => {
        expect(result).toEqual(customerCouponNotification);
      });

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
    });
  });

  describe('turn off notification', () => {
    it('should unsubscribes from a coupon notification for a given user id and coupon code', () => {
      service
        .turnOffNotification(userId, couponCode)
        .subscribe(result => expect(result).toEqual(''));

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

  describe('claim customer coupon', () => {
    it('should claim a customer coupon for a given user id and coupon code', () => {
      const customerCoupon: CustomerCoupon = {
        couponId: 'coupon1',
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

      service.claimCustomerCoupon(userId, couponCode).subscribe(result => {
        expect(result).toEqual(customerCoupon2Customer);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            endpoint +
              `/${userId}` +
              customerCouponEndpoint +
              `/${couponCode}` +
              claimEndPoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(customerCoupon2Customer);
    });
  });
});
