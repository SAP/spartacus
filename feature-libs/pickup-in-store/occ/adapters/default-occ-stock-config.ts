import { OccConfig } from '@spartacus/core';

export const defaultOccStockConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        stock: 'products/${productCode}/stock',
      },
    },
  },
};
