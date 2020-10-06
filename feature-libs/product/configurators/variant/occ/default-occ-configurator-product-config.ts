import { OccConfig, ProductScope } from '@spartacus/core';

export const defaultOccConfiguratorProductConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          configurator:
            'products/${productCode}?fields=configurable,configuratorType',
        },
        productSearch:
          'products/search?fields=products(code,name,summary,configurable,configuratorType, price(FULL),images(DEFAULT),stock(FULL),averageRating,variantOptions),facets,breadcrumbs,pagination(DEFAULT),sorts(DEFAULT),freeTextSearch,currentQuery',
      },
    },
    loadingScopes: {
      product: {
        details: {
          include: [ProductScope.LIST, ProductScope.VARIANTS, 'configurator'],
        },
        list: {
          include: ['configurator'],
        },
      },
    },
  },
};
