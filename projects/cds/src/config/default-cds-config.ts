import { CdsConfig } from './cds-config';

export const DEFAULT_CDS_CONFIG: CdsConfig = {
  cds: {
    tenant: '',
    baseUrl: 'https://api.stage.context.cloud.sap',
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    profileTag: {
      javascriptUrl:
        'https://tag.static.us.context.cloud.sap/js/beta/profile-tag.js',
      configUrl:
        'https://tag.static.stage.context.cloud.sap/config/dfbb97b0-f4d7-11e9-9c99-2125ab7968c6',
      allowInsecureCookies: true,
    },
  },
};
