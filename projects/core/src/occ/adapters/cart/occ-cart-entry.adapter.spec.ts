import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CART_MODIFICATION_NORMALIZER } from '@spartacus/core';
import { Cart, CartModification } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import {
  BaseOccUrlProperties,
  DynamicAttributes,
  OccEndpointsService,
} from '../../services';
import { OccCartEntryAdapter } from './occ-cart-entry.adapter';

const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};
const cartModified: CartModification = {
  deliveryModeChanged: true,
};

class MockOccEndpointsService {
  buildUrl(
    endpoint: string,
    _attributes?: DynamicAttributes,
    _propertiesToOmit?: BaseOccUrlProperties
  ) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccCartEntryAdapter', () => {
  let occCartEntryAdapter: OccCartEntryAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartEntryAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    occCartEntryAdapter = TestBed.inject(OccCartEntryAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);

    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('add entry to cart', () => {
    it('should add entry to cart for given user id, cart id, product code and product quantity', () => {
      let result;
      occCartEntryAdapter
        .add(userId, cartId, '147852', 5)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne({ method: 'POST', url: 'addEntries' });

      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/json'
      );

      expect(mockReq.request.body).toEqual({
        product: { code: '147852' },
        quantity: 5,
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('addEntries', {
        urlParams: {
          userId,
          cartId,
          quantity: 5,
        },
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartModified);
      expect(result).toEqual(cartModified);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        CART_MODIFICATION_NORMALIZER
      );
    });
  });

  describe('update entry in a cart', () => {
    it('should update an entry in a cart for given user id, cart id, entryNumber and quantity', () => {
      let result;
      occCartEntryAdapter
        .update(userId, cartId, '12345', 5)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne({
        method: 'PATCH',
        url: 'updateEntries',
      });

      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/json'
      );

      expect(mockReq.request.body).toEqual({ quantity: 5 });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'updateEntries',
        {
          urlParams: {
            userId,
            cartId,
            entryNumber: '12345',
          },
        }
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartModified);
      expect(result).toEqual(cartModified);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        CART_MODIFICATION_NORMALIZER
      );
    });

    it(`should handle 'pickupStore'`, () => {
      const pickupStore =
        'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France';
      occCartEntryAdapter
        .update(userId, cartId, '12345', 5, pickupStore)
        .subscribe()
        .unsubscribe();

      const mockReq = httpMock.expectOne({
        method: 'PATCH',
        url: 'updateEntries',
      });

      expect(mockReq.request.body).toEqual({
        quantity: 5,
        deliveryPointOfService: { name: pickupStore },
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'updateEntries',
        {
          urlParams: {
            userId,
            cartId,
            entryNumber: '12345',
          },
        }
      );
    });
  });

  describe('remove an entry from cart', () => {
    it('should remove entry from cart for given user id, cart id and entry number', () => {
      let result;
      occCartEntryAdapter
        .remove(userId, cartId, '147852')
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne({
        method: 'DELETE',
        url: 'removeEntries',
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'removeEntries',
        {
          urlParams: {
            userId,
            cartId,
            entryNumber: '147852',
          },
        }
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });
});
