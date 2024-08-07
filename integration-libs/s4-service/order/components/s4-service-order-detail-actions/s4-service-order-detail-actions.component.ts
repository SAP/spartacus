/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderDetailActionsComponent } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cx-s4-service-order-detail-actions',
  templateUrl: './s4-service-order-detail-actions.component.html',
})
export class S4ServiceOrderDetailActionsComponent
  extends OrderDetailActionsComponent
  implements OnInit, OnDestroy
{
  order: Order;
  displayActionsCancel: boolean;
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    // Make sure `order$` is defined in the parent component or adjust accordingly
    this.order$.pipe(takeUntil(this.unsubscribe$)).subscribe((order) => {
      this.order = order;
      this.checkIfOrderContainsServiceProduct(order);
    });
  }

  checkIfOrderContainsServiceProduct(order: Order): void {
    const entries = order?.entries || [];

    // Check if entries contains any product with productTypes including 'SERVICE'
    const hasServiceProduct = entries.some((entry) =>
      entry.product?.productTypes?.includes('SERVICE')
    );

    // Adjust display logic based on whether the order is canceled or contains a service product
    if (order.status === 'CANCELLED' || !hasServiceProduct) {
      this.displayActionsCancel = false;
    } else {
      this.displayActionsCancel = true;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
