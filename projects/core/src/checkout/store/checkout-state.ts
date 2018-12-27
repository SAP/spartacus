import {
  CardType,
  Address,
  DeliveryMode,
  Order
} from '../../occ/occ-models/index';

export const CHECKOUT_FEATURE = 'checkout';

export interface StateWithCheckout {
  [CHECKOUT_FEATURE]: CheckoutState;
}

export interface AddressVerificationState {
  results: any;
}

export interface CardTypesState {
  entities: { [code: string]: CardType };
}

export interface CheckoutStepsState {
  address: Address;
  deliveryMode: {
    supported: { [code: string]: DeliveryMode };
    selected: string;
  };
  paymentDetails: any;
  orderDetails: Order;
}

export interface CheckoutState {
  steps: CheckoutStepsState;
  cardTypes: CardTypesState;
  addressVerification: AddressVerificationState;
}
