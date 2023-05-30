export interface CdcSiteConsentTemplate {
  siteConsentDetails: {
    [key: string]: { isMandatory: boolean; isActive: boolean };
  };
}

export interface CdcLocalStorageTemplate {
  id: string;
  required: boolean;
}

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import '@spartacus/storefront';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    CDC_RECONSENT = 'CDC_RECONSENT',
  }
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class registerPreferences {
  preferences?: any;
}
declare module '@spartacus/user/profile/root' {
  interface UserSignUp extends registerPreferences {}
}
