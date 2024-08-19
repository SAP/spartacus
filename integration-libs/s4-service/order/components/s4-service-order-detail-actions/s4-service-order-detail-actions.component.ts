/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { OrderDetailActionsComponent } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'cx-s4-service-order-detail-actions',
  templateUrl: './s4-service-order-detail-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class S4ServiceOrderDetailActionsComponent
  extends OrderDetailActionsComponent
  implements OnInit, OnDestroy
{
  private cdr = inject(ChangeDetectorRef);
  private unsubscribe$ = new Subject<void>();

  order: Order;
  displayActionsCancel: boolean;

  ngOnInit(): void {
    this.order$.pipe(takeUntil(this.unsubscribe$)).subscribe((order) => {
      this.order = order;
      this.checkIfOrderContainsServiceProduct(order);
      this.cdr.markForCheck();
    });
  }

  checkIfOrderContainsServiceProduct(order: Order): void {
    const entries = order?.entries || [];
    const hasServiceProduct = entries.some((entry) =>
      entry.product?.productTypes?.includes('SERVICE')
    );
    this.displayActionsCancel = !(
      order.status === 'CANCELLED' || !hasServiceProduct
    );
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
