/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  BaseOccUrlProperties,
  ConverterService,
  DynamicAttributes,
  HttpErrorModel,
  LoggerService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { OpfEndpointsService } from '@spartacus/opf/base/core';
import {
  OpfConfig,
  OpfMetadataStatePersistanceService,
} from '@spartacus/opf/base/root';
import { OpfPaymentError } from '@spartacus/opf/payment/root';
import { defer, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { OPF_PAYMENT_VERIFICATION_NORMALIZER } from '../../core/tokens';
import { OpfPaymentVerificationResponse } from '../../root/model';
import { OpfApiPaymentAdapter } from './opf-api-payment.adapter';

class MockLoggerService implements Partial<LoggerService> {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

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

const mockOpfConfig: OpfConfig = {};

const mockPayload = {
  responseMap: [
    {
      key: 'key',
      value: 'value',
    },
  ],
};

const mockResult: OpfPaymentVerificationResponse = {
  result: 'mockResult',
};

export class MockOpfEndpointsService implements Partial<OpfEndpointsService> {
  buildUrl(
    endpoint: string,
    _attributes?: DynamicAttributes,
    _propertiesToOmit?: BaseOccUrlProperties
  ) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(endpoint: string) {
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    return endpoint;
  }
}

class MockOpfMetadataStatePersistanceService
  implements Partial<OpfMetadataStatePersistanceService>
{
  getActiveLanguage(): string {
    return 'en-us';
  }
}

const mockPaymentSessionId = '123';

const mockNormalizedJaloError = tryNormalizeHttpError(
  mockJaloError,
  new MockLoggerService()
);

const mock500Error = new HttpErrorResponse({
  error: 'error',
  headers: new HttpHeaders().set('xxx', 'xxx'),
  status: 500,
  statusText: 'Unknown error',
  url: '/xxx',
});

const mockNormalized500Error = tryNormalizeHttpError(
  mock500Error,
  new MockLoggerService()
);

describe(`OpfApiPaymentAdapter`, () => {
  let service: OpfApiPaymentAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let opfEndpointsService: OpfEndpointsService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfApiPaymentAdapter,
        {
          provide: OpfEndpointsService,
          useClass: MockOpfEndpointsService,
        },
        {
          provide: OpfConfig,
          useValue: mockOpfConfig,
        },
        {
          provide: OpfMetadataStatePersistanceService,
          useClass: MockOpfMetadataStatePersistanceService,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(OpfApiPaymentAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    converter = TestBed.inject(ConverterService);
    opfEndpointsService = TestBed.inject(OpfEndpointsService);
    spyOn(converter, 'convert').and.callThrough();
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(opfEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`verifyPayment`, () => {
    it(`should get all supported delivery modes for cart for given user id and cart id`, (done) => {
      service
        .verifyPayment(mockPaymentSessionId, mockPayload)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockResult);
          done();
        });

      const url = service['verifyPaymentEndpoint'](mockPaymentSessionId);
      const mockReq = httpMock.expectOne(url);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockResult);
      expect(converter.pipeable).toHaveBeenCalledWith(
        OPF_PAYMENT_VERIFICATION_NORMALIZER
      );
    });

    describe(`back-off`, () => {
      it(`should unsuccessfully backOff on Jalo error`, fakeAsync(() => {
        spyOn(httpClient, 'post').and.returnValue(throwError(mockJaloError));

        let result: HttpErrorModel | undefined;
        const subscription = service
          .verifyPayment(mockPaymentSessionId, mockPayload)
          .subscribe({ error: (err) => (result = err) });

        tick(4200);

        expect(result).toEqual(mockNormalizedJaloError);

        subscription.unsubscribe();
      }));

      it(`should successfully backOff on 500 error and recover after the 2nd retry`, fakeAsync(() => {
        let calledTimes = -1;

        spyOn(httpClient, 'post').and.returnValue(
          defer(() => {
            calledTimes++;
            if (calledTimes === 2) {
              return of(mockResult);
            }
            return throwError(mock500Error);
          })
        );

        let result: OpfPaymentVerificationResponse | undefined;
        const subscription = service
          .verifyPayment(mockPaymentSessionId, mockPayload)
          .pipe(take(1))
          .subscribe((res) => (result = res));

        tick(300);
        expect(result).toEqual(undefined);

        tick(1200);

        expect(result).toEqual(mockResult);
        subscription.unsubscribe();
      }));

      it(`should unsuccessfully backOff on 500 error`, fakeAsync(() => {
        spyOn(httpClient, 'post').and.returnValue(throwError(mock500Error));

        let result: HttpErrorModel | undefined;
        const subscription = service
          .verifyPayment(mockPaymentSessionId, mockPayload)
          .subscribe({ error: (err) => (result = err) });

        tick(4200);

        expect(result).toEqual(mockNormalized500Error);

        subscription.unsubscribe();
      }));
    });
  });

  describe(`submitPayment`, () => {
    it(`should merge HTTP 4xx error body into thrown error`, fakeAsync(() => {
      const mockErrorBody = {
        message: 'Payment request failed with status: REJECTED',
        type: 'business_error',
        details: [{ type: 'some_detail', message: 'detail msg' }],
        customFields: [{ key: 'errorCode', value: 'CARD_DECLINED' }],
      };
      const mockHttpError = new HttpErrorResponse({
        error: mockErrorBody,
        status: 400,
        statusText: 'Bad Request',
      });

      spyOn(httpClient, 'post').and.returnValue(throwError(mockHttpError));

      let result: OpfPaymentError | undefined;
      const subscription = service
        .submitPayment(
          { paymentMethod: 'CREDIT_CARD' },
          'otp',
          mockPaymentSessionId
        )
        .subscribe({ error: (err) => (result = err) });

      tick(4200);

      expect(result?.message).toBe(mockErrorBody.message);
      expect(result?.type).toBe(mockErrorBody.type);
      expect(result?.details).toEqual(mockErrorBody.details);
      expect(result?.customFields).toEqual(mockErrorBody.customFields);

      subscription.unsubscribe();
    }));

    it(`should not merge when HTTP error body is not an object`, fakeAsync(() => {
      const mockError = new HttpErrorResponse({
        error: 'plain string error',
        status: 500,
        statusText: 'Internal Server Error',
      });

      spyOn(httpClient, 'post').and.returnValue(throwError(mockError));

      let result: OpfPaymentError | undefined;
      const subscription = service
        .submitPayment(
          { paymentMethod: 'CREDIT_CARD' },
          'otp',
          mockPaymentSessionId
        )
        .subscribe({ error: (err) => (result = err) });

      tick(4200);

      expect(result?.customFields).toBeUndefined();

      subscription.unsubscribe();
    }));
  });

  describe(`submitCompletePayment`, () => {
    it(`should merge HTTP 4xx error body into thrown error`, fakeAsync(() => {
      const mockErrorBody = {
        message: 'Payment request failed with status: REJECTED',
        type: 'business_error',
        details: [{ type: 'some_detail', message: 'detail msg' }],
        customFields: [{ key: 'errorCode', value: 'CARD_DECLINED' }],
      };
      const mockHttpError = new HttpErrorResponse({
        error: mockErrorBody,
        status: 400,
        statusText: 'Bad Request',
      });

      spyOn(httpClient, 'post').and.returnValue(throwError(mockHttpError));

      let result: OpfPaymentError | undefined;
      const subscription = service
        .submitCompletePayment({}, 'otp', mockPaymentSessionId)
        .subscribe({ error: (err) => (result = err) });

      tick(4200);

      expect(result?.message).toBe(mockErrorBody.message);
      expect(result?.type).toBe(mockErrorBody.type);
      expect(result?.details).toEqual(mockErrorBody.details);
      expect(result?.customFields).toEqual(mockErrorBody.customFields);

      subscription.unsubscribe();
    }));

    it(`should not merge when HTTP error body is not an object`, fakeAsync(() => {
      const mockError = new HttpErrorResponse({
        error: 'plain string error',
        status: 500,
        statusText: 'Internal Server Error',
      });

      spyOn(httpClient, 'post').and.returnValue(throwError(mockError));

      let result: OpfPaymentError | undefined;
      const subscription = service
        .submitCompletePayment({}, 'otp', mockPaymentSessionId)
        .subscribe({ error: (err) => (result = err) });

      tick(4200);

      expect(result?.customFields).toBeUndefined();

      subscription.unsubscribe();
    }));
  });
});
