import { OccConfig } from '@spartacus/core';

export const defaultOccOrganizationUserRegistrationConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        organizationUserRegistration: '/orgUsers',
      },
    },
  },
};
