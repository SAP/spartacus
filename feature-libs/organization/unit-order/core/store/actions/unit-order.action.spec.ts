import { StateUtils } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { UNIT_ORDERS, UNIT_ORDER_DETAILS } from '../unit-order-state';
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

const mockOrderDetails: Order = { code: '123' };

const mockOrderDetailsParams = {
  userId: 'user15355363988711@ydev.hybris.com',
  orderCode: '00000386',
};

describe('Order Details Actions', () => {
  describe('LoadOrderDetails Action', () => {
    it('should create the action', () => {
      const action = new UnitOrderActions.LoadOrderDetails(
        mockOrderDetailsParams
      );

      expect({ ...action }).toEqual({
        type: UnitOrderActions.LOAD_ORDER_DETAILS,
        payload: mockOrderDetailsParams,
        meta: StateUtils.loadMeta(UNIT_ORDER_DETAILS),
      });
    });
  });

  describe('LoadOrderDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UnitOrderActions.LoadOrderDetailsFail(error);

      expect({ ...action }).toEqual({
        type: UnitOrderActions.LOAD_ORDER_DETAILS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(UNIT_ORDER_DETAILS, error),
      });
    });
  });

  describe('LoadOrderDetailsSuccess Action', () => {
    it('should create the action', () => {
      const action = new UnitOrderActions.LoadOrderDetailsSuccess(
        mockOrderDetails
      );

      expect({ ...action }).toEqual({
        type: UnitOrderActions.LOAD_ORDER_DETAILS_SUCCESS,
        payload: mockOrderDetails,
        meta: StateUtils.successMeta(UNIT_ORDER_DETAILS),
      });
    });
  });

  describe('ClearOrderDetails Action', () => {
    it('should create the action', () => {
      const action = new UnitOrderActions.ClearOrderDetails();

      expect({ ...action }).toEqual({
        type: UnitOrderActions.CLEAR_ORDER_DETAILS,
        meta: StateUtils.resetMeta(UNIT_ORDER_DETAILS),
      });
    });
  });
});
