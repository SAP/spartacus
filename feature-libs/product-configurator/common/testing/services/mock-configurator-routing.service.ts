/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingService, RouterState } from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { vi } from 'vitest';

/** Mock: RoutingService offers a configurable router state observable and stubbed navigation. */
export class MockConfiguratorRoutingService implements Partial<RoutingService> {
  routerState$: Observable<RouterState> = EMPTY as Observable<RouterState>;

  go = vi.fn().mockResolvedValue(true);
  back = vi.fn();
  getRouterState = vi
    .fn()
    .mockImplementation((): Observable<RouterState> => this.routerState$);
}
