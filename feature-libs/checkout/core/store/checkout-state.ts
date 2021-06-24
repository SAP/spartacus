import {
  Address,
  DeliveryMode,
  Order,
  ORDER_TYPE,
  ReplenishmentOrder,
  StateUtils,
} from '@spartacus/core';

export const CHECKOUT_FEATURE = 'checkout';
export const CHECKOUT_DETAILS = '[Checkout] Checkout Details';

export const SET_DELIVERY_ADDRESS_PROCESS_ID = 'setDeliveryAddress';
export const SET_DELIVERY_MODE_PROCESS_ID = 'setDeliveryMode';
export const SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID =
  'setSupportedDeliveryMode';
export const PLACED_ORDER_PROCESS_ID = 'placeOrder';

export interface StateWithCheckout {
  [CHECKOUT_FEATURE]: CheckoutState;
}

export interface CheckoutStepsState {
  address: Address;
  deliveryMode: {
    supported: { [code: string]: DeliveryMode };
    selected: string;
  };
  orderDetails: Order | ReplenishmentOrder;
}

export interface OrderTypesState {
  selected: ORDER_TYPE;
}

export interface CheckoutState {
  steps: StateUtils.LoaderState<CheckoutStepsState>;
  orderType: OrderTypesState;
}
