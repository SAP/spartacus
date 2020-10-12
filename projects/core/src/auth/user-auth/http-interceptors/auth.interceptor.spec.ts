import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import { defaultOccConfig } from '../../../occ/config/default-occ-config';
import { AuthService } from '../facade/auth.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthInterceptor } from './auth.interceptor';

const OccUrl = `https://localhost:9002${defaultOccConfig.backend.occ.prefix}test-site`;

const userToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_at: '1000',
  access_token_stored_at: '900',
  granted_scopes: [],
  scope: ['xxx'],
  userId: 'xxx',
} as AuthToken;

class MockAuthService {
  getUserToken(): Observable<AuthToken> {
    return of();
  }
}

const MockAuthConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: 'https://localhost:9002',
      prefix: defaultOccConfig.backend.occ.prefix,
    },
  },
  context: {
    baseSite: ['test-site'],
  },
};

// TODO: Fix unit tests
describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OccConfig, useValue: MockAuthConfig },
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  it(`Should not add 'Authorization' header with a token info to an HTTP request`, inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOn(authService, 'getToken').and.returnValue(of(userToken));

      const sub: Subscription = http.get('/xxx').subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const mockReq: TestRequest = httpMock.expectOne((req) => {
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
      spyOn(authService, 'getToken').and.returnValue(of(userToken));
      const sub: Subscription = http.get(OccUrl).subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const mockReq: TestRequest = httpMock.expectOne((req) => {
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
      spyOn(authService, 'getToken').and.returnValue(of(userToken));

      const headers = { Authorization: 'bearer 123' };
      const sub: Subscription = http
        .get(OccUrl, { headers })
        .subscribe((result) => {
          expect(result).toBeTruthy();
        });

      const mockReq: TestRequest = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      const authHeader: string = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeTruthy();
      expect(authHeader).toEqual(headers.Authorization);
      sub.unsubscribe();
    }
  ));
});
