import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { AuthService } from '../../facade/auth.service';
import { UserToken } from '../../models/token-types.model';

import { UserErrorHandlingService } from './user-error-handling.service';

class MockHttpHandler extends HttpHandler {
  handle(_req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return of(null);
  }
}

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return of();
  }
  refreshUserToken(_token: UserToken): void {}
  logout(): void {}
}

describe('UserErrorHandlingService', () => {
  const httpRequest = new HttpRequest('GET', '/');
  const userToken = {
    access_token: 'xxx',
    token_type: 'bearer',
    refresh_token: 'xxx',
    expires_in: 1000,
    scope: ['xxx'],
    userId: 'xxx'
  } as UserToken;

  const newToken = {
    access_token: '1234',
    token_type: 'bearer',
    refresh_token: '5678',
    expires_in: 1000,
    scope: ['xxx'],
    userId: 'xxx'
  } as UserToken;

  let service: UserErrorHandlingService;
  let httpHandler: HttpHandler;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserErrorHandlingService,
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        { provide: HttpHandler, useClass: MockHttpHandler }
      ]
    });

    router = TestBed.get(Router);
    service = TestBed.get(UserErrorHandlingService);
    httpHandler = TestBed.get(HttpHandler);
    authService = TestBed.get(AuthService);

    spyOn(router, 'navigate').and.stub();
    spyOn(httpHandler, 'handle').and.callThrough();
  });

  describe('handleExpiredUserToken', () => {
    it('should redirect to login if no token', () => {
      spyOn(authService, 'getUserToken').and.returnValue(of({}));
      service
        .handleExpiredUserToken(httpRequest, httpHandler)
        .subscribe()
        .unsubscribe();

      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should get new token', () => {
      spyOn(authService, 'getUserToken').and.returnValue(of(userToken));
      spyOn(authService, 'refreshUserToken').and.stub();

      service
        .handleExpiredUserToken(httpRequest, httpHandler)
        .subscribe()
        .unsubscribe();
      expect(authService.refreshUserToken).toHaveBeenCalledWith(userToken);
    });

    it('should only dispatch refresh token event once', () => {
      spyOn(authService, 'getUserToken').and.returnValue(of(userToken));
      spyOn(authService, 'refreshUserToken').and.returnValue(of(newToken));

      service
        .handleExpiredUserToken(httpRequest, httpHandler)
        .subscribe()
        .unsubscribe();

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
