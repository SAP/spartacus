import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CheckoutState } from '@spartacus/checkout/base/root';
import { DELIVERY_MODE_NORMALIZER } from '@spartacus/checkout/core';
import {
  Cart,
  ConverterService,
  Occ,
  OccConfig,
  OccEndpoints,
} from '@spartacus/core';
import { OccCheckoutDeliveryModesAdapter } from './occ-checkout-delivery-modes.adapter';

const checkoutData: Partial<CheckoutState> = {
  deliveryAddress: {
    firstName: 'Janusz',
  },
};

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

describe('OccCheckoutDeliveryModesAdapter', () => {
  let service: OccCheckoutDeliveryModesAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutDeliveryModesAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccCheckoutDeliveryModesAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
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

  describe('clear checkout delivery mode', () => {
    it('should clear checkout delivery mode for given userId, cartId', () => {
      service.clearCheckoutDeliveryMode(userId, cartId).subscribe((result) => {
        expect(result).toEqual(checkoutData);
      });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'DELETE' &&
          req.url === `users/${userId}/carts/${cartId}/deliverymode`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(checkoutData);
    });
  });
});
