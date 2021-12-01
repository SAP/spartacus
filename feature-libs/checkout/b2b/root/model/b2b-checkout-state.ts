import { PaymentType } from '@spartacus/cart/main/root';
import { CostCenter } from '@spartacus/core';

declare module '@spartacus/checkout/base/root' {
  interface CheckoutState {
    costCenter?: CostCenter;
    purchaseOrderNumber?: string;
    paymentType?: PaymentType;
  }
}
