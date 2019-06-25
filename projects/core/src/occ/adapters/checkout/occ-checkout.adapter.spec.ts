import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../config/occ-config';
import { Order } from '../../../model/order.model';
import { CheckoutDetails, ConverterService } from '@spartacus/core';
import { OccCheckoutAdapter } from './occ-checkout.adapter';
import { ORDER_NORMALIZER } from '../../../checkout/connectors/checkout/converters';

const userId = '123';
const cartId = '456';

const orderData: Order = {
  site: 'electronics',
  calculated: true,
  code: '00001004',
};

const usersEndpoint = '/users';
const orderEndpoint = '/orders';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  context: {
    parameters: {
      baseSite: { default: '' },
    },
  },
};

const checkoutData: CheckoutDetails = {
  deliveryAddress: {
    firstName: 'Janusz',
  },
};
const CHECKOUT_PARAMS = 'deliveryAddress(FULL),deliveryMode,paymentInfo(FULL)';
const cartsEndpoint = 'carts';

describe('OccCheckoutAdapter', () => {
  let service: OccCheckoutAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccCheckoutAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccCheckoutAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    spyOn(converter, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('place order', () => {
    it('should be able to place order for the cart', () => {
      service.placeOrder(userId, cartId).subscribe(result => {
        expect(result).toEqual(orderData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === usersEndpoint + `/${userId}` + orderEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.params.get('cartId')).toEqual(cartId);
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orderData);
    });

    it('should use converter', () => {
      service.placeOrder(userId, cartId).subscribe();
      httpMock
        .expectOne(
          req =>
            req.method === 'POST' &&
            req.url === usersEndpoint + `/${userId}` + orderEndpoint
        )
        .flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
    });
  });

  describe('load checkout details', () => {
    it('should load checkout details data for given userId, cartId', () => {
      service.loadCheckoutDetails(userId, cartId).subscribe(result => {
        expect(result).toEqual(checkoutData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === `${usersEndpoint}/${userId}/${cartsEndpoint}/${cartId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(CHECKOUT_PARAMS);
      mockReq.flush(checkoutData);
    });
  });
});
