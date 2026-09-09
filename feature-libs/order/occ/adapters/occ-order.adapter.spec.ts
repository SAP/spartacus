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
  ConverterService,
  HttpErrorModel,
  LoggerService,
  OccConfig,
  OccEndpoints,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { ORDER_NORMALIZER, Order } from '@spartacus/order/root';
import { defer, firstValueFrom, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { OccOrderAdapter } from './occ-order.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        placeOrder: 'users/${userId}/orders?fields=FULL',
        placePaymentAuthorizedOrder:
          'users/${userId}/orders/paymentAuthorizedOrderPlacement?fields=FULL',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};

const userId = '123';
const cartId = '456';
const termsChecked = true;

const orderData: Partial<Order> = {
  site: 'electronics',
  calculated: true,
  code: '00001004',
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

describe('OccOrderAdapter', () => {
  let service: OccOrderAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOrderAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LoggerService, useClass: MockLoggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(OccOrderAdapter);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    vi.spyOn(converter, 'pipeable');
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`placeOrder`, () => {
    it(`should be able to place order for the cart`, async () => {
      const resultPromise = firstValueFrom(
        service.placeOrder(userId, cartId, termsChecked)
      );

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url ===
            `users/${userId}/orders?fields=FULL&cartId=${cartId}&termsChecked=${termsChecked}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orderData);

      const result = await resultPromise;
      expect(result).toEqual(orderData);
    });

    it(`should use converter`, async () => {
      const resultPromise = firstValueFrom(
        service.placeOrder(userId, cartId, termsChecked)
      );
      httpMock
        .expectOne(
          (req) =>
            req.method === 'POST' &&
            req.url ===
              `users/${userId}/orders?fields=FULL&cartId=${cartId}&termsChecked=${termsChecked}`
        )
        .flush({});
      await resultPromise;
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
    });

    describe(`back-off`, () => {
      beforeEach(() => {
        vi.useFakeTimers();
      });
      afterEach(() => {
        vi.useRealTimers();
      });

      it(`should unsuccessfully backOff on Jalo error`, async () => {
        vi.spyOn(httpClient, 'post').mockReturnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .placeOrder(userId, cartId, termsChecked)
          .pipe(take(1))
          .subscribe({ error: (err) => (result = err) });

        await vi.advanceTimersByTimeAsync(4200);

        expect(result).toEqual(mockNormalizedJaloError);

        subscription.unsubscribe();
      });

      it(`should successfully backOff on Jalo error and recover after the 2nd retry`, async () => {
        let calledTimes = -1;

        vi.spyOn(httpClient, 'post').mockReturnValue(
          defer(() => {
            calledTimes++;
            if (calledTimes === 3) {
              return of({});
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: Order | undefined;
        const subscription = service
          .placeOrder(userId, cartId, termsChecked)
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

        expect(result).toEqual({});
        subscription.unsubscribe();
      });
    });
  });

  describe(`placePaymentAuthorizedOrder`, () => {
    it(`should be able to place order after the payment was authorized`, async () => {
      const resultPromise = firstValueFrom(
        service.placePaymentAuthorizedOrder(userId, cartId, termsChecked)
      );

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url ===
            `users/${userId}/orders/paymentAuthorizedOrderPlacement?fields=FULL&cartId=${cartId}&termsChecked=${termsChecked}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orderData);

      const result = await resultPromise;
      expect(result).toEqual(orderData);
    });

    it(`should use converter`, async () => {
      const resultPromise = firstValueFrom(
        service.placePaymentAuthorizedOrder(userId, cartId, termsChecked)
      );
      httpMock
        .expectOne(
          (req) =>
            req.method === 'POST' &&
            req.url ===
              `users/${userId}/orders/paymentAuthorizedOrderPlacement?fields=FULL&cartId=${cartId}&termsChecked=${termsChecked}`
        )
        .flush({});
      await resultPromise;
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
    });

    describe(`back-off`, () => {
      beforeEach(() => {
        vi.useFakeTimers();
      });
      afterEach(() => {
        vi.useRealTimers();
      });

      it(`should unsuccessfully backOff on Jalo error`, async () => {
        vi.spyOn(httpClient, 'post').mockReturnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .placePaymentAuthorizedOrder(userId, cartId, termsChecked)
          .pipe(take(1))
          .subscribe({ error: (err) => (result = err) });

        await vi.advanceTimersByTimeAsync(4200);

        expect(result).toEqual(mockNormalizedJaloError);

        subscription.unsubscribe();
      });

      it(`should successfully backOff on Jalo error and recover after the 2nd retry`, async () => {
        let calledTimes = -1;

        vi.spyOn(httpClient, 'post').mockReturnValue(
          defer(() => {
            calledTimes++;
            if (calledTimes === 3) {
              return of({});
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: Order | undefined;
        const subscription = service
          .placePaymentAuthorizedOrder(userId, cartId, termsChecked)
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

        expect(result).toEqual({});
        subscription.unsubscribe();
      });
    });
  });
});
