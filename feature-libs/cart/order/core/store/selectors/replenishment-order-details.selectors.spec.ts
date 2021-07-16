import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { StateUtils } from '../../../state/utils/index';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { UsersSelectors } from '../selectors/index';
import { StateWithUser, USER_FEATURE } from '../user-state';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

describe('ReplenishmentOrderDetailsSelectors', () => {
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

  describe('getReplenishmentOrderState', () => {
    it('should return the replenishment order state', () => {
      store.dispatch(
        new UserActions.LoadReplenishmentOrderDetailsSuccess(
          mockReplenishmentOrder
        )
      );

      let result: StateUtils.LoaderState<ReplenishmentOrder>;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrderState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: true,
        value: mockReplenishmentOrder,
      });
    });
  });

  describe('getReplenishmentOrderDetailsValue', () => {
    it('should return the order details from the loader state value', () => {
      store.dispatch(
        new UserActions.LoadReplenishmentOrderDetailsSuccess(
          mockReplenishmentOrder
        )
      );

      let result: ReplenishmentOrder;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrderDetailsValue))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(mockReplenishmentOrder);
    });
  });

  describe('getReplenishmentOrderDetailsLoading', () => {
    it('should return the boolean value from the loader state loading', () => {
      store.dispatch(
        new UserActions.LoadReplenishmentOrderDetails({
          userId: 'test-user-id',
          replenishmentOrderCode: 'test-repl-code',
        })
      );

      let result: boolean;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrderDetailsLoading))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });

  describe('getReplenishmentOrderDetailsSuccess', () => {
    it('should return the boolean value from the loader state success', () => {
      store.dispatch(
        new UserActions.LoadReplenishmentOrderDetailsSuccess(
          mockReplenishmentOrder
        )
      );

      let result: boolean;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrderDetailsSuccess))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });

  describe('getReplenishmentOrderDetailsError', () => {
    it('should return the boolean value from the loader state error', () => {
      const mockError = 'test-error';

      store.dispatch(
        new UserActions.LoadReplenishmentOrderDetailsFail(mockError)
      );

      let result: boolean;

      store
        .pipe(select(UsersSelectors.getReplenishmentOrderDetailsError))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });
});
