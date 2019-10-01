import { InjectionToken } from '@angular/core';
import { OccBaseSitesConfigNormalizer } from '../adapters/site-context/converters/occ-base-sites-config.normalizer';
import { Occ } from '../occ-models';

/**
 * An injection token to be provided with the response from the OCC endpoint `/basesites`, before bootstrapping an Angular app.
 */
export const OccBaseSites = new InjectionToken('OccBaseSites');

export function configFromBasesSitesFactory(
  normalizer: OccBaseSitesConfigNormalizer,
  baseSites: Occ.BaseSites
) {
  const config = normalizer.convert(baseSites);
  console.log(config); //spike todo remove
  return config;
}
