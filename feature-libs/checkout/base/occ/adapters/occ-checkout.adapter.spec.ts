import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  ConverterService,
  HttpErrorModel,
  LoggerService,
  OccConfig,
  OccEndpoints,
  normalizeHttpError,
} from '@spartacus/core';
import { defer, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { OccCheckoutAdapter } from './occ-checkout.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        placeOrder: 'users/${userId}/orders?fields=FULL',
        removeDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        clearDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
        getCheckoutDetails:
          'users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode,paymentInfo(FULL)',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};

const userId = '123';
const cartId = '456';

const checkoutData: Partial<CheckoutState> = {
  deliveryAddress: {
    firstName: 'Janusz',
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

const mockNormalizedJaloError = normalizeHttpError(
  mockJaloError,
  new MockLoggerService()
);

describe('OccCheckoutAdapter', () => {
  let service: OccCheckoutAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });
    service = TestBed.inject(OccCheckoutAdapter);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`getCheckoutDetails`, () => {
    it(`should get checkout details data for given userId, cartId`, (done) => {
      service
        .getCheckoutDetails(userId, cartId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(checkoutData as CheckoutState);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode,paymentInfo(FULL)`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(checkoutData);
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'get').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .getCheckoutDetails(userId, cartId)
          .pipe(take(1))
          .subscribe({ error: (err) => (result = err) });

        tick(4200);

        expect(result).toEqual(mockNormalizedJaloError);

        subscription.unsubscribe();
      }));

      it(`should successfully backOff on Jalo error and recover after the 2nd retry`, fakeAsync(() => {
        let calledTimes = -1;

        spyOn(httpClient, 'get').and.returnValue(
          defer(() => {
            calledTimes++;
            if (calledTimes === 3) {
              return of(checkoutData);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: CheckoutState | undefined;
        const subscription = service
          .getCheckoutDetails(userId, cartId)
          .pipe(take(1))
          .subscribe((res) => {
            result = res;
          });

        // 1*1*300 = 300
        tick(300);
        expect(result).toEqual(undefined);

        // 2*2*300 = 1200
        tick(1200);
        expect(result).toEqual(undefined);

        // 3*3*300 = 2700
        tick(2700);

        expect(result).toEqual(checkoutData);
        subscription.unsubscribe();
      }));
    });
  });
});
