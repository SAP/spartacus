import { Injectable } from '@angular/core';
import { PointOfService } from '@spartacus/core';

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

  /**
   * Returns store latitude
   * @param location store location
   */
  getStoreLatitude(location: PointOfService): number {
    return location.geoPoint.latitude;
  }

  /**
   * Returns store longitude
   * @param location store location
   */
  getStoreLongitude(location: PointOfService): number {
    return location.geoPoint.longitude;
  }

  /**
   * Returns store closing time
   * @param location store location
   * @param date date to compare
   */
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
   * Extracts schedule from the given location for the given date
   * @param location location
   * @param date date
   *
   * @returns payload describing the store's schedule for the given day.
   */
  protected getSchedule(location: PointOfService, date: Date): any {
    const weekday = this.weekDays[date.getDay()];
    return location.openingHours.weekDayOpeningList.find(
      (weekDayOpeningListItem) => weekDayOpeningListItem.weekDay === weekday
    );
  }
}
