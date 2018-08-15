import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../routing/store';
import * as fromStore from './../store';
import { of } from 'rxjs';

import { AuthenticationTokenInterceptor } from './authentication-token.interceptor';
import { ClientAuthenticationToken } from './../models/token-types.model';
import { InterceptorUtil } from '../../site-context/shared/http-interceptors/interceptor-util';

const testToken: ClientAuthenticationToken = {
  access_token: 'abc-123',
  token_type: 'bearer',
  expires_in: 1000,
  scope: ''
};

describe('AuthenticationTokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let store: Store<fromStore.AuthState>;

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

  describe('Client Token', () => {
    it('Should only add token to specified requests', inject(
      [HttpClient],
      (http: HttpClient) => {
        http.get('/test').subscribe(result => {
          expect(result).toBeTruthy();
        });
        let mockReq = httpMock.expectOne('/test');
        let authHeader = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(null);

        spyOn<any>(InterceptorUtil, 'getInterceptorParam').and.returnValue({
          method: 'POST',
          urlPattern: '^(.*?)/forgottenpasswordtokens'
        });
        http
          .post('/somestore/forgottenpasswordtokens', { userId: 1 })
          .subscribe(result => {
            expect(result).toBeTruthy();
          });

        mockReq = httpMock.expectOne('/somestore/forgottenpasswordtokens');
        authHeader = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(
          `${testToken.token_type} ${testToken.access_token}`
        );
      }
    ));

    it(`should not add an 'Authorization' token to a request if it already has one`, inject(
      [HttpClient],
      (http: HttpClient) => {
        const headers = { Authorization: 'bearer 123' };
        http
          .get('/somestore/forgottenpasswordtokens', { headers })
          .subscribe(result => {
            expect(result).toBeTruthy();
          });

        const mockReq = httpMock.expectOne(
          '/somestore/forgottenpasswordtokens'
        );
        const authHeader = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(headers.Authorization);
      }
    ));
  });
});
