import { Injectable } from '@angular/core';
import { PointOfService, WindowRef } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {
  readonly DECIMAL_BASE: 10;
  readonly weekDays = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  };

  constructor(protected winRef: WindowRef) {}

  /**
   * Returns store latitude
   * @param location store location
   */
  // TODO(#11411): Move getStoreLatitude and getStoreLongitude to StoreFinderService
  getStoreLatitude(location: PointOfService): number {
    return location?.geoPoint?.latitude;
  }

  /**
   * Returns store longitude
   * @param location store location
   */
  getStoreLongitude(location: PointOfService): number {
    return location?.geoPoint?.longitude;
  }

  /**
   * @deprecated since 3.1 use weekDayOpeningList from location instead
   *
   * Returns store closing time
   * @param location store location
   * @param date date to compare
   */
  // TODO(#11441): Remove all deprecated functions
  getStoreClosingTime(location: PointOfService, date: Date): string {
    const requestedDaySchedule = this.getSchedule(location, date);

    if (requestedDaySchedule) {
      if (requestedDaySchedule.closed && requestedDaySchedule.closed === true) {
        return 'closed';
      }

      if (requestedDaySchedule.closingTime) {
        return requestedDaySchedule.closingTime.formattedHour;
      }
    }
  }

  /**
   * @deprecated since 3.1 use weekDayOpeningList from location instead
   *
   * Returns store opening time
   * @param location store location
   * @param date date to compare
   */
  getStoreOpeningTime(location: PointOfService, date: Date): string {
    const requestedDaySchedule = this.getSchedule(location, date);

    if (requestedDaySchedule) {
      if (requestedDaySchedule.closed && requestedDaySchedule.closed === true) {
        return 'closed';
      }

      if (requestedDaySchedule.openingTime) {
        return requestedDaySchedule.openingTime.formattedHour;
      }
    }
  }

  /**
   * @deprecated since 3.1 use weekDayOpeningList from location instead
   *
   * Extracts schedule from the given location for the given date
   * @param location location
   * @param date date
   *
   * @returns payload describing the store's schedule for the given day.
   */
  protected getSchedule(location: PointOfService, date: Date): any {
    const weekday = this.weekDays[date.getDay()];
    const language = this.winRef?.sessionStorage?.getItem('language');
    return location.openingHours.weekDayOpeningList.find(
      (weekDayOpeningListItem) =>
        Boolean(language)
          ? weekDayOpeningListItem.weekDay ===
              date.toLocaleString(language as string, {
                weekday: 'short',
              }) ||
            weekDayOpeningListItem.weekDay ===
              date.toLocaleString(language as string, {
                weekday: 'long',
              }) ||
            weekDayOpeningListItem.weekDay === weekday
          : weekDayOpeningListItem.weekDay === weekday
    );
  }
}
