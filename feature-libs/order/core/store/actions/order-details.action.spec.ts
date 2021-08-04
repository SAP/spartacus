import { Order, PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import { CANCEL_ORDER_PROCESS_ID, ORDER_DETAILS } from '../order-state';
import { OrderActions } from './index';

const mockOrderDetails: Order = { code: '123' };

const mockOrderDetailsParams = {
  userId: 'user15355363988711@ydev.hybris.com',
  orderCode: '00000386',
};

describe('Order Details Actions', () => {
  describe('LoadOrderDetails Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.LoadOrderDetails(mockOrderDetailsParams);

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_ORDER_DETAILS,
        payload: mockOrderDetailsParams,
        meta: StateUtils.loadMeta(ORDER_DETAILS),
      });
    });
  });

  describe('LoadOrderDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new OrderActions.LoadOrderDetailsFail(error);

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_ORDER_DETAILS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(ORDER_DETAILS, error),
      });
    });
  });

  describe('LoadOrderDetailsSuccess Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.LoadOrderDetailsSuccess(mockOrderDetails);

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_ORDER_DETAILS_SUCCESS,
        payload: mockOrderDetails,
        meta: StateUtils.successMeta(ORDER_DETAILS),
      });
    });
  });

  describe('ClearOrderDetails Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.ClearOrderDetails();

      expect({ ...action }).toEqual({
        type: OrderActions.CLEAR_ORDER_DETAILS,
        meta: StateUtils.resetMeta(ORDER_DETAILS),
      });
    });
  });

  describe('CancelOrder Action', () => {
    it('should create the action', () => {
      const payload = {
        userId: 'test',
        orderCode: 'test',
        cancelRequestInput: {},
      };
      const action = new OrderActions.CancelOrder(payload);

      expect({ ...action }).toEqual({
        type: OrderActions.CANCEL_ORDER,
        payload: payload,
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          CANCEL_ORDER_PROCESS_ID
        ),
      });
    });
  });

  describe('CancelOrderFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new OrderActions.CancelOrderFail(error);

      expect({ ...action }).toEqual({
        type: OrderActions.CANCEL_ORDER_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          CANCEL_ORDER_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('CancelOrderSuccess Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.CancelOrderSuccess();

      expect({ ...action }).toEqual({
        type: OrderActions.CANCEL_ORDER_SUCCESS,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          CANCEL_ORDER_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });

  describe('ResetCancelOrderProcess Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.ResetCancelOrderProcess();

      expect({ ...action }).toEqual({
        type: OrderActions.RESET_CANCEL_ORDER_PROCESS,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          CANCEL_ORDER_PROCESS_ID
        ),
      });
    });
  });
});
