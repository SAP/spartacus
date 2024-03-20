import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BaseOccUrlProperties,
  ConverterService,
  DynamicAttributes,
  OccEndpointsService,
} from '@spartacus/core';
import { OccCartEntryGroupAdapter } from './occ-cart-entrygroup.adapter';

const userId = '123';
const cartId = '456';
const entryGroupNumber = '147852';

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
  let occEndpointsService: OccEndpointsService;

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
    occEndpointsService = TestBed.inject(OccEndpointsService);

    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('remove an entry group from cart', () => {
    it('should remove entry group from cart for given user id, cart id and entry group number', () => {
      let result;
      occCartEntryGroupAdapter
        .remove(userId, cartId, entryGroupNumber)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne({
        method: 'DELETE',
        url: 'removeEntryGroup',
      });

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'removeEntryGroup',
        {
          urlParams: { userId, cartId, entryGroupNumber },
        }
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(null);
      expect(result).toBeNull;
    });
  });
});
