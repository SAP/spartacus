import { OccConfig } from '../../../config/occ-config';

export function defaultOccVariantConfiguratorConfigFactory(): OccConfig {
  console.log('Variant Configuration is loaded!');
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

          readPriceSummary: '/pricing/${configId}/cpqconfigurator',
        },
      },
    },
  };
}
