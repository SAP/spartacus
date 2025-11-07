/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  GetOrderEntriesContext,
  OrderEntriesSource,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderConfirmationOrderEntriesContext
  implements GetOrderEntriesContext
{
  protected orderFacade = inject(OrderFacade);

  readonly type = OrderEntriesSource.ORDER_CONFIRMATION;

  getEntries(): Observable<OrderEntry[]> {
    return this.orderFacade
      .getOrderDetails()
      .pipe(map((order) => order?.entries ?? []));
  }
}
