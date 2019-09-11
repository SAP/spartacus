import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { UserToken } from '../../models/token-types.model';
import { AuthActions } from '../actions/index';
import { StateWithAuth } from '../auth-state';
import * as fromReducers from '../reducers/index';
import { AuthSelectors } from './index';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx',
};

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

  it('should return csagent token loader state', () => {
    store.dispatch(
      new AuthActions.LoadCustomerSupportAgentTokenSuccess(testToken)
    );

    let result: LoaderState<UserToken>;
    store
      .pipe(select(AuthSelectors.getCustomerSupportAgentTokenState))
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(result).toEqual({
      error: false,
      loading: false,
      success: true,
      value: testToken,
    } as LoaderState<UserToken>);
  });

  it('should return a customer support agent token', () => {
    let result: UserToken;

    store
      .pipe(select(AuthSelectors.getCustomerSupportAgentToken))
      .subscribe(value => (result = value));
    expect(result).toEqual(undefined);

    store.dispatch(
      new AuthActions.LoadCustomerSupportAgentTokenSuccess(testToken)
    );

    expect(result).toEqual(testToken);
  });

  it('should return the customer support agent token loading state', () => {
    let result: boolean;

    store
      .pipe(select(AuthSelectors.getCustomerSupportAgentTokenLoading))
      .subscribe(value => (result = value));
    expect(result).toEqual(false);

    store.dispatch(
      new AuthActions.LoadCustomerSupportAgentToken({
        userId: 'user',
        password: '1234',
      })
    );

    expect(result).toEqual(true);
  });
});
