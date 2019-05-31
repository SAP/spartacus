import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { LoaderState } from '../../../state';
import { OpenIdToken } from '../../models/token-types.model';
import * as fromActions from '../actions/open-id-token.action';
import { AUTH_FEATURE, StateWithAuth } from '../auth-state';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors/open-id-token.selectors';

const testToken = {
  access_token: 'xxx',
} as OpenIdToken;

describe('Open ID Token Selectors', () => {
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

  describe('getOpenIdTokenState', () => {
    it('should return the state', () => {
      store.dispatch(new fromActions.LoadOpenIdTokenSuccess(testToken));

      let result: LoaderState<OpenIdToken>;
      store
        .pipe(select(fromSelectors.getOpenIdTokenState))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: true,
        value: testToken,
      });
    });
  });
  describe('getOpenIdTokenValue', () => {
    it('should return the value', () => {
      store.dispatch(new fromActions.LoadOpenIdTokenSuccess(testToken));

      let result: OpenIdToken;
      store
        .pipe(select(fromSelectors.getOpenIdTokenValue))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(testToken);
    });
  });
  describe('getOpenIdTokenLoading', () => {
    it('should return the loading flag', () => {
      store.dispatch(
        new fromActions.LoadOpenIdToken({
          username: 'xxx@xxx.xxx',
          password: 'pwd',
        })
      );

      let result = false;
      store
        .pipe(select(fromSelectors.getOpenIdTokenLoading))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
  describe('getOpenIdTokenSuccess', () => {
    it('should return the success flag', () => {
      store.dispatch(new fromActions.LoadOpenIdTokenSuccess(testToken));

      let result = false;
      store
        .pipe(select(fromSelectors.getOpenIdTokenSuccess))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
  describe('getOpenIdTokenError', () => {
    it('should return the error flag', () => {
      store.dispatch(new fromActions.LoadOpenIdTokenFail('error'));

      let result = false;
      store
        .pipe(select(fromSelectors.getOpenIdTokenError))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
});
