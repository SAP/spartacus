import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as fromStore from '../../store';
import * as fromRoot from '../../../routing/store';

import { UserErrorHandlingService } from './user-error-handling.service';

import { UserToken } from '../../models/token-types.model';

class MockHttpHandler extends HttpHandler {
  handle(_req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return of(null);
  }
}

describe('UserErrorHandlingService', () => {
  let httpRequest = new HttpRequest('GET', '/');
  const userToken: UserToken = {
    access_token: 'xxx',
    token_type: 'bearer',
    refresh_token: 'xxx',
    expires_in: 1000,
    scope: ['xxx'],
    userId: 'xxx'
  };

  const newToken: UserToken = {
    access_token: '1234',
    token_type: 'bearer',
    refresh_token: '5678',
    expires_in: 1000,
    scope: ['xxx'],
    userId: 'xxx'
  };

  let store: Store<fromStore.AuthState>;
  let service: UserErrorHandlingService;
  let httpHandler: HttpHandler;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          auth: combineReducers(fromStore.getReducers())
        })
      ],
      providers: [
        UserErrorHandlingService,
        { provide: HttpHandler, useClass: MockHttpHandler }
      ]
    });

    store = TestBed.get(Store);
    router = TestBed.get(Router);
    service = TestBed.get(UserErrorHandlingService);
    httpHandler = TestBed.get(HttpHandler);

    spyOn(router, 'navigate').and.stub();
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(httpHandler, 'handle').and.callThrough();
  });

  describe('handleExpiredUserToken', () => {
    it('should redirect to login if no token', () => {
      spyOn(store, 'select').and.returnValue(of({}));
      service.handleExpiredUserToken(httpRequest, httpHandler).subscribe();

      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should get new token and resend request', () => {
      store.dispatch(new fromStore.LoadUserTokenSuccess(userToken));
      service.handleExpiredUserToken(httpRequest, httpHandler).subscribe();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.RefreshUserToken({
          userId: userToken.userId,
          refreshToken: userToken.refresh_token
        })
      );
      store.dispatch(new fromStore.RefreshUserTokenSuccess(newToken));
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `${newToken.token_type} ${newToken.access_token}`
        }
      });

      expect(httpHandler.handle).toHaveBeenCalledWith(httpRequest);
    });

    it('should only dispatch refresh token event once', () => {
      store.dispatch(new fromStore.LoadUserTokenSuccess(userToken));

      service.handleExpiredUserToken(httpRequest, httpHandler).subscribe();

      store.dispatch(new fromStore.RefreshUserTokenSuccess(newToken));

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.RefreshUserToken({
          userId: userToken.userId,
          refreshToken: userToken.refresh_token
        })
      );

      expect(store.dispatch).not.toHaveBeenCalledWith(
        new fromStore.RefreshUserToken({
          userId: newToken.userId,
          refreshToken: newToken.refresh_token
        })
      );
    });
  });

  describe('handleExpiredRefreshToken', () => {
    it('should logout user', () => {
      service.handleExpiredRefreshToken();

      expect(store.dispatch).toHaveBeenCalledWith(new fromStore.Logout());
    });
  });
});
