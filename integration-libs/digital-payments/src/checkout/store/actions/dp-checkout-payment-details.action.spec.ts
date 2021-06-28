import { PaymentDetails } from '@spartacus/core';
import { DigitalPaymentActions } from './index';
import { StateUtils } from '@spartacus/core';
import { DP_CHECKOUT_PAYMENT_DETAILS } from '../digital-payments-state';

const mockParamDetails = {
  sessionId: 'mockSessionId',
  signature: '1234567ASDFGHJ',
};

const mockPaymentDetails: PaymentDetails = {
  accountHolderName: "Jacken H'agaar",
  cardNumber: '************8766',
};

describe('Checkout Payment Details Actions', () => {
  describe('LoadCheckoutPaymentDetails Action', () => {
    it('should create the action', () => {
      const action = new DigitalPaymentActions.LoadCheckoutPaymentDetails(
        mockParamDetails
      );

      expect({ ...action }).toEqual({
        type: DigitalPaymentActions.LOAD_CHECKOUT_PAYMENT_DETAILS,
        payload: mockParamDetails,
        meta: StateUtils.loadMeta(DP_CHECKOUT_PAYMENT_DETAILS),
      });
    });
  });

  describe('CheckoutPaymentDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new DigitalPaymentActions.CheckoutPaymentDetailsFail(
        error
      );

      expect({ ...action }).toEqual({
        type: DigitalPaymentActions.CHECKOUT_PAYMENT_DETAILS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(DP_CHECKOUT_PAYMENT_DETAILS, error),
      });
    });
  });

  describe('CheckoutPaymentDetailsSuccess Action', () => {
    it('should create the action', () => {
      const action = new DigitalPaymentActions.CheckoutPaymentDetailsSuccess(
        mockPaymentDetails
      );

      expect({ ...action }).toEqual({
        type: DigitalPaymentActions.CHECKOUT_PAYMENT_DETAILS_SUCCESS,
        payload: mockPaymentDetails,
        meta: StateUtils.successMeta(DP_CHECKOUT_PAYMENT_DETAILS),
      });
    });
  });

  describe('ResetCheckoutPaymentDetails Action', () => {
    it('should create the action', () => {
      const action = new DigitalPaymentActions.ResetCheckoutPaymentDetails();

      expect({ ...action }).toEqual({
        type: DigitalPaymentActions.RESET_CHECKOUT_PAYMENT_DETAILS,
        meta: StateUtils.resetMeta(DP_CHECKOUT_PAYMENT_DETAILS),
      });
    });
  });
});
