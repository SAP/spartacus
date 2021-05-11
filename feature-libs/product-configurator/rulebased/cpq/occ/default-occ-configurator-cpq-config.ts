import { OccConfig } from '@spartacus/core';

export function defaultOccCpqConfiguratorConfigFactory(): OccConfig {
  return {
    backend: {
      occ: {
        endpoints: {
          getCpqAccessData: 'users/current/access/cpqconfigurator',
          addCpqConfigurationToCart:
            'users/${userId}/carts/${cartId}/entries/cpqconfigurator',
          readCpqConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',
          readCpqConfigurationForOrderEntry:
            'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/cpqconfigurator',
          updateCpqConfigurationForCartEntry:
            'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',
        },
      },
    },
  };
}
