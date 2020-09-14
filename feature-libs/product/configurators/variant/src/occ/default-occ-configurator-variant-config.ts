import { OccConfig } from '@spartacus/core';

export function defaultOccVariantConfiguratorConfigFactory(): OccConfig {
  return {
    backend: {
      occ: {
        endpoints: {
          createConfiguration:
            'products/${productCode}/configurators/ccpconfigurator',

          readConfiguration: 'ccpconfigurator/${configId}',

          updateConfiguration: 'ccpconfigurator/${configId}',

          addConfigurationToCart:
            'users/${userId}/carts/${cartId}/entries/ccpconfigurator',

          readConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',

          updateConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',

          readConfigurationOverviewForOrderEntry:
            'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/ccpconfigurator/configurationOverview',

          readPriceSummary: 'ccpconfigurator/${configId}/pricing',

          getConfigurationOverview:
            'ccpconfigurator/${configId}/configurationOverview',
        },
      },
    },
  };
}
