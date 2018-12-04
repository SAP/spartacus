import { TestBed, inject } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { AuthService } from '../facade/auth.service';
import { UserToken } from './../../auth/models/token-types.model';

import { UserTokenInterceptor } from './user-token.interceptor';
import { AuthConfig } from '@spartacus/core';

const userToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx'
};

const authServiceMock = {
  userToken$: of(userToken)
};

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthConfig, useValue: MockAuthConfig },
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UserTokenInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it(`Should not add 'Authorization' header with a token info to an HTTP request`, inject(
    [HttpClient],
    (http: HttpClient) => {
      http.get('/xxx').subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      const authHeader = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeFalsy();
      expect(authHeader).toEqual(null);

      mockReq.flush('someData');
    }
  ));

  it(`Should add 'Authorization' header with a token info to an HTTP request`, inject(
    [HttpClient],
    (http: HttpClient) => {
      http
        .get('https://localhost:9002/rest/v2/electronics')
        .subscribe(result => {
          expect(result).toBeTruthy();
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      const authHeader = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeTruthy();
      expect(authHeader).toEqual(
        `${userToken.token_type} ${userToken.access_token}`
      );

      mockReq.flush('someData');
    }
  ));

  it(`Should not add 'Authorization' token to header if there is already one`, inject(
    [HttpClient],
    (http: HttpClient) => {
      const headers = { Authorization: 'bearer 123' };
      http
        .get('https://localhost:9002/rest/v2/electronics', { headers })
        .subscribe(result => {
          expect(result).toBeTruthy();
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      const authHeader = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeTruthy();
      expect(authHeader).toEqual(headers.Authorization);
    }
  ));
});
