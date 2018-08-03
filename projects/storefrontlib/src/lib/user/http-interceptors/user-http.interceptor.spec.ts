import { TestBed, inject } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromStore from '../store';
import * as fromRoot from '../../routing/store';
import { ConfigService } from '../../occ/config.service';
import { UserToken } from '../models/token-types.model';
import { UserHttpInterceptor } from './user-http.interceptor';

class MockConfigService {
  server = {
    baseUrl: 'https://backoffice.christian-spartacus1-s2-public.model-t.myhybris.cloud',
    occPrefix: '/rest/v2/'
  };

  site = {
    baseSite: 'electronics',
    language: '',
    currency: ''
  };
}

describe('UserHttpInterceptor', () => {
  const userToken: UserToken = {
    access_token: 'xxx',
    token_type: 'bearer',
    refresh_token: 'xxx',
    expires_in: 1000,
    scope: ['xxx'],
    userId: 'xxx'
  };
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
        { provide: ConfigService, useClass: MockConfigService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UserHttpInterceptor,
          multi: true
        }
      ]
    });

    store = TestBed.get(Store);
    httpMock = TestBed.get(HttpTestingController);

    spyOn(store, 'select').and.returnValue(of(userToken));
  });

  it(
    `Should not add 'Authorization' header with a token info to an HTTP request`,
    inject([HttpClient], (http: HttpClient) => {
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
    })
  );

  it(
    `Should add 'Authorization' header with a token info to an HTTP request`,
    inject([HttpClient], (http: HttpClient) => {
      http
        .get('https://backoffice.christian-spartacus1-s2-public.model-t.myhybris.cloud/rest/v2/electronics')
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
    })
  );

  it(
    `Should not add 'Authorization' token to header if there is already one`,
    inject([HttpClient], (http: HttpClient) => {
      const headers = { Authorization: 'bearer 123' };
      http
        .get('https://backoffice.christian-spartacus1-s2-public.model-t.myhybris.cloud/rest/v2/electronics', { headers })
        .subscribe(result => {
          expect(result).toBeTruthy();
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      const authHeader = mockReq.request.headers.get('Authorization');
      expect(authHeader).toBeTruthy();
      expect(authHeader).toEqual(headers.Authorization);
    })
  );
});
