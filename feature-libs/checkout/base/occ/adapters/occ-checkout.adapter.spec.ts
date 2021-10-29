import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  ConverterService,
  OccConfig,
  OccEndpoints,
  Order,
  ORDER_NORMALIZER,
} from '@spartacus/core';
import { OccCheckoutAdapter } from './occ-checkout.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        placeOrder: 'users/${userId}/orders?fields=FULL',
        removeDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        clearDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        getCheckoutDetails:
          'users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode,paymentInfo(FULL)',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};

const userId = '123';
const cartId = '456';
const termsChecked = true;

const orderData: Order = {
  site: 'electronics',
  calculated: true,
  code: '00001004',
};

const checkoutData: Partial<CheckoutState> = {
  deliveryAddress: {
    firstName: 'Janusz',
  },
};

describe('OccCheckoutAdapter', () => {
  let service: OccCheckoutAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccCheckoutAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('place order', () => {
    it('should be able to place order for the cart', () => {
      service.placeOrder(userId, cartId, termsChecked).subscribe((result) => {
        expect(result).toEqual(orderData);
      });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url ===
            `users/${userId}/orders?fields=FULL&cartId=${cartId}&termsChecked=${termsChecked}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orderData);
    });

    it('should use converter', () => {
      service.placeOrder(userId, cartId, termsChecked).subscribe();
      httpMock
        .expectOne(
          (req) =>
            req.method === 'POST' &&
            req.url ===
              `users/${userId}/orders?fields=FULL&cartId=${cartId}&termsChecked=${termsChecked}`
        )
        .flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
    });
  });

  describe('get checkout details', () => {
    it('should get checkout details data for given userId, cartId', () => {
      service.getCheckoutDetails(userId, cartId).subscribe((result) => {
        expect(result).toEqual(checkoutData as CheckoutState);
      });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode,paymentInfo(FULL)`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(checkoutData);
    });
  });
});
