import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  BaseOccUrlProperties,
  ConverterService,
  DynamicAttributes,
  HttpErrorModel,
  LoggerService,
  OccEndpointsService,
  normalizeHttpError,
} from '@spartacus/core';
import { defer, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';

import { OTP_NORMALIZER } from '../../core/connectors';
import { OpfConfig } from '../../root/config';
import { OccOtpAdapter } from './occ-otp.adapter';

const mockOpfConfig: OpfConfig = {};

const mockResult = 'mockOtpToken';

class MockLoggerService implements Partial<LoggerService> {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

class MockOccEndpointsService implements Partial<OccEndpointsService> {
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

const mockUserId = 'userId';
const mockCartId = 'cartId';

const mock500Error = new HttpErrorResponse({
  error: 'error',
  headers: new HttpHeaders().set('xxx', 'xxx'),
  status: 500,
  statusText: 'Unknown error',
  url: '/xxx',
});

const mockNormalized500Error = normalizeHttpError(
  mock500Error,
  new MockLoggerService()
);

describe(`OccOtpAdapter`, () => {
  let service: OccOtpAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEndpointsService: OccEndpointsService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOtpAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
        {
          provide: OpfConfig,
          useValue: mockOpfConfig,
        },
        {
          provide: LoggerService,
          useClass: MockLoggerService,
        },
      ],
    });

    service = TestBed.inject(OccOtpAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    converter = TestBed.inject(ConverterService);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converter, 'convert').and.callThrough();
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`generateOtpKey`, () => {
    it(`should get all supported delivery modes for cart for given user id and cart id`, (done) => {
      service
        .generateOtpKey(mockUserId, mockCartId)
        .pipe(take(1))
        .subscribe((result: string | undefined) => {
          expect(result).toEqual(mockResult);
          done();
        });

      const url = service['getGenerateOtpKeyEndpoint'](mockUserId, mockCartId);
      const mockReq = httpMock.expectOne(url);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockResult);
      expect(converter.pipeable).toHaveBeenCalledWith(OTP_NORMALIZER);
    });

    describe(`back-off`, () => {
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

        let result: string | undefined;
        const subscription = service
          .generateOtpKey(mockUserId, mockCartId)
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
          .generateOtpKey(mockUserId, mockCartId)
          .subscribe({ error: (err) => (result = err) });

        tick(4200);

        expect(result).toEqual(mockNormalized500Error);

        subscription.unsubscribe();
      }));
    });
  });
});
