import { ModuleWithProviders, NgModule } from '@angular/core';
import { providers } from './external-config.providers';

/**
 * Re-provides the external config chunk given before Angular bootstrap
 */
@NgModule()
export class ExternalConfigModule {
  static forRoot(): ModuleWithProviders<ExternalConfigModule> {
    return {
      ngModule: ExternalConfigModule,
      providers,
    };
  }
}
