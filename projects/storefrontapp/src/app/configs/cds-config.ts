import { CdsConfig } from '@spartacus/cds';
import { cdsEnvironment } from '../../environments/cds/cds.environment';

export const cdsConfig: CdsConfig = {
  cds: {
    tenant: 'argotest',
    baseUrl: cdsEnvironment.baseUrl,
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    profileTag: {
      javascriptUrl: cdsEnvironment.profileTagConfigUrl,
      configUrl: cdsEnvironment.profileTagConfigUrl,
      allowInsecureCookies: true,
    },
  },
};
