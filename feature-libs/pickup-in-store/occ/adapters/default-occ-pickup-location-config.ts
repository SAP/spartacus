import { OccConfig } from '@spartacus/core';

/**
 * The endpoints to call from the OCC adapter for pickup locations.
 */
export const defaultOccPickupLocationConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        storeDetails: 'stores/${storeName}',
      },
    },
  },
};
