import { vi } from 'vitest';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BaseOccUrlProperties,
  DynamicAttributes,
  HttpErrorModel,
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
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

const mockNormalizedJaloError = tryNormalizeHttpError(
  mockJaloError,
  new MockLoggerService()
);

describe(`OccPickupLocationAdapter`, () => {
  let occAdapter: OccPickupLocationAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        OccPickupLocationAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: LoggerService, useClass: MockLoggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
  });
  beforeEach(() => {
    occAdapter = TestBed.inject(OccPickupLocationAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

    occEndpointService = TestBed.inject(OccEndpointsService);
    vi.spyOn(occEndpointService, 'buildUrl');
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
    it('should call normalized http error for getStoreDetails', async () => {
      vi.useFakeTimers();
      vi.spyOn(httpClient, 'get').mockReturnValue(throwError(() => mockJaloError));
      let result: HttpErrorModel | undefined;
      const subscription = occAdapter
        .getStoreDetails(storeName)
        .pipe(take(1))
        .subscribe({ error: (err) => (result = err) });

      await vi.advanceTimersByTimeAsync(4200);
      vi.useRealTimers();
      expect(result).toEqual(mockNormalizedJaloError);

      subscription.unsubscribe();
    });
  });
});
