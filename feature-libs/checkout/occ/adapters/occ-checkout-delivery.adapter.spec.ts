import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  Address,
  ADDRESS_NORMALIZER,
  ADDRESS_SERIALIZER,
  Cart,
  ConverterService,
  Occ,
  OccConfig,
  OccEndpoints,
} from '@spartacus/core';
import { OccCheckoutDeliveryAdapter } from './occ-checkout-delivery.adapter';
import { DELIVERY_MODE_NORMALIZER } from '@spartacus/checkout/core';

const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        setDeliveryAddress:
          'orgUsers/${userId}/carts/${cartId}/addresses/delivery',
        createDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        deliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        setDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        deliveryModes: 'users/${userId}/carts/${cartId}/deliverymodes',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};

describe('OccCheckoutDeliveryAdapter', () => {
  let service: OccCheckoutDeliveryAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutDeliveryAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccCheckoutDeliveryAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
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

      service.createAddress(userId, cartId, mockAddress).subscribe((result) => {
        expect(result).toEqual(mockAddress);
      });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url === `users/${userId}/carts/${cartId}/addresses/delivery`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockAddress);
      expect(converter.pipeable).toHaveBeenCalledWith(ADDRESS_NORMALIZER);
      expect(converter.convert).toHaveBeenCalledWith(
        mockAddress,
        ADDRESS_SERIALIZER
      );
    });
  });

  describe('set an address for cart', () => {
    it('should set address for cart for given user id, cart id and address id', () => {
      const addressId = 'addressId';

      service.setAddress(userId, cartId, addressId).subscribe((result) => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `orgUsers/${userId}/carts/${cartId}/addresses/delivery?addressId=${addressId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });

  describe('get all supported delivery modes for cart', () => {
    it('should get all supported delivery modes for cart for given user id and cart id', () => {
      const mockDeliveryModes: Occ.DeliveryModeList = {
        deliveryModes: [{ name: 'mockDeliveryMode' }],
      };

      service.getSupportedModes(userId, cartId).subscribe((result) => {
        expect(result).toEqual(mockDeliveryModes.deliveryModes);
      });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url === `users/${userId}/carts/${cartId}/deliverymodes`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockDeliveryModes);
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        DELIVERY_MODE_NORMALIZER
      );
    });
  });

  describe('get delivery mode for cart', () => {
    it('should delivery modes for cart for given user id and cart id', () => {
      service.getMode(userId, cartId).subscribe((result) => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url === `users/${userId}/carts/${cartId}/deliverymode`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(converter.pipeable).toHaveBeenCalledWith(DELIVERY_MODE_NORMALIZER);
    });
  });

  describe('set delivery mode for cart', () => {
    it('should set modes for cart for given user id, cart id and delivery mode id', () => {
      const deliveryModeId = 'deliveryModeId';

      service.setMode(userId, cartId, deliveryModeId).subscribe((result) => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `users/${userId}/carts/${cartId}/deliverymode?deliveryModeId=${deliveryModeId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });
});
