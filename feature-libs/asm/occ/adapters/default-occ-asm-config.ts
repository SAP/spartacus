import { OccConfig } from '@spartacus/core';

export const defaultOccAsmConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        asmCustomerSearch: '/assistedservicewebservices/customers/search',
        asmBindCart: '/assistedservicewebservices/bind-cart',
        asmCustomer360:
          '/assistedservicewebservices/${baseSiteId}/users/${userId}/customer360',
      },
    },
  },
};
