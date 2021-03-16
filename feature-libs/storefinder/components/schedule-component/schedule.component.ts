import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StoreDataService } from '@spartacus/storefinder/core';
import { PointOfService, WeekdayOpeningDay } from '@spartacus/core';

const WEEK_DAYS_NUMBER = 7;

@Component({
  selector: 'cx-schedule',
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements OnChanges {
  @Input()
  location: PointOfService;

  /**
   * @deprecated since 3.1 use weekDays instead
   */
  displayDays: Date[] = null;
  weekDays: WeekdayOpeningDay[];

  constructor(private storeDataService: StoreDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.location && this.location) {
      this.weekDays = this.location.openingHours
        ?.weekDayOpeningList as WeekdayOpeningDay[];
      // TODO(#11441): Remove the unused code below with deprecated functions
      const initialDate = this.getInitialDate();
      this.displayDays = [];

      for (let i = 0; i < WEEK_DAYS_NUMBER; i++) {
        const date = new Date(initialDate.valueOf());
        date.setDate(date.getDate() + i);
        this.displayDays.push(date);
      }
    }
  }

  /**
   * @deprecated since 3.1 use weekDayOpeningList from location instead
   *
   * Returns the store's opening time for the given date
   * @param date date
   */
  // TODO(#11441): Remove all deprecated functions
  getStoreOpeningTime(date: Date): string {
    return this.storeDataService.getStoreOpeningTime(this.location, date);
  }

  /**
   * @deprecated since 3.1 use weekDayOpeningList from location instead
   *
   * Returns the store's closing time for the given date
   * @param date date
   */
  getStoreClosingTime(date: Date): string {
    return this.storeDataService.getStoreClosingTime(this.location, date);
  }

  /**
   * @deprecated since 3.1 use weekDayOpeningList from location instead
   *
   * return initial (first) date to be displayed in the schedule
   */
  private getInitialDate(): Date {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - currentDate.getDay());

    return currentDate;
  }
}
