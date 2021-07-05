import { Address, DeliveryMode, PaymentDetails } from '@spartacus/core';

export type CheckoutDetails = {
  deliveryAddress: Address;
  deliveryMode: DeliveryMode;
  paymentInfo: PaymentDetails;
};
