import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { provideConfigFactory } from '../config/config.module';
import { ExternalConfig } from './external-config';
import { ExternalConfigConverter } from './external-config-converter';

export function configFromExternalConfigFactory(config?: ExternalConfig) {
  return (config && ExternalConfigConverter.toSiteContextConfig(config)) || {};
}

/**
 * Re-provides the external config chunk given before Angular bootstrap
 */
@NgModule()
export class ExternalConfigModule {
  static forRoot(): ModuleWithProviders<ExternalConfigModule> {
    return {
      ngModule: ExternalConfigModule,
      providers: [
        provideConfigFactory(configFromExternalConfigFactory, [
          [new Optional(), ExternalConfig],
        ]),
      ],
    };
  }
}
