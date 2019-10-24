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
  getConsents(): Observable<AnonymousConsent[]> {
    return of();
  }
  setConsents(_consents: AnonymousConsent[]): void {}
}

const mockAnonymousConsentsConfig = {
  anonymousConsents: {
    requiredConsents: ['OTHER_CONSENT'],
  },
  features: {
    anonymousConsents: true,
  },
};

describe('AnonymousConsentsInterceptor', () => {
  let httpMock: HttpTestingController;
  let anonymousConsentsService: AnonymousConsentsService;
  let authService: AuthService;
  let interceptor: AnonymousConsentsInterceptor;

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

    const interceptors = TestBed.get(HTTP_INTERCEPTORS);
    interceptors.forEach((i: HttpInterceptor) => {
      if (i instanceof AnonymousConsentsInterceptor) {
        interceptor = i;
      }
    });

    spyOn<any>(interceptor, 'isOccUrl').and.returnValue(true);
  });

  const serializeAndEncodeMethod = 'serializeAndEncode';
  const handleRequestMethod = 'handleRequest';
  const decodeAndDeserializeMethod = 'decodeAndDeserialize';
  const giveRequiredConsentsMethod = 'giveRequiredConsents';
  const handleResponseMethod = 'handleResponse';
  const consentsUpdatedMethod = 'consentsUpdated';

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

  describe(decodeAndDeserializeMethod, () => {
    it('should decode and unserialize the provided value', () => {
      const mockRawConsents = encodeURIComponent(
        JSON.stringify(mockAnonymousConsents)
      );

      const result = interceptor[decodeAndDeserializeMethod](mockRawConsents);
      expect(result).toEqual(mockAnonymousConsents);
    });
  });

  describe(handleResponseMethod, () => {
    describe('when newRawConsents are falsy', () => {
      it('should NOT call decodeAndDeserialize and giveRequiredConsents', () => {
        spyOn<any>(interceptor, decodeAndDeserializeMethod).and.stub();
        spyOn<any>(interceptor, giveRequiredConsentsMethod).and.stub();

        interceptor[handleResponseMethod](true, null, []);

        expect(interceptor[decodeAndDeserializeMethod]).not.toHaveBeenCalled();
        expect(interceptor[giveRequiredConsentsMethod]).not.toHaveBeenCalled();
      });
    });

    describe('when rawCosents are NOT falsy', () => {
      describe('and user is logged in', () => {
        it('should NOT call decodeAndDeserialize and giveRequiredConsents', () => {
          spyOn<any>(interceptor, decodeAndDeserializeMethod).and.stub();
          spyOn<any>(interceptor, giveRequiredConsentsMethod).and.stub();

          interceptor[handleResponseMethod](true, 'dummy headers', []);

          expect(
            interceptor[decodeAndDeserializeMethod]
          ).not.toHaveBeenCalled();
          expect(
            interceptor[giveRequiredConsentsMethod]
          ).not.toHaveBeenCalled();
        });
      });
      describe('and user is NOT logged in', () => {
        it(`should call ${consentsUpdatedMethod}`, () => {
          const mockHeaderValue = 'dummy headers';
          spyOn<any>(interceptor, decodeAndDeserializeMethod).and.stub();
          spyOn<any>(interceptor, giveRequiredConsentsMethod).and.returnValue(
            mockAnonymousConsents
          );
          spyOn<any>(interceptor, consentsUpdatedMethod).and.returnValue(false);

          interceptor[handleResponseMethod](
            false,
            mockHeaderValue,
            mockAnonymousConsents
          );

          expect(interceptor[decodeAndDeserializeMethod]).toHaveBeenCalledWith(
            mockHeaderValue
          );
          expect(interceptor[consentsUpdatedMethod]).toHaveBeenCalledWith(
            mockAnonymousConsents,
            mockAnonymousConsents
          );
        });
      });
      describe(`when the ${consentsUpdatedMethod} returns true`, () => {
        it('should call anonymousConsentsService.setConsents()', () => {
          const mockHeaderValue = 'dummy headers';
          spyOn<any>(interceptor, decodeAndDeserializeMethod).and.stub();
          spyOn<any>(interceptor, giveRequiredConsentsMethod).and.returnValue(
            mockAnonymousConsents
          );
          spyOn<any>(interceptor, consentsUpdatedMethod).and.returnValue(true);
          spyOn(anonymousConsentsService, 'setConsents').and.stub();

          interceptor[handleResponseMethod](
            false,
            mockHeaderValue,
            mockAnonymousConsents
          );

          expect(interceptor[decodeAndDeserializeMethod]).toHaveBeenCalledWith(
            mockHeaderValue
          );
          expect(interceptor[consentsUpdatedMethod]).toHaveBeenCalledWith(
            mockAnonymousConsents,
            mockAnonymousConsents
          );
          expect(anonymousConsentsService.setConsents).toHaveBeenCalledWith(
            mockAnonymousConsents
          );
        });
      });
    });
  });

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
          consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
        },
      ];

      const result = interceptor[giveRequiredConsentsMethod]([...consents]);
      expect(result).toEqual(expectedConsents);
    });
  });

  describe(`${consentsUpdatedMethod}`, () => {
    it('should return true when the newConsents are different from previousConsents', () => {
      const newConsents: AnonymousConsent[] = [
        {
          consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
          templateCode: 'a',
          version: 0,
        },
      ];
      const previousConsents: AnonymousConsent[] = [
        {
          consentState: null,
          templateCode: 'b',
          version: 1,
        },
      ];

      const result = interceptor[consentsUpdatedMethod](
        newConsents,
        previousConsents
      );
      expect(result).toEqual(true);
    });
    it('should return false when the newConsents are the same as previousConsents', () => {
      const newConsents: AnonymousConsent[] = [
        {
          consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
          templateCode: 'a',
          version: 0,
        },
      ];
      const previousConsents: AnonymousConsent[] = [...newConsents];

      const result = interceptor[consentsUpdatedMethod](
        newConsents,
        previousConsents
      );
      expect(result).toEqual(false);
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
          spyOn(anonymousConsentsService, 'getConsents').and.returnValue(
            of(mockAnonymousConsents)
          );
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
