/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { AbstractOrderContextSource } from '@spartacus/cart/base/components';
import {
  AbstractOrderContext,
  AbstractOrderType,
  CartOutlets,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AbstractOrderContextSource,
    { provide: AbstractOrderContext, useExisting: AbstractOrderContextSource },
  ],
})
export class OrderConfirmationItemsComponent implements OnDestroy {
  readonly cartOutlets = CartOutlets;
  protected abstractOrderContextSource = inject(AbstractOrderContextSource);
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order | undefined> = this.orderFacade
    .getOrderDetails()
    .pipe(
      tap((order) => {
        this.abstractOrderContextSource.id$.next(order?.code);
        this.abstractOrderContextSource.type$.next(AbstractOrderType.ORDER);
      })
    );

  constructor(protected orderFacade: OrderFacade) {}

  ngOnDestroy() {
    this.orderFacade.clearPlacedOrder();
  }
}
