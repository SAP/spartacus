import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NavigationExtras,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { RoutingService } from '../../routing/facade/routing.service';

import { of, Observable } from 'rxjs';

import { AuthService } from '../facade/auth.service';
import { UserToken } from '../models/token-types.model';

import { NotAuthGuard } from './not-auth.guard';
import { UrlCommands } from '../../routing/configurable-routes/url-translation/url-command';
import { AuthRedirectService } from './auth-redirect.service';

const mockUserToken = {
  access_token: 'Mock Access Token',
  token_type: 'test',
  refresh_token: 'test',
  expires_in: 1,
  scope: ['test'],
  userId: 'test',
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
  let guard: NotAuthGuard;
  let authService: AuthServiceStub;
  let routing: RoutingService;
  let authRedirectService: AuthRedirectService;
  let routerStateSnapshot: RouterStateSnapshot;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;

  beforeEach(() => {
    routerStateSnapshot = { url: '/current-url' } as RouterStateSnapshot;
    activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockRouter = {
      url: '/previous-url',
      getCurrentNavigation: jasmine
        .createSpy('getCurrentNavigation')
        .and.returnValue({ id: 123 }),
    };

    TestBed.configureTestingModule({
      providers: [
        NotAuthGuard,
        { provide: RoutingService, useClass: RoutingServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useValue: mockRouter },
        {
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
      ],
      imports: [RouterTestingModule],
    });
    authService = TestBed.get(AuthService);
    guard = TestBed.get(NotAuthGuard);
    routing = TestBed.get(RoutingService);
    authRedirectService = TestBed.get(AuthRedirectService);
  });

  describe(', when user is authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(of(mockUserToken));
    });

    it('should return false', () => {
      let result: boolean;
      guard
        .canActivate(activatedRouteSnapshot, routerStateSnapshot)
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should redirect to homepage', () => {
      spyOn(routing, 'go');
      guard
        .canActivate(activatedRouteSnapshot, routerStateSnapshot)
        .subscribe()
        .unsubscribe();
      expect(routing.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    });
  });

  describe(', when user is NOT authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(
        of({ access_token: undefined } as UserToken)
      );
    });

    it('should return true', () => {
      let result: boolean;
      guard
        .canActivate(activatedRouteSnapshot, routerStateSnapshot)
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });

    it('should not redirect to home', () => {
      spyOn(routing, 'go');
      guard
        .canActivate(activatedRouteSnapshot, routerStateSnapshot)
        .subscribe()
        .unsubscribe();
      expect(routing.go).not.toHaveBeenCalled();
    });

    it('should notify AuthRedirectService with the current navigation', () => {
      guard
        .canActivate(activatedRouteSnapshot, routerStateSnapshot)
        .subscribe()
        .unsubscribe();
      expect(authRedirectService.reportNotAuthGuard).toHaveBeenCalledWith(
        '/previous-url',
        '/current-url',
        123
      );
    });
  });
});
