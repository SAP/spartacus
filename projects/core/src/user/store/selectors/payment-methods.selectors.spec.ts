import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import { PaymentDetailsList } from '../../../occ/occ-models/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

const mockUserPaymentMethods: PaymentDetailsList = {
  payments: [{ id: 'payment1' }, { id: 'payment2' }]
};

describe('User Payment Methods Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers())
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
        new fromActions.LoadUserPaymentMethodsSuccess(
          mockUserPaymentMethods.payments
        )
      );

      expect(result).toEqual(mockUserPaymentMethods.payments);
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
