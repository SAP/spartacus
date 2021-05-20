import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Cart, ConverterService } from '@spartacus/core';
import { OccConfig } from '../../index';
import { OccCheckoutCostCenterAdapter } from './occ-checkout-cost-center.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        cartCostCenter:
          'users/${userId}/carts/${cartId}/costcenter?fields=DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user',
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

describe('OccCheckoutCostCenterAdapter', () => {
  let service: OccCheckoutCostCenterAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutCostCenterAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(
      OccCheckoutCostCenterAdapter as Type<OccCheckoutCostCenterAdapter>
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

  describe('setCostCenter', () => {
    it('should set cost center cart', () => {
      const costCenterId = 'testCostCenterId';

      let result;
      service
        .setCostCenter(userId, cartId, costCenterId)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `/users/${userId}/carts/${cartId}/costcenter?fields=DEFAULT%2CpotentialProductPromotions%2CappliedProductPromotions%2CpotentialOrderPromotions%2CappliedOrderPromotions%2Centries(totalPrice(formattedValue)%2Cproduct(images(FULL)%2Cstock(FULL))%2CbasePrice(formattedValue%2Cvalue)%2Cupdateable)%2CtotalPrice(formattedValue)%2CtotalItems%2CtotalPriceWithTax(formattedValue)%2CtotalDiscounts(value%2CformattedValue)%2CsubTotal(formattedValue)%2CdeliveryItemsQuantity%2CdeliveryCost(formattedValue)%2CtotalTax(formattedValue%2C%20value)%2CpickupItemsQuantity%2Cnet%2CappliedVouchers%2CproductDiscounts(formattedValue)%2Cuser&costCenterId=${costCenterId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });
});
