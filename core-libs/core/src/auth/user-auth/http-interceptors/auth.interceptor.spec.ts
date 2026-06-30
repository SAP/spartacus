import { vi } from 'vitest';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpParams,
  HttpRequest,
  HttpUserEvent,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EMPTY, Observable, of, firstValueFrom, lastValueFrom } from 'rxjs';
import { AuthToken } from '../models/auth-token.model';
import { AuthConfigService } from '../services/auth-config.service';
import { AuthHttpHeaderService } from '../services/auth-http-header.service';
import { AuthInterceptor } from './auth.interceptor';

class MockAuthHeaderService implements Partial<AuthHttpHeaderService> {
  alterRequest(req) {
    return req;
  }
  getStableToken() {
    return of(undefined);
  }
  shouldCatchError() {
    return true;
  }
  shouldAddAuthorizationHeader() {
    return true;
  }
  handleExpiredAccessToken() {
    return EMPTY as Observable<HttpUserEvent<AuthToken>>;
  }
  handleExpiredRefreshToken() {}
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getTokenEndpoint() {
    return '/authorizationserver/token';
  }
}

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let authHeaderService: AuthHttpHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthHttpHeaderService, useClass: MockAuthHeaderService },
        { provide: AuthConfigService, useClass: MockAuthConfigService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    authHeaderService = TestBed.inject(AuthHttpHeaderService);
    http = TestBed.inject(HttpClient);
  });

  it('should not add header when the request should does not need it', async () => {
    vi.spyOn(authHeaderService, 'shouldAddAuthorizationHeader').mockReturnValue(
      false
    );
    vi.spyOn(authHeaderService, 'alterRequest').mockReturnValue(
      new HttpRequest('GET', '/test')
    );
    vi.spyOn(authHeaderService, 'getStableToken').mockReturnValue(
      of({ access_token: 'test' } as AuthToken)
    );

    const resultPromise = firstValueFrom(http.get('/xxx'));

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/test';
    });

    mockReq.flush('someData');

    const result = await resultPromise;
    expect(result).toBeTruthy();
    expect(authHeaderService.alterRequest).toHaveBeenCalledWith(
      expect.anything(),
      undefined
    );
  });

  it(`Should operate on request returned from AuthHeaderService alterRequest method`, async () => {
    vi.spyOn(authHeaderService, 'alterRequest').mockReturnValue(
      new HttpRequest('GET', '/test')
    );
    const token = { access_token: 'test' } as AuthToken;
    vi.spyOn(authHeaderService, 'getStableToken').mockReturnValue(of(token));

    const resultPromise = firstValueFrom(http.get('/xxx'));

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/test';
    });

    mockReq.flush('someData');

    const result = await resultPromise;
    expect(result).toBeTruthy();
    expect(authHeaderService.alterRequest).toHaveBeenCalledWith(
      expect.anything(),
      token
    );
  });

  it(`Should handle 401 error for expired token occ calls`, async () => {
    // JDK21 response
    vi.spyOn(authHeaderService, 'handleExpiredAccessToken').mockImplementation(
      (_, next) => next.handle(new HttpRequest('GET', '/test'))
    );

    const resultPromise = firstValueFrom(http.get('/occ'));

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    mockReq.flush(
      { errors: [{ type: 'InvalidBearerTokenError' }] },
      { status: 401, statusText: 'Unauthorized' }
    );

    const mockReq2: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/test';
    });
    mockReq2.flush('someText');

    const result = await resultPromise;
    expect(result).toEqual('someText');
  });

  it(`Should handle 401 error for expired token occ calls for legacy auth server`, async () => {
    // JDK17 response
    vi.spyOn(authHeaderService, 'handleExpiredAccessToken').mockImplementation(
      (_, next) => next.handle(new HttpRequest('GET', '/test'))
    );

    const resultPromise = firstValueFrom(http.get('/occ'));

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    mockReq.flush(
      { errors: [{ type: 'InvalidTokenError' }] },
      { status: 401, statusText: 'Unauthorized' }
    );

    const mockReq2: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/test';
    });
    mockReq2.flush('someText');

    const result = await resultPromise;
    expect(result).toEqual('someText');
  });

  it(`Should not handle 401 error for expired token non-occ calls`, async () => {
    vi.spyOn(authHeaderService, 'shouldCatchError').mockReturnValue(false);

    const resultPromise = firstValueFrom(http.get('/occ'));

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    mockReq.flush(
      { errors: [{ type: 'InvalidTokenError' }] },
      { status: 401, statusText: 'Unauthorized' }
    );

    try {
      await resultPromise;
    } catch (err: any) {
      expect(err.status).toEqual(401);
      expect(err.error.errors[0].type).toEqual('InvalidTokenError');
    }
  });

  it(`Should not handle 401 error for non expired token occ calls`, async () => {
    const resultPromise = firstValueFrom(http.get('/occ'));

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    mockReq.flush(
      { errors: [{ type: 'Different error' }] },
      { status: 401, statusText: 'Unauthorized' }
    );

    try {
      await resultPromise;
    } catch (err: any) {
      expect(err.status).toEqual(401);
      expect(err.error.errors[0].type).toEqual('Different error');
    }
  });

  it(`Should handle 401 error invalid_token calls`, async () => {
    vi.spyOn(authHeaderService, 'handleExpiredRefreshToken');

    const resultPromise = lastValueFrom(
      http.get('/authorizationserver/token'),
      { defaultValue: undefined }
    );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/authorizationserver/token';
    });

    mockReq.flush(
      { error: 'invalid_token' },
      { status: 401, statusText: 'Unauthorized' }
    );

    await resultPromise;
    expect(authHeaderService.handleExpiredRefreshToken).toHaveBeenCalled();
  });

  it(`Should not handle 401 error invalid_token calls for non token endpoints`, async () => {
    vi.spyOn(authHeaderService, 'handleExpiredRefreshToken');

    const resultPromise = firstValueFrom(http.get('/custom-url'));

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/custom-url';
    });

    mockReq.flush(
      { error: 'invalid_token' },
      { status: 401, statusText: 'Unauthorized' }
    );

    try {
      await resultPromise;
    } catch (err: any) {
      expect(err.status).toEqual(401);
      expect(err.error.error).toEqual('invalid_token');
    }
  });

  it(`Should handle 400 error invalid_grant calls`, async () => {
    vi.spyOn(authHeaderService, 'handleExpiredRefreshToken');
    const params = new HttpParams().set('grant_type', 'refresh_token');

    const resultPromise = firstValueFrom(
      http.post('/authorizationserver/token', params)
    );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url === '/authorizationserver/token';
    });

    mockReq.flush(
      { error: 'invalid_grant' },
      { status: 400, statusText: 'Bad request' }
    );

    try {
      await resultPromise;
    } catch (err: any) {
      expect(err.status).toEqual(400);
      expect(err.error.error).toEqual('invalid_grant');
      expect(authHeaderService.handleExpiredRefreshToken).toHaveBeenCalled();
    }
  });

  it(`Should not handle 400 error invalid_grant calls for non token endpoints`, async () => {
    vi.spyOn(authHeaderService, 'handleExpiredRefreshToken');
    const params = new HttpParams().set('grant_type', 'refresh_token');

    const resultPromise = firstValueFrom(http.post('/custom-url', params));

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url === '/custom-url';
    });

    mockReq.flush(
      { error: 'invalid_grant' },
      { status: 400, statusText: 'Bad request' }
    );

    try {
      await resultPromise;
    } catch (err: any) {
      expect(err.status).toEqual(400);
      expect(err.error.error).toEqual('invalid_grant');
      expect(
        authHeaderService.handleExpiredRefreshToken
      ).not.toHaveBeenCalled();
    }
  });

  it(`Should not handle 400 error invalid_grant calls for non refresh_token grant types`, async () => {
    vi.spyOn(authHeaderService, 'handleExpiredRefreshToken');
    const params = new HttpParams().set('grant_type', 'code');

    const resultPromise = firstValueFrom(
      http.post('/authorizationserver/token', params)
    );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url === '/authorizationserver/token';
    });

    mockReq.flush(
      { error: 'invalid_grant' },
      { status: 400, statusText: 'Bad request' }
    );

    try {
      await resultPromise;
    } catch (err: any) {
      expect(err.status).toEqual(400);
      expect(err.error.error).toEqual('invalid_grant');
      expect(
        authHeaderService.handleExpiredRefreshToken
      ).not.toHaveBeenCalled();
    }
  });
});
