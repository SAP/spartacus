import { OccConfig } from '../../config/occ-config';

export const defaultOccAsmConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        asmCustomerSearch: '/assistedservicewebservices/customers/search',
      },
    },
  },
};
