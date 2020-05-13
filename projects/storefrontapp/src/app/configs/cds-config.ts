import { CdsConfig } from '@spartacus/cds';
import { environment } from '../../environments/environment';

export const cdsConfig: CdsConfig = {
  cds: {
    tenant: 'argotest',
    baseUrl: environment.cds.baseUrl,
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    profileTag: {
      javascriptUrl: environment.cds.profileTagConfigUrl,
      configUrl: environment.cds.profileTagConfigUrl,
      allowInsecureCookies: true,
    },
  },
};
