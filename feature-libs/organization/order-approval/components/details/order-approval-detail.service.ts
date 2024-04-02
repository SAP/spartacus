/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { OrderApproval } from '../../core/model/order-approval.model';
import { OrderApprovalService } from '../../core/services/order-approval.service';

@Injectable({
  providedIn: 'root',
})
export class OrderApprovalDetailService {
  protected approvalCode$ = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params.approvalCode));

  protected orderApproval$ = this.approvalCode$.pipe(
    filter((approvalCode) => Boolean(approvalCode)),
    tap((approvalCode: string) =>
      this.orderApprovalService.loadOrderApproval(approvalCode)
    ),
    switchMap((approvalCode: string) =>
      this.orderApprovalService.get(approvalCode)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected order$: Observable<Order> = this.orderApproval$.pipe(
    map((orderApproval) => orderApproval?.order as Order)
  );

  constructor(
    protected routingService: RoutingService,
    protected orderApprovalService: OrderApprovalService
  ) {}

  /**
   * Returns a string that represents the approval code
   * found in the page url.
   */
  getOrderApprovalCodeFromRoute(): Observable<string> {
    return this.approvalCode$;
  }

  /**
   * Returns the order data from the approval details that have been
   * retrieved from the approval code in the page url.
   */
  getOrderDetails(): Observable<Order> {
    return this.order$;
  }

  /**
   * Returns the approval details that have been retrieved from the
   * approval code in the page url.
   */
  getOrderApproval(): Observable<OrderApproval | undefined> {
    return this.orderApproval$;
  }
}
