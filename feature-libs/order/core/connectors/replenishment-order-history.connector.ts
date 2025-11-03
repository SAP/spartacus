/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  OrderHistoryList,
  ReplenishmentOrder,
  ReplenishmentOrderList,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ReplenishmentOrderHistoryAdapter } from './replenishment-order-history.adapter';
@Injectable()
export class ReplenishmentOrderHistoryConnector {
  protected adapter = inject(ReplenishmentOrderHistoryAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  public load(
    userId: string,
    replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return this.adapter.load(userId, replenishmentOrderCode);
  }

  public loadReplenishmentDetailsHistory(
    userId: string,
    replenishmentOrderCode: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    return this.adapter.loadReplenishmentDetailsHistory(
      userId,
      replenishmentOrderCode,
      pageSize,
      currentPage,
      sort
    );
  }

  public cancelReplenishmentOrder(
    userId: string,
    replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return this.adapter.cancelReplenishmentOrder(
      userId,
      replenishmentOrderCode
    );
  }

  public loadHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<ReplenishmentOrderList> {
    return this.adapter.loadHistory(userId, pageSize, currentPage, sort);
  }
}
