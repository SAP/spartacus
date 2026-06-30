import { vi } from 'vitest';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, Subscription, firstValueFrom } from 'rxjs';
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
  public sendAuthHeaderOnRevoke(): boolean {
    return true;
  }
}

describe('TokenRevocationInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let tokenRevocationInterceptor: TokenRevocationInterceptor;
  let mockAuthConfigService: AuthConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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

    mockAuthConfigService = TestBed.inject(AuthConfigService);
    httpMock = TestBed.inject(HttpTestingController);
    tokenRevocationInterceptor = TestBed.inject(TokenRevocationInterceptor);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(tokenRevocationInterceptor).toBeTruthy();
  });

  it(`Should not add 'Authorization' header for non revoke requests`, async () => {
    const getResultAsync = firstValueFrom(http.get('/xxx'));

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    const authHeader: string | null = mockReq.request.headers.get('Authorization');
    expect(authHeader).toBeFalsy();
    expect(authHeader).toEqual(null);
    mockReq.flush('someData');

    const getResult = await getResultAsync;
    expect(getResult).toBeTruthy();
  });

  it(`Should add 'Authorization' header for revoke request`, async() => {
    const getResultAsync = firstValueFrom(http.get('/revoke'));

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    const authHeader: string | null = mockReq.request.headers.get('Authorization');
    expect(authHeader).toBeTruthy();
    expect(authHeader).toEqual(`Bearer acc_token`);

    mockReq.flush('someData');

    const getResult = await getResultAsync;
    expect(getResult).toBeTruthy();
  });

  it(`Should not add 'Authorization' header for revoke request when disabled`, async () => {
    vi.spyOn(mockAuthConfigService, 'sendAuthHeaderOnRevoke').mockReturnValue(
      false
    );

    const getResultAsync = firstValueFrom(http.get('/revoke'));

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    const authHeader: string | null = mockReq.request.headers.get('Authorization');
    expect(authHeader).toBeFalsy();
    expect(authHeader).toEqual(null);

    mockReq.flush('someData');

    const getResult = await getResultAsync;
    expect(getResult).toBeTruthy();
  });
});
