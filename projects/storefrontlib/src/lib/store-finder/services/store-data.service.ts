import { Injectable } from '@angular/core';

@Injectable()
export class StoreDataService {
  readonly DECIMAL_BASE: 10;
  readonly weekDays = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat'
  };

  getStoreLatitude(location: any): number {
    return location.geoPoint.latitude;
  }

  getStoreLongitude(location: any): number {
    return location.geoPoint.longitude;
  }

  getStoreClosingTime(location: any, date: Date): Date {
    const requestedDaySchedule = this.getSchedule(location, date);
    let result: Date = null;

    if (requestedDaySchedule.closed === false) {
      const closingHour = requestedDaySchedule.closingTime.formattedHour.split(
        ':'
      )[0];
      const closingMinute = requestedDaySchedule.closingTime.minute;
      result = new Date(date.valueOf());
      result.setHours(closingHour);
      result.setMinutes(closingMinute);
    }

    return result;
  }

  getStoreOpeningTime(location: any, date: Date): Date {
    const requestedDaySchedule = this.getSchedule(location, date);
    let result: Date = null;

    if (requestedDaySchedule.closed === false) {
      const openingHour = requestedDaySchedule.openingTime.formattedHour.split(
        ':'
      )[0];
      const openingMinutes = requestedDaySchedule.openingTime.minute;
      result = new Date(date.valueOf());
      result.setHours(openingHour);
      result.setMinutes(openingMinutes);
    }

    return result;
  }

  isStoreOpen(location: any, date: Date): boolean {
    const requestedDaySchedule = this.getSchedule(location, date);
    let result = false;

    if (requestedDaySchedule.closed === false) {
      const openingDate = this.getStoreOpeningTime(location, date);
      const closingDate = this.getStoreClosingTime(location, date);

      result = date > openingDate && date < closingDate;
    }

    return result;
  }

  /**
   * Extracts schedule from the given location for the given date
   * @param location location
   * @param date date
   *
   * @returns payload describing the store's schedule for the given day.
   */
  private getSchedule(location: any, date: Date): any {
    const weekday = this.weekDays[date.getDay()];
    return location.openingHours.weekDayOpeningList.find(
      weekDayOpeningListItem => weekDayOpeningListItem.weekDay === weekday
    );
  }
}
