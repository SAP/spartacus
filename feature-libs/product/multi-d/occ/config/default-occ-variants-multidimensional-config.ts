import { OccConfig } from '@spartacus/core';

export const defaultOccProductVariantsMultidimensionalConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          variants:
            'orgProducts/${productCode}?fields=name,categories,multidimensional,variantMatrix,purchasable,baseOptions(DEFAULT),baseProduct,variantOptions(DEFAULT),variantType',
        },
      },
    },
  },
};
