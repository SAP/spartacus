import { OccConfig } from '@spartacus/core';

export const defaultOccBulkPricingConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          bulkPrices:
            'orgProducts/${productCode}?fields=price(DEFAULT),volumePrices(FULL)',
        },
      },
    },
  },
};
