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
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Cart, PaymentType } from '@spartacus/cart/base/root';
import { CHECKOUT_PAYMENT_TYPE_NORMALIZER } from '@spartacus/checkout/b2b/core';
import {
  ConverterService,
  HttpErrorModel,
  LoggerService,
  OCC_HTTP_TOKEN,
  Occ,
  OccConfig,
  OccEndpoints,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { defer, of, throwError } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { OccCheckoutPaymentTypeAdapter } from './occ-checkout-payment-type.adapter';

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
        setCartPaymentType:
          'users/${userId}/carts/${cartId}/paymenttype?fields=DEFAULT',
        paymentTypes: 'paymenttypes',
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

describe(`OccCheckoutPaymentTypeAdapter`, () => {
  let service: OccCheckoutPaymentTypeAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCheckoutPaymentTypeAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LoggerService, useClass: MockLoggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(
      OccCheckoutPaymentTypeAdapter as Type<OccCheckoutPaymentTypeAdapter>
    );
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );
    converter = TestBed.inject(ConverterService as Type<ConverterService>);

    vi.spyOn(converter, 'pipeableMany');
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`getPaymentTypes`, () => {
    const paymentTypesList: Occ.PaymentTypeList = {
      paymentTypes: [
        {
          code: 'card',
          displayName: 'card',
        },
        {
          code: 'account',
          displayName: 'account',
        },
      ],
    };

    it(`should return paymentTypes`, async () => {
      const resultPromise = firstValueFrom(service.getPaymentTypes());

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === 'paymenttypes';
      });

      expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
        sendUserIdAsHeader: true,
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(paymentTypesList);

      const result = await resultPromise;
      expect(result).toEqual(paymentTypesList.paymentTypes);
    });

    it(`should use converter`, () => {
      service.getPaymentTypes().subscribe();
      httpMock.expectOne('paymenttypes').flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        CHECKOUT_PAYMENT_TYPE_NORMALIZER
      );
    });

    describe(`back-off`, () => {
      beforeEach(() => { vi.useFakeTimers(); });
      afterEach(() => { vi.useRealTimers(); });
      it(`should unsuccessfully backOff on Jalo error`, async () => {
        vi.spyOn(httpClient, 'get').mockReturnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .getPaymentTypes()
          .pipe(take(1))
          .subscribe({ error: (err) => (result = err) });

        await vi.advanceTimersByTimeAsync(4200);

        expect(result).toEqual(mockNormalizedJaloError);

        subscription.unsubscribe();
      });

      it(`should successfully backOff on Jalo error and recover after the 2nd retry`, async () => {
        let calledTimes = -1;

        vi.spyOn(httpClient, 'get').mockReturnValue(
          defer(() => {
            calledTimes++;
            if (calledTimes === 3) {
              return of(paymentTypesList);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: PaymentType[] | undefined;
        const subscription = service
          .getPaymentTypes()
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

        expect(result).toEqual(paymentTypesList.paymentTypes);
        subscription.unsubscribe();
      });
    });
  });

  describe(`setPaymentType`, () => {
    const paymentType = 'CARD';

    it(`should set payment type to cart`, async () => {
      const resultPromise = firstValueFrom(
        service.setPaymentType(userId, cartId, paymentType)
      );

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `users/${userId}/carts/${cartId}/paymenttype?fields=DEFAULT&paymentType=${paymentType}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);

      const result = await resultPromise;
      expect(result).toEqual(cartData);
    });

    it(`should set payment type to cart that contains purchaseOrderNumber`, async () => {
      const purchaseOrderNumber = 'test-number';

      const resultPromise = firstValueFrom(
        service.setPaymentType(userId, cartId, paymentType, purchaseOrderNumber)
      );

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `users/${userId}/carts/${cartId}/paymenttype?fields=DEFAULT&paymentType=${paymentType}&purchaseOrderNumber=${purchaseOrderNumber}`
        );
      });

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
          .setPaymentType(userId, cartId, paymentType)
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
          .setPaymentType(userId, cartId, paymentType)
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
