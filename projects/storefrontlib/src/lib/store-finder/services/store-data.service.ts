import { Injectable } from '@angular/core';

@Injectable()
export class StoreDataService {
  readonly DECIMAL_BASE: 10;
  constructor() {}

  getStoreLatitude(location: any): number {
    return location.geoPoint.latitude;
  }

  getStoreLongitude(location: any): number {
    return location.geoPoint.longitude;
  }

  getStoreClosingTime(location: any, day: number): Date {
    const closing_hour = location.openingHours.weekDayOpeningList[
      day
    ].closingTime.formattedHour.split(':')[0];
    const closing_minutes =
      location.openingHours.weekDayOpeningList[day].closingTime.minute;
    const closing_date_time = new Date();
    closing_date_time.setHours(closing_hour);
    closing_date_time.setMinutes(closing_minutes);
    return closing_date_time;
  }

  getStoreOpeningTime(location: any, day: number): Date {
    const opening_hour = location.openingHours.weekDayOpeningList[
      day
    ].openingTime.formattedHour.split(':')[0];
    const opening_minutes =
      location.openingHours.weekDayOpeningList[day].openingTime.minute;
    const opening_date_time = new Date();
    opening_date_time.setHours(opening_hour);
    opening_date_time.setMinutes(opening_minutes);
    return opening_date_time;
  }

  isStoreOpen(location: any, day: number): boolean {
    const current_date = new Date();
    const current_hour = parseInt(
      current_date.getHours().toLocaleString(),
      this.DECIMAL_BASE
    ); // in 24 hour clock
    const closing_hour = location.openingHours.weekDayOpeningList[
      day
    ].closingTime.formattedHour.split(':')[0];
    const opening_hour = location.openingHours.weekDayOpeningList[
      day
    ].openingTime.formattedHour.split(':')[0];
    return (
      current_hour <= parseInt(closing_hour, this.DECIMAL_BASE) &&
      current_hour >= parseInt(opening_hour, this.DECIMAL_BASE)
    );
  }
}
