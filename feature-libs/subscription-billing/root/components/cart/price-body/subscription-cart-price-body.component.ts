/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderEntry } from '@spartacus/cart/base/root';
import { OutletContextData } from '@spartacus/storefront';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'cx-subscription-cart-price-body',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './subscription-cart-price-body.component.html',
})
export class SubscriptionCartPriceBodyComponent {
  protected outletContext = inject(OutletContextData, { optional: true });
  outletData = toSignal(this.outletContext?.context$ ?? EMPTY);
  parent = computed(() => this.outletData().parent);
  subscriptionItemExists = computed(() => {
    return this.outletData().items?.find((item: OrderEntry) =>
      item.product ? item.product.productTypes === 'SUBSCRIPTION' : false
    );
  });
  item = computed(() => {
    return this.outletData().item;
  });
}
