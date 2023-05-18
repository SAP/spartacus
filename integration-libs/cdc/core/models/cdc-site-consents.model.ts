export interface CdcSiteConsentTemplate {
  siteConsentDetails: {
    [key: string]: { isMandatory: boolean };
  };
}

export interface CdcLocalStorageTemplate {
  id: string;
  required: boolean;
}

import '@spartacus/storefront';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    CDC_RECONSENT = 'CDC_RECONSENT',
  }
}
