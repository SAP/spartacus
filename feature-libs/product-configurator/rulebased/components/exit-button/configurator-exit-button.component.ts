/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  Product,
  ProductService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-exit-button',
  templateUrl: './configurator-exit-button.component.html',
})
export class ConfiguratorExitButtonComponent {
  container$: Observable<{
    routerData: ConfiguratorRouter.Data;
    configuration: Configurator.Configuration;
    product: Product | undefined;
  }> = this.configRouterExtractorService.extractRouterData().pipe(
    switchMap((routerData) =>
      this.configuratorCommonsService
        .getConfiguration(routerData.owner)
        .pipe(map((configuration) => ({ routerData, configuration })))
        .pipe(
          switchMap((cont) =>
            this.productService.get(cont.configuration.productCode).pipe(
              map((product) => ({
                routerData: cont.routerData,
                configuration: cont.configuration,
                product,
              }))
            )
          )
        )
    )
  );

  constructor(
    protected productService: ProductService,
    protected routingService: RoutingService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected breakpointService: BreakpointService,
    protected windowRef: WindowRef,
    protected location: Location
  ) {}

  protected navigateToCart(): void {
    this.routingService.go('cart');
  }
  /**
   * Navigates to the product detail page of the product that is being configured.
   */
  exitConfiguration() {
    this.container$.pipe(take(1)).subscribe((container) => {
      if (
        container.routerData.owner.type ===
        CommonConfigurator.OwnerType.CART_ENTRY
      ) {
        this.navigateToCart();
      } else {
        this.routingService.go({
          cxRoute: 'product',
          params: container.product,
        });
      }
    });
  }

  /**
   * Verifies whether the current screen size equals or is larger than breakpoint `BREAKPOINT.md`.
   *
   * @returns {Observable<boolean>} - If the given breakpoint equals or is larger than`BREAKPOINT.md` returns `true`, otherwise `false`.
   */
  isDesktop(): Observable<boolean> {
    return this.breakpointService.isUp(BREAKPOINT.md);
  }

  /**
   * Verifies whether the current screen size equals or is smaller than breakpoint `BREAKPOINT.sm`.
   *
   * @returns {Observable<boolean>} - If the given breakpoint equals or is smaller than`BREAKPOINT.sm` returns `true`, otherwise `false`.
   */
  isMobile(): Observable<boolean> {
    return this.breakpointService.isDown(BREAKPOINT.sm);
  }
}
