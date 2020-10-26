import { OccConfig, ProductScope } from '@spartacus/core';
import { ConfiguratorProductScope } from '@spartacus/product/configurators/common';

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
          include: [
            ProductScope.LIST,
            ProductScope.VARIANTS,
            ConfiguratorProductScope.CONFIGURATOR,
          ],
        },
        list: {
          include: [ConfiguratorProductScope.CONFIGURATOR],
        },
      },
    },
  },
};
