import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';

import * as fromRoot from './../../../routing/store';
import * as fromReducers from './../reducers';
import * as fromSelectors from './../selectors';
import * as fromActions from './../actions';
import { UserToken } from '../../models/token-types.model';

fdescribe('Auth Selectors', () => {
  let store: Store<fromReducers.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          user: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getUserToken', () => {
    it('should return a user token from the state', () => {
      let result: UserToken;
      store
        .select(fromSelectors.getUserToken)
        .subscribe(value => (result = value));
      expect(result).toEqual(<UserToken>{});

      const testToken: UserToken = {
        access_token: 'xxx',
        token_type: 'bearer',
        refresh_token: 'xxx',
        expires_in: 1000,
        scope: ['xxx'],
        userId: 'xxx'
      };
      store.dispatch(new fromActions.LoadUserTokenSuccess(testToken));

      expect(result).toEqual(testToken);
    });
  });
});
