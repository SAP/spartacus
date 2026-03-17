/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, computed, inject, Input, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '@spartacus/core';
import { SubscriptionProductService } from '@spartacus/subscription-billing/core';
import {
  OneTimeCharge,
  RecurringCharge,
} from '@spartacus/subscription-billing/root';

@Component({
  selector: 'cx-subscription-product-price',
  standalone: false,
  templateUrl: './subscription-product-price.component.html',
})
export class SubscriptionProductPriceComponent {
  @Input() productCode?: string;
  protected productService = inject(SubscriptionProductService);

  productDetail: Signal<Product | null | undefined> = toSignal(
    this.productService.getSubscriptionData(this.productCode)
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
