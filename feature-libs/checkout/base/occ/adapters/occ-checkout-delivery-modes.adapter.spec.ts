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
import { Cart, DeliveryMode } from '@spartacus/cart/base/root';
import { DELIVERY_MODE_NORMALIZER } from '@spartacus/checkout/base/core';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  ConverterService,
  HttpErrorModel,
  LoggerService,
  Occ,
  OccConfig,
  OccEndpoints,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { defer, firstValueFrom, of, throwError } from 'rxjs';
import { OccCheckoutDeliveryModesAdapter } from './occ-checkout-delivery-modes.adapter';

const checkoutData: Partial<CheckoutState> = {
  deliveryAddress: {
    firstName: 'Janusz',
  },
};

const userId = '123';
const cartId = '456';
const cartData: Partial<Cart> = {
  store: 'electronics',
  guid: '1212121',
};

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        deliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        setDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        clearDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        deliveryModes: 'users/${userId}/carts/${cartId}/deliverymodes',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
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

describe(`OccCheckoutDeliveryModesAdapter`, () => {
  let service: OccCheckoutDeliveryModesAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCheckoutDeliveryModesAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LoggerService, useClass: MockLoggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(OccCheckoutDeliveryModesAdapter);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    vi.spyOn(converter, 'pipeable');
    vi.spyOn(converter, 'pipeableMany');
    vi.spyOn(converter, 'convert');
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`getSupportedModes`, () => {
    const mockDeliveryModes: Occ.DeliveryModeList = {
      deliveryModes: [{ name: 'mockDeliveryMode' }],
    };

    it(`should get all supported delivery modes for cart for given user id and cart id`, async () => {
      const resultPromise = firstValueFrom(
        service.getSupportedModes(userId, cartId)
      );

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url === `users/${userId}/carts/${cartId}/deliverymodes`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockDeliveryModes);

      const result = await resultPromise;
      expect(result).toEqual(mockDeliveryModes.deliveryModes);
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        DELIVERY_MODE_NORMALIZER
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
          .getSupportedModes(userId, cartId)
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
              return of(mockDeliveryModes);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: DeliveryMode[] | undefined;
        const subscription = service
          .getSupportedModes(userId, cartId)
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

        expect(result).toEqual(mockDeliveryModes.deliveryModes);
        subscription.unsubscribe();
      });
    });
  });

  describe(`set delivery mode for cart`, () => {
    const deliveryModeId = 'deliveryModeId';

    it(`should set modes for cart for given user id, cart id and delivery mode id`, async () => {
      const resultPromise = firstValueFrom(
        service.setMode(userId, cartId, deliveryModeId)
      );

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `users/${userId}/carts/${cartId}/deliverymode?deliveryModeId=${deliveryModeId}`
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
          .setMode(userId, cartId, deliveryModeId)
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

        let result: unknown;
        const subscription = service
          .setMode(userId, cartId, deliveryModeId)
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

  describe(`clear checkout delivery mode`, () => {
    it(`should clear checkout delivery mode for given userId, cartId`, async () => {
      const resultPromise = firstValueFrom(
        service.clearCheckoutDeliveryMode(userId, cartId)
      );

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'DELETE' &&
          req.url === `users/${userId}/carts/${cartId}/deliverymode`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(checkoutData);

      const result = await resultPromise;
      expect(result).toEqual(checkoutData);
    });

    describe(`back-off`, () => {
      beforeEach(() => { vi.useFakeTimers(); });
      afterEach(() => { vi.useRealTimers(); });
      it(`should unsuccessfully backOff on Jalo error`, async () => {
        vi.spyOn(httpClient, 'delete').mockReturnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .clearCheckoutDeliveryMode(userId, cartId)
          .pipe(take(1))
          .subscribe({ error: (err) => (result = err) });

        await vi.advanceTimersByTimeAsync(4200);

        expect(result).toEqual(mockNormalizedJaloError);

        subscription.unsubscribe();
      });

      it(`should successfully backOff on Jalo error and recover after the 2nd retry`, async () => {
        let calledTimes = -1;

        vi.spyOn(httpClient, 'delete').mockReturnValue(
          defer(() => {
            calledTimes++;
            if (calledTimes === 3) {
              return of(checkoutData);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: unknown;
        const subscription = service
          .clearCheckoutDeliveryMode(userId, cartId)
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

        expect(result).toEqual(checkoutData);
        subscription.unsubscribe();
      });
    });
  });
});
