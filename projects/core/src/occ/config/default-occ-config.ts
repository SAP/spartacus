import { OccConfig } from './occ-config';

export const defaultOccConfig: OccConfig = {
  site: {
    language: 'en',
    currency: 'USD',
  },
  backend: {
    occ: {
      prefix: '/rest/v2/',
    },
    media: {},
  },
};
