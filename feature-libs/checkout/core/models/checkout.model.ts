import { Address, DeliveryMode, PaymentDetails } from '@spartacus/core';

// TODO: Remove along with some occ endpoints and methods in adapters/connectors/facades
export type CheckoutDetails = {
  deliveryAddress: Address;
  deliveryMode: DeliveryMode;
  paymentInfo: PaymentDetails;
};
