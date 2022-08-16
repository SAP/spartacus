import { OccConfig } from '@spartacus/core';

export const defaultOccUnitOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        unitLevelOrderHistory: '/orgUsers/${userId}/orgUnits/orders',
        orderDetail: 'users/${userId}/orders/${orderId}?fields=FULL',
        consignmentTracking:
          'users/${userId}/orders/${orderCode}/consignments/${consignmentCode}/tracking',
      },
    },
  },
};
