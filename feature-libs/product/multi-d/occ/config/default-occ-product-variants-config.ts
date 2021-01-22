import { OccConfig } from '@spartacus/core';

export const defaultOccProductVariantsMultidimensionalConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          default:
            'orgProducts/${productCode}?fields=DEFAULT,averageRating,images(FULL),classifications,manufacturer,numberOfReviews,categories(FULL),baseOptions,baseProduct,variantOptions,variantType',
          list:
            'orgProducts/${productCode}?fields=code,name,summary,price(formattedValue),images(DEFAULT,galleryIndex)',
          details:
            'orgProducts/${productCode}?fields=averageRating,stock(DEFAULT),description,availableForPickup,code,url,price(DEFAULT),numberOfReviews,manufacturer,categories(FULL),priceRange,multidimensional,configuratorType,configurable,tags,images(FULL)',
          attributes: 'orgProducts/${productCode}?fields=classifications',
          variants:
            'orgProducts/${productCode}?fields=name,categories,multidimensional,variantMatrix,purchasable,baseOptions(DEFAULT),baseProduct,variantOptions(DEFAULT),variantType',
        },
      },
    },
  },
};
