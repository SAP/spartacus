import { select, Store, StoreModule } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';

import * as fromReducers from './../reducers';
import * as fromSelectors from './../selectors';
import * as fromActions from './../actions';
import { UserToken } from '../../models/token-types.model';
import { AuthState } from '../auth-state';

describe('UserToken Selectors', () => {
  let store: Store<AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getUserToken', () => {
    it('should return a user token from the state', () => {
      let result: UserToken;

      store
        .pipe(select(fromSelectors.getUserToken))
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
