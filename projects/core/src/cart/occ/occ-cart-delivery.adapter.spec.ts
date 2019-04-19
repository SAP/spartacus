import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Address, Cart, DeliveryModeList, OccConfig } from '../../occ';
import { OccCartDeliveryAdapter } from './occ-cart-delivery.adapter';

const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
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

describe('OccCartDeliveryAdapter', () => {
  let service: OccCartDeliveryAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartDeliveryAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccCartDeliveryAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('create an address for cart', () => {
    it('should create address for cart for given user id, cart id and address', () => {
      const mockAddress: Address = {
        firstName: 'Mock',
        lastName: 'Address',
      };

      service.createAddress(userId, cartId, mockAddress).subscribe(result => {
        expect(result).toEqual(mockAddress);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/addresses/' +
              'delivery'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockAddress);
    });
  });

  describe('set an address for cart', () => {
    it('should set address for cart for given user id, cart id and address id', () => {
      const mockAddressId = 'mockAddressId';

      service.setAddress(userId, cartId, mockAddressId).subscribe(result => {
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
              '/addresses/' +
              'delivery'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('addressId')).toEqual(mockAddressId);
      mockReq.flush(cartData);
    });
  });

  describe('get all supported delivery modes for cart', () => {
    it('should get all supported delivery modes for cart for given user id and cart id', () => {
      const mockDeliveryModes: DeliveryModeList = {
        deliveryModes: [{ name: 'mockDeliveryMode' }],
      };
      service.getSupportedModes(userId, cartId).subscribe(result => {
        expect(result).toEqual(mockDeliveryModes.deliveryModes);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/deliverymodes'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockDeliveryModes);
    });
  });

  describe('get delivery mode for cart', () => {
    it('should delivery modes for cart for given user id and cart id', () => {
      service.getMode(userId, cartId).subscribe(result => {
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
              '/deliverymode'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });

  describe('set delivery mode for cart', () => {
    it('should set modes for cart for given user id, cart id and delivery mode id', () => {
      const mockDeliveryModeId = 'mockDeliveryModeId';

      service.setMode(userId, cartId, mockDeliveryModeId).subscribe(result => {
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
              '/deliverymode'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('deliveryModeId')).toEqual(
        mockDeliveryModeId
      );
      mockReq.flush(cartData);
    });
  });
});
