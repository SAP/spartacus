import { DigitalPaymentActions } from './index';
import { StateUtils } from '@spartacus/core';
import { DP_CHECKOUT_PAYMENT_REQUEST } from '../digital-payments-state';

const mockPaymentRequest = {
  postUrl: 'https://dummy.url',
  parameters: {
    entry: [
      { key: 'session_id', value: 'ASDFGHJKLQWERTYUIOP' },
      { key: 'signature', value: '234567890+9876' },
    ],
  },
};

describe('Checkout Payment Request Actions', () => {
  describe('LoadCheckoutPaymentRequest Action', () => {
    it('should create the action', () => {
      const action = new DigitalPaymentActions.LoadCheckoutPaymentRequest();

      expect({ ...action }).toEqual({
        type: DigitalPaymentActions.LOAD_CHECKOUT_PAYMENT_REQUEST,
        meta: StateUtils.loadMeta(DP_CHECKOUT_PAYMENT_REQUEST),
      });
    });
  });

  describe('CheckoutPaymentRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new DigitalPaymentActions.CheckoutPaymentRequestFail(
        error
      );

      expect({ ...action }).toEqual({
        type: DigitalPaymentActions.CHECKOUT_PAYMENT_REQUSET_FAIL,
        payload: error,
        meta: StateUtils.failMeta(DP_CHECKOUT_PAYMENT_REQUEST, error),
      });
    });
  });

  describe('CheckoutPaymentRequestSuccess Action', () => {
    it('should create the action', () => {
      const action = new DigitalPaymentActions.CheckoutPaymentRequestSuccess(
        mockPaymentRequest
      );

      expect({ ...action }).toEqual({
        type: DigitalPaymentActions.CHECKOUT_PAYMENT_REQUEST_SUCCESS,
        payload: mockPaymentRequest,
        meta: StateUtils.successMeta(DP_CHECKOUT_PAYMENT_REQUEST),
      });
    });
  });

  describe('ResetCheckoutPaymentRequest Action', () => {
    it('should create the action', () => {
      const action = new DigitalPaymentActions.ResetCheckoutPaymentRequest();

      expect({ ...action }).toEqual({
        type: DigitalPaymentActions.RESET_CHECKOUT_PAYMENT_REQUEST,
        meta: StateUtils.resetMeta(DP_CHECKOUT_PAYMENT_REQUEST),
      });
    });
  });
});
