import { OccConfig } from '@spartacus/core';

export const defaultOccProductVariantsMultidimensionalConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          variantsMultidimensional:
            'orgProducts/${productCode}?fields=name,categories,multidimensional,variantMatrix,purchasable,baseOptions(DEFAULT),baseProduct,variantOptions(DEFAULT),variantType',
        },
      },
    },
  },
};
