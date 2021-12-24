import { DeliveryMode, PaymentDetails } from '@spartacus/cart/main/root';
import { Address } from '@spartacus/core';

export interface CheckoutState {
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  paymentInfo?: PaymentDetails;
}
