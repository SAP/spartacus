import { OccConfig } from '../../../../../../../../projects/core/src/occ/config/occ-config';

export const defaultOccAsmConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        asmCustomerSearch: '/assistedservicewebservices/customers/search',
      },
    },
  },
};
