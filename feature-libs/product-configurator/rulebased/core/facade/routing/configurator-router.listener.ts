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
  /**
   * Tracks whether the previous router state was a configurator route.
   * Used to reset {@link ConfiguratorQuantityService} only when leaving
   * the configurator, not while navigating to it (e.g. PDP → configure).
   */
  protected wasOnConfiguratorRoute = false;

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
        const onConfiguratorRoute = this.isConfiguratorRelatedRoute(
          routerState.state.semanticRoute
        );

        if (!onConfiguratorRoute) {
          this.configuratorCartService.removeCartBoundConfigurations();
          if (this.wasOnConfiguratorRoute) {
            this.configuratorQuantityService.setQuantity(1);
          }
        }

        this.wasOnConfiguratorRoute = onConfiguratorRoute;
      })
    );
  }

  protected isConfiguratorRelatedRoute(semanticRoute?: string): boolean {
    return semanticRoute ? semanticRoute.includes('configure') : false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
