import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from './../../routing/store';
import * as fromStore from './../store';
import * as fromReducers from './../store/reducers';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

const mockUserValidToken = {
  access_token: 'Mock Access Token'
};

const mockUserInvalidToken = {};
const mockRouter = { navigate: jasmine.createSpy('navigate') };
const mockActivatedRouteSnapshot = {};
const mockRouterStateSnapshot = { state: '/checkout' };

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let store: Store<fromStore.UserState>;
  let router;
  let activatedRouteSnapshot;
  let routerStateSnapshot;
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
          user: combineReducers(fromReducers.getReducers())
        })
      ]
    });
    store = TestBed.get(Store);
    authGuard = TestBed.get(AuthGuard);
    router = TestBed.get(Router);
    activatedRouteSnapshot = TestBed.get(ActivatedRouteSnapshot);
    routerStateSnapshot = TestBed.get(RouterStateSnapshot);
  });

  it('should return false', () => {
    spyOn(store, 'select').and.returnValue(of(mockUserInvalidToken));

    let result: boolean;

    authGuard
      .canActivate(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe(value => (result = value));
    expect(result).toBe(false);
  });

  it('should return true', () => {
    spyOn(store, 'select').and.returnValue(of(mockUserValidToken));

    let result: boolean;

    authGuard
      .canActivate(activatedRouteSnapshot, routerStateSnapshot)
      .subscribe(value => (result = value));
    expect(result).toBe(true);
  });

  it('should redirect to login if invalid token', () => {
    spyOn(store, 'select').and.returnValue(of(mockUserInvalidToken));

    authGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot);

    expect(router.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: routerStateSnapshot.url }
    });
  });
});
