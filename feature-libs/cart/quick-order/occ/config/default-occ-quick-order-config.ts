import { OccConfig } from '@spartacus/core';

export const defaultOccQuickOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: 'orgProducts/${productCode}?fields=FULL',
      },
    },
  },
};
