import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Cart, CartList, OccConfig } from '../../occ';
import { ProductImageNormalizer } from '../../product';
import { OccCartAdapter } from './occ-cart.adapter';

const userId = '123';
const cartId = '456';
const toMergeCart = { guid: '123456' };
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};
const cartDataList: CartList = {
  carts: [cartData],
};
const mergedCart: Cart = {
  name: 'mergedCart',
};

const usersEndpoint = '/users';
const cartsEndpoint = '/carts/';
const BASIC_PARAMS =
  'DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),' +
  'entries(totalPrice(formattedValue),product(images(FULL)))';

const DETAILS_PARAMS =
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

describe('OccCartAdapter', () => {
  let service: OccCartAdapter;
  let httpMock: HttpTestingController;

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
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load all carts', () => {
    it('should load all carts basic data for given user', () => {
      service.loadAll(userId).subscribe(result => {
        expect(result).toEqual(cartDataList.carts);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(
        'carts(' + BASIC_PARAMS + ',saveTime)'
      );
      mockReq.flush(cartDataList);
    });

    it('should load all carts details data for given user with details flag', () => {
      service.loadAll(userId, true).subscribe(result => {
        expect(result).toEqual(cartDataList.carts);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(
        'carts(' + DETAILS_PARAMS + ',saveTime)'
      );
      mockReq.flush(cartDataList);
    });
  });

  describe('load cart data', () => {
    it('should load cart basic data for given userId and cartId', () => {
      service.load(userId, cartId).subscribe(result => {
        expect(result).toEqual(cartData);
      });

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
    });

    it('should load cart detail data for given userId, cartId and details flag', () => {
      service.load(userId, cartId, true).subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint + `${cartId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(DETAILS_PARAMS);
      mockReq.flush(cartData);
    });

    it('should load current cart for given userId', () => {
      service.load(userId, 'current').subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(
        'carts(' + BASIC_PARAMS + ',saveTime)'
      );
      mockReq.flush({ carts: [cartData] });
    });
  });

  describe('create a cart', () => {
    it('should able to create a new cart for the given user ', () => {
      service.create(userId).subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint
        );
      });

      expect(mockReq.request.params.get('fields')).toEqual(BASIC_PARAMS);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });

  describe('merge a cart', () => {
    it('should able to merge a cart to current one for the given user ', () => {
      service.create(userId, cartId, toMergeCart.guid).subscribe(result => {
        expect(result).toEqual(mergedCart);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint
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
    });
  });
});
