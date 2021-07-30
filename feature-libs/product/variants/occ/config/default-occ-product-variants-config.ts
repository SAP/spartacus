import { OccConfig } from '@spartacus/core';

export const defaultOccProductVariantsConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          variants:
            'products/${productCode}?fields=name,purchasable,baseOptions(DEFAULT),baseProduct,variantOptions(DEFAULT),variantType',
        },
      },
    },
  },
};
