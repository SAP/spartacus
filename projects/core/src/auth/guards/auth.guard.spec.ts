import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras
} from '@angular/router';

import { AuthService, RoutingService, UserToken } from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { AuthGuard } from './auth.guard';

const mockUserToken = {
  access_token: 'Mock Access Token',
  token_type: 'test',
  refresh_token: 'test',
  expires_in: 1,
  scope: ['test'],
  userId: 'test'
} as UserToken;

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return of();
  }
}
class ActivatedRouteSnapshotStub {}
class RouterStateSnapshotStub {}
class RoutingServiceStub {
  go(_path: any[], _query?: object, _extras?: NavigationExtras) {}
  saveRedirectUrl(_url: string) {}
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let service: RoutingService;
  let authService: AuthService;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;

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
          useClass: ActivatedRouteSnapshotStub
        },
        {
          provide: RouterStateSnapshot,
          useClass: RouterStateSnapshotStub
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
    spyOn(authService, 'getUserToken').and.returnValue(
      of({ access_token: undefined } as UserToken)
    );
    let result: boolean;

    authGuard
      .canActivate(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toBe(false);
  });

  it('should return true', () => {
    spyOn(authService, 'getUserToken').and.returnValue(of(mockUserToken));

    let result: boolean;

    authGuard
      .canActivate(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toBe(true);
  });

  it('should redirect to login if invalid token', () => {
    spyOn(authService, 'getUserToken').and.returnValue(
      of({ access_token: undefined } as UserToken)
    );
    routerStateSnapshot.url = '/test';

    authGuard
      .canActivate(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe()
      .unsubscribe();

    expect(service.go).toHaveBeenCalledWith(['/login']);
    expect(service.saveRedirectUrl).toHaveBeenCalledWith('/test');
  });
});
