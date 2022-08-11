import { OccConfig } from '@spartacus/core';

/**
 * The endpoints to call from the OCC adapter for stock levels.
 */
export const defaultOccStockConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        stock: 'products/${productCode}/stock',
        stockAtStore: 'products/${productCode}/stock/${storeName}',
      },
    },
  },
};
