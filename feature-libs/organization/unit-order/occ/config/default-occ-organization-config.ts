import { OccConfig } from '@spartacus/core';

export const defaultOccUnitOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        unitLevelOrderHistory: '/orgUsers/${userId}/orgUnits/orders',
      },
    },
  },
};
