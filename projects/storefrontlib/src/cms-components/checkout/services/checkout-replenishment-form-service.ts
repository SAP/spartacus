import { Injectable } from '@angular/core';
import {
  DaysOfWeek,
  recurrencePeriod,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutReplenishmentFormService {
  /**
   * Default form data
   */
  readonly defaultFormData: ScheduleReplenishmentForm = {
    daysOfWeek: [DaysOfWeek.MONDAY],
    nthDayOfMonth: '1',
    numberOfDays: '14',
    numberOfWeeks: '1',
    recurrencePeriod: recurrencePeriod.DAILY,
    replenishmentStartDate: new Date().toISOString(),
  };

  private scheduleReplenishmentFormDataSubject$: BehaviorSubject<
    ScheduleReplenishmentForm
  > = new BehaviorSubject<ScheduleReplenishmentForm>(this.defaultFormData);

  get scheduleReplenishmentFormData$(): Observable<ScheduleReplenishmentForm> {
    return this.scheduleReplenishmentFormDataSubject$.asObservable();
  }

  constructor() {}

  emitScheduleReplenishmentFormData(formData: ScheduleReplenishmentForm): void {
    this.scheduleReplenishmentFormDataSubject$.next(formData);
  }

  resetScheduleReplenishmentFormData(): void {
    this.scheduleReplenishmentFormDataSubject$.next(this.defaultFormData);
  }
}
