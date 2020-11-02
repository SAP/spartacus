import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { ConfigInitializerService } from './config-initializer.service';
import {
  CONFIG_INITIALIZER,
  CONFIG_INITIALIZER_FORROOT_GUARD,
  ConfigInitializer,
} from './config-initializer';
import { LOCATION_INITIALIZED } from '@angular/common';

export function configInitializerFactory(
  configInitializer: ConfigInitializerService,
  initializers: ConfigInitializer[]
) {
  const isReady = () => configInitializer.initialize(initializers);
  return isReady;
}

export function locationInitializedFactory(
  configInitializer: ConfigInitializerService
) {
  return configInitializer.getStableConfig();
}

@NgModule({})
export class ConfigInitializerModule {
  static forRoot(): ModuleWithProviders<ConfigInitializerModule> {
    return {
      ngModule: ConfigInitializerModule,
      providers: [
        {
          provide: CONFIG_INITIALIZER_FORROOT_GUARD,
          useValue: true,
        },
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: configInitializerFactory,
          deps: [
            ConfigInitializerService,
            [new Optional(), CONFIG_INITIALIZER],
          ],
        },
        {
          provide: LOCATION_INITIALIZED,
          useFactory: locationInitializedFactory,
          deps: [ConfigInitializerService],
        },
      ],
    };
  }
}
