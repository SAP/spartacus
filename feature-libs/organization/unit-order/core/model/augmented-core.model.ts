import { B2BUnit, B2BUser } from '@spartacus/core';

declare module '@spartacus/order/root' {
  interface OrderHistory {
    orgUnit?: B2BUnit;
    orgCustomer?: B2BUser;
  }

  interface OrderHistoryList {}
}
