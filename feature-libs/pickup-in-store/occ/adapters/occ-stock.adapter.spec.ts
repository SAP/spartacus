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
import { OccStockAdapter } from './occ-stock.adapter';

const storeName = 'testStoreName';
const productCode = 'testProductCode';
const locationParam = { location: 'testLocation' };
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

describe(`OccStockAdapter`, () => {
  let occAdapter: OccStockAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          OccStockAdapter,
          { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        ],
      });
    })
  );

  beforeEach(() => {
    occAdapter = TestBed.inject(OccStockAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);

    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`get loadStockLevels`, () => {
    it(`should get loadStockLevels`, () => {
      occAdapter
        .loadStockLevels(productCode, locationParam)
        .subscribe((data) => {
          expect(data).toEqual({});
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(occEndpointService.buildUrl).toHaveBeenCalledWith('stock', {
        urlParams: { productCode },
        queryParams: { ...locationParam, fields: 'FULL' },
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    });
  });

  describe(`get loadStockLevelAtStore`, () => {
    it(`should get loadStockLevelAtStore`, () => {
      occAdapter
        .loadStockLevelAtStore(productCode, storeName)
        .subscribe((data) => {
          expect(data).toEqual({});
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(occEndpointService.buildUrl).toHaveBeenCalledWith('stockAtStore', {
        urlParams: { productCode, storeName },
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    });
  });
});
