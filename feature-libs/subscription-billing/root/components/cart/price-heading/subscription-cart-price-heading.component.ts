/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule, NgIf } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderEntry } from '@spartacus/cart/base/root';
import { I18nModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { SubscriptionProductService } from '../../../services/index';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'cx-subscription-cart-price-heading',
  standalone: true,
  imports: [CommonModule, I18nModule, NgIf],
  templateUrl: './subscription-cart-price-heading.component.html',
})
export class SubscriptionCartPriceHeadingComponent {
  protected outletData = inject(OutletContextData, { optional: true });
  protected productService = inject(SubscriptionProductService);
  cartItems = toSignal(this.outletData?.context$ ?? EMPTY);
  subscriptionItem = computed(() => {
    return this.cartItems()?.items?.find((item: OrderEntry) =>
      item.product ? this.productService.isSubscription(item.product) : false
    );
  });
}
