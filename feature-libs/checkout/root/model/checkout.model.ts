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
  paymentType?: PaymentType;
  purchaseOrderNumber?: string;
};
