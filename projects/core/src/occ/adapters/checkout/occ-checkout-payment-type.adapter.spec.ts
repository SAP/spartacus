import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Cart,
  ConverterService,
  PAYMENT_TYPE_NORMALIZER,
} from '@spartacus/core';
import { Occ, OccConfig } from '../../index';
import { OccCheckoutPaymentTypeAdapter } from './occ-checkout-payment-type.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        cartPaymentType:
          'users/${userId}/carts/${cartId}/paymenttype?fields=DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user',
      },
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
      const paymentType = 'CARD';

      let result;
      service
        .setPaymentType(userId, cartId, paymentType)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `/users/${userId}/carts/${cartId}/paymenttype?fields=DEFAULT%2CpotentialProductPromotions%2CappliedProductPromotions%2CpotentialOrderPromotions%2CappliedOrderPromotions%2Centries(totalPrice(formattedValue)%2Cproduct(images(FULL)%2Cstock(FULL))%2CbasePrice(formattedValue%2Cvalue)%2Cupdateable)%2CtotalPrice(formattedValue)%2CtotalItems%2CtotalPriceWithTax(formattedValue)%2CtotalDiscounts(value%2CformattedValue)%2CsubTotal(formattedValue)%2CdeliveryItemsQuantity%2CdeliveryCost(formattedValue)%2CtotalTax(formattedValue%2C%20value)%2CpickupItemsQuantity%2Cnet%2CappliedVouchers%2CproductDiscounts(formattedValue)%2Cuser&paymentType=${paymentType}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });

  describe('setPaymentType (set po number to cart)', () => {
    it('should set payment type to cart', () => {
      const paymentType = 'CARD';
      const purchaseOrderNumber = 'test-number';

      let result;
      service
        .setPaymentType(userId, cartId, paymentType, purchaseOrderNumber)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `/users/${userId}/carts/${cartId}/paymenttype?fields=DEFAULT%2CpotentialProductPromotions%2CappliedProductPromotions%2CpotentialOrderPromotions%2CappliedOrderPromotions%2Centries(totalPrice(formattedValue)%2Cproduct(images(FULL)%2Cstock(FULL))%2CbasePrice(formattedValue%2Cvalue)%2Cupdateable)%2CtotalPrice(formattedValue)%2CtotalItems%2CtotalPriceWithTax(formattedValue)%2CtotalDiscounts(value%2CformattedValue)%2CsubTotal(formattedValue)%2CdeliveryItemsQuantity%2CdeliveryCost(formattedValue)%2CtotalTax(formattedValue%2C%20value)%2CpickupItemsQuantity%2Cnet%2CappliedVouchers%2CproductDiscounts(formattedValue)%2Cuser&paymentType=${paymentType}&purchaseOrderNumber=${purchaseOrderNumber}`
        );
      });

      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });
});
