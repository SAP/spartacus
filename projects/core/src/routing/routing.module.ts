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
import { LOCATION_INITIALIZED } from '@angular/common';
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

/** Returns true if the router event signals that the current navigation has finished. */
function isNavigationDoneEvent(e: unknown): boolean {
  const terminalEvents = [
    NavigationEnd,
    NavigationCancel,
    NavigationError,
    NavigationSkipped,
  ];
  return terminalEvents.some((EventClass) => e instanceof EventClass);
}

/**
 * Factory for an APP_INITIALIZER that blocks bootstrap until the initial
 * navigation has completed. This replaces the previous approach of using
 * `initialNavigation: 'enabledBlocking'` together with `LOCATION_INITIALIZED`,
 * which is incompatible with Angular hydration (NG05001).
 *
 * 1. Runs all `LOCATION_INITIALIZED_MULTI` initializers (config stability,
 *    OAuth callback handling, coupon code extraction, etc.) and awaits them.
 * 2. Manually triggers the Router's initial navigation via `router.initialNavigation()`.
 * 3. Waits for the navigation to finish (NavigationEnd, NavigationCancel,
 *    NavigationError, or NavigationSkipped).
 *
 * Because `APP_INITIALIZER` blocks bootstrap, the component tree will not render
 * until the navigation is fully resolved — preserving the same behavioral semantics
 * as the previous `enabledBlocking` approach while being compatible with hydration.
 *
 * Used by `RoutingModule.forRootV2()`. Pair with `AppRoutingModuleV2`.
 */
function blockingInitialNavigationFactory(): () => Promise<void> {
  const router = inject(Router);
  const initializers =
    inject(LOCATION_INITIALIZED_MULTI, { optional: true }) ?? [];

  return async () => {
    // 1. Run all LOCATION_INITIALIZED_MULTI initializers
    //    (config stability, auth params, coupon codes, etc.)
    await Promise.all(initializers.map((initializer) => initializer()));

    // 2. Set up the navigation-done promise using a raw subscription that starts
    //    synchronously — before calling router.initialNavigation() — so there is
    //    no async gap in which a synchronous navigation could complete and emit
    //    its NavigationEnd before the subscription is active.
    const navigationDone$ = new Promise<void>((resolve) => {
      const sub = router.events
        .pipe(filter(isNavigationDoneEvent))
        .subscribe(() => {
          sub.unsubscribe();
          resolve();
        });
    });

    // 3. Manually trigger initial navigation
    router.initialNavigation();

    // 4. Wait for the initial navigation to complete
    await navigationDone$;
  };
}

const sharedProviders = [
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
];

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
  /**
   * Default strategy — identical to the `develop` branch.
   *
   * Uses `LOCATION_INITIALIZED` to run `LOCATION_INITIALIZED_MULTI` initializers
   * before Angular's `enabledBlocking` triggers and awaits the initial navigation.
   *
   * Use together with `AppRoutingModule` (`initialNavigation: 'enabledBlocking'`).
   */
  static forRoot(): ModuleWithProviders<RoutingModule> {
    return {
      ngModule: RoutingModule,
      providers: [
        ...sharedProviders,
        {
          provide: LOCATION_INITIALIZED,
          useFactory: locationInitializedFactory,
        },
      ],
    };
  }

  /**
   * New hydration-compatible strategy.
   *
   * Uses an `APP_INITIALIZER` that runs `LOCATION_INITIALIZED_MULTI` initializers,
   * manually triggers `router.initialNavigation()`, and awaits completion.
   * This avoids the NG05001 issue caused by `enabledBlocking`.
   *
   * Use together with `AppRoutingModuleV2` (`initialNavigation: 'disabled'`).
   */
  static forRootV2(): ModuleWithProviders<RoutingModule> {
    return {
      ngModule: RoutingModule,
      providers: [
        ...sharedProviders,
        {
          provide: APP_INITIALIZER,
          useFactory: blockingInitialNavigationFactory,
          multi: true,
        },
      ],
    };
  }
}
