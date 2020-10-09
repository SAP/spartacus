import { OccConfig, ProductScope } from '@spartacus/core';

export const defaultOccConfiguratorProductConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          configurator:
            'products/${productCode}?fields=configurable,configuratorType',
        },
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
