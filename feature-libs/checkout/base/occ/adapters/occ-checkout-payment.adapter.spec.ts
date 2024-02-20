import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Cart } from '@spartacus/cart/base/root';
import {
  PAYMENT_CARD_TYPE_NORMALIZER,
  PAYMENT_DETAILS_SERIALIZER,
} from '@spartacus/checkout/base/core';
import {
  CardType,
  ConverterService,
  HttpErrorModel,
  LoggerService,
  Occ,
  OccConfig,
  OccEndpoints,
  PAYMENT_DETAILS_NORMALIZER,
  PaymentDetails,
  normalizeHttpError,
} from '@spartacus/core';
import { defer, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { OccCheckoutPaymentAdapter } from './occ-checkout-payment.adapter';

const userId = '123';
const cartId = '456';
const cartData: Partial<Cart> = {
  store: 'electronics',
  guid: '1212121',
};
const mockPaymentDetails: PaymentDetails = {
  accountHolderName: 'mockPaymentDetails',
  cardType: {
    code: 'aaa',
  },
  billingAddress: {
    country: {},
    region: {},
  },
};

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        setCartPaymentDetails: 'users/${userId}/carts/${cartId}/paymentdetails',
        paymentProviderSubInfo:
          'users/${userId}/carts/${cartId}/payment/sop/request?responseUrl=sampleUrl',
        createPaymentDetails:
          'users/${userId}/carts/${cartId}/payment/sop/response',
        cardTypes: 'cardtypes',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};

const paymentProviderInfo = {
  mappingLabels: {
    entry: [
      {
        key: 'hybris_sop_amount',
        value: 'amount',
      },
      {
        key: 'hybris_sop_currency',
        value: '',
      },
      {
        key: 'hybris_billTo_country',
        value: 'billTo_country',
      },
      {
        key: 'hybris_card_type',
        value: 'card_type',
      },
      {
        key: 'hybris_card_expiration_year',
        value: 'card_expirationYear',
      },
      {
        key: 'hybris_sop_reason_code',
        value: 'reason_code',
      },
      {
        key: 'hybris_combined_expiry_date',
        value: 'false',
      },
      {
        key: 'hybris_sop_decision',
        value: 'decision',
      },
      {
        key: 'hybris_card_expiry_date',
        value: 'card_expirationDate',
      },
      {
        key: 'hybris_card_expiration_month',
        value: 'card_expirationMonth',
      },
      {
        key: 'hybris_billTo_street1',
        value: 'billTo_street1',
      },
      {
        key: 'hybris_sop_card_number',
        value: 'card_accountNumber',
      },
      {
        key: 'hybris_separator_expiry_date',
        value: '',
      },
      {
        key: 'hybris_account_holder_name',
        value: 'mockup_account_holder',
      },
      {
        key: 'hybris_sop_uses_public_signature',
        value: 'false',
      },
      {
        key: 'hybris_card_number',
        value: 'card_accountNumber',
      },
      {
        key: 'hybris_card_cvn',
        value: 'card_cvNumber',
      },
      {
        key: 'hybris_billTo_lastname',
        value: 'billTo_lastName',
      },
      {
        key: 'hybris_billTo_city',
        value: 'billTo_city',
      },
      {
        key: 'hybris_billTo_firstname',
        value: 'billTo_firstName',
      },
      {
        key: 'hybris_billTo_region',
        value: 'billTo_state',
      },
      {
        key: 'hybris_billTo_postalcode',
        value: 'billTo_postalCode',
      },
    ],
  },
  parameters: {
    entry: [],
  },
  postUrl: 'https://testurl',
};

const html =
  '<form id="silentOrderPostForm" name="silentOrderPostForm" action="javascript:false;" method="post">' +
  '<div id="postFormItems">' +
  '<dl>' +
  '<input type="hidden" id="billTo_city" name="billTo_city" value="MainCity" />' +
  '<input type="hidden" id="amount" name="amount" value="0" />' +
  '<input type="hidden" id="decision_publicSignature" name="decision_publicSignature" value="mEhlMRLCsuPimhp50ElrY94zFyc=" />' +
  '<input type="hidden" id="decision" name="decision" value="ACCEPT" />' +
  '<input type="hidden" id="billTo_country" name="billTo_country" value="US" />' +
  '<input type="hidden" id="billTo_state" name="billTo_state" value="CA" />' +
  '<input type="hidden" id="billTo_lastName" name="billTo_lastName" value="test" />' +
  '<input type="hidden" id="ccAuthReply_cvCode" name="ccAuthReply_cvCode" value="M" />' +
  '<input type="hidden" id="billTo_postalCode" name="billTo_postalCode" value="12345" />' +
  '<input type="hidden" id="billTo_street1" name="billTo_street1" value="999 de Maisonneuve" />' +
  '<input type="hidden" id="billTo_firstName" name="billTo_firstName" value="test" />' +
  '<input type="hidden" id="card_cardType" name="card_cardType" value="visa" />' +
  '<input type="hidden" id="card_expirationMonth" name="card_expirationMonth" value="12" />' +
  '<input type="hidden" id="card_expirationYear" name="card_expirationYear" value="2020" />' +
  '<input type="hidden" id="reasonCode" name="reasonCode" value="100" />' +
  '<input type="hidden" id="card_accountNumber" name="card_accountNumber" value="************1111" />' +
  '</dl>' +
  '</div>' +
  '</form>';

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

