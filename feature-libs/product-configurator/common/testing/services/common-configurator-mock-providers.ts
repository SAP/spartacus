/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Provider } from '@angular/core';
import { RoutingService, type RouterState } from '@spartacus/core';
import { isObservable, Observable, of } from 'rxjs';
import { MockConfiguratorRoutingService } from './mock-configurator-routing.service';

type ConfiguratorMockRouterStateValue = Observable<RouterState> | RouterState;

type ConfiguratorMockRouterStateSource =
  | ConfiguratorMockRouterStateValue
  | (null | undefined);

/**
 * Provides a RoutingService mock that reads the router state from a closure on each call.
 *
 * @param options.fallbackSource - Used when the primary source is nullish.
 */
export function provideConfiguratorMockRoutingService(
  routerStateSource: () => ConfiguratorMockRouterStateSource,
  options?: {
    fallbackSource?: () => ConfiguratorMockRouterStateValue;
  }
): Provider {
  return {
    provide: RoutingService,
    useFactory: () => {
      const mock = new MockConfiguratorRoutingService();
      mock.getRouterState.mockImplementation(() => {
        let result = routerStateSource();
        if (
          (result === null || result === undefined) &&
          options?.fallbackSource
        ) {
          result = options.fallbackSource();
        }
        return isObservable(result) ? result : of(result as RouterState);
      });
      return mock;
    },
  };
}
