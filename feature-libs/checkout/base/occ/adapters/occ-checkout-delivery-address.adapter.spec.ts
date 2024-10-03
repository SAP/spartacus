import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Cart } from '@spartacus/cart/base/root';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  ADDRESS_NORMALIZER,
  ADDRESS_SERIALIZER,
  Address,
  ConverterService,
  HttpErrorModel,
  LoggerService,
  OccConfig,
  OccEndpoints,
  normalizeHttpError,
} from '@spartacus/core';
import { defer, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { OccCheckoutDeliveryAddressAdapter } from './occ-checkout-delivery-address.adapter';

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
        setDeliveryAddress:
          'orgUsers/${userId}/carts/${cartId}/addresses/delivery',
        createDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
        removeDeliveryAddress:
          'users/${userId}/carts/${cartId}/addresses/delivery',
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

describe(`OccCheckoutDeliveryAddressAdapter`, () => {
  let service: OccCheckoutDeliveryAddressAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutDeliveryAddressAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });
    service = TestBed.inject(OccCheckoutDeliveryAddressAdapter);
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

  describe(`createAddress`, () => {
    const mockAddress: Address = {
      firstName: 'Mock',
      lastName: 'Address',
    };

    it(`should create address for cart for given user id, cart id and address`, (done) => {
      service
        .createAddress(userId, cartId, mockAddress)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockAddress);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url === `users/${userId}/carts/${cartId}/addresses/delivery`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockAddress);
      expect(converter.pipeable).toHaveBeenCalledWith(ADDRESS_NORMALIZER);
      expect(converter.convert).toHaveBeenCalledWith(
        mockAddress,
        ADDRESS_SERIALIZER
      );
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'post').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .createAddress(userId, cartId, mockAddress)
          .pipe(take(1))
          .subscribe({ error: (err) => (result = err) });

        tick(4200);

        expect(result).toEqual(mockNormalizedJaloError);

        subscription.unsubscribe();
      }));

      it(`should successfully backOff on Jalo error and recover after the 2nd retry`, fakeAsync(() => {
        let calledTimes = -1;

        spyOn(httpClient, 'post').and.returnValue(
          defer(() => {
            calledTimes++;
            if (calledTimes === 3) {
              return of(mockAddress);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: Address | undefined;
        const subscription = service
          .createAddress(userId, cartId, mockAddress)
          .pipe(take(1))
          .subscribe((res) => (result = res));

        // 1*1*300 = 300
        tick(300);
        expect(result).toEqual(undefined);

        // 2*2*300 = 1200
        tick(1200);
        expect(result).toEqual(undefined);

        // 3*3*300 = 2700
        tick(2700);

        expect(result).toEqual(mockAddress);
        subscription.unsubscribe();
      }));
    });
  });

  describe(`setAddress`, () => {
    const addressId = 'addressId';

    it(`should set address for cart for given user id, cart id and address id`, (done) => {
      service
        .setAddress(userId, cartId, addressId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(cartData);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `orgUsers/${userId}/carts/${cartId}/addresses/delivery?addressId=${addressId}`
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
          .setAddress(userId, cartId, addressId)
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
          .setAddress(userId, cartId, addressId)
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

  describe(`clearCheckoutDeliveryAddress`, () => {
    it(`should clear checkout delivery address for given userId, cartId`, (done) => {
      service
        .clearCheckoutDeliveryAddress(userId, cartId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(checkoutData);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'DELETE' &&
          req.url === `users/${userId}/carts/${cartId}/addresses/delivery`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(checkoutData);
    });
  });

  describe(`back-off`, () => {
    it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
      spyOn(httpClient, 'delete').and.returnValue(
        throwError(() => mockJaloError)
      );

      let result: HttpErrorModel | undefined;
      const subscription = service
        .clearCheckoutDeliveryAddress(userId, cartId)
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
        .clearCheckoutDeliveryAddress(userId, cartId)
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
