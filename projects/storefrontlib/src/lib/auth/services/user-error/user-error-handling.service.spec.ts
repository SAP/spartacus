import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { AuthService } from '../../facade/auth.service';
import { UserToken } from '../../models/token-types.model';

import { UserErrorHandlingService } from './user-error-handling.service';
import { RoutingService } from '@spartacus/core';

class MockHttpHandler extends HttpHandler {
  handle(_req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return of(null);
  }
}

class AuthServiceStub {
  userToken$: Observable<UserToken>;
  refreshUserToken(_token: UserToken) {}
  logout() {}
}

class MockRoutingService {
  translateAndGo() {}
}

describe('UserErrorHandlingService', () => {
  const httpRequest = new HttpRequest('GET', '/');
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

  let service: UserErrorHandlingService;
  let httpHandler: HttpHandler;
  let routingService: RoutingService;
  let authService: AuthServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserErrorHandlingService,
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        { provide: HttpHandler, useClass: MockHttpHandler },
        { provide: RoutingService, useClass: MockRoutingService }
      ]
    });

    routingService = TestBed.get(RoutingService);
    service = TestBed.get(UserErrorHandlingService);
    httpHandler = TestBed.get(HttpHandler);
    authService = TestBed.get(AuthService);

    spyOn(routingService, 'translateAndGo').and.stub();
    spyOn(httpHandler, 'handle').and.callThrough();
  });

  describe('handleExpiredUserToken', () => {
    it('should redirect to login if no token', () => {
      authService.userToken$ = of({} as UserToken);
      const sub = service
        .handleExpiredUserToken(httpRequest, httpHandler)
        .subscribe();
      sub.unsubscribe();

      expect(routingService.translateAndGo).toHaveBeenCalledWith({
        route: ['login']
      });
    });

    it('should get new token', () => {
      spyOn(authService, 'refreshUserToken').and.stub();
      authService.userToken$ = of(userToken);

      const sub = service
        .handleExpiredUserToken(httpRequest, httpHandler)
        .subscribe();
      expect(authService.refreshUserToken).toHaveBeenCalledWith(userToken);
      sub.unsubscribe();
    });

    it('should only dispatch refresh token event once', () => {
      authService.userToken$ = of(userToken);
      spyOn(authService, 'refreshUserToken').and.returnValue(of(newToken));

      const sub = service
        .handleExpiredUserToken(httpRequest, httpHandler)
        .subscribe();
      sub.unsubscribe();

      expect(authService.refreshUserToken).toHaveBeenCalledWith(userToken);
      expect(authService.refreshUserToken).not.toHaveBeenCalledWith(newToken);
    });
  });

  describe('handleExpiredRefreshToken', () => {
    it('should logout user', () => {
      spyOn(authService, 'logout').and.stub();

      service.handleExpiredRefreshToken();

      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
