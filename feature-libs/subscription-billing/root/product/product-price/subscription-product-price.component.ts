/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, computed, inject, Signal } from '@angular/core';
import { I18nModule, Product, ProductScope } from '@spartacus/core';
import { SubscriptionProductService } from '../services/subscription-product.service';
import { CurrentProductService } from '@spartacus/storefront';
import { OneTimeCharge, RecurringCharge } from '../../model';
import { SubscriptionProductUsageChargeComponent } from '../product-usage/subscription-product-usage-charge.component';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'cx-subscription-product-price',
  templateUrl: './subscription-product-price.component.html',
  imports: [CommonModule, I18nModule, SubscriptionProductUsageChargeComponent],
})
export class SubscriptionProductPriceComponent {
  protected productService = inject(SubscriptionProductService);
  protected currentProductService = inject(CurrentProductService);

  product: Signal<Product | null | undefined> = toSignal(
    this.currentProductService.getProduct([ProductScope.SUBSCRIPTION])
  );

  isCurrentProductSubscription: Signal<boolean> = computed(() => {
    const product = this.product();
    if (product !== null && product !== undefined) {
      return this.productService.isSubscription(product);
    } else {
      return false;
    }
  });

  oneTimeCharges: Signal<OneTimeCharge[]> = computed(
    () => this.product()?.sapPricePlan?.oneTimeCharges ?? []
  );
  recurringCharges: Signal<RecurringCharge[]> = computed(
    () => this.product()?.sapPricePlan?.recurringCharges ?? []
  );
}
