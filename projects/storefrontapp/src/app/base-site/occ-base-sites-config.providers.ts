// import { InjectionToken } from '@angular/core';
// import { SiteContextConfig } from '../../../core/src/site-context';

import { InjectionToken } from '@angular/core';
import { SiteContextConfig } from '@spartacus/core';

/**
 * An injection token with the config obtained from the response of the OCC endpoint `/basesites` before bootstrapping an Angular app.
 */
export const OccBaseSitesConfig = new InjectionToken(
  'OccBaseSitesConfig'
);

export function configFromOccBasesSitesFactory(config?: SiteContextConfig) {
  return config || {};
}
