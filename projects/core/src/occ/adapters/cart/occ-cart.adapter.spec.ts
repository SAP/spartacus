import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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

const DETAILS_PARAMS =
  'DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,' +
  'entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue),updateable),' +
  'totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),' +
  'deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue),pickupItemsQuantity,net,' +
  'appliedVouchers,productDiscounts(formattedValue),user';

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
    service = TestBed.get(OccCartAdapter as Type<OccCartAdapter>);
    httpMock = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
    converter = TestBed.get(ConverterService as Type<ConverterService>);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load all carts', () => {
    it('should load all carts details data for given user with details flag', () => {
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
        'carts(' + DETAILS_PARAMS + ',saveTime)'
      );
      mockReq.flush(cartDataList);
      expect(result).toEqual(cartDataList.carts);
    });
  });

  describe('load cart data', () => {
    it('should load cart detail data for given userId, cartId', () => {
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
        'carts(' + DETAILS_PARAMS + ',saveTime)'
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

      expect(mockReq.request.params.get('fields')).toEqual(DETAILS_PARAMS);

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

      expect(mockReq.request.params.get('fields')).toEqual(DETAILS_PARAMS);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mergedCart);
      expect(result).toEqual(mergedCart);
    });
  });

  describe('add email to cart', () => {
    it('should able to assign email to cart for anonymous user', () => {
      const email = 'tester@sap.com';
      let result: Object;

      service
        .addEmail(userId, cartId, email)
        .subscribe(value => (result = value));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `${usersEndpoint}/${userId}/${cartsEndpoint}/${cartId}/email` &&
          req.serializeBody() === `email=${email}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();

      mockReq.flush('');
      expect(result).toEqual('');
    });
  });
});
