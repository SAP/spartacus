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
  inject,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LOCATION_INITIALIZED_MULTI } from '../../routing/location-initialized-multi/location-initialized-multi';
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

/**
 * @deprecated since 2211.22  - should not be a public API
 */
export function locationInitializedFactory(
  configInitializer: ConfigInitializerService
): Promise<Config> {
  return lastValueFrom(configInitializer.getStable());
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
          provide: LOCATION_INITIALIZED_MULTI,
          useFactory: () => {
            const configInitializer = inject(ConfigInitializerService);
            return () => lastValueFrom(configInitializer.getStable());
          },
          multi: true,
        },
      ],
    };
  }
}
