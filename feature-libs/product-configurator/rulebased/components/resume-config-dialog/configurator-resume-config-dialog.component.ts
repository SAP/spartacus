/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  selector: 'cx-configurator-resume-config-dialog',
  templateUrl: './configurator-resume-config-dialog.component.html',
})
export class ConfiguratorResumeConfigDialogComponent {
  constructor(
    protected launchDialogService: LaunchDialogService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected routingService: RoutingService,
    protected productService: ProductService
  ) {}

  data$: Observable<{ previousOwner: CommonConfigurator.Owner }> =
    this.launchDialogService.data$.pipe(
      filter((data) => data && data.previousOwner)
    );

  product$ = this.data$.pipe(
    switchMap((data) => this.productService.get(data.previousOwner.id))
  );

  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: '.btn-primary',
    focusOnEscape: true,
  };

  /**
   * closes the  modal
   */
  closeModal(): void {
    this.launchDialogService.closeDialog('Close Resume Config Modal');
  }

  /**
   *resume with current config
   */
  resumeConfig(product: Product): void {
    this.closeModal();
    this.routingService.go({
      cxRoute: 'configure' + product.configuratorType,
      params: {
        ownerType: CommonConfigurator.OwnerType.PRODUCT,
        entityKey: product.code,
      },
    });
  }

  /**
   * discards current configuration and requests a new default configuration
   * @parameter previousOwner owner of the current configuration thats will be reused for next configuration
   */
  discardConfig(previousOwner: CommonConfigurator.Owner): void {
    this.configuratorCommonsService.forceNewConfiguration(previousOwner);
    this.closeModal();
  }

  /**
   * navigates back product detail page without making a decision
   */
  backToPDP(product: Product) {
    this.closeModal();
    this.routingService.go({
      cxRoute: 'product',
      params: product,
    });
  }
}
