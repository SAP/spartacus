/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { I18nModule, Product, ProductScope } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { SubscriptionProductService } from '@spartacus/subscription-billing/core';
import {
  OneTimeCharge,
  RecurringCharge,
} from '@spartacus/subscription-billing/root';
import { CommonModule } from '@angular/common';
import { SubscriptionProductUsageChargeComponent } from '../usage/subscription-product-usage-charge.component';

@Component({
  selector: 'cx-subscription-product-price',
  standalone: true,
  templateUrl: './subscription-product-price.component.html',
  imports: [CommonModule, I18nModule, SubscriptionProductUsageChargeComponent],
})
export class SubscriptionProductPriceComponent {
  protected productService = inject(SubscriptionProductService);
  protected currentProductService = inject(CurrentProductService);

  productDetail: Signal<Product | null | undefined> = toSignal(
    this.currentProductService.getProduct([ProductScope.SUBSCRIPTION])
  );

  isCurrentProductSubscription: Signal<boolean> = computed(() => {
    const product = this.productDetail();
    if (product !== null && product !== undefined) {
      return this.productService.isSubscription(product);
    } else {
      return false;
    }
  });

  oneTimeCharges: Signal<OneTimeCharge[]> = computed(
    () => this.productDetail()?.sapPricePlan?.oneTimeCharges ?? []
  );
  recurringCharges: Signal<RecurringCharge[]> = computed(
    () => this.productDetail()?.sapPricePlan?.recurringCharges ?? []
  );
}
