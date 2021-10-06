import { Order, ReplenishmentOrder } from '@spartacus/core';
import { CheckoutActions } from './../actions/index';
import * as fromCheckout from './checkout.reducer';

describe('Checkout reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCheckout;
      const action = {} as any;
      const state = fromCheckout.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('SET_PAYMENT_TYPE_SUCCESS action', () => {
    it('should set po number to cart', () => {
      const { initialState } = fromCheckout;

      const action = new CheckoutActions.SetPaymentTypeSuccess({
        code: 'testCart',
        purchaseOrderNumber: 'testNumber',
      });
      const state = fromCheckout.reducer(initialState, action);
      expect(state.poNumber.po).toEqual('testNumber');
    });
  });

  describe('SET_COST_CENTER_SUCCESS action', () => {
    it('should set cost center to cart', () => {
      const { initialState } = fromCheckout;

      const action = new CheckoutActions.SetCostCenterSuccess(
        'testCostCenterId'
      );
      const state = fromCheckout.reducer(initialState, action);
      expect(state.poNumber.costCenter).toEqual('testCostCenterId');
    });
  });

  describe('PLACE_ORDER_SUCCESS action', () => {
    it('should place order', () => {
      const { initialState } = fromCheckout;
      const orderDetails: Order = {
        code: 'testOrder123',
      };

      const action = new CheckoutActions.PlaceOrderSuccess(orderDetails);
      const state = fromCheckout.reducer(initialState, action);
      expect(state.orderDetails).toEqual(orderDetails);
    });
  });

  describe('SCHEDULE_REPLENISHMENT_ORDER_SUCCESS action', () => {
    it('should schedule a replenishment order', () => {
      const { initialState } = fromCheckout;
      const replenishmentOrderDetails: ReplenishmentOrder = {
        active: true,
        purchaseOrderNumber: 'test-po',
        replenishmentOrderCode: 'test-repl-order',
      };

      const action = new CheckoutActions.ScheduleReplenishmentOrderSuccess(
        replenishmentOrderDetails
      );
      const state = fromCheckout.reducer(initialState, action);
      expect(state.orderDetails).toEqual(replenishmentOrderDetails);
    });
  });

  describe('CLEAR_CHECKOUT_DATA action', () => {
    it('should clear checkout data', () => {
      const { initialState } = fromCheckout;

      const action = new CheckoutActions.ClearCheckoutData();
      const state = fromCheckout.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
