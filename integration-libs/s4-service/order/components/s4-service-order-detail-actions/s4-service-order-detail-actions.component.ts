/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { OrderDetailActionsComponent } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { CheckoutServiceSchedulePickerService } from '@spartacus/s4-service/root';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'cx-s4-service-order-detail-actions',
  templateUrl: './s4-service-order-detail-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class S4ServiceOrderDetailActionsComponent extends OrderDetailActionsComponent {
  protected checkoutServiceSchedulePickerService = inject(
    CheckoutServiceSchedulePickerService
  );
  protected globalMessageService = inject(GlobalMessageService);

  displayActions$: Observable<boolean> = this.order$.pipe(
    map((order) => this.checkServiceStatus(order))
  );

  protected checkServiceStatus(order: Order): boolean {
    if (order && order.status === 'CANCELLED') {
      return false;
    } else if (order && order.servicedAt) {
      const hoursFromSchedule =
        this.checkoutServiceSchedulePickerService.getHoursFromServiceSchedule(
          order.servicedAt
        );
      if (hoursFromSchedule > 0 && hoursFromSchedule <= 24) {
        this.globalMessageService.add(
          { key: 'rescheduleService.serviceNotAmendable' },
          GlobalMessageType.MSG_TYPE_INFO
        );
        return false;
      } else if (hoursFromSchedule > 24) {
        return true;
      }
    }
    return true;
  }
}
