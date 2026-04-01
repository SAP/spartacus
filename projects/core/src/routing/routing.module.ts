/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  inject,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  Router,
} from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterState,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
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

/**
 * Factory for an APP_INITIALIZER that blocks bootstrap until the initial
 * navigation has completed. This replaces the previous approach of using
 * `initialNavigation: 'enabledBlocking'` together with `LOCATION_INITIALIZED`,
 * which is incompatible with Angular hydration (NG05001).
 *
 * The initializer:
 * 1. Runs all `LOCATION_INITIALIZED_MULTI` initializers (e.g. config stability,
 *    OAuth callback handling, coupon code extraction) and waits for them to complete.
 * 2. Manually triggers the Router's initial navigation via `router.initialNavigation()`.
 * 3. Waits for the initial navigation to finish (NavigationEnd, NavigationCancel,
 *    NavigationError, or NavigationSkipped).
 *
 * Because `APP_INITIALIZER` blocks bootstrap, the component tree will not render
 * until the navigation is fully resolved — preserving the same behavioral semantics
 * as the previous `enabledBlocking` approach while being compatible with hydration.
 */
function blockingInitialNavigationInitializer(): () => Promise<void> {
  const router = inject(Router);
  const initializers =
    inject(LOCATION_INITIALIZED_MULTI, { optional: true }) ?? [];

  return async () => {
    // 1. Run all LOCATION_INITIALIZED_MULTI initializers
    //    (config stability, auth params, coupon codes, etc.)
    const promiseInitializers = initializers.map((initializer) => initializer());
    await Promise.all(promiseInitializers);

    // 2. Manually trigger initial navigation
    router.initialNavigation();

    // 3. Wait for the initial navigation to complete
    await firstValueFrom(
      router.events.pipe(
        filter(
          (e) =>
            e instanceof NavigationEnd ||
            e instanceof NavigationCancel ||
            e instanceof NavigationError ||
            e instanceof NavigationSkipped
        )
      )
    );
  };
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
          provide: APP_INITIALIZER,
          useFactory: blockingInitialNavigationInitializer,
          multi: true,
        },
      ],
    };
  }
}
