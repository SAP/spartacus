// import { InjectionToken } from '@angular/core';
// import { SiteContextConfig } from '../../../core/src/site-context';

import { InjectionToken } from '@angular/core';
import { SiteContextConfig } from '@spartacus/core';

/**
 * An injection token with the config obtained from the response of the OCC endpoint `/basesites` before bootstrapping an Angular app.
 */
export const ConfigFromOccBaseSites = new InjectionToken(
  'ConfigFromOccBaseSites'
);

export function configFromOccBasesSitesFactory(config?: SiteContextConfig) {
  return config || {};
}
