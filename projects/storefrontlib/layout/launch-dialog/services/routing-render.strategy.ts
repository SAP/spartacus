/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import { Injectable, RendererFactory2, inject } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { LaunchRoute, LAUNCH_CALLER } from '../config/index';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class RoutingRenderStrategy extends LaunchRenderStrategy {
  protected document: any;
  protected rendererFactory: RendererFactory2;
  protected routingService = inject(RoutingService);

  constructor() {
    const document = inject(DOCUMENT);
    const rendererFactory = inject(RendererFactory2);

    super(document, rendererFactory);
  
    this.document = document;
    this.rendererFactory = rendererFactory;
  }
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
