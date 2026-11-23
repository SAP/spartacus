/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import { Injectable, RendererFactory2, inject } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { LAUNCH_CALLER, LaunchRoute } from '../config/index';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class RoutingRenderStrategy extends LaunchRenderStrategy {
  protected override document = inject(DOCUMENT);
  protected override rendererFactory = inject(RendererFactory2);
  protected routingService = inject(RoutingService);

  /**
   * Navigates to the route configured for the caller
   */
  render(config: LaunchRoute, _caller: LAUNCH_CALLER | string) {
    this.routingService.go(config);
  }

  hasMatch(config: LaunchRoute) {
    return Boolean(config.cxRoute);
  }
}
