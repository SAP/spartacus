import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  CheckoutService,
  DaysOfWeek,
  ORDER_TYPE,
  recurrencePeriod,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { CheckoutReplenishmentFormService } from '../../services/checkout-replenishment-form-service';

@Component({
  selector: 'cx-schedule-replenishment-order',
  templateUrl: './schedule-replenishment-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleReplenishmentOrderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  iconTypes = ICON_TYPE;
  orderTypes = ORDER_TYPE;
  daysOfWeek = Object.keys(DaysOfWeek).map((key) => DaysOfWeek[key]);
  recurrencePeriodType = Object.keys(recurrencePeriod).map(
    (key) => recurrencePeriod[key]
  );

  selectedOrderType$: Observable<
    ORDER_TYPE
  > = this.checkoutService.getCurrentOrderType();

  isMonthly: Boolean = false;
  isWeekly: Boolean = false;
  currentDaysOfWeek: DaysOfWeek[] = [];
  numberOfDays: string[];
  numberOfWeeks: string[];
  currentDate: string;
  scheduleReplenishmentFormData: ScheduleReplenishmentForm;

  constructor(
    protected checkoutService: CheckoutService,
    protected checkoutReplenishmentFormService: CheckoutReplenishmentFormService
  ) {}

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
    this.checkoutService.setOrderType(orderType);
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
      this.currentDaysOfWeek.push(day);

      this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
        ...this.scheduleReplenishmentFormData,
        daysOfWeek: this.currentDaysOfWeek,
      });
    } else {
      const foundDay = this.currentDaysOfWeek.find((data) => day === data);

      if (!foundDay) return;

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

  currentISODate(date: string): string {
    return date.split('T')[0];
  }

  private initConfig(): void {
    this.isMonthly =
      this.scheduleReplenishmentFormData.recurrencePeriod ===
      recurrencePeriod.MONTHLY;

    this.isWeekly =
      this.scheduleReplenishmentFormData.recurrencePeriod ===
      recurrencePeriod.WEEKLY;

    this.currentDaysOfWeek = this.scheduleReplenishmentFormData.daysOfWeek;

    this.numberOfDays = this.isMonthly
      ? this.createNumberStringArray(31)
      : this.createNumberStringArray(30);

    this.numberOfWeeks = this.createNumberStringArray(12);

    this.currentDate = this.scheduleReplenishmentFormData.replenishmentStartDate;
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
