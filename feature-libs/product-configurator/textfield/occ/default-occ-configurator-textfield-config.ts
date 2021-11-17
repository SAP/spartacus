import { OccConfig } from '@spartacus/core';

export function defaultOccConfiguratorTextfieldConfigFactory(): OccConfig {
  return {
    backend: {
      occ: {
        endpoints: {
          createTextfieldConfiguration:
            'products/${productCode}/configurator/textfield',

          addTextfieldConfigurationToCart:
            'users/${userId}/carts/${cartId}/entries/configurator/textfield',

          readTextfieldConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/configurator/textfield',
          readTextfieldConfigurationForOrderEntry:
            'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/configurator/textfield',
          updateTextfieldConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/configurator/textfield',
        },
      },
    },
  };
}
