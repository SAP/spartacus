import { OccConfig } from '@spartacus/core';

export const defaultOccSubscriptionBillingConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          subscription:
            'products/${productCode}?fields=sapPricePlan,sapSubscriptionTerm',
        },
      },
    },
  },
};
