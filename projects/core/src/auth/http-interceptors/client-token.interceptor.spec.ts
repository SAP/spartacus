import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { InterceptorUtil } from '../../occ/utils/interceptor-util';
import { AuthService } from '../facade/auth.service';
import { ClientToken } from './../models/token-types.model';
import { ClientTokenInterceptor } from './client-token.interceptor';

const testToken = {
  access_token: 'abc-123',
  token_type: 'bearer',
  expires_in: 1000,
  scope: '',
} as ClientToken;

class MockAuthService {
  getClientToken(): Observable<ClientToken> {
    return of();
  }
}

const MockAuthModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: 'https://localhost:9002',
      prefix: '/rest/v2/',
    },
  },
  context: {
    baseSite: ['electronics'],
  },
};

describe('ClientTokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OccConfig, useValue: MockAuthModuleConfig },
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ClientTokenInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  describe('Client Token', () => {
    it('Should only add token to specified requests', inject(
      [HttpClient],
      (http: HttpClient) => {
        spyOn(authService, 'getClientToken').and.returnValue(of(testToken));

        http
          .get('https://localhost:9002/rest/v2/electronics/test')
          .subscribe(result => {
            expect(result).toBeTruthy();
          })
          .unsubscribe();
        let mockReq: TestRequest = httpMock.expectOne(
          'https://localhost:9002/rest/v2/electronics/test'
        );
        let authHeader: string = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(null);

        spyOn<any>(InterceptorUtil, 'getInterceptorParam').and.returnValue(
          true
        );
        http
          .post(
            'https://localhost:9002/rest/v2/electronics/somestore/forgottenpasswordtokens',
            { userId: 1 }
          )
          .subscribe(result => {
            expect(result).toBeTruthy();
          })
          .unsubscribe();

        mockReq = httpMock.expectOne(
          'https://localhost:9002/rest/v2/electronics/somestore/forgottenpasswordtokens'
        );
        authHeader = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(
          `${testToken.token_type} ${testToken.access_token}`
        );
      }
    ));

    it(`should not add an 'Authorization' token to a request if it already has one`, inject(
      [HttpClient],
      (http: HttpClient) => {
        const headers = { Authorization: 'bearer 123' };
        http
          .get('/somestore/forgottenpasswordtokens', { headers })
          .subscribe(result => {
            expect(result).toBeTruthy();
          })
          .unsubscribe();

        const mockReq: TestRequest = httpMock.expectOne(
          '/somestore/forgottenpasswordtokens'
        );
        const authHeader: string = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(headers.Authorization);
      }
    ));
  });
});
