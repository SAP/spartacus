import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { OpenIdToken } from '../../models/kyma-token-types.model';
import { KymaActions } from '../actions/index';
import { KYMA_FEATURE, StateWithKyma } from '../kyma-state';
import * as fromReducers from '../reducers/index';
import { KymaSelectors } from '../selectors/index';

const testToken = {
  access_token: 'xxx',
} as OpenIdToken;

describe('Open ID Token Selectors', () => {
  let store: Store<StateWithKyma>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(KYMA_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOpenIdTokenState', () => {
    it('should return the state', () => {
      store.dispatch(new KymaActions.LoadOpenIdTokenSuccess(testToken));

      let result: LoaderState<OpenIdToken>;
      store
        .pipe(select(KymaSelectors.getOpenIdTokenState))
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
      store.dispatch(new KymaActions.LoadOpenIdTokenSuccess(testToken));

      let result: OpenIdToken;
      store
        .pipe(select(KymaSelectors.getOpenIdTokenValue))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(testToken);
    });
  });
  describe('getOpenIdTokenLoading', () => {
    it('should return the loading flag', () => {
      store.dispatch(
        new KymaActions.LoadOpenIdToken({
          username: 'xxx@xxx.xxx',
          password: 'pwd',
        })
      );

      let result = false;
      store
        .pipe(select(KymaSelectors.getOpenIdTokenLoading))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
  describe('getOpenIdTokenSuccess', () => {
    it('should return the success flag', () => {
      store.dispatch(new KymaActions.LoadOpenIdTokenSuccess(testToken));

      let result = false;
      store
        .pipe(select(KymaSelectors.getOpenIdTokenSuccess))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
  describe('getOpenIdTokenError', () => {
    it('should return the error flag', () => {
      store.dispatch(new KymaActions.LoadOpenIdTokenFail('error'));

      let result = false;
      store
        .pipe(select(KymaSelectors.getOpenIdTokenError))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
});
