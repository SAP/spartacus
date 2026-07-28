import { take } from 'rxjs/operators';
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
import { Cart } from '@spartacus/cart/base/root';
import {
  ConverterService,
  HttpErrorModel,
  LoggerService,
  OccConfig,
  OccEndpoints,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { defer, of, throwError } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { OccCheckoutCostCenterAdapter } from './occ-checkout-cost-center.adapter';
class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        setCartCostCenter:
          'users/${userId}/carts/${cartId}/costcenter?fields=DEFAULT',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};
const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};

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

const mockNormalizedJaloError = tryNormalizeHttpError(
  mockJaloError,
  new MockLoggerService()
);

describe(`OccCheckoutCostCenterAdapter`, () => {
  let service: OccCheckoutCostCenterAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCheckoutCostCenterAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LoggerService, useClass: MockLoggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(OccCheckoutCostCenterAdapter);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    vi.spyOn(converter, 'pipeableMany');
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`setCostCenter`, () => {
    const costCenterId = 'testCostCenterId';

    it(`should set cost center cart`, async () => {
      const resultPromise = firstValueFrom(
        service.setCostCenter(userId, cartId, costCenterId)
      );

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `users/${userId}/carts/${cartId}/costcenter?fields=DEFAULT&costCenterId=${costCenterId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);

      const result = await resultPromise;
      expect(result).toEqual(cartData);
    });

    describe(`back-off`, () => {
      beforeEach(() => { vi.useFakeTimers(); });
      afterEach(() => { vi.useRealTimers(); });
      it(`should unsuccessfully backOff on Jalo error`, async () => {
        vi.spyOn(httpClient, 'put').mockReturnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .setCostCenter(userId, cartId, costCenterId)
          .pipe(take(1))
          .subscribe({ error: (err) => (result = err) });

        await vi.advanceTimersByTimeAsync(4200);

        expect(result).toEqual(mockNormalizedJaloError);

        subscription.unsubscribe();
      });

      it(`should successfully backOff on Jalo error and recover after the 2nd retry`, async () => {
        let calledTimes = -1;

        vi.spyOn(httpClient, 'put').mockReturnValue(
          defer(() => {
            calledTimes++;
            if (calledTimes === 3) {
              return of(cartData);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: Cart | undefined;
        const subscription = service
          .setCostCenter(userId, cartId, costCenterId)
          .pipe(take(1))
          .subscribe((res) => {
            result = res;
          });

        // 1*1*300 = 300
        await vi.advanceTimersByTimeAsync(300);
        expect(result).toEqual(undefined);

        // 2*2*300 = 1200
        await vi.advanceTimersByTimeAsync(1200);
        expect(result).toEqual(undefined);

        // 3*3*300 = 2700
        await vi.advanceTimersByTimeAsync(2700);

        expect(result).toEqual(cartData);
        subscription.unsubscribe();
      });
    });
  });
});
