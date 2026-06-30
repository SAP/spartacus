import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHeaders,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthConfig, OccConfig, OccEndpointsService } from '@spartacus/core';
import { of } from 'rxjs';
import { defaultOccConfig } from '../../../occ/config/default-occ-config';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../../occ/utils/interceptor-util';
import { ClientToken } from '../models/client-token.model';
import { ClientErrorHandlingService } from '../services/client-error-handling.service';
import { ClientTokenService } from '../services/client-token.service';
import { ClientTokenInterceptor } from './client-token.interceptor';
import { vi } from 'vitest';

const OccUrl = `https://localhost:9002${defaultOccConfig.backend.occ.prefix}electronics`;

const testToken = {
  access_token: 'abc-123',
  token_type: 'bearer',
  expires_in: 1000,
  scope: '',
} as ClientToken;

const baseUrl = `https://localhost:9002`;

class MockClientTokenService implements Partial<ClientTokenService> {
  getClientToken() {
    return of(testToken);
  }
}

class MockClientErrorHandlingService
  implements Partial<ClientErrorHandlingService>
{
  handleExpiredClientToken(req, next) {
    return of(next.handle(req));
  }
}

class MockOccEndpointService {
  getBaseUrl = () => baseUrl;
}

const MockAuthModuleConfig: OccConfig & AuthConfig = {
  backend: {
    occ: {
      baseUrl: 'https://localhost:9002',
      prefix: defaultOccConfig.backend.occ.prefix,
    },
  },
  context: {
    baseSite: ['electronics'],
  },
  authentication: {
    useClientTokens: true,
  },
};

describe('ClientTokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let clientTokenService: ClientTokenService;
  let clientErrorHandlingService: ClientErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OccConfig, useValue: MockAuthModuleConfig },
        { provide: AuthConfig, useExisting: OccConfig },
        { provide: ClientTokenService, useClass: MockClientTokenService },
        {
          provide: ClientErrorHandlingService,
          useClass: MockClientErrorHandlingService,
        },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointService,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ClientTokenInterceptor,
          multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
  });

  describe('when client tokens are enabled', () => {
    beforeEach(() => {
      httpMock = TestBed.inject(HttpTestingController);
      http = TestBed.inject(HttpClient);
      clientErrorHandlingService = TestBed.inject(ClientErrorHandlingService);
      clientTokenService = TestBed.inject(ClientTokenService);
    });
    describe('Client Token', () => {
      it('Should only add token to specified requests', () => {
        vi.spyOn(clientTokenService, 'getClientToken').mockReturnValue(
          of(testToken)
        );

        http
          .get(`${OccUrl}/test`)
          .subscribe((result) => {
            expect(result).toBeTruthy();
          })
          .unsubscribe();
        let mockReq: TestRequest = httpMock.expectOne(`${OccUrl}/test`);
        let authHeader = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(null);

        vi.spyOn<any, any>(
          InterceptorUtil,
          'getInterceptorParam'
        ).mockReturnValue(true);
        http
          .post(`${OccUrl}/somestore/forgottenpasswordtokens`, { userId: 1 })
          .subscribe((result) => {
            expect(result).toBeTruthy();
          })
          .unsubscribe();

        mockReq = httpMock.expectOne(
          `${OccUrl}/somestore/forgottenpasswordtokens`
        );
        authHeader = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(
          `${testToken.token_type} ${testToken.access_token}`
        );
      });
    });

    it(`should catch 401 error for a client token`, () => {
      const headers = new HttpHeaders().set(USE_CLIENT_TOKEN, 'true');
      const options = {
        headers,
      };
      http.get('/test', options).subscribe((result) => {
        expect(result).toBeTruthy();
      });
      vi.spyOn(clientErrorHandlingService, 'handleExpiredClientToken');

      const mockReq: TestRequest = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      mockReq.flush(
        {
          errors: [
            {
              type: 'InvalidBearerTokenError',
              message: 'Invalid access token: some token',
            },
          ],
        },
        { status: 401, statusText: 'Error' }
      );
      expect(
        clientErrorHandlingService.handleExpiredClientToken
      ).toHaveBeenCalled();
    });

    it(`should catch 401 error for a client token for legacy auth server`, () => {
      const headers = new HttpHeaders().set(USE_CLIENT_TOKEN, 'true');
      const options = {
        headers,
      };

      vi.spyOn(clientErrorHandlingService, 'handleExpiredClientToken');

      http.get('/test', options).subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const mockReq: TestRequest = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      mockReq.flush(
        {
          errors: [
            {
              type: 'InvalidTokenError',
              message: 'Invalid access token: some token',
            },
          ],
        },
        { status: 401, statusText: 'Error' }
      );
      expect(
        clientErrorHandlingService.handleExpiredClientToken
      ).toHaveBeenCalled();
    });
  });

  describe('when client tokens are disabled', () => {
    let http: HttpClient;

    beforeEach(() => {
      let authConfig = TestBed.inject(OccConfig) as AuthConfig;
      authConfig.authentication.useClientTokens = false;
      httpMock = TestBed.inject(HttpTestingController);
      clientErrorHandlingService = TestBed.inject(ClientErrorHandlingService);
      clientTokenService = TestBed.inject(ClientTokenService);
      http = TestBed.inject(HttpClient);
    });

    it('Should not add tokens when disabled', () => {
      vi.spyOn(clientTokenService, 'getClientToken').mockReturnValue(
        of(testToken)
      );

      vi.spyOn<any, any>(
        InterceptorUtil,
        'getInterceptorParam'
      ).mockReturnValue(true);
      http
        .post(`${OccUrl}/somestore/forgottenpasswordtokens`, { userId: 1 })
        .subscribe((result) => {
          expect(result).toBeTruthy();
        })
        .unsubscribe();

      let mockReq = httpMock.expectOne(
        `${OccUrl}/somestore/forgottenpasswordtokens`
      );
      let authHeader = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBe(null);
      expect(clientTokenService.getClientToken).not.toHaveBeenCalled();
    });
  });
});
