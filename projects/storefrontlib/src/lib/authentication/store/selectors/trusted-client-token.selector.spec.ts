import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromActions from '../actions';
import { TrustedClientToken } from '../../../user/models/token-types.model';

describe('Trusted Client Token selectors', () => {
  let store: Store<fromReducers.AuthenticationState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe('getTrustedToken', () => {
    it('should return a trusted client token from the state', () => {
      let result: TrustedClientToken;
      store
        .select(fromSelectors.getTrustedToken)
        .subscribe(value => (result = value));
      expect(result).toEqual(<TrustedClientToken>{});

      const testToken: TrustedClientToken = {
        access_token: 'abc-123',
        token_type: 'bearer',
        expires_in: 10000,
        scope: ''
      };
      store.dispatch(new fromActions.LoadTrustedClientTokenSuccess(testToken));

      expect(result).toEqual(testToken);
    });
  });
});
