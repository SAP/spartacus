import '@spartacus/checkout/base/root';
import { CostCenter, PaymentType } from '@spartacus/core';

declare module '@spartacus/checkout/base/root' {
  interface CheckoutState {
    costCenter?: CostCenter;
    purchaseOrderNumber?: string;
    paymentType?: PaymentType;
  }
}
