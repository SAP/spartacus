import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras
} from '@angular/router';

import { AuthService, RoutingService, UserToken } from '@spartacus/core';

import { of } from 'rxjs';

import { AuthGuard } from './auth.guard';

const mockUserToken = {
  access_token: 'Mock Access Token',
  token_type: 'test',
  refresh_token: 'test',
  expires_in: 1,
  scope: ['test'],
  userId: 'test'
};

class AuthServiceStub {
  userToken$ = of();
}

const mockActivatedRouteSnapshot = {};
const mockRouterStateSnapshot = { url: '/test' };

class RoutingServiceStub {
  go(_path: any[], _query?: object, _extras?: NavigationExtras) {}
  saveRedirectUrl(_url: string) {}
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let service: RoutingService;
  let authService: AuthServiceStub;
  let activatedRouteSnapshot;
  let routerStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: RoutingService,
          useClass: RoutingServiceStub
        },
        {
          provide: ActivatedRouteSnapshot,
          useValue: mockActivatedRouteSnapshot
        },
        {
          provide: RouterStateSnapshot,
          useValue: mockRouterStateSnapshot
        },
        {
          provide: AuthService,
          useClass: AuthServiceStub
        }
      ],
      imports: [RouterTestingModule]
    });
    authGuard = TestBed.get(AuthGuard);
    service = TestBed.get(RoutingService);
    activatedRouteSnapshot = TestBed.get(ActivatedRouteSnapshot);
    routerStateSnapshot = TestBed.get(RouterStateSnapshot);
    authService = TestBed.get(AuthService);

    spyOn(service, 'go').and.stub();
    spyOn(service, 'saveRedirectUrl').and.stub();
  });

  it('should return false', () => {
    authService.userToken$ = of({ access_token: undefined });
    let result: boolean;

    const sub = authGuard
      .canActivate(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe(value => (result = value));
    sub.unsubscribe();
    expect(result).toBe(false);
  });

  it('should return true', () => {
    authService.userToken$ = of(mockUserToken);

    let result: boolean;

    const sub = authGuard
      .canActivate(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe(value => (result = value));
    sub.unsubscribe();
    expect(result).toBe(true);
  });

  it('should redirect to login if invalid token', () => {
    authService.userToken$ = of({ access_token: undefined } as UserToken);

    const sub = authGuard
      .canActivate(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe();
    sub.unsubscribe();

    expect(service.go).toHaveBeenCalledWith(['/login']);
    expect(service.saveRedirectUrl).toHaveBeenCalledWith('/test');
  });
});
