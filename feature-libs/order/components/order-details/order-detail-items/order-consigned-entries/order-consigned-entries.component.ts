/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, Input } from '@angular/core';
import {
  AbstractOrderType,
  CartOutlets,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { Consignment, Order, OrderOutlets } from '@spartacus/order/root';
import { map } from 'rxjs';

@Component({
  selector: 'cx-order-consigned-entries',
  templateUrl: './order-consigned-entries.component.html',
  standalone: false,
})
export class OrderConsignedEntriesComponent {
  @Input() consignments: Consignment[];
  @Input() order: Order;
  @Input() enableAddToCart: boolean | undefined;
  @Input() buyItAgainTranslation: string;
  protected translationService = inject(TranslationService);

  promotionLocation: PromotionLocation = PromotionLocation.Order;

  readonly OrderOutlets = OrderOutlets;
  readonly CartOutlets = CartOutlets;
  readonly abstractOrderType = AbstractOrderType;

  getStatusText(status: string) {
    return this.translationService
      .translate('orderDetails.deliveryStatus_' + status)
      .pipe(
        map((value) => {
          if (value.includes('orderDetails.deliveryStatus_')) {
            //in case translation key is missing
            return status;
          } else {
            return value;
          }
        })
      );
  }
}
