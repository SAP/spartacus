/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import {
  AbstractOrderType,
  CartOutlets,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderConfirmationItemsComponent implements OnDestroy {
  protected orderFacade = inject(OrderFacade);

  readonly cartOutlets = CartOutlets;
  readonly abstractOrderType = AbstractOrderType;
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order | undefined> = this.orderFacade.getOrderDetails();

  ngOnDestroy() {
    this.orderFacade.clearPlacedOrder();
  }
}
