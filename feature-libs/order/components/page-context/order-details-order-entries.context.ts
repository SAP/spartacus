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
import { Order, OrderHistoryFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsOrderEntriesContext implements GetOrderEntriesContext {
  protected orderHistoryFacade = inject(OrderHistoryFacade);

  readonly type = OrderEntriesSource.ORDER_DETAILS;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  getEntries(): Observable<OrderEntry[]> {
    return this.orderHistoryFacade
      .getOrderDetails()
      .pipe(map((order: Order) => order?.entries ?? []));
  }
}
