// import { InjectionToken } from '@angular/core';
// import { SiteContextConfig } from '../../../core/src/site-context';

import { DOCUMENT } from '@angular/common';
import {
  APP_INITIALIZER,
  InjectionToken,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import { provideConfigFactory, SiteContextConfig } from '@spartacus/core';
import { transferStateOccBaseSitesConfigFactory } from './occ-base-sites-config-transfer-state';

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

export const providers = [
  provideConfigFactory(configFromOccBasesSitesFactory, [
    [new Optional(), ConfigFromOccBaseSites],
  ]),
  // SPIKE TODO: should be executed only in SSR:
  {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: transferStateOccBaseSitesConfigFactory,
    deps: [DOCUMENT, PLATFORM_ID, ConfigFromOccBaseSites],
  },
];
