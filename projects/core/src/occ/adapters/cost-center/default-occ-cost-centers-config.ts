import { OccConfig } from '../../config/occ-config';

export const defaultOccCostCentersConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getActiveCostCenters:
          '/costcenters?fields=DEFAULT,unit(BASIC,addresses(DEFAULT))',
      },
    },
  },
};
