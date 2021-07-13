import { OccConfig } from '@spartacus/core';

export const defaultOccCartValidationConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        validate: 'users/${userId}/carts/${cartId}/validate?fields=DEFAULT',
      },
    },
  },
};
