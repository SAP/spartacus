import { CdsConfig } from './cds-config';

export const DEFAULT_CDS_CONFIG: CdsConfig = {
  cds: {
    tenant: '',
    baseUrl: 'https://api.us.context.cloud.sap',
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    profileTag: {
      javascriptUrl:
        'https://tag.static.us.context.cloud.sap/js/profile-tag.js',
      allowInsecureCookies: false,
    },
  },
};
