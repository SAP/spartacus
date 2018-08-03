import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { AuthenticationTokenInterceptor } from './authentication-token.interceptor';
import { ClientAuthenticationToken } from './../models/token-types.model';
import { OccClientAuthenticationTokenService } from '../client-authentication/client-authentication-token.service';

const testToken: ClientAuthenticationToken = {
  access_token: 'abc-123',
  token_type: 'bearer',
  expires_in: 1000,
  scope: ''
};

class MockOccClientAuthenticationTokenService {
  loadClientAuthenticationToken(): Observable<any> {
    return of(testToken);
  }
}

describe('AuthenticationTokenInterceptor', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: OccClientAuthenticationTokenService,
          useClass: MockOccClientAuthenticationTokenService
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationTokenInterceptor,
          multi: true
        }
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('Client Token', () => {
    it('Should only add token to specified requests', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get('/test').subscribe(result => {
          expect(result).toBeTruthy();
        });
        let mockReq = httpMock.expectOne('/test');
        let authHeader = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(null);

        http
          .post('/somestore/forgottenpasswordtokens', { userId: 1 })
          .subscribe(result => {
            expect(result).toBeTruthy();
          });
        mockReq = httpMock.expectOne('/somestore/forgottenpasswordtokens');
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
          });

        const mockReq = httpMock.expectOne(
          '/somestore/forgottenpasswordtokens'
        );
        const authHeader = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(headers.Authorization);
      }
    ));
  });
});
