import { ModuleWithProviders, NgModule } from '@angular/core';
import { providers } from './occ-config-loader.providers';

/**
 * Re-provides the external config chunk given before Angular bootstrap
 */
@NgModule()
export class OccConfigLoaderModule {
  static forRoot(): ModuleWithProviders<OccConfigLoaderModule> {
    return {
      ngModule: OccConfigLoaderModule,
      providers,
    };
  }
}
