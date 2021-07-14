import { OccConfig } from '@spartacus/core';

export const defaultOccUserAnonymousConsentsConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        anonymousConsentTemplates: 'users/anonymous/consenttemplates',
      },
    },
  },
};
