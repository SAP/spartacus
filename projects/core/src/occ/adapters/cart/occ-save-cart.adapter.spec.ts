import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Occ } from '../../occ-models';
import { OccEndpointsService } from '../../services';
import { OccSaveCartAdapter } from './occ-save-cart.adapter';

const userId = '123';
const cartId = '456';
const saveCartName = 'Name';
const saveCartDescription = 'Description';
const cartData: Occ.Cart = {
  store: 'electronics',
  guid: '1212121',
};
const saveCartData: Occ.SaveCartResult = {
  savedCartData: cartData,
};

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return endpoint;
  }
}

describe('OccSaveCartAdapter', () => {
  let occSaveCartAdapter: OccSaveCartAdapter;
  let httpMock: HttpTestingController;
  let occEndpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccSaveCartAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    occSaveCartAdapter = TestBed.get(OccSaveCartAdapter as Type<
      OccSaveCartAdapter
    >);
    httpMock = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
    occEndpointsService = TestBed.get(OccEndpointsService as Type<
      OccEndpointsService
    >);

    spyOn(occEndpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('save cart', () => {
    it('should save cart with given data', () => {
      let result;
      occSaveCartAdapter
        .saveCart(userId, cartId, saveCartName, saveCartDescription)
        .subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'PATCH' && req.url === 'saveCart';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.body['updates']).toEqual([
        { param: 'saveCartName', value: 'Name', op: 's' },
        { param: 'saveCartDescription', value: 'Description', op: 's' },
      ]);
      expect(occEndpointsService.getUrl).toHaveBeenCalledWith('saveCart', {
        userId,
        cartId,
      });
      mockReq.flush(saveCartData);
      expect(result).toEqual(saveCartData);
    });
  });
});
