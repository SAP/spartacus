import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/index';
import { AnonymousConsent, ANONYMOUS_CONSENT_STATUS } from '../../model/index';
import { OccEndpointsService } from '../../occ/index';
import { AnonymousConsentsConfig } from '../config/anonymous-consents-config';
import { AnonymousConsentsService } from '../facade/index';
import {
  AnonymousConsentsInterceptor,
  ANONYMOUS_CONSENTS_HEADER,
} from './anonymous-consents-interceptor';

const mockAnonymousConsents: AnonymousConsent[] = [
  { templateCode: 'MARKETING', version: 0, consentState: null },
  { templateCode: 'PERSONALIZATION', version: 0, consentState: null },
];

class MockOccEndpointsService {
  getBaseEndpoint(): string {
    return '';
  }
}

class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of();
  }
}

class MockAnonymousConsentsService {
  getAnonymousConsents(): Observable<AnonymousConsent[]> {
    return of();
  }
  setAnonymousConsents(_consents: AnonymousConsent[]): void {}
}

const mockAnonymousConsentsConfig: AnonymousConsentsConfig = {
  anonymousConsents: {
    requiredConsents: ['OTHER_CONSENT'],
  },
};

describe('AnonymousConsentsInterceptor', () => {
  let httpMock: HttpTestingController;
  let anonymousConsentsService: AnonymousConsentsService;
  let authService: AuthService;
  let interceptor: AnonymousConsentsInterceptor;
  let anonymousConsentService: AnonymousConsentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
        { provide: AuthService, useClass: MockAuthService },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AnonymousConsentsInterceptor,
          multi: true,
        },
        {
          provide: AnonymousConsentsConfig,
          useValue: mockAnonymousConsentsConfig,
        },
      ],
    });
    httpMock = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
    anonymousConsentsService = TestBed.get(AnonymousConsentsService as Type<
      AnonymousConsentsService
    >);
    authService = TestBed.get(AuthService as Type<AuthService>);
    anonymousConsentService = TestBed.get(AnonymousConsentsService as Type<
      AnonymousConsentsService
    >);

    const interceptors = TestBed.get(HTTP_INTERCEPTORS);
    interceptors.forEach((i: HttpInterceptor) => {
      if (i instanceof AnonymousConsentsInterceptor) {
        interceptor = i;
      }
    });

    spyOn<any>(interceptor, 'isOccUrl').and.returnValue(true);
  });

  const serializeAndEncodeMethod = 'serializeAndEncode';
  describe(serializeAndEncodeMethod, () => {
    it('should return an empty string if a falsy parameter is passed', () => {
      expect(interceptor[serializeAndEncodeMethod](null)).toEqual('');
    });
    it('should return stringify and encode the provided consents', () => {
      const result = interceptor[serializeAndEncodeMethod](
        mockAnonymousConsents
      );
      expect(result).toEqual(
        encodeURIComponent(JSON.stringify(mockAnonymousConsents))
      );
    });
  });

  const handleRequestMethod = 'handleRequest';
  describe('handleRequestMethod', () => {
    it('should return the provided request if the consents are falsy', () => {
      spyOn<any>(interceptor, serializeAndEncodeMethod).and.stub();

      const request = new HttpRequest('GET', 'xxx');
      const result = interceptor[handleRequestMethod](null, request);
      expect(interceptor[serializeAndEncodeMethod]).not.toHaveBeenCalled();
      expect(result).toEqual(request);
    });

    it(`should call ${serializeAndEncodeMethod} and add the consents to the headers`, () => {
      const mockHeaderValue = 'dummy headers';
      spyOn<any>(interceptor, serializeAndEncodeMethod).and.returnValue(
        mockHeaderValue
      );

      const request = new HttpRequest('GET', 'xxx');
      const result = interceptor[handleRequestMethod](
        mockAnonymousConsents,
        request
      );
      expect(interceptor[serializeAndEncodeMethod]).toHaveBeenCalledWith(
        mockAnonymousConsents
      );
      expect(result).toEqual(
        request.clone({
          setHeaders: {
            [ANONYMOUS_CONSENTS_HEADER]: mockHeaderValue,
          },
        })
      );
    });
  });

  const decodeAndDeserializeMethod = 'decodeAndDeserialize';
  describe(decodeAndDeserializeMethod, () => {
    it('should decode and unserialize the provided value', () => {
      const mockRawConsents = encodeURIComponent(
        JSON.stringify(mockAnonymousConsents)
      );

      const result = interceptor[decodeAndDeserializeMethod](mockRawConsents);
      expect(result).toEqual(mockAnonymousConsents);
    });
  });

  const handleResponseMethod = 'handleResponse';
  describe(handleResponseMethod, () => {
    describe('when rawConsents are falsy', () => {
      it('should NOT call anonymousConsentsService.setAnonymousConsents', () => {
        spyOn(anonymousConsentsService, 'setAnonymousConsents').and.stub();
        interceptor[handleResponseMethod](null, true);
        expect(
          anonymousConsentsService.setAnonymousConsents
        ).not.toHaveBeenCalled();
      });
    });

    describe('when rawCosents are NOT falsy', () => {
      describe('and user is logged in', () => {
        it('should NOT call anonymousConsentsService.setAnonymousConsents', () => {
          spyOn(anonymousConsentsService, 'setAnonymousConsents').and.stub();
          interceptor[handleResponseMethod]('dummy headers', true);
          expect(
            anonymousConsentsService.setAnonymousConsents
          ).not.toHaveBeenCalled();
        });
      });
      describe('and user is NOT logged in', () => {
        it('should call anonymousConsentsService.setAnonymousConsents', () => {
          const mockHeaderValue = 'dummy headers';
          spyOn(anonymousConsentsService, 'setAnonymousConsents').and.stub();
          spyOn<any>(interceptor, decodeAndDeserializeMethod).and.returnValue(
            mockAnonymousConsents
          );

          interceptor[handleResponseMethod](mockHeaderValue, false);
          expect(interceptor[decodeAndDeserializeMethod]).toHaveBeenCalledWith(
            mockHeaderValue
          );
          expect(
            anonymousConsentsService.setAnonymousConsents
          ).toHaveBeenCalledWith(mockAnonymousConsents);
        });
      });
      const giveRequiredConsentsMethod = 'giveRequiredConsents';
      describe(`${giveRequiredConsentsMethod}`, () => {
        it('should giveAnonymousConsent', () => {
          const consents: AnonymousConsent[] = [
            { templateCode: 'MARKETING', version: 0, consentState: null },
            { templateCode: 'OTHER_CONSENT', version: 0, consentState: null },
          ];
          const expectedConsents: AnonymousConsent[] = [
            { templateCode: 'MARKETING', version: 0, consentState: null },
            {
              templateCode: 'OTHER_CONSENT',
              version: 0,
              consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN,
            },
          ];

          spyOn(anonymousConsentService, 'setAnonymousConsents').and.stub();

          interceptor[giveRequiredConsentsMethod]([...consents]);
          expect(
            anonymousConsentService.setAnonymousConsents
          ).toHaveBeenCalledWith(expectedConsents);
        });
      });
    });

    describe('intercept', () => {
      afterEach(() => {
        httpMock.verify();
      });

      describe('when sending a request', () => {
        it(`should call ${handleRequestMethod}`, inject(
          [HttpClient],
          (http: HttpClient) => {
            spyOn(
              anonymousConsentsService,
              'getAnonymousConsents'
            ).and.returnValue(of(mockAnonymousConsents));
            spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
            spyOn<any>(interceptor, handleRequestMethod).and.callThrough();

            http
              .get('/xxx')
              .subscribe(result => {
                expect(result).toBeTruthy();
              })
              .unsubscribe();

            httpMock.expectOne(req => {
              return req.method === 'GET';
            });
            expect(interceptor[handleRequestMethod]).toHaveBeenCalled();
          }
        ));
      });
    });
  });
});
