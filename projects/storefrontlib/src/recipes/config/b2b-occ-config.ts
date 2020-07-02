import { OccConfig } from '@spartacus/core';

export const defaultB2bOccConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        user: 'orgUsers/${userId}',
        addEntries: 'orgUsers/${userId}/carts/${cartId}/entries',
      },
    },
  },
};
