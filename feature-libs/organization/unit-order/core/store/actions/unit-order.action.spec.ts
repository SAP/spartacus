import { StateUtils } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { UNIT_ORDERS } from '../unit-order-state';
import { UnitOrderActions } from './index';

describe('OrdersActions', () => {
  describe('LoadUserOrders Actions', () => {
    it('should create the action', () => {
      const payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        sort?: string;
      } = {
        userId: 'test@sap.com',
        pageSize: 5,
        currentPage: 1,
        sort: 'byDate',
      };

      const action = new UnitOrderActions.LoadUnitOrders(payload);

      expect({ ...action }).toEqual({
        type: UnitOrderActions.LOAD_UNIT_ORDERS,
        payload,
        meta: StateUtils.loadMeta(UNIT_ORDERS),
      });
    });
  });

  describe('LoadUnitOrdersFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UnitOrderActions.LoadUnitOrdersFail(error);

      expect({ ...action }).toEqual({
        type: UnitOrderActions.LOAD_UNIT_ORDERS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(UNIT_ORDERS, error),
      });
    });
  });

  describe('LoadUnitOrdersSuccess Action', () => {
    it('should create the action', () => {
      const payload: OrderHistoryList = {
        orders: [{ code: '01' }, { code: '02' }],
        pagination: {
          totalPages: 13,
        },
        sorts: [{ selected: true }, { selected: false }],
      };

      const action = new UnitOrderActions.LoadUnitOrdersSuccess(payload);

      expect({ ...action }).toEqual({
        type: UnitOrderActions.LOAD_UNIT_ORDERS_SUCCESS,
        payload,
        meta: StateUtils.successMeta(UNIT_ORDERS),
      });
    });
  });

  describe('ClearUnitOrders Action', () => {
    it('should create the action', () => {
      const action = new UnitOrderActions.ClearUnitOrders();

      expect({ ...action }).toEqual({
        type: UnitOrderActions.CLEAR_UNIT_ORDERS,
        meta: StateUtils.resetMeta(UNIT_ORDERS),
      });
    });
  });
});
