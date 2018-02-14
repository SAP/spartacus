import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';

import * as fromRoot from './../../../routing/store';
import * as fromReducers from './../reducers';
import * as fromSelectors from './../selectors';
import * as fromActions from './../actions';
import { UserToken } from '../../token-types';

fdescribe('Auth Selectors', () => {
  let store: Store<fromReducers.TokensState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          tokens: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getUserTokenState', () => {
    it('should return a user token from the state', () => {
      let result;
      store
        .select(fromSelectors.getUserToken)
        .subscribe(value => (result = value));
      expect(result).toEqual({});

      const testToken: UserToken = {
        accessToken: 'xxx',
        tokenType: 'bearer',
        refreshToken: 'xxx',
        expiresIn: 1000,
        scope: ['xxx'],
        username: 'xxx'
      };
      store.dispatch(new fromActions.LoadUserTokenSuccess(testToken));

      expect(result).toEqual(testToken);
    });
  });
});
