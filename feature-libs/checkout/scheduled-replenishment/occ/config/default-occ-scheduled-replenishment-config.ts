import { OccConfig } from '@spartacus/core';

export const defaultOccScheduledReplenishmentConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        scheduleReplenishmentOrder:
          'orgUsers/${userId}/replenishmentOrders?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType',
      },
    },
  },
};
