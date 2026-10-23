/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { ConfiguratorQuantityService } from '../../services/configurator-quantity.service';
import { ConfiguratorCartService } from '../configurator-cart.service';

@Injectable({ providedIn: 'root' })
export class ConfiguratorRouterListener implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected configuratorCartService: ConfiguratorCartService,
    protected routingService: RoutingService,
    protected configuratorQuantityService: ConfiguratorQuantityService
  ) {
    this.observeRouterChanges();
  }

  protected observeRouterChanges(): void {
    this.subscription.add(
      this.routingService.getRouterState().subscribe((routerState) => {
        if (this.isConfiguratorRelatedRoute(routerState.state.semanticRoute)) {
          this.applyQuantityFromQueryParams(routerState.state.queryParams);
        } else {
          this.configuratorCartService.removeCartBoundConfigurations();
          this.configuratorQuantityService.setQuantity(1);
        }
      })
    );
  }

  protected isConfiguratorRelatedRoute(semanticRoute?: string): boolean {
    return semanticRoute ? semanticRoute.includes('configure') : false;
  }

  /**
   * Applies cart quantity from the `quantity` query parameter when entering
   * a configurator route (CXSPA-2662 option C).
   */
  protected applyQuantityFromQueryParams(
    queryParams?: Record<string, unknown>
  ): void {
    const rawQuantity = queryParams?.['quantity'];
    if (rawQuantity === undefined || rawQuantity === null || rawQuantity === '') {
      return;
    }
    const parsedQuantity = Number.parseInt(String(rawQuantity), 10);
    if (Number.isFinite(parsedQuantity) && parsedQuantity > 0) {
      this.configuratorQuantityService.setQuantity(parsedQuantity);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
