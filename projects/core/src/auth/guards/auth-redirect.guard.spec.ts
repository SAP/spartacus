import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RedirectAfterAuthGuard } from './auth-redirect.guard';
import { RedirectAfterAuthService } from './auth-redirect.service';

class MockRedirectAfterAuthService {
  reportNavigation = jasmine.createSpy('reportNavigation');
}

describe('RedirectAfterAuthGuard', () => {
  let guard: RedirectAfterAuthGuard;
  let service: RedirectAfterAuthService;
  let routerStateSnapshot: RouterStateSnapshot;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;

  beforeEach(() => {
    routerStateSnapshot = { url: '/current-url' } as RouterStateSnapshot;
    activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [
        RedirectAfterAuthGuard,
        {
          provide: RedirectAfterAuthService,
          useClass: MockRedirectAfterAuthService,
        },
        { provide: Router, useValue: { url: '/previous-url' } },
      ],
      imports: [RouterTestingModule],
    });
    guard = TestBed.get(RedirectAfterAuthGuard);
    service = TestBed.get(RedirectAfterAuthService);
  });

  it('should return true', () => {
    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toBe(
      true
    );
  });

  it('should notify RedirectAfterAuthService with previous url and current url', () => {
    guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
    expect(service.reportNavigation).toHaveBeenCalledWith(
      '/previous-url',
      '/current-url'
    );
  });
});
