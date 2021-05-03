import { StateUtils, PaymentDetails } from '@spartacus/core';
import { DpPaymentRequest } from '../models';

export const DIGITAL_PAYMENTS_FEATURE = 'digitalPayments';

export const DP_CHECKOUT_PAYMENT_REQUEST =
  '[Digital Payments] Checkout Payment Request';
export const DP_CHECKOUT_PAYMENT_DETAILS =
  '[Digital Payments] Checkout Payment Details';

export interface StateWithDigitalPayments {
  [DIGITAL_PAYMENTS_FEATURE]: DigitalPaymentsState;
}

export interface DigitalPaymentsState {
  paymentRequest: StateUtils.LoaderState<DpPaymentRequest>;
  paymentDetails: StateUtils.LoaderState<PaymentDetails>;
}
