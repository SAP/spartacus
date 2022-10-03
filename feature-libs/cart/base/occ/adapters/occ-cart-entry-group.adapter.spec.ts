import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  Cart,
  CartModification,
  CART_MODIFICATION_NORMALIZER,
  OrderEntry,
} from '@spartacus/cart/base/root';
import {
  BaseOccUrlProperties,
  ConverterService,
  DynamicAttributes,
  OccEndpointsService,
} from '@spartacus/core';
import { OccCartEntryGroupAdapter } from './occ-cart-entry-group.adapter';

const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};
const cartModified: CartModification = {
  deliveryModeChanged: true,
};
const entryGroupNumber = 1;
const entry: OrderEntry = {
  orderCode: '1',
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

describe('OccCartEntryGroupAdapter', () => {
  let occCartEntryGroupAdapter: OccCartEntryGroupAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartEntryGroupAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    occCartEntryGroupAdapter = TestBed.inject(OccCartEntryGroupAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);

    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('add entry to cart entry group', () => {
    it('should add entry to cart entry group for given user id, cart id, entry and entry group number', () => {
      let result;
      occCartEntryGroupAdapter
        .addToEntryGroup(userId, cartId, entryGroupNumber, entry)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne({
        method: 'POST',
        url: 'addToEntryGroup',
      });

      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/json'
      );

      expect(mockReq.request.body).toEqual({
        product: entry,
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'addToEntryGroup',
        {
          urlParams: {
            userId,
            cartId,
            entryGroupNumber,
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
  });

  describe('remove an entry group from cart', () => {
    it('should remove entry group from cart for given user id, cart id and entry group number', () => {
      let result;
      occCartEntryGroupAdapter
        .removeEntryGroup(userId, cartId, entryGroupNumber)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne({
        method: 'DELETE',
        url: 'removeEntryGroup',
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'removeEntryGroup',
        {
          urlParams: {
            userId,
            cartId,
            entryGroupNumber,
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
