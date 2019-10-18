import { OccConfig } from '../../../config/occ-config';

export function defaultOccConfiguratorTextfieldConfigFactory(): OccConfig {
  console.log('Textfield Configuration is loaded!');
  return {
    backend: {
      occ: {
        endpoints: {
          createConfigurationTextfield:
            'products/${productCode}/configurator/textfield',
        },
      },
    },
  };
}
