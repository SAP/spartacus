/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { useFeatureStyles } from '@spartacus/core';
import {
  DaysOfWeek,
  ORDER_TYPE,
  ScheduleReplenishmentForm,
  recurrencePeriod,
} from '@spartacus/order/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { CheckoutReplenishmentFormService } from '../services/checkout-replenishment-form.service';

@Component({
  selector: 'cx-schedule-replenishment-order',
  templateUrl: './checkout-schedule-replenishment-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutScheduleReplenishmentOrderComponent
  implements OnInit, OnDestroy
{
  protected subscription = new Subscription();

  iconTypes = ICON_TYPE;
  orderTypes = ORDER_TYPE;
  daysOfWeek = Object.values(DaysOfWeek);
  recurrencePeriodType = Object.values(recurrencePeriod);

  selectedOrderType$: Observable<ORDER_TYPE> =
    this.checkoutReplenishmentFormService.getOrderType();

  isMonthly: Boolean = false;
  isWeekly: Boolean = false;
  currentDaysOfWeek: DaysOfWeek[] = [];
  numberOfDays: string[];
  numberOfWeeks: string[];
  currentDate: string | undefined;
  scheduleReplenishmentFormData: ScheduleReplenishmentForm;

  constructor(
    protected checkoutReplenishmentFormService: CheckoutReplenishmentFormService
  ) {
    useFeatureStyles('a11yReplenishmentOrderFieldset');
    useFeatureStyles('a11yScheduleReplenishment');
  }

  ngOnInit(): void {
    this.subscription.add(
      this.checkoutReplenishmentFormService
        .getScheduleReplenishmentFormData()
        .subscribe((data) => {
          this.scheduleReplenishmentFormData = data;
        })
    );

    this.initConfig();
  }

  changeOrderType(orderType: ORDER_TYPE): void {
    this.checkoutReplenishmentFormService.setOrderType(orderType);
  }

  changeNumberOfDays(nDays: string): void {
    this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
      ...this.scheduleReplenishmentFormData,
      numberOfDays: nDays,
    });
  }

  changeNumberOfWeeks(nWeeks: string): void {
    this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
      ...this.scheduleReplenishmentFormData,
      numberOfWeeks: nWeeks,
    });
  }

  changeRecurrencePeriodType(type: string): void {
    this.isWeekly = type === recurrencePeriod.WEEKLY;
    this.isMonthly = type === recurrencePeriod.MONTHLY;

    this.numberOfDays = this.isMonthly
      ? this.createNumberStringArray(31)
      : this.createNumberStringArray(30);

    this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
      ...this.scheduleReplenishmentFormData,
      recurrencePeriod: type,
    });
  }

  changeDayOfTheMonth(dayOfMonth: string): void {
    this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
      ...this.scheduleReplenishmentFormData,
      nthDayOfMonth: dayOfMonth,
    });
  }

  changeReplenishmentStartDate(date: string): void {
    if (Boolean(date)) {
      this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
        ...this.scheduleReplenishmentFormData,
        replenishmentStartDate: date,
      });
    }
  }

  changeRepeatDays(day: DaysOfWeek, isChecked: boolean): void {
    if (isChecked) {
      this.currentDaysOfWeek = [...this.currentDaysOfWeek];

      this.currentDaysOfWeek.push(day);

      this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
        ...this.scheduleReplenishmentFormData,
        daysOfWeek: this.currentDaysOfWeek,
      });
    } else {
      const foundDay = this.currentDaysOfWeek.find((data) => day === data);

      if (!foundDay) {
        return;
      }

      const index = this.currentDaysOfWeek.indexOf(foundDay);
      this.currentDaysOfWeek.splice(index, 1);

      this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
        ...this.scheduleReplenishmentFormData,
        daysOfWeek: this.currentDaysOfWeek,
      });
    }
  }

  hasDaysOfWeekChecked(day: DaysOfWeek): boolean {
    return this.currentDaysOfWeek.includes(day);
  }

  private initConfig(): void {
    this.isMonthly =
      this.scheduleReplenishmentFormData.recurrencePeriod ===
      recurrencePeriod.MONTHLY;

    this.isWeekly =
      this.scheduleReplenishmentFormData.recurrencePeriod ===
      recurrencePeriod.WEEKLY;

    this.currentDaysOfWeek = [
      ...(this.scheduleReplenishmentFormData.daysOfWeek ?? []),
    ];

    this.numberOfDays = this.isMonthly
      ? this.createNumberStringArray(31)
      : this.createNumberStringArray(30);

    this.numberOfWeeks = this.createNumberStringArray(12);

    this.currentDate =
      this.scheduleReplenishmentFormData.replenishmentStartDate;
  }

  private createNumberStringArray(n: number): string[] {
    return Array(n)
      .fill(0)
      .map((_, y) => (y + 1).toString());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
