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
  expires_at: '1000',
  access_token_stored_at: '900',
  granted_scopes: [],
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

  it('should return a customer support agent token', () => {
    let result: UserToken;

    store
      .pipe(select(AsmSelectors.getCustomerSupportAgentToken))
      .subscribe((value) => (result = value));
    expect(result).toEqual({} as UserToken);

    store.dispatch(new AsmActions.SetCSAgentTokenData(testToken));

    expect(result).toEqual(testToken);
  });
});
