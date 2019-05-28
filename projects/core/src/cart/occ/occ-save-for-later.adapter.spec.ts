import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { OccConfig } from '../../occ';
import { OccSaveForLaterAdapter } from './occ-save-for-later.adapter';
import { ConverterService } from '../../util/converter.service';
import { CART_MODIFICATION_NORMALIZER } from '@spartacus/core';
import { Cart, CartModification } from '../../model/cart.model';
import { CART_NORMALIZER } from '../connectors/cart/converters';

const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};
const cartModified: CartModification = {
  deliveryModeChanged: true,
};

const usersEndpoint = '/users';
const cartsEndpoint = '/carts/';
const BASIC_PARAMS =
  'DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,' +
  'entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue)),' +
  'totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(formattedValue),subTotal(formattedValue),' +
  'deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue),pickupItemsQuantity,net,' +
  'appliedVouchers,productDiscounts(formattedValue)';
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

describe('OccCartEntryAdapter', () => {
  let service: OccSaveForLaterAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccSaveForLaterAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccSaveForLaterAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load cart data', () => {
    it('should load selective cart basic data for given userId and cartId', () => {
      let result;
      service.load(userId, cartId).subscribe(res => (result = res));
      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint + `${cartId}`
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(BASIC_PARAMS);
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
      expect(converter.pipeable).toHaveBeenCalledWith(CART_NORMALIZER);
    });
  });

  describe('load cart data exception', () => {
    fit('should load selective cart with exception', () => {
      let result;
      service.load(userId, cartId).subscribe(res => (result = res));
      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint + `${cartId}`
        );
      });
      mockReq.error(
        new ErrorEvent('Server Error', {
          error: 404,
        }),
        {
          status: 404,
          statusText: 'Not Found',
        }
      );
      expect(mockReq.cancelled).toBeTruthy();
    });
  });

  describe('create cart data', () => {
    it('should load selective cart basic data for given userId and cartId', () => {
      let result;
      service.load(userId, cartId).subscribe(res => (result = res));
      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint + `${cartId}`
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(BASIC_PARAMS);
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
      expect(converter.pipeable).toHaveBeenCalledWith(CART_NORMALIZER);
    });
  });

  describe('create cart data exception', () => {
    fit('should load selective cart with exception', () => {
      let result;
      service.load(userId, cartId).subscribe(res => (result = res));
      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint + `${cartId}`
        );
      });
      mockReq.error(
        new ErrorEvent('Server Error', {
          error: 404,
        }),
        {
          status: 404,
          statusText: 'Not Found',
        }
      );
      expect(mockReq.cancelled).toBeTruthy();
    });
  });
});
