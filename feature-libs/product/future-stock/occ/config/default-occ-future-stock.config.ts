import { OccConfig } from '@spartacus/core';

export const defaultOccFutureStockConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getFutureStocks: 'users/${userId}/futureStocks',
        getFutureStock: 'users/${userId}/futureStock/${productCode}',
      },
    },
  },
};
