import {
  HttpClient,
  HttpContext,
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
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
import { firstValueFrom } from 'rxjs';

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
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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

  it("should pass the original request if the endpoint's response does not need to be emulated", async () => {
    initializeMocks();

    const result$ = http.get('/foo');
    const resultPromise = firstValueFrom(result$);

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/foo' &&
          method === 'GET' &&
          !headers.get('sap-commerce-cloud-user-id')
      )
      .flush('bar');

    expect(await resultPromise).toBe('bar');
  });

  it('should pass the original request if a customer is not being emulated', async () => {
    initializeMocks();

    const userIdService = TestBed.inject(UserIdService);
    vi.spyOn(userIdService, 'takeUserId').mockReturnValue(of(undefined));

    const resultPromise = firstValueFrom(http.get('/products/search'));

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/products/search' &&
          method === 'GET' &&
          !headers.get('sap-commerce-cloud-user-id')
      )
      .flush('bar');

    expect(await resultPromise).toBe('bar');
  });

  it('should pass the original request if the current user ID is a mock', async () => {
    initializeMocks();

    const userIdService = TestBed.inject(UserIdService);
    vi.spyOn(userIdService, 'takeUserId').mockReturnValue(of(OCC_USER_ID_CURRENT));

    const resultPromise = firstValueFrom(http.get('/products/search'));

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/products/search' &&
          method === 'GET' &&
          !headers.get('sap-commerce-cloud-user-id')
      )
      .flush('bar');

    expect(await resultPromise).toBe('bar');
  });

  it("should add a 'sap-commerce-cloud-user-id' header to the request if a user is being emulated", async () => {
    initializeMocks();

    const context = new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: true,
    });

    const resultPromise = firstValueFrom(http.get('/products/search', { context }));

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/products/search' &&
          method === 'GET' &&
          headers.get('sap-commerce-cloud-user-id') === 'user001'
      )
      .flush('bar');

    expect(await resultPromise).toBe('bar');
  });

  it("should add a 'sap-commerce-cloud-user-id' header to the request if a user ID is provided", async () => {
    initializeMocks();

    const context = new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: 'user002',
    });

    const resultPromise = firstValueFrom(http.get('/products/search', { context }));

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/products/search' &&
          method === 'GET' &&
          headers.get('sap-commerce-cloud-user-id') === 'user002'
      )
      .flush('bar');

    expect(await resultPromise).toBe('bar');
  });

  it('should pass the original request if the interceptor is not feature-enabled', async () => {
    TestBed.configureTestingModule({
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
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    initializeMocks();

    const context = new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: true,
    });

    const resultPromise = firstValueFrom(http.get('/products/search', { context }));

    httpMock
      .expectOne(
        ({ url, method, headers }) =>
          url === '/products/search' &&
          method === 'GET' &&
          headers.get('sap-commerce-cloud-user-id') !== 'user001'
      )
      .flush('bar');

    expect(await resultPromise).toBe('bar');
  });
});
