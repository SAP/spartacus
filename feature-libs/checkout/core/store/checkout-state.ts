import {
  Address,
  CardType,
  DeliveryMode,
  Order,
  ORDER_TYPE,
  PaymentDetails,
  PaymentType,
  ReplenishmentOrder,
  StateUtils,
} from '@spartacus/core';

export const CHECKOUT_FEATURE = 'checkout';
export const CHECKOUT_DETAILS = '[Checkout] Checkout Details';

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

// TODO: Remove this interface in 5.0 after full switch to query for card types
/**
 * @deprecated since 4.3.0. Card types are now handled with Query in CheckoutPaymentService.
 */
export interface CardTypesState {
  entities: { [code: string]: CardType };
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
  // TODO: Remove this part of the state in 5.0 after full switch to query for card types
  cardTypes: CardTypesState;
  paymentTypes: PaymentTypesState;
  orderType: OrderTypesState;
}
