/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MULTI_LOCATION_INITIALIZED } from '../../multi-location-initialized/multi-location-initialized-token';
import { Config } from '../config-tokens';
import {
  CONFIG_INITIALIZER,
  CONFIG_INITIALIZER_FORROOT_GUARD,
  ConfigInitializer,
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
): () => Promise<Config> {
  return () =>
    lastValueFrom(configInitializer.getStable()).finally(() =>
      console.log('config initialized')
    );
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
          provide: MULTI_LOCATION_INITIALIZED,
          useFactory: locationInitializedFactory,
          deps: [ConfigInitializerService],
          multi: true,
        },
      ],
    };
  }
}
