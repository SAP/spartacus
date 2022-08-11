import { CdsConfig } from './cds-config';

export const DEFAULT_CDS_CONFIG: CdsConfig = {
  cds: {
    tenant: '',
    baseUrl: '',
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    merchandising: {
      defaultCarouselViewportThreshold: 80,
    },
    consentTemplateId: 'PROFILE',
    profileTag: {
      allowInsecureCookies: false,
    },
  },
};
