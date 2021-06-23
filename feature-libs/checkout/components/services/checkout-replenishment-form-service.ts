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
    replenishmentStartDate: new Date().toISOString().split('T')[0],
  };

  private scheduleReplenishmentFormData$: BehaviorSubject<ScheduleReplenishmentForm> =
    new BehaviorSubject<ScheduleReplenishmentForm>(this.defaultFormData);

  constructor() {}

  getScheduleReplenishmentFormData(): Observable<ScheduleReplenishmentForm> {
    return this.scheduleReplenishmentFormData$.asObservable();
  }

  setScheduleReplenishmentFormData(formData: ScheduleReplenishmentForm): void {
    this.scheduleReplenishmentFormData$.next(formData);
  }

  resetScheduleReplenishmentFormData(): void {
    this.scheduleReplenishmentFormData$.next(this.defaultFormData);
  }
}
