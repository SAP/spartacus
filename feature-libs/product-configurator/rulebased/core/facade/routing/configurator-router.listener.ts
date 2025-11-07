/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, inject } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { ConfiguratorQuantityService } from '../../services/configurator-quantity.service';
import { ConfiguratorCartService } from '../configurator-cart.service';

@Injectable({ providedIn: 'root' })
export class ConfiguratorRouterListener implements OnDestroy {
  protected configuratorCartService = inject(ConfiguratorCartService);
  protected routingService = inject(RoutingService);
  protected configuratorQuantityService = inject(ConfiguratorQuantityService);

  protected subscription = new Subscription();

  constructor() {
    this.observeRouterChanges();
  }

  protected observeRouterChanges(): void {
    this.subscription.add(
      this.routingService.getRouterState().subscribe((routerState) => {
        if (!this.isConfiguratorRelatedRoute(routerState.state.semanticRoute)) {
          this.configuratorCartService.removeCartBoundConfigurations();
          this.configuratorQuantityService.setQuantity(1);
        }
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
