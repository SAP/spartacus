import { DeliveryMode } from '@spartacus/cart/main/root';
import { Address, PaymentDetails } from '@spartacus/core';

export interface CheckoutState {
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  paymentInfo?: PaymentDetails;
}
