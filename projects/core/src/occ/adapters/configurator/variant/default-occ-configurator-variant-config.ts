import { OccConfig } from '../../../config/occ-config';

export function defaultOccVariantConfiguratorConfigFactory(): OccConfig {
  return {
    backend: {
      occ: {
        endpoints: {
          createConfiguration: 'products/${productCode}/cpqconfigurator',

          readConfiguration: 'cpqconfigurator/${configId}',

          updateConfiguration: 'cpqconfigurator/${configId}',

          addConfigurationToCart:
            'users/${userId}/carts/${cartId}/entries/cpqconfigurator',

          readConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',

          updateConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',

          readPriceSummary: 'cpqconfigurator/${configId}/pricing',
          getConfigurationOverview:
            'cpqconfigurator/${configId}/configurationOverview',
        },
      },
    },
  };
}
