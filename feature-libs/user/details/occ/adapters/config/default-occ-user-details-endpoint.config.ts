import { OccConfig } from '@spartacus/core';

export const defaultOccUserDetailConfig: OccConfig = {
  backend: {
    occ: { endpoints: { user: 'users/${userId}' } },
  },
};
