import { DOCUMENT } from '@angular/common';
import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  PLATFORM_ID,
} from '@angular/core';
import { transferOccBaseSitesConfigFactory } from './occ-base-sites-config-transfer-state';
import { OccBaseSitesConfig } from './occ-base-sites-config.providers';

@NgModule()
export class ServerOccBaseSitesConfigModule {
  /**
   * Injects the Occ Base Sites config into the DOM for transferring it from SSR to the browser
   */
  static forRoot(): ModuleWithProviders<ServerOccBaseSitesConfigModule> {
    return {
      ngModule: ServerOccBaseSitesConfigModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: transferOccBaseSitesConfigFactory,
          deps: [DOCUMENT, PLATFORM_ID, OccBaseSitesConfig],
        },
      ],
    };
  }
}
