import { TestBed, inject } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { UserErrorHandlingService } from '../../user/services/user-error-handling.service';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { StoreModule, combineReducers, Store } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromRoot from '../../routing/store';
import { AuthErrorInterceptor } from './auth-error.interceptor';

class MockUserErrorHandlingService {
  handleExpiredUserToken(
    _request: HttpRequest<any>,
    _next: HttpHandler
  ): Observable<any> {
    return;
  }
  handleExpiredRefreshToken() {}
}

describe('AuthErrorInterceptor', () => {
  let userErrorHandlingService: UserErrorHandlingService;
  let store: Store<fromStore.UserState>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          user: combineReducers(fromStore.reducers)
        })
      ],
      providers: [
        {
          provide: UserErrorHandlingService,
          useClass: MockUserErrorHandlingService
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthErrorInterceptor,
          multi: true
        }
      ]
    });

    userErrorHandlingService = TestBed.get(UserErrorHandlingService);
    store = TestBed.get(Store);
    httpMock = TestBed.get(HttpTestingController);

    spyOn(userErrorHandlingService, 'handleExpiredUserToken').and.returnValue(
      of({})
    );
    spyOn(userErrorHandlingService, 'handleExpiredRefreshToken').and.stub();
  });

  it(`should catch 401 error`, inject([HttpClient], (http: HttpClient) => {
    http.get('/test').subscribe(result => {
      expect(result).toBeTruthy();
    });

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET';
    });

    mockReq.flush(
      {
        errors: [
          {
            type: 'InvalidTokenError',
            message: 'Invalid access token: some token'
          }
        ]
      },
      { status: 401, statusText: 'Error' }
    );
    expect(userErrorHandlingService.handleExpiredUserToken).toHaveBeenCalled();
  }));

  it(`should catch refresh_token 401 error`, inject(
    [HttpClient],
    (http: HttpClient) => {
      http.get('/authorizationserver/oauth/token').subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      mockReq.flush(
        {
          error: 'invalid_token',
          error_description: 'Invalid refresh token (expired): 1234567890'
        },
        { status: 401, statusText: 'Error' }
      );
      expect(
        userErrorHandlingService.handleExpiredRefreshToken
      ).toHaveBeenCalled();
    }
  ));

  it(`should catch 400 error`, inject([HttpClient], (http: HttpClient) => {
    const url = '/authorizationserver/oauth/token';
    const creds = 'refresh_token=some_token&grant_type=refresh_token';

    spyOn(store, 'dispatch').and.callThrough();

    http
      .post(url, creds, {})
      .pipe(catchError((error: any) => throwError(error)))
      .subscribe(
        result => {},
        error => {
          expect(store.dispatch).toHaveBeenCalledWith(new fromStore.Logout());
        }
      );

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'POST' && req.url === url;
    });

    mockReq.flush(
      { error: 'invalid_grant' },
      { status: 400, statusText: 'Error' }
    );
  }));
});
