/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, Input, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product, TranslatePipe } from '@spartacus/core';
import {
  OneTimeCharge,
  RecurringCharge,
  SubscriptionProductService,
} from '@spartacus/subscription-billing/root';
import { SubscriptionProductUsageChargeComponent } from '../usage/subscription-product-usage-charge.component';

@Component({
  selector: 'cx-subscription-product-price',
  templateUrl: './subscription-product-price.component.html',
  imports: [
    NgIf,
    NgTemplateOutlet,
    SubscriptionProductUsageChargeComponent,
    NgFor,
    TranslatePipe,
  ],
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
