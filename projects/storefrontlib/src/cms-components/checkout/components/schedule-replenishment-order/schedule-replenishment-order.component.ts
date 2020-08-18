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

  numberOfDays = Array(31)
    .fill(0)
    .map((_, y) => (y + 1).toString());

  iconTypes = ICON_TYPE;
  orderTypes = ORDER_TYPE;
  daysOfWeek = DaysOfWeek;
  recurrencePeriodType = recurrencePeriod;
  scheduleReplenishmentFormData: ScheduleReplenishmentForm;

  selectedOrderType$: Observable<
    ORDER_TYPE
  > = this.checkoutService.getCurrentOrderType();

  isMonthly: Boolean = false;
  isWeekly: Boolean = false;
  currentDaysOfWeek: DaysOfWeek[] = [];

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

  changeRecurrencePeriodType(type: string): void {
    if (type === recurrencePeriod.WEEKLY) {
      this.isWeekly = true;
    } else {
      this.isWeekly = false;
    }

    if (type === recurrencePeriod.MONTHLY) {
      this.isMonthly = true;
    } else {
      this.isMonthly = false;
    }

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

  changeReplenishmentStartDate(date: string) {
    this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
      ...this.scheduleReplenishmentFormData,
      replenishmentStartDate: new Date(date).toISOString().split('.')[0] + 'Z',
    });
  }

  changeRepeatDays(day: DaysOfWeek, isChecked: boolean) {
    if (isChecked) {
      this.currentDaysOfWeek.push(day);

      this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
        ...this.scheduleReplenishmentFormData,
        daysOfWeek: this.currentDaysOfWeek,
      });
    } else {
      if (this.scheduleReplenishmentFormData.daysOfWeek.includes(day)) {
        const index = this.currentDaysOfWeek.indexOf(day, 0);
        this.currentDaysOfWeek.splice(index, 1);

        this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
          ...this.scheduleReplenishmentFormData,
          daysOfWeek: this.currentDaysOfWeek,
        });
      }
    }
  }

  hasDaysOfWeekChecked(day: DaysOfWeek) {
    return this.currentDaysOfWeek.includes(day);
  }

  private initConfig() {
    this.isMonthly =
      this.scheduleReplenishmentFormData.recurrencePeriod ===
      recurrencePeriod.MONTHLY
        ? true
        : false;

    this.isWeekly =
      this.scheduleReplenishmentFormData.recurrencePeriod ===
      recurrencePeriod.WEEKLY
        ? true
        : false;

    this.currentDaysOfWeek =
      this.scheduleReplenishmentFormData.daysOfWeek.length !== 0
        ? this.scheduleReplenishmentFormData.daysOfWeek
        : [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
