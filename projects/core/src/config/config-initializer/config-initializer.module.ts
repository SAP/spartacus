import { LOCATION_INITIALIZED } from '@angular/common';
import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { Config } from '../config-tokens';
import {
  ConfigInitializer,
  CONFIG_INITIALIZER,
  CONFIG_INITIALIZER_FORROOT_GUARD,
} from './config-initializer';
import { ConfigInitializerService } from './config-initializer.service';

export function configInitializerFactory(
  configInitializer: ConfigInitializerService,
  initializers: ConfigInitializer[]
): () => Promise<void> {
  const isReady = () => configInitializer.initialize(initializers);
  return isReady;
}

export function locationInitializedFactory(
  configInitializer: ConfigInitializerService
): Promise<Config> {
  return configInitializer.getStable().toPromise();
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
          // Hold on the initial navigation until the Spartacus configuration is stable
          provide: LOCATION_INITIALIZED,
          useFactory: locationInitializedFactory,
          deps: [ConfigInitializerService],
        },
      ],
    };
  }
}
