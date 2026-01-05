/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
import { map, Observable, tap } from 'rxjs';

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

  /**
   * @deprecated since 221121.1 - Displaying the individual action buttons will depend on their boolean flags from API response.
   */
  displayActions$: Observable<boolean> = this.order$.pipe(
    map((order) => this.checkServiceStatus(order))
  );

  ngOnInit(): void {
    this.order$.pipe(tap((order) => this.displayServiceMessage(order)));
  }

  /**
   * @deprecated since 221121.1 - Displaying the individual action buttons will depend on their boolean flags from API response.
   * Displaying notification for a service not amendable will be carried out by 'displayServiceMessage' instead.
   */
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

  protected displayServiceMessage(order: Order): void {
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
