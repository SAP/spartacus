import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromRoot from '../../routing/store';
import * as fromStore from '../store';
import { AuthenticationTokenInterceptor } from './authentication-token.interceptor';
import { TrustedClientToken } from '../../user/models/token-types.model';

describe('AuthorizationTokenInterceptor', () => {
  const testToken: TrustedClientToken = {
    access_token: 'abc-123',
    token_type: 'bearer',
    expires_in: 1000,
    scope: ''
  };
  let httpMock: HttpTestingController;
  let store: Store<fromStore.AuthenticationState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromStore.reducers)
        })
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationTokenInterceptor,
          multi: true
        }
      ]
    });
    store = TestBed.get(Store);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(store, 'select').and.returnValue(of(testToken));
  });

  it('Should not add a token to a request that already provides one', inject(
    [HttpClient],
    (http: HttpClient) => {
      const headers = new HttpHeaders({
        Authorization: 'bearer def-456'
      });
      http.get('/test', { headers }).subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne('/test');
      const authHeader = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBe('bearer def-456');
    }
  ));

  it('Should add a token to a request when none is provided', inject(
    [HttpClient],
    (http: HttpClient) => {
      http.get('/test').subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne('/test');
      const authHeader = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBe(
        `${testToken.token_type} ${testToken.access_token}`
      );
    }
  ));
});
