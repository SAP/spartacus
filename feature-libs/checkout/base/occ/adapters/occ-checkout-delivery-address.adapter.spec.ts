import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  Address,
  ADDRESS_NORMALIZER,
  ADDRESS_SERIALIZER,
  Cart,
  ConverterService,
  OccConfig,
  OccEndpoints,
} from '@spartacus/core';
import { OccCheckoutDeliveryAddressAdapter } from './occ-checkout-delivery-address.adapter';

const checkoutData: Partial<CheckoutState> = {
  deliveryAddress: {
    firstName: 'Janusz',
  },
};

const userId = '123';
const cartId = '456';
const cartData: Partial<Cart> = {
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
        removeDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};

describe('OccCheckoutDeliveryAddressAdapter', () => {
  let service: OccCheckoutDeliveryAddressAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutDeliveryAddressAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccCheckoutDeliveryAddressAdapter);
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
    it('should create address for cart for given user id, cart id and address', (done) => {
      const mockAddress: Address = {
        firstName: 'Mock',
        lastName: 'Address',
      };

      service.createAddress(userId, cartId, mockAddress).subscribe((result) => {
        expect(result).toEqual(mockAddress);
        done();
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
    it('should set address for cart for given user id, cart id and address id', (done) => {
      const addressId = 'addressId';

      service.setAddress(userId, cartId, addressId).subscribe((result) => {
        expect(result).toEqual(cartData);
        done();
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

  describe('clear checkout delivery address', () => {
    it('should clear checkout delivery address for given userId, cartId', (done) => {
      service
        .clearCheckoutDeliveryAddress(userId, cartId)
        .subscribe((result) => {
          expect(result).toEqual(checkoutData);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        console.log('test URL: ', req.url);
        return (
          req.method === 'DELETE' &&
          req.url === `users/${userId}/carts/${cartId}/addresses/delivery`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(checkoutData);
    });
  });
});
