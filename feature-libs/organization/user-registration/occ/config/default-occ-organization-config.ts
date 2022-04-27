import { OccConfig } from '@spartacus/core';

export const defaultOccOrgUserRegistrationConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        b2bUserRegistration: '/orgUsers',
      },
    },
  },
};
