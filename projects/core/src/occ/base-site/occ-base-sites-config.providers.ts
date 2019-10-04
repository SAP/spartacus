import { InjectionToken } from '@angular/core';
import { SiteContextConfig } from '../../site-context';

/**
 * An injection token with the config obtained from the response of the OCC endpoint `/basesites` before bootstrapping an Angular app.
 */
export const ConfigFromOccBaseSites = new InjectionToken(
  'ConfigFromOccBaseSites'
);

export function configFromOccBasesSitesFactory(config?: SiteContextConfig) {
  console.log(config); //spike todo remove
  return config || {};
}
