import { OccConfig } from '@spartacus/core';

export const defaultOccProductVariantsMultidimensionalConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product:
          'products/${productCode}?fields=name,averageRating,stock(DEFAULT),description,summary,availableForPickup,code,url,price(DEFAULT),numberOfReviews,manufacturer,categories(FULL),priceRange,multidimensional,tags,images(FULL),purchasable,baseOptions(DEFAULT),baseProduct,variantOptions(DEFAULT),variantMatrix(DEFAULT)',
      },
    },
  },
};
