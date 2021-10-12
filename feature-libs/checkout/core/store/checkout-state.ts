import { PaymentType, StateUtils } from '@spartacus/core';

export const CHECKOUT_FEATURE = 'checkout';
export const CHECKOUT_DETAILS = '[Checkout] Checkout Details';

export const GET_PAYMENT_TYPES_PROCESS_ID = 'getPaymentTypes';

export interface StateWithCheckout {
  [CHECKOUT_FEATURE]: CheckoutState;
}

export interface CheckoutStepsState {
  poNumber: {
    po?: string;
    costCenter?: string;
  };
}

export interface PaymentTypesState {
  entities: { [code: string]: PaymentType };
  selected?: string;
}

export interface CheckoutState {
  steps: StateUtils.LoaderState<CheckoutStepsState>;
  paymentTypes: PaymentTypesState;
}
