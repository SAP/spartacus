/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  GetOrderEntriesContext,
  OrderEntriesSource,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnitLevelOrderDetailService } from '../unit-level-order-detail';

@Injectable({
  providedIn: 'root',
})
export class UnitOrderDetailsOrderEntriesContext
  implements GetOrderEntriesContext
{
  readonly type = OrderEntriesSource.UNIT_ORDER_DETAILS;

  constructor(
    protected unitLevelOrderDetailService: UnitLevelOrderDetailService
  ) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.unitLevelOrderDetailService
      .getOrderDetails()
      .pipe(map((order: Order) => order?.entries ?? []));
  }
}
