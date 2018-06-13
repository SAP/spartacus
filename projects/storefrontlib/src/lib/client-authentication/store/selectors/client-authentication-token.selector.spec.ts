import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromActions from '../actions';
import { ClientAuthenticationToken } from '../../../user/models/token-types.model';

describe('Client Token selectors', () => {
  let store: Store<fromReducers.ClientAuthenticationState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'client-authentication': combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe('getClientToken', () => {
    it('should return a client token from the state', () => {
      let result: ClientAuthenticationToken;
      store
        .select(fromSelectors.getAuthClient)
        .subscribe(value => (result = value));
      expect(result).toEqual(<ClientAuthenticationToken>{});

      const testToken: ClientAuthenticationToken = {
        access_token: 'abc-123',
        token_type: 'bearer',
        expires_in: 10000,
        scope: ''
      };
      store.dispatch(
        new fromActions.LoadClientAuthenticationTokenSuccess(testToken)
      );

      expect(result).toEqual(testToken);
    });
  });
});
