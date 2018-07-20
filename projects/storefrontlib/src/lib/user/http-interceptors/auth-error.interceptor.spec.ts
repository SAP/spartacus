import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { UserErrorHandlingService } from '../../user/services/user-error-handling.service';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHandler,
  HttpRequest,
  HttpClientModule
} from '@angular/common/http';
import { StoreModule, combineReducers, Store } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromRoot from '../../routing/store';
import { AuthErrorInterceptor } from './auth-error.interceptor';
import { Observable, of } from 'rxjs';

class MockUserErrorHandlingService {
  handleExpiredUserToken(
    _request: HttpRequest<any>,
    _next: HttpHandler
  ): Observable<any> {
    return;
  }
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
  });

  it(
    `should catch 401 error`,
    inject([HttpClient], (http: HttpClient) => {
      http.get('/test').subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      mockReq.flush(null, { status: 401, statusText: 'Unauthorized' });
      expect(
        userErrorHandlingService.handleExpiredUserToken
      ).toHaveBeenCalled();
    })
  );

  it(
    `should catch 400 error`,
    inject([HttpClient], (http: HttpClient) => {
      const url = '/authorizationserver/oauth/token';
      let creds = 'refresh_token=some_token&grant_type=refresh_token';

      spyOn(store, 'dispatch').and.callThrough();

      http.post(url, creds, {}).subscribe(result => {
        expect(result).toBeTruthy();
        expect(store.dispatch).toHaveBeenCalledWith(new fromStore.Logout());
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === '/authorizationserver/oauth/token'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(
        { error: 'invalid_grant' },
        { status: 400, statusText: 'Error' }
      );
    })
  );
});
