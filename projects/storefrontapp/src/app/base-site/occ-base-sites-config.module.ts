// import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
// import { provideConfigFactory } from '../../../core/src/config/config.module';
// import {
//   ConfigFromOccBaseSites,
//   configFromOccBasesSitesFactory,
// } from './occ-base-sites-config.providers';

import { ModuleWithProviders, NgModule } from '@angular/core';
import { providers } from './occ-base-sites-config.providers';

@NgModule()
export class OccBaseSitesConfigModule {
  /**
   * Transforms the response of the OCC endpoint `/basesites` to the Site Context Config.
   */
  static forRoot(): ModuleWithProviders<OccBaseSitesConfigModule> {
    return {
      ngModule: OccBaseSitesConfigModule,
      providers,
    };
  }
}
