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
  readonly daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  constructor() {}

  ngOnInit() {}

  getDirections(location: any) {
    window.open(
      'https://www.google.com/maps/dir/Current+Location/' +
        location.geoPoint.latitude +
        ',' +
        location.geoPoint.longitude
    );
  }

  getClosingTime(location: any): Date {
    const closing_hour = location.openingHours.weekDayOpeningList[
      this.getCurrentDay()
    ].closingTime.formattedHour.split(':')[0];
    const closing_minutes =
      location.openingHours.weekDayOpeningList[this.getCurrentDay()].closingTime
        .minute;
    const closing_date = new Date();
    closing_date.setHours(closing_hour);
    closing_date.setMinutes(closing_minutes);
    return closing_date;
  }

  getOpeningTime(location: any): Date {
    const opening_hour = location.openingHours.weekDayOpeningList[
      this.getCurrentDay()
    ].openingTime.formattedHour.split(':')[0];
    const opening_minutes =
      location.openingHours.weekDayOpeningList[this.getCurrentDay()].openingTime
        .minute;
    const opening_date = new Date();
    opening_date.setHours(opening_hour);
    opening_date.setMinutes(opening_minutes);
    return opening_date;
  }

  getCurrentDay(): number {
    switch (this.current_date.getDay()) {
      case 0: // Sun
        return 6;
      case 1: // Mon
        return 0;
      case 2: // Tues
        return 1;
      case 3: // Wed
        return 2;
      case 4: // Thurs
        return 3;
      case 5: // Fri
        return 4;
      case 6: // Sat
        return 5;
    }
  }

  isClosingSoon(): boolean {
    return this.closingSoon;
  }

  isOpeningSoon(): boolean {
    return this.openingSoon;
  }

  isOpen(location: any): boolean {
    // let current_time = this.current_date.getHours() +":"+ this.current_date.getMinutes(); //time in 12 hour clock
    const current_hour = parseInt(
      this.current_date.getHours().toLocaleString(),
      10
    ); // in 24 hour clock
    const closing_hour = location.openingHours.weekDayOpeningList[
      this.getCurrentDay()
    ].closingTime.formattedHour.split(':')[0];
    const opening_hour = location.openingHours.weekDayOpeningList[
      this.getCurrentDay()
    ].openingTime.formattedHour.split(':')[0];
    if (
      current_hour <= parseInt(closing_hour, 10) &&
      current_hour >= parseInt(opening_hour, 10)
    ) {
      if (current_hour + 1 === parseInt(closing_hour, 10)) {
        // one hour left before closing time
        this.closingSoon = true;
        this.openingSoon = false;
      }
      return true;
    } else {
      if (current_hour + 1 === parseInt(opening_hour, 10)) {
        // one hour left before opening time
        this.openingSoon = true;
        this.closingSoon = false;
      }
      return false;
    }
  }
}
