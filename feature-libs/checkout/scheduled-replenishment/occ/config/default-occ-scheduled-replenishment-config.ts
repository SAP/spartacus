import { CheckoutScheduledReplenishmentOccEndpoints } from '@spartacus/checkout/scheduled-replenishment/root';
import { OccConfig } from '@spartacus/core';

const defaultScheduledReplenishmentOccEndpoints: CheckoutScheduledReplenishmentOccEndpoints =
  {
    scheduleReplenishmentOrder:
      'orgUsers/${userId}/replenishmentOrders?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType',
  };

export const defaultOccScheduledReplenishmentConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...defaultScheduledReplenishmentOccEndpoints,
      },
    },
  },
};
