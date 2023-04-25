import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Cart } from '@spartacus/cart/base/root';
import {
  Address,
  ConverterService,
  HttpErrorModel,
  normalizeHttpError,
  OccConfig,
  OccEndpoints,
} from '@spartacus/core';
import { defer, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
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
const mockNormalizedJaloError = normalizeHttpError(mockJaloError);

describe(`OccCheckoutBillingAddressAdapter`, () => {
  let service: OccCheckoutBillingAddressAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutBillingAddressAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccCheckoutBillingAddressAdapter);
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

  describe(`setAddress`, () => {
    const address: Address = { country: 'Poland' } as Address;

    it(`should set address for cart for given user id, cart id and address id`, (done) => {
      service
        .setBillingAddress(userId, cartId, address)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(cartData);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url === `users/${userId}/carts/${cartId}/addresses/billing`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'put').and.returnValue(throwError(mockJaloError));

        let result: HttpErrorModel | undefined;
        const subscription = service
          .setBillingAddress(userId, cartId, address)
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
