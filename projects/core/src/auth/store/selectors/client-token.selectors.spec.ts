import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { LoaderState } from '../../../state';
import { ClientToken } from '../../models/token-types.model';
import * as fromActions from '../actions/client-token.action';
import { AUTH_FEATURE, StateWithAuth } from '../auth-state';
import * as fromReducers from '../reducers';
import * as fromSelectors from './client-token.selectors';

const mockClientToken = {
  access_token: 'xxx',
} as ClientToken;

describe('ClientToken Selectors', () => {
  let store: Store<StateWithAuth>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(AUTH_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getClientTokenState', () => {
    it('should return the client token state', () => {
      store.dispatch(new fromActions.LoadClientTokenSuccess(mockClientToken));

      let result: LoaderState<ClientToken>;
      store
        .pipe(select(fromSelectors.getClientTokenState))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        error: false,
        loading: false,
        success: true,
        value: mockClientToken,
      } as LoaderState<ClientToken>);
    });
  });
});
