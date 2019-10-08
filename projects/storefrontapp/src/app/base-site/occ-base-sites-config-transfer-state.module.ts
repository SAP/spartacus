// import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
// import { provideConfigFactory } from '../../../core/src/config/config.module';
// import {
//   ConfigFromOccBaseSites,
//   configFromOccBasesSitesFactory,
// } from './occ-base-sites-config.providers';

import { DOCUMENT } from '@angular/common';
import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID,
} from '@angular/core';
import { transferStateOccBaseSitesConfigFactory } from './occ-base-sites-config-transfer-state';
import { ConfigFromOccBaseSites } from './occ-base-sites-config.providers';

@NgModule()
export class OccBaseSitesConfigTransferStateModule {
  /**
   * Transforms the response of the OCC endpoint `/basesites` to the Site Context Config.
   */
  static forRoot(): ModuleWithProviders<OccBaseSitesConfigTransferStateModule> {
    return {
      ngModule: OccBaseSitesConfigTransferStateModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: transferStateOccBaseSitesConfigFactory,
          deps: [DOCUMENT, PLATFORM_ID, ConfigFromOccBaseSites],
        },
      ],
    };
  }
}
