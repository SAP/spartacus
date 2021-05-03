import { PaymentDetails } from '@spartacus/core';
import { DigitalPaymentActions } from '../actions/index';
import * as fromDpCheckoutPaymentDetails from './dp-checkout-payment-details.reducer';

const emptyState = {};

describe('DP Checkout Payment Details Reducer', () => {
  describe('undefined action', () => {
    it('should return the intial state', () => {
      const { initialState } = fromDpCheckoutPaymentDetails;
      const action = {} as DigitalPaymentActions.CheckoutPaymentDetailsAction;
      const state = fromDpCheckoutPaymentDetails.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('CHECKOUT_PAYMENT_DETAILS_SUCCESS action', () => {
    it('should populate the check out payment details entities', () => {
      const mockPaymentDetails: PaymentDetails = {
        accountHolderName: 'Mock Name',
        cardNumber: '************5678',
      };

      const { initialState } = fromDpCheckoutPaymentDetails;
      const action = new DigitalPaymentActions.CheckoutPaymentDetailsSuccess(
        mockPaymentDetails
      );
      const state = fromDpCheckoutPaymentDetails.reducer(initialState, action);

      expect(state).toEqual(mockPaymentDetails);
    });
  });

  describe('CHECKOUT_PAYMENT_DETAILS_FAIL action', () => {
    it('should return the empty state', () => {
      const { initialState } = fromDpCheckoutPaymentDetails;
      const action = new DigitalPaymentActions.CheckoutPaymentDetailsFail(
        'error'
      );
      const state = fromDpCheckoutPaymentDetails.reducer(initialState, action);
      expect(state).toEqual(emptyState);
    });
  });

  describe('RESET_CHECKOUT_PAYMENT_DETAILS action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromDpCheckoutPaymentDetails;
      const action = new DigitalPaymentActions.ResetCheckoutPaymentDetails();
      const state = fromDpCheckoutPaymentDetails.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
