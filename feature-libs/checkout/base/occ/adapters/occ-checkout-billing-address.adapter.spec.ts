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
  Address,
  ConverterService,
  HttpErrorModel,
  LoggerService,
  OccConfig,
  OccEndpoints,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { defer, firstValueFrom, of, throwError } from 'rxjs';
import { OccCheckoutBillingAddressAdapter } from './occ-checkout-billing-address.adapter';

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
        setBillingAddress: 'users/${userId}/carts/${cartId}/addresses/billing',
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

describe(`OccCheckoutBillingAddressAdapter`, () => {
  let service: OccCheckoutBillingAddressAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let logger: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCheckoutBillingAddressAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(OccCheckoutBillingAddressAdapter);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    logger = TestBed.inject(LoggerService);

    vi.spyOn(converter, 'pipeable');
    vi.spyOn(converter, 'pipeableMany');
    vi.spyOn(converter, 'convert');
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`setAddress`, () => {
    const address: Address = { country: 'Poland' } as Address;

    it(`should set address for cart for given user id, cart id and address id`, async () => {
      const resultPromise = firstValueFrom(
        service.setBillingAddress(userId, cartId, address)
      );

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url === `users/${userId}/carts/${cartId}/addresses/billing`
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
        vi.spyOn(httpClient, 'put').mockReturnValue(throwError(mockJaloError));

        let result: HttpErrorModel | undefined;
        const subscription = service
          .setBillingAddress(userId, cartId, address)
          .pipe(take(1))
          .subscribe({ error: (err) => (result = err) });

        await vi.advanceTimersByTimeAsync(4200);

        const mockNormalizedJaloError = tryNormalizeHttpError(
          mockJaloError,
          logger
        );
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
            return throwError(mockJaloError);
          })
        );

        let result: unknown;
        const subscription = service
          .setBillingAddress(userId, cartId, address)
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
