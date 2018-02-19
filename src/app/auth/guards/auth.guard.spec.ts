import { TestBed, async } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from './../../routing/store';
import * as fromStore from './../store';
import * as fromReducers from './../store/reducers';
import { of } from 'rxjs/observable/of';
import { RouterTestingModule } from '@angular/router/testing';

const mockUserValidToken = {
  access_token: 'Mock Access Token'
};

const mockUserInvalidToken = {};

fdescribe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let store: Store<fromStore.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          user: combineReducers(fromReducers.reducers)
        })
      ]
    });
    store = TestBed.get(Store);
    authGuard = TestBed.get(AuthGuard);
  });

  beforeEach(() => {
    authGuard = TestBed.get(AuthGuard);
    store = TestBed.get(Store);
  });

  it('should return false', () => {
    spyOn(store, 'select').and.returnValue(of(mockUserInvalidToken));

    let result: boolean;

    authGuard.canActivate().subscribe(value => (result = value));
    expect(result).toBe(false);
  });

  it('should return true', () => {
    spyOn(store, 'select').and.returnValue(of(mockUserValidToken));

    let result: boolean;

    authGuard.canActivate().subscribe(value => (result = value));
    expect(result).toBe(true);
  });
});
