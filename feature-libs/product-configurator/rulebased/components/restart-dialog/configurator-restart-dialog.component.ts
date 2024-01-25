/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { Product, ProductService, RoutingService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-configurator-restart-dialog',
  templateUrl: './configurator-restart-dialog.component.html',
})
export class ConfiguratorRestartDialogComponent {
  constructor(
    protected launchDialogService: LaunchDialogService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected routingService: RoutingService,
    protected productService: ProductService
  ) {}

  dialogData$: Observable<{ owner: CommonConfigurator.Owner }> =
    this.launchDialogService.data$.pipe(
      // In case conflict solver opens as well we need to filter out is data
      filter((dialogData) => dialogData && dialogData.owner)
    );

  product$ = this.dialogData$.pipe(
    switchMap((dialogData) => this.productService.get(dialogData.owner.id))
  );

  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: '.btn-primary',
    focusOnEscape: true,
  };

  /**
   * Closes the dialog
   */
  close(): void {
    this.launchDialogService.closeDialog('Close restart configuration dialog');
  }

  /**
   * Resume with current configuration
   * @param product owning this configuration
   */
  resume(product: Product): void {
    this.close();
    // In case conflict solver was open as well, it was closed by the call above.
    // By navigating again we ensure it will open again.
    this.routingService.go({
      cxRoute: 'configure' + product.configuratorType,
      params: {
        ownerType: CommonConfigurator.OwnerType.PRODUCT,
        entityKey: product.code,
      },
    });
  }

  /**
   * Discards current configuration and requests a new default configuration
   * @param owner owner of the current configuration that will be reused for next configuration
   */
  restart(owner: CommonConfigurator.Owner): void {
    this.configuratorCommonsService.forceNewConfiguration(owner);
    this.close();
  }

  /**
   * Navigates back to product detail page without making a decision
   * @param product owning this configuration
   */
  backToPDP(product: Product) {
    this.close();
    this.routingService.go({
      cxRoute: 'product',
      params: product,
    });
  }
}
