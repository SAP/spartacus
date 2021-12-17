import {
  PROCESS_FEATURE,
  ReplenishmentOrder,
  StateUtils,
} from '@spartacus/core';
import {
  CANCEL_REPLENISHMENT_ORDER_PROCESS_ID,
  REPLENISHMENT_ORDER_DETAILS,
} from '../order-state';
import { OrderActions } from './index';

const mockUserId = 'test-user';
const mockReplenishmentOrderCode = 'test-repl-code';
const mockError = 'test-error';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

describe('ReplenishmentOrderActions', () => {
  describe('Load replenishment order details actions', () => {
    describe('LoadReplenishmentOrderDetails action', () => {
      it('should create the action', () => {
        const payload: {
          userId: string;
          replenishmentOrderCode: string;
        } = {
          userId: mockUserId,
          replenishmentOrderCode: mockReplenishmentOrderCode,
        };

        const action = new OrderActions.LoadReplenishmentOrderDetails(payload);

        expect({ ...action }).toEqual({
          type: OrderActions.LOAD_REPLENISHMENT_ORDER_DETAILS,
          payload,
          meta: StateUtils.loadMeta(REPLENISHMENT_ORDER_DETAILS),
        });
      });
    });

    describe('LoadReplenishmentOrderDetailsSuccess action', () => {
      it('should create an action', () => {
        const payload: ReplenishmentOrder = mockReplenishmentOrder;
        const action = new OrderActions.LoadReplenishmentOrderDetailsSuccess(
          payload
        );

        expect({ ...action }).toEqual({
          type: OrderActions.LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS,
          payload,
          meta: StateUtils.successMeta(REPLENISHMENT_ORDER_DETAILS),
        });
      });
    });

    describe('LoadReplenishmentOrderDetailsFail action', () => {
      it('should create an action', () => {
        const payload = mockError;
        const action = new OrderActions.LoadReplenishmentOrderDetailsFail(
          payload
        );

        expect({ ...action }).toEqual({
          type: OrderActions.LOAD_REPLENISHMENT_ORDER_DETAILS_FAIL,
          payload,
          meta: StateUtils.failMeta(REPLENISHMENT_ORDER_DETAILS, payload),
        });
      });
    });

    describe('ClearReplenishmentOrderDetails action', () => {
      it('should create the action', () => {
        const action = new OrderActions.ClearReplenishmentOrderDetails();

        expect({ ...action }).toEqual({
          type: OrderActions.ClEAR_REPLENISHMENT_ORDER_DETAILS,
          meta: StateUtils.resetMeta(REPLENISHMENT_ORDER_DETAILS),
        });
      });
    });
  });

  describe('Cancel replenishment order actions', () => {
    describe('CancelReplenishmentOrder action', () => {
      it('should create the action', () => {
        const payload: {
          userId: string;
          replenishmentOrderCode: string;
        } = {
          userId: mockUserId,
          replenishmentOrderCode: mockReplenishmentOrderCode,
        };
        const action = new OrderActions.CancelReplenishmentOrder(payload);

        expect({ ...action }).toEqual({
          type: OrderActions.CANCEL_REPLENISHMENT_ORDER,
          payload,
          meta: StateUtils.entityLoadMeta(
            PROCESS_FEATURE,
            CANCEL_REPLENISHMENT_ORDER_PROCESS_ID
          ),
        });
      });
    });

    describe('CancelReplenishmentOrderSuccess action', () => {
      it('should create an action', () => {
        const payload: ReplenishmentOrder = mockReplenishmentOrder;
        const action = new OrderActions.CancelReplenishmentOrderSuccess(
          payload
        );

        expect({ ...action }).toEqual({
          type: OrderActions.CANCEL_REPLENISHMENT_ORDER_SUCCESS,
          payload,
          meta: StateUtils.entitySuccessMeta(
            PROCESS_FEATURE,
            CANCEL_REPLENISHMENT_ORDER_PROCESS_ID
          ),
        });
      });
    });

    describe('CancelReplenishmentOrderFail action', () => {
      it('should create an action', () => {
        const payload = mockError;
        const action = new OrderActions.CancelReplenishmentOrderFail(payload);

        expect({ ...action }).toEqual({
          type: OrderActions.CANCEL_REPLENISHMENT_ORDER_FAIL,
          payload,
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            CANCEL_REPLENISHMENT_ORDER_PROCESS_ID,
            payload
          ),
        });
      });
    });

    describe('ClearCancelReplenishmentOrder action', () => {
      it('should create the action', () => {
        const action = new OrderActions.ClearCancelReplenishmentOrder();

        expect({ ...action }).toEqual({
          type: OrderActions.CLEAR_CANCEL_REPLENISHMENT_ORDER,
          meta: StateUtils.entityResetMeta(
            PROCESS_FEATURE,
            CANCEL_REPLENISHMENT_ORDER_PROCESS_ID
          ),
        });
      });
    });
  });
});
