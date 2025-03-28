/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Product } from '@spartacus/core';
import { SubscriptionProductService } from '@spartacus/subscription-billing/root';

@Injectable({
  providedIn: 'root',
})
export class CurrentSubscriptionProductService extends CurrentProductService {
  protected subscriptionProductService = inject(SubscriptionProductService);

  showItemCounter(product: Product): boolean {
    if (this.subscriptionProductService.isSubscription(product || {})) {
      return false;
    } else {
      return true;
    }
  }
}
