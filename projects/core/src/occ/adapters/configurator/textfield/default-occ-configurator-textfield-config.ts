import { OccConfig } from '../../../config/occ-config';

export function defaultOccConfiguratorTextfieldConfigFactory(): OccConfig {
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
