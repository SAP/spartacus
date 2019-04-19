import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Cart, OccConfig, PaymentDetails } from '../../occ';
import { OccCartPaymentAdapter } from './occ-cart-payment.adapter';

const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};
const mockPaymentDetails: PaymentDetails = {
  accountHolderName: 'mockPaymentDetails',
};

const usersEndpoint = '/users';
const cartsEndpoint = '/carts/';

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

describe('OccCartPaymentAdapter', () => {
  let service: OccCartPaymentAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartPaymentAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccCartPaymentAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('get payment provider subscription info', () => {
    it('should get payment provider subscription info for given user id and cart id', () => {
      service.getProviderSubInfo(userId, cartId).subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/payment/sop/request?responseUrl=sampleUrl'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });

  describe('create subscription with payment provider with single param', () => {
    it('should create subscription with payment provider for given url and parameters', () => {
      const params = {
        param: 'mockParam',
      };
      const mockUrl = 'mockUrl';
      const mockPaymentProvider = 'mockPaymentProvider';

      service.createSubWithProvider(mockUrl, params).subscribe(result => {
        expect(result).toEqual(mockPaymentProvider);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === mockUrl;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.headers.get('Accept')).toEqual('text/html');
      expect(mockReq.request.responseType).toEqual('text');
      expect(mockReq.request.body.get('param')).toEqual('mockParam');
      mockReq.flush(mockPaymentProvider);
    });
  });

  describe('create subscription with payment provider with multiple params', () => {
    it('should create subscription with payment provider for given url and parameters', () => {
      const params = {
        param1: 'mockParam1',
        param2: 'mockParam2',
      };
      const mockUrl = 'mockUrl';
      const mockPaymentProvider = 'mockPaymentProvider';

      service.createSubWithProvider(mockUrl, params).subscribe(result => {
        expect(result).toEqual(mockPaymentProvider);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === mockUrl;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.headers.get('Accept')).toEqual('text/html');
      expect(mockReq.request.body.get('param1')).toEqual('mockParam1');
      expect(mockReq.request.body.get('param2')).toEqual('mockParam2');
      expect(mockReq.request.responseType).toEqual('text');
      mockReq.flush(mockPaymentProvider);
    });
  });

  describe('create payment details with single param', () => {
    it('should create payment details for given user id, cart id and parameters', () => {
      const params = {
        param: 'mockParam',
      };

      service.createDetails(userId, cartId, params).subscribe(result => {
        expect(result).toEqual(mockPaymentDetails);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/payment/sop/response'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.body.get('param')).toEqual('mockParam');
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockPaymentDetails);
    });
  });

  describe('create payment details with multiple params', () => {
    it('should create payment details for given user id, cart id and parameters', () => {
      const params = {
        param1: 'mockParam1',
        param2: 'mockParam2',
      };

      service.createDetails(userId, cartId, params).subscribe(result => {
        expect(result).toEqual(mockPaymentDetails);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/payment/sop/response'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.body.get('param1')).toEqual('mockParam1');
      expect(mockReq.request.body.get('param2')).toEqual('mockParam2');
      mockReq.flush(mockPaymentDetails);
    });
  });

  describe('set payment details', () => {
    it('should set payment details for given user id, cart id and payment details id', () => {
      service.setDetails(userId, cartId, '123').subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'PUT' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/paymentdetails'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.params.get('paymentDetailsId')).toEqual('123');
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });
});
