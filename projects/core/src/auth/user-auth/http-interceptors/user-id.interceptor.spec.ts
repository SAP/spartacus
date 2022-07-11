import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OCC_USER_ID_CURRENT } from 'projects/core/src/occ/utils/occ-constants';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserIdService } from '../facade';
import { UserIdInterceptor } from './user-id.interceptor';

describe('UserIdInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let interceptor: UserIdInterceptor;

  class MockUserIdService implements Partial<UserIdService> {
    getUserId(): Observable<string> {
      return of('user001');
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UserIdInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(UserIdInterceptor);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it("should pass the original request if the endpoint's response does not need to be emulated", (done) => {
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
    const userIdService = TestBed.inject(UserIdService);
    spyOn(userIdService, 'getUserId').and.returnValue(of(undefined));

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
    const userIdService = TestBed.inject(UserIdService);
    spyOn(userIdService, 'getUserId').and.returnValue(of(OCC_USER_ID_CURRENT));

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
          headers.get('sap-commerce-cloud-user-id') === 'user001'
      )
      .flush('bar');
  });
});
