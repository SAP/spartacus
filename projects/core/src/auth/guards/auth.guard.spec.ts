import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NavigationExtras,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { of, Observable } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { UserToken } from '../models/token-types.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
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
  reportAuthGuard = jasmine.createSpy('reportAuthGuard');
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: RoutingService;
  let authService: AuthService;
  let authRedirectService: AuthRedirectService;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;

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
        AuthGuard,
        {
          provide: RoutingService,
          useClass: RoutingServiceStub,
        },
        {
          provide: AuthService,
          useClass: AuthServiceStub,
        },
        {
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [RouterTestingModule],
    });
    guard = TestBed.get(AuthGuard);
    service = TestBed.get(RoutingService);
    authService = TestBed.get(AuthService);
    authRedirectService = TestBed.get(AuthRedirectService);

    spyOn(service, 'go').and.stub();
  });

  describe(', when user is NOT authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(
        of({ access_token: undefined } as UserToken)
      );
    });

    it('should return false', () => {
      let result: boolean;
      guard
        .canActivate(activatedRouteSnapshot, routerStateSnapshot)
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toBe(false);
    });

    it('should notify AuthRedirectService with the current navigation', () => {
      guard
        .canActivate(activatedRouteSnapshot, routerStateSnapshot)
        .subscribe()
        .unsubscribe();
      expect(authRedirectService.reportAuthGuard).toHaveBeenCalledWith(
        '/current-url',
        123
      );
    });
  });

  describe(', when user is authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'getUserToken').and.returnValue(of(mockUserToken));
    });

    it('should return true', () => {
      let result: boolean;
      guard
        .canActivate(activatedRouteSnapshot, routerStateSnapshot)
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toBe(true);
    });
  });
});
