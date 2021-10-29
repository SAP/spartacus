import { Address, DeliveryMode, PaymentDetails } from '@spartacus/core';

export interface CheckoutState {
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  paymentInfo?: PaymentDetails;
}
