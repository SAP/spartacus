/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Product, ProductScope, ProductService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionProductService {
  protected currentProductService = inject(CurrentProductService);
  protected productService = inject(ProductService);
  isSubscription(product: Product): boolean {
    return Boolean(product?.sapSubscriptionTerm && product?.sapPricePlan);
  }

  getSubscriptionData(
    productCode?: string
  ): Observable<Product | null | undefined> {
    return productCode
      ? this.productService.get(productCode, [ProductScope.SUBSCRIPTION])
      : this.currentProductService.getProduct([ProductScope.SUBSCRIPTION]);
  }
}
