import { OccConfig } from '../../config/occ-config';

export const defaultOccCostCentersConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        costCenters: '/costcenters',
      },
    },
  },
};
