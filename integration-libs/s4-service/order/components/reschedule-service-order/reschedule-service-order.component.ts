/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartOutlets } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import {
  CheckoutServiceSchedulePickerService,
  RescheduleServiceOrderFacade,
  ServiceDateTime,
} from '@spartacus/s4-service/root';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'cx-reschedule-service-order',
  templateUrl: './reschedule-service-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RescheduleServiceOrderComponent implements OnInit, OnDestroy {
  protected orderDetailsService = inject(OrderDetailsService);
  protected rescheduleServiceOrderFacade = inject(RescheduleServiceOrderFacade);
  protected routingService = inject(RoutingService);
  protected globalMessageService = inject(GlobalMessageService);
  protected fb = inject(FormBuilder);
  protected checkoutServiceSchedulePickerService = inject(
    CheckoutServiceSchedulePickerService
  );
  readonly CartOutlets = CartOutlets;
  dateTime: ServiceDateTime;
  order$ = this.orderDetailsService.getOrderDetails().pipe(
    map((order) => ({
      ...order,
      entries: (order.entries || []).filter(
        (entry) => entry.product && entry.product.productTypes === 'SERVICE'
      ),
    }))
  );
  orderCode: string;
  protected subscription = new Subject<void>();

  minServiceDate$: Observable<string> =
    this.checkoutServiceSchedulePickerService.getMinDateForService();
  scheduleTimes$: Observable<string[]> =
    this.checkoutServiceSchedulePickerService.getScheduledServiceTimes();
  form: FormGroup = this.fb.group({
    scheduleDate: [null, Validators.required],
    scheduleTime: [null, Validators.required],
  });

  ngOnInit(): void {
    this.order$.pipe(takeUntil(this.subscription)).subscribe((orderDetails) => {
      this.orderCode = orderDetails.code || '';
      this.initializeForm(orderDetails);
    });
  }

  initializeForm(order: Order): void {
    const servicedAt = order.servicedAt;
    if (servicedAt && servicedAt !== '') {
      const info =
        this.checkoutServiceSchedulePickerService.getServiceDetailsFromDateTime(
          servicedAt
        );
      this.form.patchValue({
        scheduleDate: info.date,
        scheduleTime: info.time,
      });
    } else {
      combineLatest([this.minServiceDate$, this.scheduleTimes$]).subscribe(
        ([minDate, scheduleTime]) => {
          this.form.patchValue({
            scheduleDate: minDate,
            scheduleTime: scheduleTime[0],
          });
        }
      );
    }
  }

  setScheduleTime(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.form.patchValue({
      scheduleTime: value,
    });
  }

  rescheduleServiceOrder(): void {
    const scheduleDate = this.form?.get('scheduleDate')?.value || '';
    const scheduleTime = this.form?.get('scheduleTime')?.value || '';
    this.dateTime = this.checkoutServiceSchedulePickerService.convertToDateTime(
      scheduleDate,
      scheduleTime
    );
    this.rescheduleServiceOrderFacade
      .rescheduleService(this.orderCode, this.dateTime)
      .subscribe({
        next: () => {
          this.routingService.go({
            cxRoute: 'orderDetails',
            params: { code: this.orderCode },
          });
          this.globalMessageService.add(
            { key: 'rescheduleService.rescheduleSuccess' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        },
        error: () => {
          this.globalMessageService.add(
            { key: 'rescheduleService.unknownError' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
