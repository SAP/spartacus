import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { UserToken } from '../../models/token-types.model';
import { AuthActions } from '../actions/index';
import { StateWithAuth } from '../auth-state';
import * as fromReducers from '../reducers/index';
import { AuthSelectors } from './index';

describe('Customer Support Agent Token Selectors', () => {
  let store: Store<StateWithAuth>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithAuth>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCustomerSupportAgentToken', () => {
    it('should return a customer support agent token from the state', () => {
      let result: UserToken;

      store
        .pipe(select(AuthSelectors.getCustomerSupportAgentToken))
        .subscribe(value => (result = value));
      expect(result).toEqual(<UserToken>{});

      const testToken: UserToken = {
        access_token: 'xxx',
        token_type: 'bearer',
        refresh_token: 'xxx',
        expires_in: 1000,
        scope: ['xxx'],
        userId: 'xxx',
      };
      store.dispatch(
        new AuthActions.LoadCustomerSupportAgentTokenSuccess(testToken)
      );

      expect(result).toEqual(testToken);
    });
  });
});
