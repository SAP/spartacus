import { OccConfig } from '@spartacus/core';

export const defaultOccQuickOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        createCart: 'users/${userId}/carts?fields=DEFAULT',
        product: 'orgProducts/${productCode}',
      },
    },
  },
};
