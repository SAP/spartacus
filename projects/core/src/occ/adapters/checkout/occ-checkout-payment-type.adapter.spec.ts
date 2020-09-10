import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  PAYMENT_TYPE_NORMALIZER,
  Cart,
} from '@spartacus/core';
import { Occ, OccConfig } from '../../index';
import { OccCheckoutPaymentTypeAdapter } from './occ-checkout-payment-type.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
  context: {
    baseSite: [''],
  },
};
const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};

const usersEndpoint = '/users';
const cartsEndpoint = '/carts/';

describe('OccCheckoutPaymentTypeAdapter', () => {
  let service: OccCheckoutPaymentTypeAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutPaymentTypeAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(
      OccCheckoutPaymentTypeAdapter as Type<OccCheckoutPaymentTypeAdapter>
    );
    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );
    converter = TestBed.inject(ConverterService as Type<ConverterService>);

    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadPaymentypes', () => {
    it('should return paymentTypes', () => {
      const paymentTypesList: Occ.PaymentTypeList = {
        paymentTypes: [
          {
            code: 'card',
            displayName: 'card',
          },
          {
            code: 'account',
            displayName: 'account',
          },
        ],
      };

      let result;
      service.loadPaymentTypes().subscribe((res) => {
        result = res;
      });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === '/paymenttypes';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(paymentTypesList);
      expect(result).toEqual(paymentTypesList.paymentTypes);
    });

    it('should use converter', () => {
      service.loadPaymentTypes().subscribe();
      httpMock.expectOne('/paymenttypes').flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        PAYMENT_TYPE_NORMALIZER
      );
    });
  });

  describe('setPaymentType', () => {
    it('should set payment type to cart', () => {
      const typeCode = 'CARD';

      let result;
      service
        .setPaymentType(userId, cartId, typeCode)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/paymenttype'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('paymentType')).toEqual(typeCode);
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });

  describe('setPaymentType (set po number to cart)', () => {
    it('should set payment type to cart', () => {
      const typeCode = 'CARD';

      let result;
      service
        .setPaymentType(userId, cartId, typeCode, 'test-number')
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/paymenttype'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('paymentType')).toEqual(typeCode);
      expect(mockReq.request.params.get('purchaseOrderNumber')).toEqual(
        'test-number'
      );
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });
});
