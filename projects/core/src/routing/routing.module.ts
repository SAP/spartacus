/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  inject,
} from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterState,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import {
  CONFIG_INITIALIZER,
  ConfigInitializer,
} from '../config/config-initializer/config-initializer';
import { RoutingConfig } from './configurable-routes';
import { ConfigurableRoutesService } from './configurable-routes/configurable-routes.service';
import { SecurePortalConfigInitializer } from './configurable-routes/secure-portal-config/secure-portal-config-initializer';
import { LOCATION_INITIALIZED_MULTI } from './location-initialized-multi/location-initialized-multi';
import { effects } from './store/effects/index';
import {
  CustomSerializer,
  reducerProvider,
  reducerToken,
} from './store/reducers/router.reducer';
import { ROUTING_FEATURE } from './store/routing-state';
import { LOCATION_INITIALIZED } from '@angular/common';

export function initConfigurableRoutes(
  service: ConfigurableRoutesService
): () => void {
  const result = () => service.init(); // workaround for AOT compilation (see https://stackoverflow.com/a/51977115)
  return result;
}

export function initSecurePortalConfig(
  configInitializer: SecurePortalConfigInitializer,
  routingConfig: RoutingConfig
): ConfigInitializer | null {
  if (routingConfig.routing?.protected === undefined) {
    return configInitializer;
  }
  return null;
}

/** Factory function for Angular's injection token LOCATION_INITIALIZED.
 *
 * Note: LOCATION_INITIALIZED is an Angular's API (https://angular.io/api/common/LOCATION_INITIALIZED).
 *          Only when the Promise in this injection token is resolved, then Angular
 *          will start the initial navigation in the Router.
 *
 * Our factory retrieves the initializers from the `LOCATION_INITIALIZED_MULTI`
 * injection token of Spartacus, invokes each initializer, and returns a Promise
 * that resolves when all initializers have completed.
 *
 * @returns A promise that resolves when all initializers have completed.
 */
function locationInitializedFactory(): Promise<any> {
  const initializers =
    inject(LOCATION_INITIALIZED_MULTI, { optional: true }) ?? [];
  const promiseInitializers = initializers.map((initializer) => initializer());
  return Promise.all(promiseInitializers);
}

@NgModule({
  imports: [
    StoreModule.forFeature(ROUTING_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
      stateKey: ROUTING_FEATURE, // name of reducer key
    }),
  ],
})
export class RoutingModule {
  static forRoot(): ModuleWithProviders<RoutingModule> {
    return {
      ngModule: RoutingModule,
      providers: [
        reducerProvider,
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initConfigurableRoutes,
          deps: [ConfigurableRoutesService],
          multi: true,
        },
        {
          provide: CONFIG_INITIALIZER,
          useFactory: initSecurePortalConfig,
          deps: [SecurePortalConfigInitializer, RoutingConfig],
          multi: true,
        },
        {
          provide: LOCATION_INITIALIZED,
          useFactory: locationInitializedFactory,
        },
      ],
    };
  }
}
