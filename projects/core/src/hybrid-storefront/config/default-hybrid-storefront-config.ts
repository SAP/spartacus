import { OccConfig } from '../../occ';

export const defaultHybridStorefrontEndpointConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        sessionEndpoint: '/yacceleratorstorefront/session',
      },
    },
  },
};
