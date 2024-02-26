import { InjectionToken, inject } from '@angular/core';
import { FeatureFlags } from '@spartacus/core';

export const USE_MY_ACCOUNT_V2_ORDER = new InjectionToken<boolean>(
  'feature flag to enable enhanced UI for Order related pages under My-Account',
  {
    providedIn: 'root',
    factory: () => Boolean(inject(FeatureFlags).myAccountV2),
  }
);
