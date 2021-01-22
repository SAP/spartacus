import { OccConfig } from '@spartacus/core';

export const defaultOccUserAccountConfig: OccConfig = {
  backend: {
    occ: { endpoints: { user: 'users/${userId}' } },
  },
};
