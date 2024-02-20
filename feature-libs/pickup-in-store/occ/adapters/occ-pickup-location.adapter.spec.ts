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

describe(`OccPickupLocationAdapter`, () => {
  let occAdapter: OccPickupLocationAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          OccPickupLocationAdapter,
          { provide: OccEndpointsService, useClass: MockOccEndpointsService },
          { provide: LoggerService, useClass: MockLoggerService },
        ],
      });
    })
  );
  beforeEach(() => {
    occAdapter = TestBed.inject(OccPickupLocationAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

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
    it('should call normalized http error for getStoreDetails', fakeAsync(() => {
      spyOn(httpClient, 'get').and.returnValue(throwError(() => mockJaloError));
      let result: HttpErrorModel | undefined;
      const subscription = occAdapter
        .getStoreDetails(storeName)
        .pipe(take(1))
        .subscribe({ error: (err) => (result = err) });

      tick(4200);
      expect(result).toEqual(mockNormalizedJaloError);

      subscription.unsubscribe();
    }));
  });
});
