import { OccConfig } from '@spartacus/core';

export const defaultOccProductVariantsConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          variants:
            'orgProducts/${productCode}?fields=name,categories,purchasable,baseOptions(DEFAULT),baseProduct,variantOptions(DEFAULT),variantType',
        },
      },
    },
  },
};
