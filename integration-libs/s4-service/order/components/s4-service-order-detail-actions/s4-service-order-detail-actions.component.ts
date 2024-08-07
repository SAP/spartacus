/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { OrderDetailActionsComponent } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { CheckoutServiceSchedulePickerService } from '@spartacus/s4-service/root';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'cx-s4-service-order-detail-actions',
  templateUrl: './s4-service-order-detail-actions.component.html',
})
export class S4ServiceOrderDetailActionsComponent
  extends OrderDetailActionsComponent
  implements OnInit, OnDestroy
{
  order: Order;
  displayActions: boolean;
  protected checkoutServiceSchedulePickerService = inject(
    CheckoutServiceSchedulePickerService
  );
  protected globalMessageService = inject(GlobalMessageService);
  protected subscription = new Subject<void>();

  ngOnInit(): void {
    this.order$.pipe(takeUntil(this.subscription)).subscribe((order) => {
      this.order = order;
      this.checkServiceStatus(order);
    });
  }

  checkServiceStatus(order: Order): void {
    if (order && order.status === 'CANCELLED') {
      this.displayActions = false;
    } else if (order && order.servicedAt) {
      const hoursFromSchedule =
        this.checkoutServiceSchedulePickerService.getHoursFromServiceSchedule(
          order.servicedAt
        );
      if (hoursFromSchedule > 0 && hoursFromSchedule <= 24) {
        this.displayActions = false;
        this.globalMessageService.add(
          { key: 'rescheduleService.serviceNotAmendable' },
          GlobalMessageType.MSG_TYPE_INFO
        );
      } else if (hoursFromSchedule > 24) {
        this.displayActions = true;
      }
    } else {
      this.displayActions = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
