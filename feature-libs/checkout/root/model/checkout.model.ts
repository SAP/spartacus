import {
  Address,
  DeliveryMode,
  PaymentDetails,
  PaymentType,
} from '@spartacus/core';

export type CheckoutDetails = {
  deliveryAddress: Address;
  deliveryMode: DeliveryMode;
  paymentInfo: PaymentDetails;
  paymentType?: PaymentType; // TODO: Use augmentation for b2b stuff?
  purchaseOrderNumber?: string;
  costCenter?: any;
};
