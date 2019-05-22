import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BackAfterAuthGuard } from './back-after-auth.guard';
import { AuthRedirectService } from './auth-redirect.service';

class MockRedirectAfterAuthService {
  reportNavigation = jasmine.createSpy('reportNavigation');
}

describe('BackAfterAuthGuard', () => {
  let guard: BackAfterAuthGuard;
  let service: AuthRedirectService;
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
        BackAfterAuthGuard,
        {
          provide: AuthRedirectService,
          useClass: MockRedirectAfterAuthService,
        },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [RouterTestingModule],
    });
    guard = TestBed.get(BackAfterAuthGuard);
    service = TestBed.get(AuthRedirectService);
  });

  it('should return true', () => {
    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toBe(
      true
    );
  });

  it('should notify AuthRedirectService with previous url and current url', () => {
    guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
    expect(service.reportNavigationToAuthUrl).toHaveBeenCalledWith(
      '/previous-url',
      '/current-url',
      123
    );
  });
});