describe('OccCheckoutPaymentAdapter', () => {
  let service: OccCheckoutPaymentAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutPaymentAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });
    service = TestBed.inject(OccCheckoutPaymentAdapter);
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

  describe(`setPaymentDetails`, () => {
    const paymentDetailsId = '999';

    it(`should set payment details for given user id, cart id and payment details id`, (done) => {
      service
        .setPaymentDetails(userId, cartId, paymentDetailsId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(cartData);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `users/${userId}/carts/${cartId}/paymentdetails?paymentDetailsId=${paymentDetailsId}`
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
          .setPaymentDetails(userId, cartId, paymentDetailsId)
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
          .setPaymentDetails(userId, cartId, paymentDetailsId)
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

  describe(`createPaymentDetails`, () => {
    it(`should create payment`, (done) => {
      service
        .createPaymentDetails(userId, cartId, mockPaymentDetails)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockPaymentDetails);
          done();
        });

      httpMock
        .expectOne((req) => {
          return (
            req.method === 'GET' &&
            req.url ===
              `users/${userId}/carts/${cartId}/payment/sop/request?responseUrl=sampleUrl`
          );
        })
        .flush(paymentProviderInfo);

      httpMock
        .expectOne((req) => {
          return (
            req.method === 'POST' && req.url === paymentProviderInfo.postUrl
          );
        })
        .flush(html);

      httpMock
        .expectOne((req) => {
          return (
            req.method === 'POST' &&
            req.url === `users/${userId}/carts/${cartId}/payment/sop/response`
          );
        })
        .flush(mockPaymentDetails);

      expect(converter.pipeable).toHaveBeenCalledWith(
        PAYMENT_DETAILS_NORMALIZER
      );
      expect(converter.convert).toHaveBeenCalledWith(
        mockPaymentDetails,
        PAYMENT_DETAILS_SERIALIZER
      );
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'get').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .createPaymentDetails(userId, cartId, mockPaymentDetails)
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
              return of(paymentProviderInfo);
            }
            return throwError(() => mockJaloError);
          })
        );
        spyOn(httpClient, 'post').and.returnValues(
          of(html),
          of(mockPaymentDetails)
        );

        let result: PaymentDetails | undefined;
        const subscription = service
          .createPaymentDetails(userId, cartId, mockPaymentDetails)
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

        expect(result).toEqual(mockPaymentDetails);
        subscription.unsubscribe();
      }));
    });
  });

  describe(`getProviderSubInfo`, () => {
    it(`should get payment provider subscription info for given user id and cart id`, (done) => {
      // testing protected method
      service['getProviderSubInfo'](userId, cartId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(cartData);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${userId}/carts/${cartId}/payment/sop/request?responseUrl=sampleUrl`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'get').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service['getProviderSubInfo'](userId, cartId)
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
              return of(cartData);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: unknown;
        const subscription = service['getProviderSubInfo'](userId, cartId)
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

  describe(`createSubWithProvider with single param`, () => {
    const params = {
      param: 'mockParam',
    };
    const mockUrl = 'mockUrl';
    const mockPaymentProvider = 'mockPaymentProvider';

    it(`should create subscription with payment provider for given url and parameters`, (done) => {
      // testing protected method
      service['createSubWithProvider'](mockUrl, params)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockPaymentProvider);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === mockUrl;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.headers.get('Accept')).toEqual('text/html');
      expect(mockReq.request.responseType).toEqual('text');
      expect(mockReq.request.body.get('param')).toEqual('mockParam');
      mockReq.flush(mockPaymentProvider);
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'post').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service['createSubWithProvider'](mockUrl, params)
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
              return of(mockPaymentProvider);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: unknown;
        const subscription = service['createSubWithProvider'](mockUrl, params)
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

        expect(result).toEqual(mockPaymentProvider);
        subscription.unsubscribe();
      }));
    });
  });

  describe(`createSubWithProvider with multiple param`, () => {
    const params = {
      param1: 'mockParam1',
      param2: 'mockParam2',
    };
    const mockUrl = 'mockUrl';
    const mockPaymentProvider = 'mockPaymentProvider';

    it(`should create subscription with payment provider for given url and parameters`, (done) => {
      // testing protected method
      service['createSubWithProvider'](mockUrl, params)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockPaymentProvider);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === mockUrl;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.headers.get('Accept')).toEqual('text/html');
      expect(mockReq.request.body.get('param1')).toEqual('mockParam1');
      expect(mockReq.request.body.get('param2')).toEqual('mockParam2');
      expect(mockReq.request.responseType).toEqual('text');
      mockReq.flush(mockPaymentProvider);
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'post').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service['createSubWithProvider'](mockUrl, params)
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
              return of(mockPaymentProvider);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: unknown;
        const subscription = service['createSubWithProvider'](mockUrl, params)
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

        expect(result).toEqual(mockPaymentProvider);
        subscription.unsubscribe();
      }));
    });
  });

  describe(`createDetailsWithParameter with single param`, () => {
    const params = {
      param: 'mockParam',
    };

    it(`should create payment details for given user id, cart id and parameters`, (done) => {
      // testing protected method
      service['createDetailsWithParameters'](userId, cartId, params)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockPaymentDetails);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url === `users/${userId}/carts/${cartId}/payment/sop/response`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.body.get('param')).toEqual('mockParam');
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockPaymentDetails);
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'post').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service['createDetailsWithParameters'](
          userId,
          cartId,
          params
        )
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
              return of(mockPaymentDetails);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: unknown;
        const subscription = service['createDetailsWithParameters'](
          userId,
          cartId,
          params
        )
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

        expect(result).toEqual(mockPaymentDetails);
        subscription.unsubscribe();
      }));
    });
  });

  describe(`createDetailsWithParameter with multiple param`, () => {
    const params = {
      param1: 'mockParam1',
      param2: 'mockParam2',
    };

    it(`should create payment details for given user id, cart id and parameters`, (done) => {
      // testing protected method
      service['createDetailsWithParameters'](userId, cartId, params)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockPaymentDetails);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url === `users/${userId}/carts/${cartId}/payment/sop/response`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.body.get('param1')).toEqual('mockParam1');
      expect(mockReq.request.body.get('param2')).toEqual('mockParam2');
      mockReq.flush(mockPaymentDetails);
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'post').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service['createDetailsWithParameters'](
          userId,
          cartId,
          params
        )
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
              return of(mockPaymentDetails);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: unknown;
        const subscription = service['createDetailsWithParameters'](
          userId,
          cartId,
          params
        )
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

        expect(result).toEqual(mockPaymentDetails);
        subscription.unsubscribe();
      }));
    });
  });

  describe(`getPaymentCardTypes`, () => {
    const cardTypesList: Occ.CardTypeList = {
      cardTypes: [
        {
          code: 'amex',
          name: 'American Express',
        },
        {
          code: 'maestro',
          name: 'Maestro',
        },
      ],
    };

    it(`should return cardTypes`, (done) => {
      service
        .getPaymentCardTypes()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(cardTypesList.cardTypes);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === 'cardtypes';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cardTypesList);
    });

    it(`should use converter`, (done) => {
      service
        .getPaymentCardTypes()
        .pipe(take(1))
        .subscribe(() => {
          done();
        });
      httpMock.expectOne('cardtypes').flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        PAYMENT_CARD_TYPE_NORMALIZER
      );
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'get').and.returnValue(
          throwError(() => mockJaloError)
        );

        let result: HttpErrorModel | undefined;
        const subscription = service
          .getPaymentCardTypes()
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
              return of(cardTypesList);
            }
            return throwError(() => mockJaloError);
          })
        );

        let result: CardType[] | undefined;
        const subscription = service
          .getPaymentCardTypes()
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

        expect(result).toEqual(cardTypesList.cardTypes);
        subscription.unsubscribe();
      }));
    });
  });

  describe(`getParamsForPaymentProvider `, () => {
    const parametersSentByBackend = [
      { key: 'billTo_country', value: 'CA' },
      { key: 'billTo_state', value: 'QC' },
    ];
    const labelsMap = {
      hybris_billTo_country: 'billTo_country',
      hybris_billTo_region: 'billTo_state',
    };

    it(`should support billing address in a different country than the default/shipping address.`, () => {
      const paymentDetails: PaymentDetails = {
        cardType: { code: 'visa' },
        billingAddress: {
          country: { isocode: 'US' },
          region: { isocodeShort: 'RG' },
        },
      };

      const params = service['getParamsForPaymentProvider'](
        paymentDetails,
        parametersSentByBackend,
        labelsMap
      );
      expect(params['billTo_country']).toEqual(
        paymentDetails.billingAddress?.country?.isocode
      );
      expect(params['billTo_state']).toEqual(
        paymentDetails.billingAddress?.region?.isocodeShort
      );
    });

    it(`should support billing address different than shipping when billing country has no region.`, () => {
      const paymentDetails: PaymentDetails = {
        cardType: { code: 'visa' },
        billingAddress: {
          country: { isocode: 'PL' },
        },
      };

      const params = service['getParamsForPaymentProvider'](
        paymentDetails,
        parametersSentByBackend,
        labelsMap
      );
      expect(params['billTo_country']).toEqual(
        paymentDetails.billingAddress?.country?.isocode
      );
      expect(params['billTo_state']).toEqual('');
    });
  });
});
