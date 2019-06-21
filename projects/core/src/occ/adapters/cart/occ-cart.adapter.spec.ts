import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CART_NORMALIZER } from '@spartacus/core';
import { Cart } from '../../../model/cart.model';
import { ProductImageNormalizer } from '../../../occ/adapters/product/converters/index';
import { ConverterService } from '../../../util/converter.service';
import { OccConfig } from '../../index';
import { Occ } from '../../occ-models/occ.models';
import { OccCartAdapter } from './occ-cart.adapter';

const userId = '123';
const cartId = '456';
const toMergeCart = { guid: '123456' };
const cartData: Occ.Cart = {
  store: 'electronics',
  guid: '1212121',
};
const cartDataList: Occ.CartList = {
  carts: [cartData],
};
const mergedCart: Cart = {
  name: 'mergedCart',
};

const usersEndpoint = '/users';
const cartsEndpoint = 'carts';
const BASIC_PARAMS =
  'DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),' +
  'entries(totalPrice(formattedValue),product(images(FULL)))';

const DETAILS_PARAMS =
  'DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,' +
  'entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue)),' +
  'totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),' +
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

describe('OccCartAdapter', () => {
  let service: OccCartAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartAdapter,
        ProductImageNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccCartAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load all carts', () => {
    it('should load all carts basic data for given user', () => {
      let result;
      service.loadAll(userId).subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === `${usersEndpoint}/${userId}/${cartsEndpoint}/`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(
        'carts(' + BASIC_PARAMS + ',saveTime)'
      );
      mockReq.flush(cartDataList);
      expect(result).toEqual(cartDataList.carts);
      expect(converter.pipeableMany).toHaveBeenCalledWith(CART_NORMALIZER);
    });

    it('should load all carts details data for given user with details flag', () => {
      let result;
      service.loadAll(userId, true).subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === `${usersEndpoint}/${userId}/${cartsEndpoint}/`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(
        'carts(' + DETAILS_PARAMS + ',saveTime)'
      );
      mockReq.flush(cartDataList);
      expect(result).toEqual(cartDataList.carts);
    });
  });

  describe('load cart data', () => {
    it('should load cart basic data for given userId and cartId', () => {
      let result;
      service.load(userId, cartId).subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === `${usersEndpoint}/${userId}/${cartsEndpoint}/${cartId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(BASIC_PARAMS);
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
      expect(converter.pipeable).toHaveBeenCalledWith(CART_NORMALIZER);
    });

    it('should load cart detail data for given userId, cartId and details flag', () => {
      let result;
      service.load(userId, cartId, true).subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === `${usersEndpoint}/${userId}/${cartsEndpoint}/${cartId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(DETAILS_PARAMS);
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });

    it('should load current cart for given userId', () => {
      let result;
      service.load(userId, 'current').subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === `${usersEndpoint}/${userId}/${cartsEndpoint}/`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(
        'carts(' + BASIC_PARAMS + ',saveTime)'
      );
      mockReq.flush({ carts: [cartData] });
      expect(result).toEqual(cartData);
    });
  });

  describe('create a cart', () => {
    it('should able to create a new cart for the given user ', () => {
      let result;
      service.create(userId).subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === `${usersEndpoint}/${userId}/${cartsEndpoint}/`
        );
      });

      expect(mockReq.request.params.get('fields')).toEqual(BASIC_PARAMS);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });

  describe('merge a cart', () => {
    it('should able to merge a cart to current one for the given user ', () => {
      let result;
      service
        .create(userId, cartId, toMergeCart.guid)
        .subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === `${usersEndpoint}/${userId}/${cartsEndpoint}/`
        );
      });

      expect(mockReq.request.params.get('oldCartId')).toEqual(cartId);

      expect(mockReq.request.params.get('toMergeCartGuid')).toEqual(
        toMergeCart.guid
      );

      expect(mockReq.request.params.get('fields')).toEqual(BASIC_PARAMS);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mergedCart);
      expect(result).toEqual(mergedCart);
    });
  });
});
