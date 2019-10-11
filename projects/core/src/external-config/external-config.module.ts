import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { provideConfigFactory } from '../config/config.module';
import { ExternalConfig } from './external-config';

export function configFromExternalConfigFactory(config?: ExternalConfig) {
  // explicitly filter only `context` property not to allow for injecting other configs
  return config && config.context ? { context: config.context } : {};
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
