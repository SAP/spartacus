import { CdsConfig } from './cds-config';

export const DEFAULT_CDS_CONFIG: CdsConfig = {
  cds: {
    tenant: '',
    baseUrl: 'https://api.us.context.cloud.sap',
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    consentTemplateId: 'PROFILE',
    profileTag: {
      allowInsecureCookies: false,
    },
  },
};
