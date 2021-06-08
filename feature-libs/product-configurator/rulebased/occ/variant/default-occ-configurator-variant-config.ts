import { OccConfig } from '@spartacus/core';

export function defaultOccVariantConfiguratorConfigFactory(): OccConfig {
  return {
    backend: {
      occ: {
        endpoints: {
          createVariantConfiguration:
            'products/${productCode}/configurators/ccpconfigurator',

          readVariantConfiguration: 'ccpconfigurator/${configId}',

          updateVariantConfiguration: 'ccpconfigurator/${configId}',

          addVariantConfigurationToCart:
            'users/${userId}/carts/${cartId}/entries/ccpconfigurator',

          readVariantConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',

          updateVariantConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',

          readVariantConfigurationOverviewForOrderEntry:
            'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/ccpconfigurator/configurationOverview',

          readVariantConfigurationPriceSummary:
            'ccpconfigurator/${configId}/pricing',

          getVariantConfigurationOverview:
            'ccpconfigurator/${configId}/configurationOverview',
        },
      },
    },
  };
}
