import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { PaymentDetails } from '../../../model/cart.model';
import { Occ } from '../../../occ/occ-models/occ.models';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

const mockUserPaymentMethods: Occ.PaymentDetailsList = {
  payments: [{ id: 'payment1' }, { id: 'payment2' }],
};

describe('User Payment Methods Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getPaymentMethodsLoaderState', () => {
    it('should return a user payment methods loader', () => {
      let result: LoaderState<PaymentDetails[]>;
      store
        .pipe(select(UsersSelectors.getPaymentMethodsState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: [],
      });
    });
  });

  describe('getPaymentMethods', () => {
    it('should return a user payment methods', () => {
      let result: PaymentDetails[];
      store
        .pipe(select(UsersSelectors.getPaymentMethods))
        .subscribe((value) => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new UserActions.LoadUserPaymentMethodsSuccess(
          mockUserPaymentMethods.payments
        )
      );

      expect(result).toEqual(mockUserPaymentMethods.payments);
    });
  });

  describe('getPaymentMethodsLoading', () => {
    it('should return isLoading flag', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getPaymentMethodsLoading))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new UserActions.LoadUserPaymentMethods('userId'));

      expect(result).toEqual(true);
    });
  });

  describe('getPaymentMethodsLoadedSuccess', () => {
    it('should return paymentMethodsLoadedSuccess flag', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getPaymentMethodsLoadedSuccess))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new UserActions.LoadUserPaymentMethodsSuccess([]));

      expect(result).toEqual(true);
    });
  });
});
