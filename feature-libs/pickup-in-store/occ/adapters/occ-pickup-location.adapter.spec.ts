import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  BaseOccUrlProperties,
  DynamicAttributes,
  OccEndpointsService,
} from '@spartacus/core';
import { OccPickupLocationAdapter } from './occ-pickup-location.adapter';

const storeName = 'testStoreName';
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

describe(`OccPickupLocationAdapter`, () => {
  let occAdapter: OccPickupLocationAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          OccPickupLocationAdapter,
          { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        ],
      });
    })
  );

  beforeEach(() => {
    occAdapter = TestBed.inject(OccPickupLocationAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);

    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`get getStoreDetails`, () => {
    it(`should getStoreDetails`, () => {
      occAdapter.getStoreDetails(storeName).subscribe((data) => {
        expect(data).toEqual({
          displayName: storeName,
          name: storeName,
        });
      });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(occEndpointService.buildUrl).toHaveBeenCalledWith('storeDetails', {
        urlParams: {
          storeName,
        },
        queryParams: { fields: 'FULL' },
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    });
  });
});
