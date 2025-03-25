/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ProductScope } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { toSignal } from '@angular/core/rxjs-interop';
import { OneTimeCharge, RecurringCharge } from '../../public_api';
import { SubscriptionProductService } from '../service/subscription-product.service';
import { Component, inject, Signal, computed } from '@angular/core';

@Component({
  selector: 'cx-subscription-product-price',
  standalone: false,
  templateUrl: './subscription-product-price.component.html',
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
