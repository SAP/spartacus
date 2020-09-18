import { OccConfig } from '@spartacus/core';

export function defaultOccConfiguratorTextfieldConfigFactory(): OccConfig {
  return {
    backend: {
      occ: {
        endpoints: {
          createConfigurationTextfield:
            'products/${productCode}/configurator/textfield',

          addConfigurationTextfieldToCart:
            'users/${userId}/carts/${cartId}/entries/configurator/textfield',

          readConfigurationTextfieldForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/configurator/textfield',

          updateConfigurationTextfieldForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/configurator/textfield',
        },
      },
    },
  };
}
