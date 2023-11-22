import { InjectionToken } from '@angular/core';

export const USE_MY_ACCOUNT_V2_CONSENT = new InjectionToken<boolean>(
  'feature flag to enable enhanced UI for Consent Management pages under My-Account',
  { providedIn: 'root', factory: () => false }
);
