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
  protected previousSemanticRoute?: string;

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
        const semanticRoute = routerState.state.semanticRoute;
        const wasConfiguratorRoute = this.isConfiguratorRelatedRoute(
          this.previousSemanticRoute
        );
        const isConfiguratorRoute =
          this.isConfiguratorRelatedRoute(semanticRoute);

        if (wasConfiguratorRoute && !isConfiguratorRoute) {
          this.configuratorCartService.removeCartBoundConfigurations();
          this.configuratorQuantityService.setQuantity(1);
        }

        this.previousSemanticRoute = semanticRoute;
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
