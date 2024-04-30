import { PaginationModel, SortModel } from '@spartacus/core';
import { OrderHistory, OrderHistoryList } from '@spartacus/order/root';
import { UnitOrderActions } from '../actions';
import {
  initialState,
  historyReducer as unitOrdersReducer,
} from './unit-order.reducer';

describe('Unit Order Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as UnitOrderActions.UnitOrdersAction;
      const state = unitOrdersReducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_UNIT_ORDERS_SUCCESS action', () => {
    const orders: OrderHistory[] = [{ code: '01' }, { code: '02' }];
    const pagination: PaginationModel = {
      currentPage: 1,
      totalPages: 5,
      pageSize: 5,
    };
    const sorts: SortModel[] = [{ code: 'byDate' }];
    const mockUserOrders: OrderHistoryList = {
      orders,
      pagination,
      sorts,
    };

    it('should populate unit orders state entities', () => {
      const action = new UnitOrderActions.LoadUnitOrdersSuccess(mockUserOrders);
      const state = unitOrdersReducer(initialState, action);
      expect(state).toEqual(mockUserOrders);
    });

    it('should return the default state on undefined payload', () => {
      const action = new UnitOrderActions.LoadUnitOrdersSuccess();
      const state = unitOrdersReducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('LOAD_UNIT_ORDERS_FAIL action', () => {
    it('should return the initial state', () => {
      const action = new UnitOrderActions.LoadUnitOrdersFail(
        new Error('error')
      );
      const state = unitOrdersReducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
