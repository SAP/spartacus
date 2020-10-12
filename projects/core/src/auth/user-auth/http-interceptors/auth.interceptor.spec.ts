import {
  HttpClient,
  HttpParams,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { AuthConfigService } from '../services/auth-config.service';
import { AuthHeaderService } from '../services/auth-header.service';
import { AuthInterceptor } from './auth.interceptor';

class MockAuthHeaderService {
  alterRequest(req) {
    return req;
  }
  shouldCatchError() {
    return true;
  }
  handleExpiredAccessToken() {}
  handleExpiredRefreshToken() {}
}

class MockAuthConfigService {
  getTokenEndpoint() {
    return '/authorizationserver/token';
  }
}

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let authHeaderService: AuthHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthHeaderService, useClass: MockAuthHeaderService },
        { provide: AuthConfigService, useClass: MockAuthConfigService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    authHeaderService = TestBed.inject(AuthHeaderService);
    http = TestBed.inject(HttpClient);
  });

  it(`Should operate on request returned from AuthHeaderService alterRequest method`, () => {
    spyOn(authHeaderService, 'alterRequest').and.returnValue(
      new HttpRequest('GET', '/test')
    );

    const sub: Subscription = http.get('/xxx').subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/test';
    });

    mockReq.flush('someData');
    sub.unsubscribe();
  });

  it(`Should handle 401 error for expired token occ calls`, () => {
    spyOn(
      authHeaderService,
      'handleExpiredAccessToken'
    ).and.callFake((_, next) => next.handle(new HttpRequest('GET', '/test')));
    const sub: Subscription = http.get('/occ').subscribe((result) => {
      expect(result).toEqual('someText');
    });

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
    sub.unsubscribe();
  });

  it(`Should not handle 401 error for expired token non-occ calls`, () => {
    spyOn(authHeaderService, 'shouldCatchError').and.returnValue(false);

    const sub: Subscription = http.get('/occ').subscribe(
      () => {},
      (err) => {
        expect(err.status).toEqual(401);
        expect(err.error.errors[0].type).toEqual('InvalidTokenError');
      }
    );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    mockReq.flush(
      { errors: [{ type: 'InvalidTokenError' }] },
      { status: 401, statusText: 'Unauthorized' }
    );

    sub.unsubscribe();
  });

  it(`Should not handle 401 error for non expired token occ calls`, () => {
    const sub: Subscription = http.get('/occ').subscribe(
      () => {},
      (err) => {
        expect(err.status).toEqual(401);
        expect(err.error.errors[0].type).toEqual('Different error');
      }
    );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/occ';
    });

    mockReq.flush(
      { errors: [{ type: 'Different error' }] },
      { status: 401, statusText: 'Unauthorized' }
    );

    sub.unsubscribe();
  });

  it(`Should handle 401 error invalid_token calls`, () => {
    spyOn(authHeaderService, 'handleExpiredRefreshToken').and.callThrough();
    const sub: Subscription = http.get('/authorizationserver/token').subscribe(
      () => {},
      () => {},
      () => {
        expect(authHeaderService.handleExpiredRefreshToken).toHaveBeenCalled();
      }
    );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/authorizationserver/token';
    });

    mockReq.flush(
      { error: 'invalid_token' },
      { status: 401, statusText: 'Unauthorized' }
    );
    sub.unsubscribe();
  });

  it(`Should not handle 401 error invalid_token calls for non token endpoints`, () => {
    spyOn(authHeaderService, 'handleExpiredRefreshToken').and.callThrough();
    const sub: Subscription = http.get('/custom-url').subscribe(
      () => {},
      (err) => {
        expect(err.status).toEqual(401);
        expect(err.error.error).toEqual('invalid_token');
      }
    );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/custom-url';
    });

    mockReq.flush(
      { error: 'invalid_token' },
      { status: 401, statusText: 'Unauthorized' }
    );
    sub.unsubscribe();
  });

  it(`Should handle 400 error invalid_grant calls`, () => {
    spyOn(authHeaderService, 'handleExpiredRefreshToken').and.callThrough();
    const params = new HttpParams().set('grant_type', 'refresh_token');
    const sub: Subscription = http
      .post('/authorizationserver/token', params)
      .subscribe(
        () => {},
        (err) => {
          expect(err.status).toEqual(400);
          expect(err.error.error).toEqual('invalid_grant');
          expect(
            authHeaderService.handleExpiredRefreshToken
          ).toHaveBeenCalled();
        },
        () => {}
      );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url === '/authorizationserver/token';
    });

    mockReq.flush(
      { error: 'invalid_grant' },
      { status: 400, statusText: 'Bad request' }
    );
    sub.unsubscribe();
  });

  it(`Should not handle 400 error invalid_grant calls for non token endpoints`, () => {
    spyOn(authHeaderService, 'handleExpiredRefreshToken').and.callThrough();
    const params = new HttpParams().set('grant_type', 'refresh_token');
    const sub: Subscription = http.post('/custom-url', params).subscribe(
      () => {},
      (err) => {
        expect(err.status).toEqual(400);
        expect(err.error.error).toEqual('invalid_grant');
        expect(
          authHeaderService.handleExpiredRefreshToken
        ).not.toHaveBeenCalled();
      },
      () => {}
    );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url === '/custom-url';
    });

    mockReq.flush(
      { error: 'invalid_grant' },
      { status: 400, statusText: 'Bad request' }
    );
    sub.unsubscribe();
  });

  it(`Should not handle 400 error invalid_grant calls for non refresh_token grant types`, () => {
    spyOn(authHeaderService, 'handleExpiredRefreshToken').and.callThrough();
    const params = new HttpParams().set('grant_type', 'code');
    const sub: Subscription = http
      .post('/authorizationserver/token', params)
      .subscribe(
        () => {},
        (err) => {
          expect(err.status).toEqual(400);
          expect(err.error.error).toEqual('invalid_grant');
          expect(
            authHeaderService.handleExpiredRefreshToken
          ).not.toHaveBeenCalled();
        },
        () => {}
      );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url === '/authorizationserver/token';
    });

    mockReq.flush(
      { error: 'invalid_grant' },
      { status: 400, statusText: 'Bad request' }
    );
    sub.unsubscribe();
  });
});
