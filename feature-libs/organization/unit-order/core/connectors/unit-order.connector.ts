/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { UnitOrderAdapter } from './unit-order.adapter';

@Injectable({
  providedIn: 'root',
})
export class UnitOrderConnector {
  constructor(protected adapter: UnitOrderAdapter) {}

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
}
