import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { UserToken } from '../../../auth/models/token-types.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { AsmActions } from '../actions/index';
import { StateWithAsm } from '../asm-state';
import * as fromReducers from '../reducers/index';
import { AsmSelectors } from './index';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
};

describe('Customer Support Agent Token Selectors', () => {
  let store: Store<StateWithAsm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('asm', fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return csagent token loader state', () => {
    store.dispatch(
      new AsmActions.LoadCustomerSupportAgentTokenSuccess(testToken)
    );

    let result: LoaderState<UserToken>;
    store
      .pipe(select(AsmSelectors.getCustomerSupportAgentTokenState))
      .subscribe((value) => (result = value))
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
      .pipe(select(AsmSelectors.getCustomerSupportAgentToken))
      .subscribe((value) => (result = value));
    expect(result).toEqual(undefined);

    store.dispatch(
      new AsmActions.LoadCustomerSupportAgentTokenSuccess(testToken)
    );

    expect(result).toEqual(testToken);
  });

  it('should return the customer support agent token loading state', () => {
    let result: boolean;

    store
      .pipe(select(AsmSelectors.getCustomerSupportAgentTokenLoading))
      .subscribe((value) => (result = value));
    expect(result).toEqual(false);

    store.dispatch(
      new AsmActions.LoadCustomerSupportAgentToken({
        userId: 'user',
        password: '1234',
      })
    );

    expect(result).toEqual(true);
  });
});
