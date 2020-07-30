import { TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { UrlCommands } from '../../../routing/configurable-routes/url-translation/url-command';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { AuthRedirectService } from './auth-redirect.service';
import { NotAuthGuard } from './not-auth.guard';

class AuthServiceStub {
  isUserLoggedIn(): Observable<boolean> {
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
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(NotAuthGuard);
    routing = TestBed.inject(RoutingService);
    authRedirectService = TestBed.inject(AuthRedirectService);
  });

  describe(', when user is authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    });

    it('should return false', () => {
      let result: boolean;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(false);
    });

    it('should redirect to homepage', () => {
      spyOn(routing, 'go');
      guard.canActivate().subscribe().unsubscribe();
      expect(routing.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    });
  });

  describe(', when user is NOT authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    });

    it('should return true', () => {
      let result: boolean;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });

    it('should not redirect to home', () => {
      spyOn(routing, 'go');
      guard.canActivate().subscribe().unsubscribe();
      expect(routing.go).not.toHaveBeenCalled();
    });

    it('should notify AuthRedirectService with the current navigation', () => {
      guard.canActivate().subscribe().unsubscribe();
      expect(authRedirectService.reportNotAuthGuard).toHaveBeenCalled();
    });
  });
});
