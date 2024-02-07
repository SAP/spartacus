/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FeatureConfigService, Product, ProductScope } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { ProductDetailOutlets } from '../product-outlets.model';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSummaryComponent {
  private featureConfig = inject(FeatureConfigService);

  outlets = ProductDetailOutlets;

  product$: Observable<Product | null> = this.getProduct();

  protected getProduct(): Observable<Product | null> {
    const productScopes = [ProductScope.DETAILS, ProductScope.PRICE];
    if (this.featureConfig.isEnabled('showPromotionsInPDP')) {
      productScopes.push(ProductScope.PROMOTIONS);
    }
    return this.currentProductService.getProduct(productScopes);
  }

  constructor(protected currentProductService: CurrentProductService) {}
}
