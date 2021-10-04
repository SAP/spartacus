import {
  Order,
  ORDER_TYPE,
  PaymentDetails,
  PaymentType,
  ReplenishmentOrder,
  StateUtils,
} from '@spartacus/core';

export const CHECKOUT_FEATURE = 'checkout';
export const CHECKOUT_DETAILS = '[Checkout] Checkout Details';

export const SET_PAYMENT_DETAILS_PROCESS_ID = 'setPaymentDetails';
export const GET_PAYMENT_TYPES_PROCESS_ID = 'getPaymentTypes';
export const SET_COST_CENTER_PROCESS_ID = 'setCostCenter';
export const PLACED_ORDER_PROCESS_ID = 'placeOrder';

export interface StateWithCheckout {
  [CHECKOUT_FEATURE]: CheckoutState;
}

export interface CheckoutStepsState {
  poNumber: {
    po?: string;
    costCenter?: string;
  };
  deliveryMode: {
    selected: string;
  };
  paymentDetails: PaymentDetails;
  orderDetails: Order | ReplenishmentOrder;
}

export interface PaymentTypesState {
  entities: { [code: string]: PaymentType };
  selected?: string;
}

export interface OrderTypesState {
  selected: ORDER_TYPE;
}

export interface CheckoutState {
  steps: StateUtils.LoaderState<CheckoutStepsState>;
  paymentTypes: PaymentTypesState;
  orderType: OrderTypesState;
}
