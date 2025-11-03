/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { UnitOrderAdapter } from './unit-order.adapter';

@Injectable({
  providedIn: 'root',
})
export class UnitOrderConnector {
  protected adapter = inject(UnitOrderAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  public getUnitOrderHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    filters?: string,
    sort?: string
  ): Observable<OrderHistoryList> {
    return this.adapter.loadUnitOrderHistory(
      userId,
      pageSize,
      currentPage,
      filters,
      sort
    );
  }

  public getUnitOrderDetail(
    userId: string,
    orderCode: string
  ): Observable<Order> {
    return this.adapter.loadUnitOrderDetail(userId, orderCode);
  }
}
