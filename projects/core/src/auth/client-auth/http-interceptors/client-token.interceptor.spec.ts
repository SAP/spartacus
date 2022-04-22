import {
  HttpClient,
  HttpHeaders,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
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

const OccUrl = `https://localhost:9002${defaultOccConfig.backend.occ.prefix}electronics`;

const testToken = {
  access_token: 'abc-123',
  token_type: 'bearer',
  expires_in: 1000,
  scope: '',
} as ClientToken;

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

const MockAuthModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: 'https://localhost:9002',
      prefix: defaultOccConfig.backend.occ.prefix,
    },
  },
  context: {
    baseSite: ['electronics'],
  },
};

describe('ClientTokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let clientTokenService: ClientTokenService;
  let clientErrorHandlingService: ClientErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OccConfig, useValue: MockAuthModuleConfig },
        { provide: ClientTokenService, useClass: MockClientTokenService },
        {
          provide: ClientErrorHandlingService,
          useClass: MockClientErrorHandlingService,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ClientTokenInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    clientTokenService = TestBed.inject(ClientTokenService);
    clientErrorHandlingService = TestBed.inject(ClientErrorHandlingService);
  });

  describe('Client Token', () => {
    it('Should only add token to specified requests', inject(
      [HttpClient],
      (http: HttpClient) => {
        spyOn(clientTokenService, 'getClientToken').and.returnValue(
          of(testToken)
        );

        http
          .get(`${OccUrl}/test`)
          .subscribe((result) => {
            expect(result).toBeTruthy();
          })
          .unsubscribe();
        let mockReq: TestRequest = httpMock.expectOne(`${OccUrl}/test`);
        let authHeader: string = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(null);

        spyOn<any>(InterceptorUtil, 'getInterceptorParam').and.returnValue(
          true
        );
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
      }
    ));
  });

  it(`should catch 401 error for a client token`, inject(
    [HttpClient],
    (http: HttpClient) => {
      const headers = new HttpHeaders().set(USE_CLIENT_TOKEN, 'true');
      const options = {
        headers,
      };
      http.get('/test', options).subscribe((result) => {
        expect(result).toBeTruthy();
      });
      spyOn(
        clientErrorHandlingService,
        'handleExpiredClientToken'
      ).and.callThrough();

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
    }
  ));
});
