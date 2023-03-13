import { fakeAsync, TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { UnitOrderSelectors } from '.';
import { UnitOrderActions } from '../actions';
import * as fromReducers from '../reducers/index';
import { StateWithUnitOrder, UNIT_ORDER_FEATURE } from '../unit-order-state';

const mockEmptyOrderList: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

const mockOrderList: OrderHistoryList = {
  orders: [],
  pagination: {
    currentPage: 1,
    pageSize: 5,
  },
  sorts: [{ code: 'byPage' }],
};

describe('Unit Level Orders Selectors', () => {
  let store: Store<StateWithUnitOrder>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(UNIT_ORDER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOrdersLoaderState', () => {
    it('should return unit orders state', () => {
      let result: StateUtils.LoaderState<OrderHistoryList> | undefined;
      store
        .pipe(select(UnitOrderSelectors.getOrdersState))
        .subscribe((value) => {
          result = value;
        })
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: mockEmptyOrderList,
      });
    });
  });

  describe('getOrders', () => {
    it('should return unit Orders', fakeAsync(() => {
      let result: OrderHistoryList | undefined;
      store.pipe(select(UnitOrderSelectors.getOrders)).subscribe((value) => {
        result = value;
      });

      expect(result).toEqual(mockEmptyOrderList);
      store.dispatch(new UnitOrderActions.LoadUnitOrdersSuccess(mockOrderList));
      expect(result).toEqual(mockOrderList);
    }));
  });

  describe('getOrdersLoaded', () => {
    it('should return success flag of orders state', () => {
      let result: boolean | undefined;
      store
        .pipe(select(UnitOrderSelectors.getOrdersLoaded))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);
      store.dispatch(new UnitOrderActions.LoadUnitOrdersSuccess(mockOrderList));
      expect(result).toEqual(true);
    });
  });
});
