import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { provideConfigFactory } from '@spartacus/core';
import {
  configFromOccBasesSitesFactory,
  OccBaseSitesConfig,
} from './occ-base-sites-config.providers';

@NgModule()
export class OccBaseSitesConfigModule {
  /**
   * Passes the OCC base sites config as the config chunk
   */
  static forRoot(): ModuleWithProviders<OccBaseSitesConfigModule> {
    return {
      ngModule: OccBaseSitesConfigModule,
      providers: [
        provideConfigFactory(configFromOccBasesSitesFactory, [
          [new Optional(), OccBaseSitesConfig],
        ]),
      ],
    };
  }
}
