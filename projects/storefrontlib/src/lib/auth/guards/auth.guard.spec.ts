import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromStore from './../../auth/store';
import * as fromRoot from './../../routing/store';
import { AuthGuard } from './auth.guard';

const mockUserToken = {
  access_token: 'Mock Access Token',
  token_type: 'test',
  refresh_token: 'test',
  expires_in: 1,
  scope: ['test'],
  userId: 'test'
};

const mockRouter = { navigate: jasmine.createSpy('navigate') };
const mockActivatedRouteSnapshot = {};
const mockRouterStateSnapshot = { url: '/test' };

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router;
  let activatedRouteSnapshot;
  let routerStateSnapshot;
  let store: Store<fromStore.AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useValue: mockRouter
        },
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
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          auth: combineReducers(fromStore.getReducers())
        })
      ]
    });
    store = TestBed.get(Store);
    authGuard = TestBed.get(AuthGuard);
    router = TestBed.get(Router);
    activatedRouteSnapshot = TestBed.get(ActivatedRouteSnapshot);
    routerStateSnapshot = TestBed.get(RouterStateSnapshot);

    spyOn(store, 'dispatch').and.callThrough();
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
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromRoot.SaveRedirectUrl('/test')
    );
  });
});
