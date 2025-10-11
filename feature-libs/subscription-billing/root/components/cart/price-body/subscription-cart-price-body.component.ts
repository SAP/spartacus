/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { Component, computed, inject, Optional } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderEntry } from '@spartacus/cart/base/root';
import { OutletContextData } from '@spartacus/storefront';
import { SubscriptionProductService } from '@spartacus/subscription-billing/core';

@Component({
  selector: 'cx-subscription-cart-price-body',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './subscription-cart-price-body.component.html',
})
export class SubscriptionCartPriceBodyComponent {
  @Optional() protected outletContext = inject(OutletContextData);
  protected productService = inject(SubscriptionProductService);
  outletData = toSignal(this.outletContext?.context$);
  parent = computed(() => this.outletData().parent);
  subscriptionItemExists = computed(() => {
    return this.outletData().items?.find((item: OrderEntry) =>
      item.product ? this.productService.isSubscription(item.product) : false
    );
  });
  item = computed(() => {
    return this.outletData().item;
  });
}
