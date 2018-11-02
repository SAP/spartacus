import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { RoutingService } from '../../routing/facade/routing.service';

import * as fromStore from './../../auth/store';
import { AuthGuard } from './auth.guard';

const mockUserToken = {
  access_token: 'Mock Access Token',
  token_type: 'test',
  refresh_token: 'test',
  expires_in: 1,
  scope: ['test'],
  userId: 'test'
};

const mockActivatedRouteSnapshot = {};
const mockRouterStateSnapshot = { url: '/test' };

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let service: RoutingService;
  let activatedRouteSnapshot;
  let routerStateSnapshot;
  let store: Store<fromStore.AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        RoutingService,
        {
          provide: ActivatedRouteSnapshot,
          useValue: mockActivatedRouteSnapshot
        },
        {
          provide: RouterStateSnapshot,
          useValue: mockRouterStateSnapshot
        }
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', fromStore.getReducers())
      ]
    });
    store = TestBed.get(Store);
    authGuard = TestBed.get(AuthGuard);
    service = TestBed.get(RoutingService);
    activatedRouteSnapshot = TestBed.get(ActivatedRouteSnapshot);
    routerStateSnapshot = TestBed.get(RouterStateSnapshot);

    spyOn(service, 'go').and.callThrough();
    spyOn(service, 'saveRedirectUrl').and.callThrough();
  });

  it('should return false', () => {
    let result: boolean;

    const sub = authGuard
      .canActivate(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe(value => (result = value));
    sub.unsubscribe();
    expect(result).toBe(false);
  });

  it('should return true', () => {
    store.dispatch(new fromStore.LoadUserTokenSuccess(mockUserToken));

    let result: boolean;

    const sub = authGuard
      .canActivate(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe(value => (result = value));
    sub.unsubscribe();
    expect(result).toBe(true);
  });

  it('should redirect to login if invalid token', () => {
    const sub = authGuard
      .canActivate(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe();
    sub.unsubscribe();
    expect(service.go).toHaveBeenCalledWith(['/login']);
    expect(service.saveRedirectUrl).toHaveBeenCalledWith('/test');
  });
});
