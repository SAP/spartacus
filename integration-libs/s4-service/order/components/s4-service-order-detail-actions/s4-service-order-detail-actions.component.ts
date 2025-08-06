/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { OrderDetailActionsComponent } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { CheckoutServiceSchedulePickerService } from '@spartacus/s4-service/root';
import { tap } from 'rxjs';

@Component({
  selector: 'cx-s4-service-order-detail-actions',
  templateUrl: './s4-service-order-detail-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class S4ServiceOrderDetailActionsComponent
  extends OrderDetailActionsComponent
  implements OnInit
{
  protected checkoutServiceSchedulePickerService = inject(
    CheckoutServiceSchedulePickerService
  );
  protected globalMessageService = inject(GlobalMessageService);

  ngOnInit(): void {
    this.order$.pipe(tap((order) => this.checkServiceStatus(order)));
  }

  protected checkServiceStatus(order: Order): void {
    if (order.status !== 'CANCELLED' && !!order.servicedAt) {
      const hoursFromSchedule =
        this.checkoutServiceSchedulePickerService.getHoursFromServiceSchedule(
          order.servicedAt
        );
      if (hoursFromSchedule > 0 && hoursFromSchedule <= 24) {
        this.globalMessageService.add(
          { key: 'rescheduleService.serviceNotAmendable' },
          GlobalMessageType.MSG_TYPE_INFO
        );
      }
    }
  }
}
