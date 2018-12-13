import { TestBed, inject } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
  TestRequest
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AuthConfig } from '@spartacus/core';

import { of, Observable, Subscription } from 'rxjs';

import { AuthService } from '../facade/auth.service';
import { UserToken } from './../../auth/models/token-types.model';

import { UserTokenInterceptor } from './user-token.interceptor';

const userToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx'
} as UserToken;

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of();
  }
}

const MockAuthConfig: AuthConfig = {
  server: {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  },
  site: {
    baseSite: 'electronics',
    language: '',
    currency: ''
  }
};

describe('UserTokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthConfig, useValue: MockAuthConfig },
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UserTokenInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
  });

  it(`Should not add 'Authorization' header with a token info to an HTTP request`, inject(
    [HttpClient],
    (http: HttpClient) => {
      const sub: Subscription = http.get('/xxx').subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq: TestRequest = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      const authHeader: string = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeFalsy();
      expect(authHeader).toEqual(null);

      mockReq.flush('someData');
      sub.unsubscribe();
    }
  ));

  it(`Should add 'Authorization' header with a token info to an HTTP request`, inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOn(authService, 'getUserToken').and.returnValue(of(userToken));
      const sub: Subscription = http
        .get('https://localhost:9002/rest/v2/electronics')
        .subscribe(result => {
          expect(result).toBeTruthy();
        });

      const mockReq: TestRequest = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      const authHeader: string = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeTruthy();
      expect(authHeader).toEqual(
        `${userToken.token_type} ${userToken.access_token}`
      );

      mockReq.flush('someData');
      sub.unsubscribe();
    }
  ));

  it(`Should not add 'Authorization' token to header if there is already one`, inject(
    [HttpClient],
    (http: HttpClient) => {
      const headers = { Authorization: 'bearer 123' };
      const sub: Subscription = http
        .get('https://localhost:9002/rest/v2/electronics', { headers })
        .subscribe(result => {
          expect(result).toBeTruthy();
        });

      const mockReq: TestRequest = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      const authHeader: string = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeTruthy();
      expect(authHeader).toEqual(headers.Authorization);
      sub.unsubscribe();
    }
  ));
});
