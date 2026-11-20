/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { OrderDetailActionsComponent } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { CheckoutServiceSchedulePickerService } from '@spartacus/s4-service/root';
import { BtnLikeLinkDirective } from '@spartacus/storefront';
import { tap } from 'rxjs';

@Component({
  selector: 'cx-s4-service-order-detail-actions',
  templateUrl: './s4-service-order-detail-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BtnLikeLinkDirective,
    RouterLink,
    AsyncPipe,
    TranslatePipe,
    UrlPipe,
  ],
})
export class S4ServiceOrderDetailActionsComponent
  extends OrderDetailActionsComponent
  implements OnInit
{
  protected checkoutServiceSchedulePickerService = inject(
    CheckoutServiceSchedulePickerService
  );
  protected globalMessageService = inject(GlobalMessageService);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.order$
      .pipe(
        tap((order) => this.displayServiceMessage(order)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected displayServiceMessage(order: Order): void {
    if (order.status !== 'CANCELLED' && order.servicedAt) {
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
