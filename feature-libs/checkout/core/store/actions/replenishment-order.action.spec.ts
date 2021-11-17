import { ReplenishmentOrder, ScheduleReplenishmentForm } from '@spartacus/core';
import { PROCESS_FEATURE } from '@spartacus/core';
import { StateUtils } from '@spartacus/core';
import { PLACED_ORDER_PROCESS_ID } from '../checkout-state';
import { CheckoutActions } from './index';

const mockCartId = 'test-cart';
const mockTermsChecked = true;
const mockUserId = 'test-user';
const mockError = 'test-error';

const mockReplenishmentOrderFormData: ScheduleReplenishmentForm = {
  numberOfDays: 'test-number-days',
};

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

describe('Replenishment Order Actions', () => {
  describe('Schedule replenishment order actions', () => {
    describe('ScheduleReplenishmentOrder action', () => {
      it('should create the action', () => {
        const payload: {
          cartId: string;
          scheduleReplenishmentForm: ScheduleReplenishmentForm;
          termsChecked: boolean;
          userId: string;
        } = {
          cartId: mockCartId,
          scheduleReplenishmentForm: mockReplenishmentOrderFormData,
          termsChecked: mockTermsChecked,
          userId: mockUserId,
        };
        const action = new CheckoutActions.ScheduleReplenishmentOrder(payload);

        expect({ ...action }).toEqual({
          type: CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER,
          payload,
          meta: StateUtils.entityLoadMeta(
            PROCESS_FEATURE,
            PLACED_ORDER_PROCESS_ID
          ),
        });
      });
    });

    describe('ScheduleReplenishmentOrderSuccess action', () => {
      it('should create an action', () => {
        const payload: ReplenishmentOrder = mockReplenishmentOrder;
        const action = new CheckoutActions.ScheduleReplenishmentOrderSuccess(
          payload
        );

        expect({ ...action }).toEqual({
          type: CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER_SUCCESS,
          payload: payload,
          meta: StateUtils.entitySuccessMeta(
            PROCESS_FEATURE,
            PLACED_ORDER_PROCESS_ID
          ),
        });
      });
    });

    describe('ScheduleReplenishmentOrderFail action', () => {
      it('should create an action', () => {
        const payload = mockError;
        const action = new CheckoutActions.ScheduleReplenishmentOrderFail(
          payload
        );

        expect({ ...action }).toEqual({
          type: CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER_FAIL,
          payload,
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            PLACED_ORDER_PROCESS_ID,
            payload
          ),
        });
      });
    });
  });
});
