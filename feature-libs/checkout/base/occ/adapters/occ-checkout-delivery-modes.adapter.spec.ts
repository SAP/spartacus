import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
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
  normalizeHttpError,
} from '@spartacus/core';
import { defer, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
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

const mockNormalizedJaloError = normalizeHttpError(
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
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutDeliveryModesAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });
    service = TestBed.inject(OccCheckoutDeliveryModesAdapter);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`getSupportedModes`, () => {
    const mockDeliveryModes: Occ.DeliveryModeList = {
      deliveryModes: [{ name: 'mockDeliveryMode' }],
    };

    it(`should get all supported delivery modes for cart for given user id and cart id`, (done) => {
      service
        .getSupportedModes(userId, cartId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockDeliveryModes.deliveryModes);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url === `users/${userId}/carts/${cartId}/deliverymodes`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockDeliveryModes);
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        DELIVERY_MODE_NORMALIZER
      );
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'get').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .getSupportedModes(userId, cartId)
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
        tick(300);
        expect(result).toEqual(undefined);

        // 2*2*300 = 1200
        tick(1200);
        expect(result).toEqual(undefined);

        // 3*3*300 = 2700
        tick(2700);

        expect(result).toEqual(mockDeliveryModes.deliveryModes);
        subscription.unsubscribe();
      }));
    });
  });

  describe(`set delivery mode for cart`, () => {
    const deliveryModeId = 'deliveryModeId';

    it(`should set modes for cart for given user id, cart id and delivery mode id`, (done) => {
      service
        .setMode(userId, cartId, deliveryModeId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(cartData);
          done();
        });

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
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'put').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .setMode(userId, cartId, deliveryModeId)
          .pipe(take(1))
          .subscribe({ error: (err) => (result = err) });

        tick(4200);

        expect(result).toEqual(mockNormalizedJaloError);

        subscription.unsubscribe();
      }));

      it(`should successfully backOff on Jalo error and recover after the 2nd retry`, fakeAsync(() => {
        let calledTimes = -1;

        spyOn(httpClient, 'put').and.returnValue(
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
        tick(300);
        expect(result).toEqual(undefined);

        // 2*2*300 = 1200
        tick(1200);
        expect(result).toEqual(undefined);

        // 3*3*300 = 2700
        tick(2700);

        expect(result).toEqual(cartData);
        subscription.unsubscribe();
      }));
    });
  });

  describe(`clear checkout delivery mode`, () => {
    it(`should clear checkout delivery mode for given userId, cartId`, (done) => {
      service
        .clearCheckoutDeliveryMode(userId, cartId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(checkoutData);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'DELETE' &&
          req.url === `users/${userId}/carts/${cartId}/deliverymode`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(checkoutData);
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'delete').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .clearCheckoutDeliveryMode(userId, cartId)
          .pipe(take(1))
          .subscribe({ error: (err) => (result = err) });

        tick(4200);

        expect(result).toEqual(mockNormalizedJaloError);

        subscription.unsubscribe();
      }));

      it(`should successfully backOff on Jalo error and recover after the 2nd retry`, fakeAsync(() => {
        let calledTimes = -1;

        spyOn(httpClient, 'delete').and.returnValue(
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
