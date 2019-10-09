import { InjectionToken } from '@angular/core';
import { SiteContextConfig } from '../../site-context/config/site-context-config';

/**
 * An injection token with the config obtained from the response of the OCC endpoint `/basesites` before bootstrapping an Angular app.
 */
export const OccBaseSitesConfig = new InjectionToken('OccBaseSitesConfig');

export function configFromOccBasesSitesFactory(config?: SiteContextConfig) {
  return config || {};
}
