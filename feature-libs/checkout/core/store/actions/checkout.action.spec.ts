import { Order, PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import { CheckoutActions } from '../actions/index';
import {
  PLACED_ORDER_PROCESS_ID,
  SET_COST_CENTER_PROCESS_ID,
} from '../checkout-state';

const userId = 'testUserId';
const cartId = 'testCartId';
const termsChecked = true;

const orderDetails: Order = {
  code: 'testOrder123',
};

describe('Checkout Actions', () => {
  describe('Place Order', () => {
    describe('PlaceOrder', () => {
      it('should create the action', () => {
        const payload = {
          userId,
          cartId,
          termsChecked,
        };

        const action = new CheckoutActions.PlaceOrder(payload);
        expect({ ...action }).toEqual({
          type: CheckoutActions.PLACE_ORDER,
          payload,
          meta: StateUtils.entityLoadMeta(
            PROCESS_FEATURE,
            PLACED_ORDER_PROCESS_ID
          ),
        });
      });
    });

    describe('PlaceOrderFail', () => {
      it('should create the action', () => {
        const error = 'anError';
        const action = new CheckoutActions.PlaceOrderFail(error);

        expect({ ...action }).toEqual({
          type: CheckoutActions.PLACE_ORDER_FAIL,
          payload: error,
          meta: StateUtils.entityFailMeta(
            PROCESS_FEATURE,
            PLACED_ORDER_PROCESS_ID,
            error
          ),
        });
      });
    });

    describe('PlaceOrderSuccess', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.PlaceOrderSuccess(orderDetails);
        expect({ ...action }).toEqual({
          type: CheckoutActions.PLACE_ORDER_SUCCESS,
          payload: orderDetails,
          meta: StateUtils.entitySuccessMeta(
            PROCESS_FEATURE,
            PLACED_ORDER_PROCESS_ID
          ),
        });
      });
    });

    describe('ClearPlaceOrder', () => {
      it('should create the action', () => {
        const action = new CheckoutActions.ClearPlaceOrder();
        expect({ ...action }).toEqual({
          type: CheckoutActions.CLEAR_PLACE_ORDER,
          meta: StateUtils.entityResetMeta(
            PROCESS_FEATURE,
            PLACED_ORDER_PROCESS_ID
          ),
        });
      });
    });
  });

  describe('Clear Checkout Data', () => {
    it('should create the action', () => {
      const action = new CheckoutActions.ClearCheckoutData();
      expect({ ...action }).toEqual({
        type: CheckoutActions.CLEAR_CHECKOUT_DATA,
      });
    });
  });

  describe('SetCostCenter', () => {
    it('should create the action', () => {
      const payload = {
        userId,
        cartId,
        costCenterId: 'testId',
      };

      const action = new CheckoutActions.SetCostCenter(payload);
      expect({ ...action }).toEqual({
        type: CheckoutActions.SET_COST_CENTER,
        payload,
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          SET_COST_CENTER_PROCESS_ID
        ),
      });
    });
  });

  describe('SetCostCenterFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new CheckoutActions.SetCostCenterFail(error);

      expect({ ...action }).toEqual({
        type: CheckoutActions.SET_COST_CENTER_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          SET_COST_CENTER_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('SetCostCenterSuccess', () => {
    it('should create the action', () => {
      const action = new CheckoutActions.SetCostCenterSuccess('testId');
      expect({ ...action }).toEqual({
        type: CheckoutActions.SET_COST_CENTER_SUCCESS,
        payload: 'testId',
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          SET_COST_CENTER_PROCESS_ID
        ),
      });
    });
  });

  describe('ResetSetCostCenterProcess', () => {
    it('should create the action', () => {
      const action = new CheckoutActions.ResetSetCostCenterProcess();
      expect({ ...action }).toEqual({
        type: CheckoutActions.RESET_SET_COST_CENTER_PROCESS,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          SET_COST_CENTER_PROCESS_ID
        ),
      });
    });
  });
});
