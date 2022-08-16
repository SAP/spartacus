import { OccConfig } from '@spartacus/core';

export const defaultOccFutureStockConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          getFutureStock: '/users/${userId}/futureStocks/${productCode}',
          getFutureStocks: '/users/${userId}/futureStocks',
        },
      },
    },
  },
};
