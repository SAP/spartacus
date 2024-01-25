/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy, Optional } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { ConfiguratorCartService } from '../configurator-cart.service';
import { ConfiguratorQuantityService } from '../../services/configurator-quantity.service';

@Injectable({ providedIn: 'root' })
export class ConfiguratorRouterListener implements OnDestroy {
  protected subscription = new Subscription();

  // TODO (CXSPA-3392): make configuratorQuantityService a required dependency
  constructor(
    configuratorCartService: ConfiguratorCartService,
    routingService: RoutingService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configuratorQuantityService: ConfiguratorQuantityService
  );

  /**
   * @deprecated since 6.1
   */
  constructor(
    configuratorCartService: ConfiguratorCartService,
    routingService: RoutingService
  );
  constructor(
    protected configuratorCartService: ConfiguratorCartService,
    protected routingService: RoutingService,
    @Optional()
    protected configuratorQuantityService?: ConfiguratorQuantityService
  ) {
    this.observeRouterChanges();
  }

  protected observeRouterChanges(): void {
    this.subscription.add(
      this.routingService.getRouterState().subscribe((routerState) => {
        if (!this.isConfiguratorRelatedRoute(routerState.state.semanticRoute)) {
          this.configuratorCartService.removeCartBoundConfigurations();
          if (this.configuratorQuantityService) {
            this.configuratorQuantityService.setQuantity(1);
          }
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
