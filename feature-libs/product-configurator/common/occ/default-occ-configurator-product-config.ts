import { OccConfig } from '@spartacus/core';
import { ConfiguratorProductScope } from '../core/model/configurator-product-scope';

export const defaultOccConfiguratorProductConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          configurator:
            'products/${productCode}?fields=code,configurable,configuratorType,description',
        },
      },
    },
    loadingScopes: {
      product: {
        list: {
          include: [ConfiguratorProductScope.CONFIGURATOR],
        },
      },
    },
  },
};
