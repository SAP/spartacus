/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CurrentProductService } from '@spartacus/storefront';
import { SubscriptionProductService } from './subscription-product.service';
import { Product } from '@spartacus/core';

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
