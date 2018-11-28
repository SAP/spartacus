import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';

const mockUserPaymentMethods = ['payment1', 'payment2'];

describe('User Payment Methods Selectors', () => {
  let store: Store<fromReducers.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('user', fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getPaymentMethods', () => {
    it('should return a user payment methods', () => {
      let result;
      store
        .pipe(select(fromSelectors.getPaymentMethods))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new fromActions.LoadUserPaymentMethodsSuccess(mockUserPaymentMethods)
      );

      expect(result).toEqual(mockUserPaymentMethods);
    });
  });

  describe('getPaymentMethodsLoading', () => {
    it('should return isLoading flag', () => {
      // reset loading state
      store.dispatch(new fromActions.LoadUserPaymentMethodsFail({}));

      let result;
      store
        .pipe(select(fromSelectors.getPaymentMethodsLoading))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadUserPaymentMethods('userId'));

      expect(result).toEqual(true);
    });
  });
});
