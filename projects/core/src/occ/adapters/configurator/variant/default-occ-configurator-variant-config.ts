import { OccConfig } from '../../../config/occ-config';

export function defaultOccVariantConfiguratorConfigFactory(): OccConfig {
  return {
    backend: {
      occ: {
        endpoints: {
          createConfiguration:
            'products/${productCode}/configurator/cpqconfigurator',

          readConfiguration: 'configuration/${configId}/cpqconfigurator',

          updateConfiguration:
            'products/${productCode}/configurator/cpqconfigurator',

          addConfigurationToCart:
            'users/${userId}/carts/${cartId}/entries/configurator/cpqconfigurator',

          readConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/configurator/cpqconfigurator',

          updateConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/configurator/cpqconfigurator',

          readPriceSummary: '/pricing/${configId}/cpqconfigurator',
          getConfigurationOverview:
            'configurationOverview/${configId}/cpqconfigurator',
        },
      },
    },
  };
}
