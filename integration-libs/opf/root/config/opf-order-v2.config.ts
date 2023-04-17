import { OccConfig } from '@spartacus/core';

export const occOrderV2Config: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        placeOrder: 'users/${userId}/orders/v2?fields=FULL',
      },
    },
  },
};
