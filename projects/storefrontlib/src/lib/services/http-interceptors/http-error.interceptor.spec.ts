import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { UserErrorHandlingService } from '../../occ/error-handling/user-error-handling.service';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHandler,
  HttpRequest,
  HttpClientModule
} from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { Observable, of } from 'rxjs';

class MockUserErrorHandlingService {
  handleExpiredUserToken(
    _request: HttpRequest<any>,
    _next: HttpHandler
  ): Observable<any> {
    return;
  }
}

describe('HttpErrorInterceptor', () => {
  let userErrorHandlingService: UserErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        {
          provide: UserErrorHandlingService,
          useClass: MockUserErrorHandlingService
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
        }
      ]
    });

    userErrorHandlingService = TestBed.get(UserErrorHandlingService);
  });

  afterEach(inject(
    [HttpTestingController],
    (backend: HttpTestingController) => {
      backend.verify();
    }
  ));

  it('should catch 401 error', async(
    inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, backend: HttpTestingController) => {
        spyOn(
          userErrorHandlingService,
          'handleExpiredUserToken'
        ).and.returnValue(of({}));

        http.get('/test').subscribe(result => {
          expect(result).toBeTruthy();
        });
        backend
          .expectOne({ url: '/test', method: 'GET' })
          .flush(null, { status: 401, statusText: 'Unauthorized' });

        expect(
          userErrorHandlingService.handleExpiredUserToken
        ).toHaveBeenCalled();
      }
    )
  ));
});
