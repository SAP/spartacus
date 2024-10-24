import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
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
import { take } from 'rxjs/operators';
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
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutPaymentTypeAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LoggerService, useClass: MockLoggerService },
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

    spyOn(converter, 'pipeableMany').and.callThrough();
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

    it(`should return paymentTypes`, (done) => {
      service
        .getPaymentTypes()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(paymentTypesList.paymentTypes);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === 'paymenttypes';
      });

      expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
        sendUserIdAsHeader: true,
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(paymentTypesList);
    });

    it(`should use converter`, () => {
      service.getPaymentTypes().subscribe();
      httpMock.expectOne('paymenttypes').flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        CHECKOUT_PAYMENT_TYPE_NORMALIZER
      );
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'get').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .getPaymentTypes()
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
        tick(300);
        expect(result).toEqual(undefined);

        // 2*2*300 = 1200
        tick(1200);
        expect(result).toEqual(undefined);

        // 3*3*300 = 2700
        tick(2700);

        expect(result).toEqual(paymentTypesList.paymentTypes);
        subscription.unsubscribe();
      }));
    });
  });

  describe(`setPaymentType`, () => {
    const paymentType = 'CARD';

    it(`should set payment type to cart`, (done) => {
      service
        .setPaymentType(userId, cartId, paymentType)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(cartData);
          done();
        });

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
    });

    it(`should set payment type to cart that contains purchaseOrderNumber`, (done) => {
      const purchaseOrderNumber = 'test-number';

      service
        .setPaymentType(userId, cartId, paymentType, purchaseOrderNumber)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(cartData);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `users/${userId}/carts/${cartId}/paymenttype?fields=DEFAULT&paymentType=${paymentType}&purchaseOrderNumber=${purchaseOrderNumber}`
        );
      });

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
          .setPaymentType(userId, cartId, paymentType)
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

        let result: Cart | undefined;
        const subscription = service
          .setPaymentType(userId, cartId, paymentType)
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
});
