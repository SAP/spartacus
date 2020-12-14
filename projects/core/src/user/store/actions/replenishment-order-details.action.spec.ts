import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import {
  CANCEL_REPLENISHMENT_ORDER_PROCESS_ID,
  USER_REPLENISHMENT_ORDER_DETAILS,
} from '../user-state';
import { UserActions } from './index';

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

        const action = new UserActions.LoadReplenishmentOrderDetails(payload);

        expect({ ...action }).toEqual({
          type: UserActions.LOAD_REPLENISHMENT_ORDER_DETAILS,
          payload,
          meta: StateUtils.loadMeta(USER_REPLENISHMENT_ORDER_DETAILS),
        });
      });
    });

    describe('LoadReplenishmentOrderDetailsSuccess action', () => {
      it('should create an action', () => {
        const payload: ReplenishmentOrder = mockReplenishmentOrder;
        const action = new UserActions.LoadReplenishmentOrderDetailsSuccess(
          payload
        );

        expect({ ...action }).toEqual({
          type: UserActions.LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS,
          payload,
          meta: StateUtils.successMeta(USER_REPLENISHMENT_ORDER_DETAILS),
        });
      });
    });

    describe('LoadReplenishmentOrderDetailsFail action', () => {
      it('should create an action', () => {
        const payload = mockError;
        const action = new UserActions.LoadReplenishmentOrderDetailsFail(
          payload
        );

        expect({ ...action }).toEqual({
          type: UserActions.LOAD_REPLENISHMENT_ORDER_DETAILS_FAIL,
          payload,
          meta: StateUtils.failMeta(USER_REPLENISHMENT_ORDER_DETAILS, payload),
        });
      });
    });

    describe('ClearReplenishmentOrderDetails action', () => {
      it('should create the action', () => {
        const action = new UserActions.ClearReplenishmentOrderDetails();

        expect({ ...action }).toEqual({
          type: UserActions.ClEAR_REPLENISHMENT_ORDER_DETAILS,
          meta: StateUtils.resetMeta(USER_REPLENISHMENT_ORDER_DETAILS),
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
        const action = new UserActions.CancelReplenishmentOrder(payload);

        expect({ ...action }).toEqual({
          type: UserActions.CANCEL_REPLENISHMENT_ORDER,
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
        const action = new UserActions.CancelReplenishmentOrderSuccess(payload);

        expect({ ...action }).toEqual({
          type: UserActions.CANCEL_REPLENISHMENT_ORDER_SUCCESS,
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
        const action = new UserActions.CancelReplenishmentOrderFail(payload);

        expect({ ...action }).toEqual({
          type: UserActions.CANCEL_REPLENISHMENT_ORDER_FAIL,
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
        const action = new UserActions.ClearCancelReplenishmentOrder();

        expect({ ...action }).toEqual({
          type: UserActions.CLEAR_CANCEL_REPLENISHMENT_ORDER,
          meta: StateUtils.entityResetMeta(
            PROCESS_FEATURE,
            CANCEL_REPLENISHMENT_ORDER_PROCESS_ID
          ),
        });
      });
    });
  });
});
