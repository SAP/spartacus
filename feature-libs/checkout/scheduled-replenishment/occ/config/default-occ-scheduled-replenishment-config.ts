import { OccConfig } from '@spartacus/core';
import { CheckoutScheduledReplenishmentOccEndpoints } from '../model/occ-checkout-scheduled-replenishment-endpoints.model';

const defaultScheduledReplenishmentOccEndpoints: CheckoutScheduledReplenishmentOccEndpoints =
  {
    abc: 'orgUsers/${userId}/replenishmentOrders?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType',
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
