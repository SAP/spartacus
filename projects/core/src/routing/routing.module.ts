/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterState,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import {
  ConfigInitializer,
  CONFIG_INITIALIZER,
} from '../config/config-initializer/config-initializer';
import { RoutingConfig } from './configurable-routes';
import { ConfigurableRoutesService } from './configurable-routes/configurable-routes.service';
import { SecurePortalConfigInitializer } from './configurable-routes/secure-portal-config/secure-portal-config-initializer';
import { effects } from './store/effects/index';
import {
  CustomSerializer,
  reducerProvider,
  reducerToken,
} from './store/reducers/router.reducer';
import { ROUTING_FEATURE } from './store/routing-state';

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
      ],
    };
  }
}
