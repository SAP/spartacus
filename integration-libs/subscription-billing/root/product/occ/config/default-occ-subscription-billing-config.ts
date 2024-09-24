import { OccConfig } from '@spartacus/core';

export const defaultOccSubscriptionBillingConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          subscriptionPrice:
            'products/${productCode}?fields=sapPricePlan,sapSubscriptionTerm',
        },
      },
    },
  },
};
