import {
  HttpClient,
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  TestRequest,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { AuthToken } from '../models/auth-token.model';
import { AuthConfigService } from '../services/auth-config.service';
import { AuthStorageService } from '../services/auth-storage.service';
import { TokenRevocationInterceptor } from './token-revocation.interceptor';

class MockAuthStorageService implements Partial<AuthStorageService> {
  getToken() {
    return of({
      token_type: 'Bearer',
      access_token: 'acc_token',
    } as AuthToken);
  }
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getRevokeEndpoint() {
    return '/revoke';
  }
}

describe('TokenRevocationInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let tokenRevocationInterceptor: TokenRevocationInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenRevocationInterceptor,
          multi: true,
        },
        {
          provide: AuthConfigService,
          useClass: MockAuthConfigService,
        },
        {
          provide: AuthStorageService,
          useClass: MockAuthStorageService,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    tokenRevocationInterceptor = TestBed.inject(TokenRevocationInterceptor);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(tokenRevocationInterceptor).toBeTruthy();
  });

  it(`Should not add 'Authorization' header for non revoke requests`, (done) => {
    const sub: Subscription = http.get('/xxx').subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    const authHeader: string = mockReq.request.headers.get('Authorization');
    expect(authHeader).toBeFalsy();
    expect(authHeader).toEqual(null);

    mockReq.flush('someData');
    sub.unsubscribe();
  });

  it(`Should add 'Authorization' header for revoke request`, (done) => {
    const sub: Subscription = http.get('/revoke').subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    const authHeader: string = mockReq.request.headers.get('Authorization');
    expect(authHeader).toBeTruthy();
    expect(authHeader).toEqual(`Bearer acc_token`);

    mockReq.flush('someData');
    sub.unsubscribe();
  });
});
