import { DpPaymentRequest } from './../../models/dp-checkout.model';
import { DigitalPaymentActions } from '../actions/index';
import * as fromDpCheckoutPaymentRequest from './dp-checkout-payment-request.reducer';

const emptyState = {};

describe('DP Checkout Payment Request Reducer', () => {
  describe('undefined action', () => {
    it('should return the intial state', () => {
      const { initialState } = fromDpCheckoutPaymentRequest;
      const action = {} as DigitalPaymentActions.CheckoutPaymentRequestAction;
      const state = fromDpCheckoutPaymentRequest.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('CHECKOUT_PAYMENT_REQUEST_SUCCESS action', () => {
    it('should populate the checkout payment request entities', () => {
      const mockPaymentRequest = {
        postUrl: 'https://dummy.url',
        parameters: {
          entry: [
            { key: 'session_id', value: 'ASDFGHJKLQWERTYUIOP' },
            { key: 'signature', value: '234567890+9876' },
          ],
        },
      };

      const expected: DpPaymentRequest = {
        url: 'https://dummy.url',
        sessionId: 'ASDFGHJKLQWERTYUIOP',
        signature: '234567890+9876',
      };

      const { initialState } = fromDpCheckoutPaymentRequest;
      const action = new DigitalPaymentActions.CheckoutPaymentRequestSuccess(
        mockPaymentRequest
      );
      const state = fromDpCheckoutPaymentRequest.reducer(initialState, action);

      expect(state).toEqual(expected);
    });
  });

  describe('CHECKOUT_PAYMENT_REQUEST_FAIL action', () => {
    it('should return the empty state', () => {
      const { initialState } = fromDpCheckoutPaymentRequest;
      const action = new DigitalPaymentActions.CheckoutPaymentRequestFail(
        'error'
      );
      const state = fromDpCheckoutPaymentRequest.reducer(initialState, action);
      expect(state).toEqual(emptyState);
    });
  });

  describe('RESET_CHECKOUT_PAYMENT_REQUEST action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromDpCheckoutPaymentRequest;
      const action = new DigitalPaymentActions.ResetCheckoutPaymentRequest();
      const state = fromDpCheckoutPaymentRequest.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
