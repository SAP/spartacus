/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { Product, ProductScope } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SubscriptionProductService } from '../services/subscription-product.service';
import { CurrentProductService } from '@spartacus/storefront';
import { OneTimeCharge, RecurringCharge } from '../../model';

@Component({
  selector: 'cx-subscription-product-price',
  templateUrl: './subscription-product-price.component.html',
})
export class SubscriptionProductPriceComponent {
  protected productService = inject(SubscriptionProductService);
  protected currentProductService = inject(CurrentProductService);
  protected product$: Observable<Product | null> =
    this.currentProductService.getProduct([ProductScope.SUBSCRIPTION]);

  isCurrentProductSubscription(product: Product): boolean {
    return this.productService.isSubscription(product);
  }

  getOneTimeCharges(product: Product): OneTimeCharge[] {
    return product.sapPricePlan?.oneTimeCharges ?? [];
  }

  getRecurringCharges(product: Product): RecurringCharge[] {
    return product.sapPricePlan?.recurringCharges ?? [];
  }
}
