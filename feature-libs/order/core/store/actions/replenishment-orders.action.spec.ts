import { ReplenishmentOrderList, StateUtils } from '@spartacus/core';
import { REPLENISHMENT_ORDERS } from '../order-state';
import { OrderActions } from './index';

describe('Replenishment Orders Actions', () => {
  describe('LoadUserReplenishmentOrders Actions', () => {
    it('should create the action', () => {
      const mockUserReplenishmentOrderPayload: {
        userId: string;
        pageSize: number;
        currentPage: number;
        sort: string;
      } = {
        userId: 'test@sap.com',
        pageSize: 5,
        currentPage: 1,
        sort: 'byDate',
      };
      const action = new OrderActions.LoadUserReplenishmentOrders(
        mockUserReplenishmentOrderPayload
      );

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_USER_REPLENISHMENT_ORDERS,
        payload: mockUserReplenishmentOrderPayload,
        meta: StateUtils.loadMeta(REPLENISHMENT_ORDERS),
      });
    });
  });

  describe('LoadUserReplenishmentOrdersFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new OrderActions.LoadUserReplenishmentOrdersFail(error);

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_USER_REPLENISHMENT_ORDERS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(REPLENISHMENT_ORDERS, error),
      });
    });
  });

  describe('LoadUserReplenishmentOrdersSuccess Action', () => {
    const mockUserReplenishmentOrders: ReplenishmentOrderList = {
      replenishmentOrders: [{ code: '01' }, { code: '02' }],
      pagination: {
        totalPages: 13,
      },
      sorts: [{ selected: true }, { selected: false }],
    };
    it('should create the action', () => {
      const action = new OrderActions.LoadUserReplenishmentOrdersSuccess(
        mockUserReplenishmentOrders
      );

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS,
        payload: mockUserReplenishmentOrders,
        meta: StateUtils.successMeta(REPLENISHMENT_ORDERS),
      });
    });
  });

  describe('ClearUserReplenishmentOrders Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.ClearUserReplenishmentOrders();

      expect({ ...action }).toEqual({
        type: OrderActions.CLEAR_USER_REPLENISHMENT_ORDERS,
        meta: StateUtils.resetMeta(REPLENISHMENT_ORDERS),
      });
    });
  });
});
