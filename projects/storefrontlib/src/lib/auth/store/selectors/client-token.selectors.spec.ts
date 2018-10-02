import { Store, StoreModule, combineReducers, select } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';

import * as fromRoot from './../../../routing/store';
import * as fromReducers from './../reducers';
import * as fromSelectors from './../selectors';
import * as fromActions from './../actions';
import { ClientAuthenticationToken } from '../../models/token-types.model';

describe('ClientToken Selectors', () => {
  let store: Store<fromReducers.AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          auth: combineReducers(fromReducers.getReducers())
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getClientToken', () => {
    it('should return a client token from the state', () => {
      let result: ClientAuthenticationToken;
      store
        .pipe(select(fromSelectors.getClientToken))
        .subscribe(value => (result = value));
      expect(result).toEqual(<ClientAuthenticationToken>{});

      const testToken: ClientAuthenticationToken = {
        access_token: 'xxx',
        token_type: 'xxx',
        expires_in: 1,
        scope: 'xxx'
      };
      store.dispatch(new fromActions.LoadClientTokenSuccess(testToken));
      expect(result).toEqual(testToken);
    });
  });
});
