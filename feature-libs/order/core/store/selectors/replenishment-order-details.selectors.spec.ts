import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ReplenishmentOrder, StateUtils } from '@spartacus/core';
import { OrderActions } from '../actions/index';
import { ORDER_FEATURE, StateWithOrder } from '../order-state';
import * as fromReducers from '../reducers/index';
import { OrderSelectors } from './index';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

describe('ReplenishmentOrderDetailsSelectors', () => {
  let store: Store<StateWithOrder>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ORDER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getReplenishmentOrderState', () => {
    it('should return the replenishment order state', () => {
      store.dispatch(
        new OrderActions.LoadReplenishmentOrderDetailsSuccess(
          mockReplenishmentOrder
        )
      );

      let result: StateUtils.LoaderState<ReplenishmentOrder>;

      store
        .pipe(select(OrderSelectors.getReplenishmentOrderState))
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
        new OrderActions.LoadReplenishmentOrderDetailsSuccess(
          mockReplenishmentOrder
        )
      );

      let result: ReplenishmentOrder;

      store
        .pipe(select(OrderSelectors.getReplenishmentOrderDetailsValue))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(mockReplenishmentOrder);
    });
  });

  describe('getReplenishmentOrderDetailsLoading', () => {
    it('should return the boolean value from the loader state loading', () => {
      store.dispatch(
        new OrderActions.LoadReplenishmentOrderDetails({
          userId: 'test-user-id',
          replenishmentOrderCode: 'test-repl-code',
        })
      );

      let result: boolean;

      store
        .pipe(select(OrderSelectors.getReplenishmentOrderDetailsLoading))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });

  describe('getReplenishmentOrderDetailsSuccess', () => {
    it('should return the boolean value from the loader state success', () => {
      store.dispatch(
        new OrderActions.LoadReplenishmentOrderDetailsSuccess(
          mockReplenishmentOrder
        )
      );

      let result: boolean;

      store
        .pipe(select(OrderSelectors.getReplenishmentOrderDetailsSuccess))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });

  describe('getReplenishmentOrderDetailsError', () => {
    it('should return the boolean value from the loader state error', () => {
      const mockError = 'test-error';

      store.dispatch(
        new OrderActions.LoadReplenishmentOrderDetailsFail(mockError)
      );

      let result: boolean;

      store
        .pipe(select(OrderSelectors.getReplenishmentOrderDetailsError))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });
});
