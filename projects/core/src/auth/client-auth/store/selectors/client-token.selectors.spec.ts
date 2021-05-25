import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StateUtils } from '../../../../state';
import { ClientToken } from '../../models/client-token.model';
import { ClientAuthActions } from '../actions/index';
import { CLIENT_AUTH_FEATURE, StateWithClientAuth } from '../client-auth-state';
import * as fromReducers from '../reducers/index';
import { ClientAuthSelectors } from './index';

const mockClientToken = {
  access_token: 'xxx',
} as ClientToken;

describe('ClientToken Selectors', () => {
  let store: Store<StateWithClientAuth>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CLIENT_AUTH_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getClientTokenState', () => {
    it('should return the client token state', () => {
      store.dispatch(
        new ClientAuthActions.LoadClientTokenSuccess(mockClientToken)
      );

      let result: StateUtils.LoaderState<ClientToken>;
      store
        .pipe(select(ClientAuthSelectors.getClientTokenState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        error: false,
        loading: false,
        success: true,
        value: mockClientToken,
      } as StateUtils.LoaderState<ClientToken>);
    });
  });
});
