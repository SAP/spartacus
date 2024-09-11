/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { FeatureConfigService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  protected featureConfig = inject(FeatureConfigService);
  private shouldHideAddToCartForUnpurchasableProducts =
    this.featureConfig.isEnabled('shouldHideAddToCartForUnpurchasableProducts');

  shouldHideAddToCartButton(product: any): boolean {
    return (
      this.shouldHideAddToCartForUnpurchasableProducts &&
      (!product.price || product.purchasable === false)
    );
  }
}
