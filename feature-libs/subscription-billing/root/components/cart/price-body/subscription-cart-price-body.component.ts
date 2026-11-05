/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderEntry, SapAppliedDiscountData } from '@spartacus/cart/base/root';
import { OutletContextData } from '@spartacus/storefront';
import { SubscriptionProductService } from '../../../services/index';
import { EMPTY } from 'rxjs';
import {
  OneTimeCharge,
  RecurringCharge,
  SapAppliedDiscountCodesForSubscription,
} from '../../../model';

@Component({
  selector: 'cx-subscription-cart-price-body',
  imports: [CommonModule, NgIf, NgFor, NgTemplateOutlet],
  standalone: true,
  templateUrl: './subscription-cart-price-body.component.html',
})
export class SubscriptionCartPriceBodyComponent {
  protected outletContext = inject(OutletContextData, { optional: true });
  protected productService = inject(SubscriptionProductService);
  outletData = toSignal(this.outletContext?.context$ ?? EMPTY);
  parent = computed(() => this.outletData().parent);
  subscriptionItemExists = computed(() => {
    return this.outletData().items?.find((item: OrderEntry) =>
      item.product ? this.productService.isSubscription(item.product) : false
    );
  });
  item = computed(() => {
    return this.outletData().item;
  });

  protected billingTimeName = computed(
    () => this.item().product?.sapSubscriptionTerm?.billingPlan?.billingTime?.name
  );
  protected currencyIso = computed(() => this.item().basePrice?.currencyIso);

  protected discounts = computed(() => this.item()?.sapAppliedDiscounts);
  protected recurringDiscount = computed(() =>
    this.discounts()?.find(
      (discount: SapAppliedDiscountData) => discount.code === SapAppliedDiscountCodesForSubscription.RECURRING
    )
  );
  protected fixedDiscount = computed(() =>
    this.discounts()?.find(
      (discount: SapAppliedDiscountData) => discount.code === SapAppliedDiscountCodesForSubscription.FIXED
    )
  );

  protected showOneTimeCharge(charge?: OneTimeCharge): number | undefined {
    const originalPrice = charge?.price?.value;
    const discount = this.fixedDiscount();
    return discount?.value !== undefined && originalPrice !== undefined
      ? originalPrice - discount.value
      : originalPrice;
  }

  protected showRecurringCharge(charge?: RecurringCharge): number | undefined {
    const originalPrice = charge?.price?.value;
    const discount = this.recurringDiscount();
    return discount?.value !== undefined && originalPrice !== undefined
      ? originalPrice - discount.value
      : originalPrice;
  }
}
