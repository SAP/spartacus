import { TestBed } from '@angular/core/testing';

import { UserGuard } from './user.guard';
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

describe('UserGuard', () => {
  let userGuard: UserGuard;
  let store: Store<fromStore.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGuard],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          user: combineReducers(fromReducers.reducers)
        })
      ]
    });
    store = TestBed.get(Store);
    userGuard = TestBed.get(UserGuard);
  });

  it('should return false', () => {
    spyOn(store, 'select').and.returnValue(of(mockUserInvalidToken));

    let result: boolean;

    userGuard.canActivate().subscribe(value => (result = value));
    expect(result).toBe(false);
  });

  it('should return true', () => {
    spyOn(store, 'select').and.returnValue(of(mockUserValidToken));

    let result: boolean;

    userGuard.canActivate().subscribe(value => (result = value));
    expect(result).toBe(true);
  });
});
