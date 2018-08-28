import { Injectable } from '@angular/core';

@Injectable()
export class StoreDataService {
  readonly DECIMAL_BASE: 10;
  readonly weekDays = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thur',
    5: 'Fri',
    6: 'Sat'
  };

  getStoreLatitude(location: any): number {
    return location.geoPoint.latitude;
  }

  getStoreLongitude(location: any): number {
    return location.geoPoint.longitude;
  }

  getStoreClosingTime(location: any, current_date: Date): Date {
    const today_schedule = this.getSchedule(location, current_date);
    const closing_hour = today_schedule.closingTime.formattedHour.split(':')[0];
    const closing_minutes = today_schedule.closingTime.minute;
    const closing_date_time = new Date();
    closing_date_time.setHours(closing_hour);
    closing_date_time.setMinutes(closing_minutes);
    return closing_date_time;
  }

  getStoreOpeningTime(location: any, current_date: Date): Date {
    const today_schedule = this.getSchedule(location, current_date);
    const opening_hour = today_schedule.openingTime.formattedHour.split(':')[0];
    const opening_minutes = today_schedule.openingTime.minute;
    const opening_date_time = new Date();
    opening_date_time.setHours(opening_hour);
    opening_date_time.setMinutes(opening_minutes);
    return opening_date_time;
  }

  isStoreOpen(location: any, current_date: Date): boolean {
    const today_schedule = this.getSchedule(location, current_date);
    const closing_hour = today_schedule.closingTime.formattedHour.split(':')[0];
    const opening_hour = today_schedule.openingTime.formattedHour.split(':')[0];
    return (
      current_date.getHours() <= parseInt(closing_hour, this.DECIMAL_BASE) &&
      current_date.getHours() >= parseInt(opening_hour, this.DECIMAL_BASE)
    );
  }

  getSchedule(location: any, date: Date): any {
    const weekday = this.weekDays[date.getDay()];
    return location.openingHours.weekDayOpeningList.find(
      weekDayOpeningListItem => weekDayOpeningListItem.weekDay === weekday
    );
  }
}
