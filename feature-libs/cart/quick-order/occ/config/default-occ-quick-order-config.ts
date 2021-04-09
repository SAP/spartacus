import { OccConfig } from '@spartacus/core';

export const defaultOccQuickOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        addToCart: 'orgUsers/${userId}/carts/${cartId}/entries',
        product: 'orgProducts/${productCode}',
      },
    },
  },
};
