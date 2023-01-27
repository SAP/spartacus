/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CartOutlets,
  DeliveryMode,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation-shipping',
  templateUrl: './order-confirmation-shipping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationShippingComponent {
  readonly cartOutlets = CartOutlets;

  entries: OrderEntry[] | undefined;
  deliveryAddress: Address | undefined;
  deliveryMode: DeliveryMode | undefined;

  order$: Observable<Order | undefined> = this.orderFacade
    .getOrderDetails()
    .pipe(
      tap((order) => {
        this.entries = order?.entries?.filter(
          (entry) => entry.deliveryPointOfService === undefined
        );
        this.deliveryAddress = order?.deliveryAddress;
        this.deliveryMode = order?.deliveryMode;
      })
    );
  constructor(protected orderFacade: OrderFacade) {}
}
