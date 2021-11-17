import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ReplenishmentOrderList, StateUtils } from '@spartacus/core';
import { OrderActions } from '../actions/index';
import { ORDER_FEATURE, StateWithOrder } from '../order-state';
import * as fromReducers from '../reducers/index';
import { OrderSelectors } from './index';

const mockReplenishmentOrderList: ReplenishmentOrderList = {
  replenishmentOrders: [],
  pagination: {
    currentPage: 1,
    pageSize: 5,
  },
  sorts: [{ code: 'byPage' }],
};

describe('ReplenishmentOrdersSelectors', () => {
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

  describe('getReplenishmentOrdersState', () => {
    it('should return Replenishment Orders state', () => {
      store.dispatch(
        new OrderActions.LoadUserReplenishmentOrdersSuccess(
          mockReplenishmentOrderList
        )
      );

      let result: StateUtils.LoaderState<ReplenishmentOrderList>;

      store
        .pipe(select(OrderSelectors.getReplenishmentOrdersState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: true,
        value: mockReplenishmentOrderList,
      });
    });
  });

  describe('getReplenishmentOrders', () => {
    it('should return a user Replenishment Orders', () => {
      store.dispatch(
        new OrderActions.LoadUserReplenishmentOrdersSuccess(
          mockReplenishmentOrderList
        )
      );

      let result: ReplenishmentOrderList;

      store
        .pipe(select(OrderSelectors.getReplenishmentOrders))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(mockReplenishmentOrderList);
    });
  });

  describe('getReplenishmentOrdersLoading', () => {
    it('should return the boolean value from the loader state loading', () => {
      store.dispatch(
        new OrderActions.LoadUserReplenishmentOrders({
          userId: 'test-user-id',
        })
      );

      let result: boolean;

      store
        .pipe(select(OrderSelectors.getReplenishmentOrdersLoading))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });

  describe('getReplenishmentOrdersSuccess', () => {
    it('should return the boolean value from the loader state success', () => {
      store.dispatch(
        new OrderActions.LoadUserReplenishmentOrdersSuccess(
          mockReplenishmentOrderList
        )
      );

      let result: boolean;

      store
        .pipe(select(OrderSelectors.getReplenishmentOrdersSuccess))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });
  });

  describe('getReplenishmentOrdersError', () => {
    it('should return the boolean value from the loader state error', () => {
      const mockError = 'test-error';

      store.dispatch(
        new OrderActions.LoadUserReplenishmentOrdersFail(mockError)
      );

      let result: boolean;

      store
        .pipe(select(OrderSelectors.getReplenishmentOrdersError))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
});
