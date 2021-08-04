import { OrderHistoryList, StateUtils } from '@spartacus/core';
import { ORDERS } from '../order-state';
import { OrderActions } from './index';

describe('OrdersActions', () => {
  describe('LoadUserOrders Actions', () => {
    it('should create the action', () => {
      const payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        sort?: string;
        replenishmentOrderCode?: string;
      } = {
        userId: 'test@sap.com',
        pageSize: 5,
        currentPage: 1,
        sort: 'byDate',
        replenishmentOrderCode: 'test-repl-code',
      };

      const action = new OrderActions.LoadUserOrders(payload);

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_USER_ORDERS,
        payload,
        meta: StateUtils.loadMeta(ORDERS),
      });
    });
  });

  describe('LoadUserOrdersFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new OrderActions.LoadUserOrdersFail(error);

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_USER_ORDERS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(ORDERS, error),
      });
    });
  });

  describe('LoadUserOrdersSuccess Action', () => {
    it('should create the action', () => {
      const payload: OrderHistoryList = {
        orders: [{ code: '01' }, { code: '02' }],
        pagination: {
          totalPages: 13,
        },
        sorts: [{ selected: true }, { selected: false }],
      };

      const action = new OrderActions.LoadUserOrdersSuccess(payload);

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_USER_ORDERS_SUCCESS,
        payload,
        meta: StateUtils.successMeta(ORDERS),
      });
    });
  });

  describe('ClearUserOrders Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.ClearUserOrders();

      expect({ ...action }).toEqual({
        type: OrderActions.CLEAR_USER_ORDERS,
        meta: StateUtils.resetMeta(ORDERS),
      });
    });
  });
});
