/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartItemQuantityService } from '@spartacus/cart/base/root';
import { Product, TranslatePipe } from '@spartacus/core';
import { ConfigureProductComponent } from '@spartacus/product-configurator/common';
import { ConfiguratorQuantityService } from '@spartacus/product-configurator/rulebased';
import { take } from 'rxjs/operators';

/**
 * Storefront override for {@link ConfigureProductComponent} (CXSPA-2662 option D).
 * Copies PDP quantity into {@link ConfiguratorQuantityService} before navigation.
 *
 * Must be registered from an eager module (see {@link ProductConfiguratorRulebasedFeatureModule}):
 * the PDP slot uses this CMS mapping before the lazy rulebased configurator feature loads.
 */
@Component({
  selector: 'cx-configure-product',
  templateUrl:
    '../../../../../../../feature-libs/product-configurator/common/components/configure-product/configure-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TranslatePipe],
})
export class ConfigureProductPdpQuantityBridgeComponent extends ConfigureProductComponent {
  protected cartItemQuantityService = inject(CartItemQuantityService);
  protected configuratorQuantityService = inject(ConfiguratorQuantityService);

  override navigateToConfigurator(product: Product): void {
    this.cartItemQuantityService
      .getQuantity()
      .pipe(take(1))
      .subscribe((quantity) => {
        this.configuratorQuantityService.setQuantity(quantity ?? 1);
        super.navigateToConfigurator(product);
      });
  }
}
