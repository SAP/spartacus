import { Address, AddressValidation } from '../../model/address.model';
import { CardType, PaymentDetails, PaymentType } from '../../model/cart.model';
import { DeliveryMode, Order } from '../../model/order.model';
import {
  ORDER_TYPE,
  ReplenishmentOrder,
} from '../../model/replenishment-order.model';
import { LoaderState } from '../../state/utils/loader/loader-state';

export const CHECKOUT_FEATURE = 'checkout';
export const CHECKOUT_DETAILS = '[Checkout] Checkout Details';

export const SET_DELIVERY_ADDRESS_PROCESS_ID = 'setDeliveryAddress';
export const SET_DELIVERY_MODE_PROCESS_ID = 'setDeliveryMode';
export const SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID =
  'setSupportedDeliveryMode';
export const SET_PAYMENT_DETAILS_PROCESS_ID = 'setPaymentDetails';
export const GET_PAYMENT_TYPES_PROCESS_ID = 'getPaymentTypes';
export const SET_COST_CENTER_PROCESS_ID = 'setCostCenter';
export const SCHEDULE_REPLENISHMENT_ORDER_PROCESS_ID =
  'scheduleReplenishmentOrder';

export interface StateWithCheckout {
  [CHECKOUT_FEATURE]: CheckoutState;
}

export interface AddressVerificationState {
  results: AddressValidation | string;
}

export interface CardTypesState {
  entities: { [code: string]: CardType };
}

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

export interface PaymentTypesState {
  entities: { [code: string]: PaymentType };
  selected: string;
}

export interface OrderTypesState {
  selected: ORDER_TYPE;
}

export interface CheckoutState {
  steps: LoaderState<CheckoutStepsState>;
  cardTypes: CardTypesState;
  addressVerification: AddressVerificationState;
  paymentTypes: PaymentTypesState;
  orderType: OrderTypesState;
}
