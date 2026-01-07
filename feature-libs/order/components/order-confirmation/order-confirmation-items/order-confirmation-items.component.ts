/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AbstractOrderContextDirective } from '@spartacus/cart/base/components';
import {
  AbstractOrderType,
  CartOutlets,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { TranslatePipe } from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';
import { OutletDirective, PromotionsComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    PromotionsComponent,
    AbstractOrderContextDirective,
    OutletDirective,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class OrderConfirmationItemsComponent implements OnDestroy {
  readonly cartOutlets = CartOutlets;
  readonly abstractOrderType = AbstractOrderType;
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order | undefined> = this.orderFacade.getOrderDetails();

  constructor(protected orderFacade: OrderFacade) {}

  ngOnDestroy() {
    this.orderFacade.clearPlacedOrder();
  }
}
