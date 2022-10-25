import { OccConfig } from '@spartacus/core';

export const defaultOccUnitOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        unitLevelOrderHistory: '/orgUsers/${userId}/orgUnits/orders',
        unitLevelOrderDetail:
          'orgUsers/${userId}/orgUnits/orders/${orderId}?fields=FULL',
      },
    },
  },
};
