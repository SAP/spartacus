import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  ConverterService,
  HttpErrorModel,
  normalizeHttpError,
  OccConfig,
  OccEndpoints,
} from '@spartacus/core';
import { Order, ORDER_NORMALIZER } from '@spartacus/order/root';
import { defer, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { OccOrderAdapter } from './occ-order.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        placeOrder: 'users/${userId}/orders?fields=FULL',
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
const mockNormalizedJaloError = normalizeHttpError(mockJaloError);

describe('OccOrderAdapter', () => {
  let service: OccOrderAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOrderAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccOrderAdapter);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`placeOrder`, () => {
    it(`should be able to place order for the cart`, (done) => {
      service
        .placeOrder(userId, cartId, termsChecked)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(orderData);
          done();
        });

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
    });

    it(`should use converter`, (done) => {
      service
        .placeOrder(userId, cartId, termsChecked)
        .pipe(take(1))
        .subscribe(() => {
          done();
        });
      httpMock
        .expectOne(
          (req) =>
            req.method === 'POST' &&
            req.url ===
              `users/${userId}/orders?fields=FULL&cartId=${cartId}&termsChecked=${termsChecked}`
        )
        .flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'post').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .placeOrder(userId, cartId, termsChecked)
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
        tick(300);
        expect(result).toEqual(undefined);

        // 2*2*300 = 1200
        tick(1200);
        expect(result).toEqual(undefined);

        // 3*3*300 = 2700
        tick(2700);

        expect(result).toEqual({});
        subscription.unsubscribe();
      }));
    });
  });
});
