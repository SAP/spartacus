import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { StoreModule, combineReducers, Store } from '@ngrx/store';

import * as fromRoot from './../../routing/store';
import * as fromStore from './../store';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { UserTokenInterceptor } from './user-token.interceptor';
import { of } from 'rxjs/observable/of';
import { UserToken } from '../models/token-types.model';
import { ConfigService } from '../../occ/config.service';

export class MockConfigService {
  server = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  };

  site = {
    baseSite: 'electronics',
    language: '',
    currency: ''
  };
}

describe('UserTokenInterceptor', () => {
  const testToken: UserToken = {
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
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UserTokenInterceptor,
          multi: true
        },
        {
          provide: ConfigService,
          useClass: MockConfigService
        }
      ]
    });

    store = TestBed.get(Store);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(store, 'select').and.returnValue(of(testToken));
  });

  afterEach(() => {
    httpMock.verify();
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
        `${testToken.token_type} ${testToken.access_token}`
      );

      mockReq.flush('someData');
    })
  );
});
