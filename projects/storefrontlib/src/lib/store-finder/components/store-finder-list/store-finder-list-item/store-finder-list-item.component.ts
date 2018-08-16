import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'y-store-finder-list-item',
  templateUrl: './store-finder-list-item.component.html',
  styleUrls: ['./store-finder-list-item.component.scss']
})
export class StoreFinderListItemComponent implements OnInit {
  @Input() location;
  current_date = new Date();
  closingSoon: boolean;
  openingSoon: boolean;
  readonly DECIMAL_BASE: 10;
  readonly daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  constructor() {}

  ngOnInit() {}

  getDirections(location: any) {
    const google_map_url = 'https://www.google.com/maps/dir/Current+Location/';
    window.open(
      google_map_url +
        location.geoPoint.latitude +
        ',' +
        location.geoPoint.longitude
    );
  }

  getClosingTime(location: any): Date {
    const closing_hour = location.openingHours.weekDayOpeningList[
      this.daysOfWeek.indexOf(this.getCurrentDay())
    ].closingTime.formattedHour.split(':')[0];
    const closing_minutes =
      location.openingHours.weekDayOpeningList[
        this.daysOfWeek.indexOf(this.getCurrentDay())
      ].closingTime.minute;
    const closing_date_time = new Date();
    closing_date_time.setHours(closing_hour);
    closing_date_time.setMinutes(closing_minutes);
    return closing_date_time;
  }

  getOpeningTime(location: any): Date {
    const opening_hour = location.openingHours.weekDayOpeningList[
      this.daysOfWeek.indexOf(this.getCurrentDay())
    ].openingTime.formattedHour.split(':')[0];
    const opening_minutes =
      location.openingHours.weekDayOpeningList[
        this.daysOfWeek.indexOf(this.getCurrentDay())
      ].openingTime.minute;
    const opening_date_time = new Date();
    opening_date_time.setHours(opening_hour);
    opening_date_time.setMinutes(opening_minutes);
    return opening_date_time;
  }

  getCurrentDay(): string {
    switch (this.current_date.getDay()) {
      case 0: // Sun
        return this.daysOfWeek[6];
      case 1: // Mon
        return this.daysOfWeek[0];
      case 2: // Tues
        return this.daysOfWeek[1];
      case 3: // Wed
        return this.daysOfWeek[2];
      case 4: // Thurs
        return this.daysOfWeek[3];
      case 5: // Fri
        return this.daysOfWeek[4];
      case 6: // Sat
        return this.daysOfWeek[5];
    }
  }

  isClosingSoon(): boolean {
    return this.closingSoon;
  }

  isOpeningSoon(): boolean {
    return this.openingSoon;
  }

  isOpen(location: any): boolean {
    const current_hour = parseInt(
      this.current_date.getHours().toLocaleString(),
      this.DECIMAL_BASE
    ); // in 24 hour clock
    const closing_hour = location.openingHours.weekDayOpeningList[
      this.daysOfWeek.indexOf(this.getCurrentDay())
    ].closingTime.formattedHour.split(':')[0];
    const opening_hour = location.openingHours.weekDayOpeningList[
      this.daysOfWeek.indexOf(this.getCurrentDay())
    ].openingTime.formattedHour.split(':')[0];
    if (
      current_hour <= parseInt(closing_hour, this.DECIMAL_BASE) &&
      current_hour >= parseInt(opening_hour, this.DECIMAL_BASE)
    ) {
      if (current_hour + 1 === parseInt(closing_hour, this.DECIMAL_BASE)) {
        // one hour left before closing time
        this.closingSoon = true;
        this.openingSoon = false;
      }
      return true;
    } else {
      if (current_hour + 1 === parseInt(opening_hour, this.DECIMAL_BASE)) {
        // one hour left before opening time
        this.openingSoon = true;
        this.closingSoon = false;
      }
      return false;
    }
  }
}
