import { Address, AddressValidation } from '../../model/address.model';
import { CardType, PaymentDetails, PaymentType } from '../../model/cart.model';
import { DeliveryMode, Order } from '../../model/order.model';
import {
  ORDER_TYPE,
  ReplenishmentOrder,
} from '../../model/replenishment-order.model';
import { LoaderState } from '../../state/utils/loader/loader-state';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CHECKOUT_FEATURE = 'checkout';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CHECKOUT_DETAILS = '[Checkout] Checkout Details';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_DELIVERY_ADDRESS_PROCESS_ID = 'setDeliveryAddress';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_DELIVERY_MODE_PROCESS_ID = 'setDeliveryMode';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID =
  'setSupportedDeliveryMode';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_PAYMENT_DETAILS_PROCESS_ID = 'setPaymentDetails';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const GET_PAYMENT_TYPES_PROCESS_ID = 'getPaymentTypes';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_COST_CENTER_PROCESS_ID = 'setCostCenter';
/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const PLACED_ORDER_PROCESS_ID = 'placeOrder';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export interface StateWithCheckout {
  [CHECKOUT_FEATURE]: CheckoutState;
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export interface AddressVerificationState {
  results: AddressValidation | string;
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export interface CardTypesState {
  entities: { [code: string]: CardType };
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export interface CheckoutStepsState {
  poNumber: {
    po: string;
    costCenter: string;
  };
  address: Address;
  deliveryMode: {
    supported: { [code: string]: DeliveryMode };
    selected: string;
  };
  paymentDetails: PaymentDetails;
  orderDetails: Order | ReplenishmentOrder;
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export interface PaymentTypesState {
  entities: { [code: string]: PaymentType };
  selected: string;
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export interface OrderTypesState {
  selected: ORDER_TYPE;
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export interface PaymentTypesState {
  entities: { [code: string]: PaymentType };
  selected: string;
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export interface CheckoutState {
  steps: LoaderState<CheckoutStepsState>;
  cardTypes: CardTypesState;
  addressVerification: AddressVerificationState;
  paymentTypes: PaymentTypesState;
  orderType: OrderTypesState;
}
