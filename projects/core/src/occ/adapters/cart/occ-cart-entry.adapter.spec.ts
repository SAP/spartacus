import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CART_MODIFICATION_NORMALIZER } from '@spartacus/core';
import { Cart, CartModification } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services';
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
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccCartEntryAdapter', () => {
  let service: OccCartEntryAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartEntryAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    service = TestBed.get(OccCartEntryAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    occEnpointsService = TestBed.get(OccEndpointsService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('add entry to cart', () => {
    it('should add entry to cart for given user id, cart id, product code and product quantity', () => {
      let result;
      service.add(userId, cartId, '147852', 5).subscribe(res => (result = res));

      const mockReq = httpMock.expectOne({ method: 'POST', url: 'addEntries' });

      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('addEntries', {
        userId,
        cartId,
        productCode: '147852',
        quantity: 5,
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartModified);
      expect(result).toEqual(cartModified);
      expect(converter.pipeable).toHaveBeenCalledWith(
        CART_MODIFICATION_NORMALIZER
      );
    });
  });

  describe('update entry in a cart', () => {
    it('should update an entry in a cart for given user id, cart id, entryNumber and quantitiy', () => {
      let result;
      service
        .update(userId, cartId, '12345', 5)
        .subscribe(res => (result = res));

      const mockReq = httpMock.expectOne({
        method: 'PATCH',
        url: 'updateEntries',
      });

      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
        'updateEntries',
        {
          userId,
          cartId,
          entryNumber: '12345',
          quantity: 5,
        },
        {}
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartModified);
      expect(result).toEqual(cartModified);
      expect(converter.pipeable).toHaveBeenCalledWith(
        CART_MODIFICATION_NORMALIZER
      );
    });

    it(`should handle 'pickupStore'`, () => {
      const pickupStore =
        'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France';
      service
        .update(userId, cartId, '12345', 5, pickupStore)
        .subscribe()
        .unsubscribe();

      httpMock.expectOne({
        method: 'PATCH',
        url: 'updateEntries',
      });

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
        'updateEntries',
        {
          userId,
          cartId,
          entryNumber: '12345',
          quantity: 5,
        },
        { pickupStore }
      );
    });
  });

  describe('remove an entry from cart', () => {
    it('should remove entry from cart for given user id, cart id and entry number', () => {
      let result;
      service.remove(userId, cartId, '147852').subscribe(res => (result = res));

      const mockReq = httpMock.expectOne({
        method: 'DELETE',
        url: 'removeEntries',
      });

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('removeEntries', {
        userId,
        cartId,
        entryNumber: '147852',
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });
});
