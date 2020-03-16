import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import {
  AuthRedirectService,
  AuthService,
  UserToken,
} from '../../../../../core/src/auth';
import { RoutingService } from '../../../../../core/src/routing';
import { UrlCommands } from '../../../../../core/src/routing/configurable-routes/url-translation/url-command';
import { GuestOrderDetailsGuard } from './guest-order-details.guard';

const mockUserToken = {
  access_token: 'Mock Access Token',
  token_type: 'token type',
  refresh_token: 'refresh token',
  expires_in: 1,
  scope: ['mock scope'],
  userId: 'test user id',
} as UserToken;

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return of();
  }
}

class RoutingServiceStub {
  go(_path: any[] | UrlCommands, _query?: object, _extras?: NavigationExtras) {}
}

class MockAuthRedirectService {
  reportNotAuthGuard = jasmine.createSpy('reportNotAuthGuard');
}

describe('NotAuthGuard', () => {
  let guard: GuestOrderDetailsGuard;
  let authService: AuthServiceStub;
  let routing: RoutingService;
  let authRedirectService: AuthRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: RoutingServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        {
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
      ],
      imports: [RouterTestingModule],
    });

    authService = TestBed.get(AuthService as Type<AuthService>);
    guard = TestBed.get(GuestOrderDetailsGuard as Type<GuestOrderDetailsGuard>);
    routing = TestBed.get(RoutingService as Type<RoutingService>);
    authRedirectService = TestBed.get(AuthRedirectService as Type<
      AuthRedirectService
    >);
  });

  describe(', when user is authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(of(mockUserToken));
    });

    it('canActivateGuard should return false', () => {
      let result: boolean;

      guard
        .canActivate()
        .subscribe(isGuestUser => (result = isGuestUser))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should not redirect to home', () => {
      spyOn(routing, 'go');
      guard
        .canActivate()
        .subscribe()
        .unsubscribe();
      expect(routing.go).not.toHaveBeenCalled();
    });
  });

  describe(', when user is NOT authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(
        of({ access_token: undefined } as UserToken)
      );
    });

    it('canActivateGuard should return true', () => {
      let result: boolean;

      guard
        .canActivate()
        .subscribe(isGuestUser => (result = isGuestUser))
        .unsubscribe();

      expect(result).toBe(true);
    });

    it('should redirect to homepage', () => {
      spyOn(routing, 'go');

      guard
        .canActivate()
        .subscribe()
        .unsubscribe();

      expect(routing.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    });

    it('should notify AuthRedirectService with the current navigation', () => {
      guard
        .canActivate()
        .subscribe()
        .unsubscribe();
      expect(authRedirectService.reportNotAuthGuard).toHaveBeenCalled();
    });
  });
});
