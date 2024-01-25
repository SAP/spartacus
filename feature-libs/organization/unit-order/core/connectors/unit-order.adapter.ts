/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order, OrderHistoryList } from '@spartacus/order/root';
import { Observable } from 'rxjs';

export abstract class UnitOrderAdapter {
  /**
   * Abstract method used to load order history for units.
   *
   * @param userId The `userId` for given user
   * @param pageSize
   * @param currentPage
   * @param filters
   * @param sort Sorting method
   */
  abstract loadUnitOrderHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    filters?: string,
    sort?: string
  ): Observable<OrderHistoryList>;

  /**
   * Abstract method used to load order data.
   *
   * @param userId The `userId` for given user
   * @param orderCode The `orderCode` for given order
   */
  abstract loadUnitOrderDetail(
    userId: string,
    orderCode: string
  ): Observable<Order>;
}
