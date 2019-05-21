import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthRedirectGuard } from './auth-redirect.guard';
import { AuthRedirectService } from './auth-redirect.service';

class MockAuthRedirectService {
  reportNavigation = jasmine.createSpy('reportNavigation');
}

describe('AuthRedirectGuard', () => {
  let guard: AuthRedirectGuard;
  let service: AuthRedirectService;
  let routerStateSnapshot: RouterStateSnapshot;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;

  beforeEach(() => {
    routerStateSnapshot = { url: '/current-url' } as RouterStateSnapshot;
    activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    TestBed.configureTestingModule({
      providers: [
        AuthRedirectGuard,
        {
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
        { provide: Router, useValue: { url: '/previous-url' } },
      ],
      imports: [RouterTestingModule],
    });
    guard = TestBed.get(AuthRedirectGuard);
    service = TestBed.get(AuthRedirectService);
  });

  it('should return true', () => {
    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toBe(
      true
    );
  });

  it('should notify AuthRedirectService with previous url and current url', () => {
    guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
    expect(service.reportNavigation).toHaveBeenCalledWith(
      '/previous-url',
      '/current-url'
    );
  });
});
