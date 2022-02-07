import { DeliveryMode } from '@spartacus/cart/base/root';
import { Address, PaymentDetails } from '@spartacus/core';

export type CheckoutDetails = {
  deliveryAddress: Address;
  deliveryMode: DeliveryMode;
  paymentInfo: PaymentDetails;
};
