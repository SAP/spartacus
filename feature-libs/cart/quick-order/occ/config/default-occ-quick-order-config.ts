import { OccConfig } from '@spartacus/core';

export const defaultOccQuickOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        addToCart: 'orgUsers/${userId}/carts/${cartId}/entries/',
        createCart: 'users/${userId}/carts?fields=DEFAULT',
        product: 'orgProducts/${productCode}',
      },
    },
  },
};
