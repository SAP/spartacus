import { OccConfig } from '@spartacus/core';

export const defaultOccUserDetailConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        // tslint:disable:max-line-length
        user: 'users/${userId}',
      },
    },
  },
};
