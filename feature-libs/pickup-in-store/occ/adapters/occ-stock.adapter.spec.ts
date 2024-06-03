import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import {
  BaseOccUrlProperties,
  DynamicAttributes,
  HttpErrorModel,
  LoggerService,
  OccEndpointsService,
  normalizeHttpError,
} from '@spartacus/core';
import { throwError } from 'rxjs';
import { take } from 'rxjs/operators';
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
  const mockJaloError = new HttpErrorResponse({
    error: {
      errors: [
        {
          message: 'The application has encountered an error',
          type: 'JaloObjectNoLongerValidError',
        },
      ],
    },
  });

  class MockLoggerService {
    log(): void {}
    warn(): void {}
    error(): void {}
    info(): void {}
    debug(): void {}
  }

  const mockNormalizedJaloError = normalizeHttpError(
    mockJaloError,
    new MockLoggerService()
  );

  let occAdapter: OccStockAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  let httpClient: HttpClient;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          OccStockAdapter,
          { provide: OccEndpointsService, useClass: MockOccEndpointsService },
          { provide: LoggerService, useClass: MockLoggerService },
        ],
      });
    })
  );
  beforeEach(() => {
    occAdapter = TestBed.inject(OccStockAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    httpClient = TestBed.inject(HttpClient);
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
    it('should call normalized http error for loadStockLevels', fakeAsync(() => {
      spyOn(httpClient, 'get').and.returnValue(throwError(() => mockJaloError));
      let result: HttpErrorModel | undefined;
      const subscription = occAdapter
        .loadStockLevels(productCode, locationParam)
        .pipe(take(1))
        .subscribe({ error: (err) => (result = err) });

      tick(4200);
      expect(result).toEqual(mockNormalizedJaloError);

      subscription.unsubscribe();
    }));
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
    it('should call normalized http error for loadStockLevelAtStore', fakeAsync(() => {
      spyOn(httpClient, 'get').and.returnValue(throwError(() => mockJaloError));
      let result: HttpErrorModel | undefined;
      const subscription = occAdapter
        .loadStockLevelAtStore(productCode, storeName)
        .pipe(take(1))
        .subscribe({ error: (err) => (result = err) });

      tick(4200);
      expect(result).toEqual(mockNormalizedJaloError);

      subscription.unsubscribe();
    }));
  });
});
