import { OccConfig } from '@spartacus/core';

export function defaultOccCpqConfiguratorConfigFactory(): OccConfig {
  return {
    backend: {
      occ: {
        endpoints: {
          getCpqAccessData: 'users/current/access/cpqconfigurator',
        },
      },
    },
  };
}
