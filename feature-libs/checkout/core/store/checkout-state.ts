import { StateUtils } from '@spartacus/core';

export const CHECKOUT_FEATURE = 'checkout';
export const CHECKOUT_DETAILS = '[Checkout] Checkout Details';

export interface StateWithCheckout {
  [CHECKOUT_FEATURE]: CheckoutState;
}

export interface CheckoutStepsState {
  poNumber: {
    po?: string;
  };
}

export interface PaymentTypesState {
  selected?: string;
}

export interface CheckoutState {
  steps: StateUtils.LoaderState<CheckoutStepsState>;
  paymentTypes: PaymentTypesState;
}
