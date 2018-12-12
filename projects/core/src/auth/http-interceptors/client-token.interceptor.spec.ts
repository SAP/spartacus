import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AuthConfig } from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { AuthService } from '../facade/auth.service';
import { ClientToken } from './../models/token-types.model';
import { InterceptorUtil } from '../../occ/utils/interceptor-util';

import { ClientTokenInterceptor } from './client-token.interceptor';

const testToken = {
  access_token: 'abc-123',
  token_type: 'bearer',
  expires_in: 1000,
  scope: ''
} as ClientToken;

class MockAuthService extends AuthService {
  getClientToken(): Observable<ClientToken> {
    return of();
  }
}

class MockAuthModuleConfig extends AuthConfig {
  server = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  };

  site = {
    baseSite: 'electronics'
  };
}

describe('ClientTokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthConfig, useClass: MockAuthModuleConfig },
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ClientTokenInterceptor,
          multi: true
        }
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
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
