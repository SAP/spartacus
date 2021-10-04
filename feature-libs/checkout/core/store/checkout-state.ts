import {
  Address, DeliveryMode,
  Order,
  ORDER_TYPE,
  PaymentDetails,
  PaymentType,
  ReplenishmentOrder,
  StateUtils
} from '@spartacus/core';

export const CHECKOUT_FEATURE = 'checkout';
export const CHECKOUT_DETAILS = '[Checkout] Checkout Details';

// TODO:#13888 Remove this process after full switch to command to setDeliveryAddress
/**
 * @deprecated since 4.3.0. setDeliveryAddress method now returns observable with request status (fail/success).
 */
export const SET_DELIVERY_ADDRESS_PROCESS_ID = 'setDeliveryAddress';
export const SET_DELIVERY_MODE_PROCESS_ID = 'setDeliveryMode';
export const SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID =
  'setSupportedDeliveryMode';
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
  address: Address;
  deliveryMode: {
    supported: { [code: string]: DeliveryMode };
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
