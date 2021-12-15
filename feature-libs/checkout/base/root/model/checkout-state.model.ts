import { DeliveryMode } from '@spartacus/cart/main/root';
import { Address } from '@spartacus/core';
import { PaymentDetails } from './checkout-payment.model';

export interface CheckoutState {
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  paymentInfo?: PaymentDetails;
}
