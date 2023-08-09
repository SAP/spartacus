import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  BaseOccUrlProperties,
  ConverterService,
  DynamicAttributes,
  HttpErrorModel,
  normalizeHttpError,
} from '@spartacus/core';
import { defer, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { OpfEndpointsService } from '../../core/services';
import { OPF_PAYMENT_VERIFICATION_NORMALIZER } from '../../core/tokens';
import { OpfConfig } from '../../root/config';
import { OpfPaymentVerificationResponse } from '../../root/model';
import { OccOpfPaymentAdapter } from './occ-opf.adapter';

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

const mockPaymentSessionId = '123';

const mockNormalizedJaloError = normalizeHttpError(mockJaloError);

const mock500Error = new HttpErrorResponse({
  error: 'error',
  headers: new HttpHeaders().set('xxx', 'xxx'),
  status: 500,
  statusText: 'Unknown error',
  url: '/xxx',
});

const mockNormalized500Error = normalizeHttpError(mock500Error);

describe(`OccOpfPaymentAdapter`, () => {
  let service: OccOpfPaymentAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let opfEndpointsService: OpfEndpointsService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOpfPaymentAdapter,
        {
          provide: OpfEndpointsService,
          useClass: MockOpfEndpointsService,
        },
        {
          provide: OpfConfig,
          useValue: mockOpfConfig,
        },
      ],
    });

    service = TestBed.inject(OccOpfPaymentAdapter);
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

      it(`should successfully backOff on Jalo error and recover after the third retry`, fakeAsync(() => {
        let calledTimes = -1;

        spyOn(httpClient, 'post').and.returnValue(
          defer(() => {
            calledTimes++;
            if (calledTimes === 3) {
              return of(mockResult);
            }
            return throwError(mockJaloError);
          })
        );

        let result: OpfPaymentVerificationResponse | undefined;
        const subscription = service
          .verifyPayment(mockPaymentSessionId, mockPayload)
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

        expect(result).toEqual(mockResult);
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

        // 1*1*300 = 300
        tick(300);
        expect(result).toEqual(undefined);

        // 2*2*300 = 1200
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
});
