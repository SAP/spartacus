import { CostCenter, PaymentType } from '@spartacus/core';

declare module '@spartacus/checkout/root' {
  interface CheckoutState {
    costCenter?: CostCenter;
    purchaseOrderNumber?: string;
    paymentType?: PaymentType;
  }
}
