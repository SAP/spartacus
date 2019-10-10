import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { provideConfigFactory } from '../config/config.module';
import { SiteContextConfig } from '../site-context/config/site-context-config';

/**
 * An injection token to be provided before bootstrapping an Angular app.
 *
 * SHOULD NOT BE PROVIDED IN ANGULAR APPLICATION (only before bootstrap)!
 * Otherwise the value provided in app will shadow the value provided on Angular bootstrap.
 */
export abstract class ExternalConfig extends SiteContextConfig {}

export function configFromExternalConfigFactory(config?: ExternalConfig) {
  // explicitly filter only `context` property not to allow for injecting other configs
  return config && config.context ? { context: config.context } : {};
}

/**
 * Re-provides the external config chunk given on Angular bootstrap
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
