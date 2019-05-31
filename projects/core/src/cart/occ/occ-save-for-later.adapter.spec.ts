import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { OccConfig } from '../../occ';
import { OccSaveForLaterAdapter } from './occ-save-for-later.adapter';
import { ConverterService } from '../../util/converter.service';
import { Cart } from '../../model/cart.model';
import { CART_NORMALIZER } from '../connectors/cart/converters';

const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
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

describe('OccSaveForLaterAdapter', () => {
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

  describe('load save for later data', () => {
    it('should load save for later data for given userId and cartId', () => {
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

  describe('load save for later data exception', () => {
    it('should load save for later with exception', () => {
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
      expect(result).toEqual(undefined);
    });
  });

  describe('create save for later data', () => {
    it('should load save for later for given userId and cartId', () => {
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

  describe('create save for later data exception', () => {
    it('should load save for later with exception', () => {
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
      expect(result).toEqual(undefined);
    });
  });
});
