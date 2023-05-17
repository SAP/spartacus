export interface CdcSiteConsentTemplate {
  siteConsentDetails: {
    [key: string]: any;
  };
}

import '@spartacus/storefront';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    CDC_RECONSENT = 'CDC_RECONSENT',
  }
}
