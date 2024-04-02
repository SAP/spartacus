import {
  HttpClient,
  HttpContext,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  OCC_HTTP_TOKEN,
  OCC_USER_ID_CONSTANTS,
  OCC_USER_ID_CURRENT,
  UserIdService,
  provideConfig,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserIdHttpHeaderInterceptor } from './user-id-http-header.interceptor';

describe('UserIdHttpHeaderInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let interceptor: UserIdHttpHeaderInterceptor;

  class MockUserIdService implements Partial<UserIdService> {
    takeUserId(): Observable<string> {
      return of('user001');
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OCC_USER_ID_CONSTANTS, useValue: [] },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UserIdHttpHeaderInterceptor,
          multi: true,
        },
        provideConfig({
          asm: {
            userIdHttpHeader: {
              enable: true,
            },
          },
        }),
      ],
    });
  });

  function initializeMocks(): void {
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(UserIdHttpHeaderInterceptor);
    http = TestBed.inject(HttpClient);
  }

  it('should be created', () => {
    initializeMocks();
    expect(interceptor).toBeTruthy();
  });

  it("should pass the original request if the endpoint's response does not need to be emulated", (done) => {
    initializeMocks();

    http
      .get('/foo')
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBe('bar');
        done();
      });

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/foo' &&
          method === 'GET' &&
          !headers.get('sap-commerce-cloud-user-id')
      )
      .flush('bar');
  });

  it('should pass the original request if a customer is not being emulated', (done) => {
    initializeMocks();

    const userIdService = TestBed.inject(UserIdService);
    spyOn(userIdService, 'takeUserId').and.returnValue(of(undefined));

    http
      .get('/products/search')
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBe('bar');
        done();
      });

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/products/search' &&
          method === 'GET' &&
          !headers.get('sap-commerce-cloud-user-id')
      )
      .flush('bar');
  });

  it('should pass the original request if the current user ID is a mock', (done) => {
    initializeMocks();

    const userIdService = TestBed.inject(UserIdService);
    spyOn(userIdService, 'takeUserId').and.returnValue(of(OCC_USER_ID_CURRENT));

    http
      .get('/products/search')
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBe('bar');
        done();
      });

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/products/search' &&
          method === 'GET' &&
          !headers.get('sap-commerce-cloud-user-id')
      )
      .flush('bar');
  });

  it("should add a 'sap-commerce-cloud-user-id' header to the request if a user is being emulated", (done) => {
    initializeMocks();

    const context = new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: true,
    });

    http
      .get('/products/search', { context })
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBe('bar');
        done();
      });

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/products/search' &&
          method === 'GET' &&
          headers.get('sap-commerce-cloud-user-id') === 'user001'
      )
      .flush('bar');
  });

  it("should add a 'sap-commerce-cloud-user-id' header to the request if a user ID is provided", (done) => {
    initializeMocks();

    const context = new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: 'user002',
    });

    http
      .get('/products/search', { context })
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBe('bar');
        done();
      });

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/products/search' &&
          method === 'GET' &&
          headers.get('sap-commerce-cloud-user-id') === 'user002'
      )
      .flush('bar');
  });

  it('should pass the original request if the interceptor is not feature-enabled', (done) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OCC_USER_ID_CONSTANTS, useValue: [] },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UserIdHttpHeaderInterceptor,
          multi: true,
        },
        provideConfig({
          asm: {
            userIdHttpHeader: {
              enable: false,
            },
          },
        }),
      ],
    });

    initializeMocks();

    const context = new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: true,
    });

    http
      .get('/products/search', { context })
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBe('bar');
        done();
      });

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/products/search' &&
          method === 'GET' &&
          headers.get('sap-commerce-cloud-user-id') !== 'user001'
      )
      .flush('bar');
  });
});
