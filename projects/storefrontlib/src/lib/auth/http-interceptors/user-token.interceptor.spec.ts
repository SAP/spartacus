import { TestBed, inject } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { StoreModule, combineReducers, Store } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromRoot from '../../routing/store';

import { UserTokenInterceptor } from './user-token.interceptor';
import { UserToken } from './../../auth/models/token-types.model';
import { AuthModuleConfig } from '../auth-module.config';

const MockAuthModuleConfig: AuthModuleConfig = {
  server: {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  },

  site: {
    baseSite: 'electronics',
    language: '',
    currency: ''
  }
};

describe('UserTokenInterceptor', () => {
  const userToken: UserToken = {
    access_token: 'xxx',
    token_type: 'bearer',
    refresh_token: 'xxx',
    expires_in: 1000,
    scope: ['xxx'],
    userId: 'xxx'
  };
  let store: Store<fromStore.AuthState>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          auth: combineReducers(fromStore.getReducers())
        })
      ],
      providers: [
        { provide: AuthModuleConfig, useValue: MockAuthModuleConfig },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UserTokenInterceptor,
          multi: true
        }
      ]
    });

    store = TestBed.get(Store);
    httpMock = TestBed.get(HttpTestingController);
  });

  it(`Should not add 'Authorization' header with a token info to an HTTP request`, inject(
    [HttpClient],
    (http: HttpClient) => {
      http.get('/xxx').subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      const authHeader = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeFalsy();
      expect(authHeader).toEqual(null);

      mockReq.flush('someData');
    }
  ));

  it(`Should add 'Authorization' header with a token info to an HTTP request`, inject(
    [HttpClient],
    (http: HttpClient) => {
      store.dispatch(new fromStore.LoadUserTokenSuccess(userToken));
      http
        .get('https://localhost:9002/rest/v2/electronics')
        .subscribe(result => {
          expect(result).toBeTruthy();
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      const authHeader = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeTruthy();
      expect(authHeader).toEqual(
        `${userToken.token_type} ${userToken.access_token}`
      );

      mockReq.flush('someData');
    }
  ));

  it(`Should not add 'Authorization' token to header if there is already one`, inject(
    [HttpClient],
    (http: HttpClient) => {
      const headers = { Authorization: 'bearer 123' };
      http
        .get('https://localhost:9002/rest/v2/electronics', { headers })
        .subscribe(result => {
          expect(result).toBeTruthy();
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      const authHeader = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeTruthy();
      expect(authHeader).toEqual(headers.Authorization);
    }
  ));
});
