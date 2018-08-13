import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import { SearchConfig } from '../../models/search-config';

@Component({
  selector: 'y-store-finder-list',
  templateUrl: './store-finder-list.component.html',
  styleUrls: ['./store-finder-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreFinderListComponent implements OnInit {
  @Input()
  query;

  locations$: Observable<any>;
  searchConfig: SearchConfig = {
    pageSize: 3,
    sort: 'asc',
    currentPage: 0
  };
  current_date = new Date();
  closingSoon: boolean;
  openingSoon: boolean;
  readonly daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  constructor(private store: Store<fromStore.StoresState>) {}

  ngOnInit() {
    this.locations$ = this.store.select(fromStore.getAllStores);
  }

  getDirections(location: any) {
    window.open(
      'https://www.google.com/maps/dir/Current+Location/' +
        location.geoPoint.latitude +
        ',' +
        location.geoPoint.longitude
    );
  }

  viewPage(pageNumber: number) {
    this.searchConfig = { ...this.searchConfig, currentPage: pageNumber };
    this.store.dispatch(
      new fromStore.FindStores({
        queryText: this.query,
        searchConfig: this.searchConfig
      })
    );
  }

  getClosingTime(location: any): Date {
    let closing_hour =
      location.openingHours.weekDayOpeningList[this.getCurrentDay()].closingTime
        .formattedHour.split(':')[0];
    let closing_minutes =
      location.openingHours.weekDayOpeningList[this.getCurrentDay()].closingTime
        .minute;
    let closing_date = new Date();
    closing_date.setHours(closing_hour);
    closing_date.setMinutes(closing_minutes);
    return closing_date;
  }
  getOpeningTime(location: any): Date {
    let opening_hour =
      location.openingHours.weekDayOpeningList[this.getCurrentDay()].openingTime
        .formattedHour.split(':')[0];
    let opening_minutes =
      location.openingHours.weekDayOpeningList[this.getCurrentDay()].openingTime
        .minute;
    let opening_date = new Date();
    opening_date.setHours(opening_hour);
    opening_date.setMinutes(opening_minutes);
    return opening_date;
  }

  getCurrentDay(): number {
    switch (this.current_date.getDay()) {
      case 0: //Sun
        return 6;
      case 1: //Mon
        return 0;
      case 2: //Tues
        return 1;
      case 3: //Wed
        return 2;
      case 4: //Thurs
        return 3;
      case 5: //Fri
        return 4;
      case 6: //Sat
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
    let current_hour = parseInt(
      this.current_date.getHours().toLocaleString(),
      10
    ); //in 24 hour clock
    let closing_hour = location.openingHours.weekDayOpeningList[
      this.getCurrentDay()
    ].closingTime.formattedHour.split(':')[0];
    let opening_hour = location.openingHours.weekDayOpeningList[
      this.getCurrentDay()
    ].openingTime.formattedHour.split(':')[0];
    if (
      current_hour <= parseInt(closing_hour, 10) &&
      current_hour >= parseInt(opening_hour, 10)
    ) {
      if (current_hour + 1 == parseInt(closing_hour, 10)) {
        //one hour left before closing time
        this.closingSoon = true;
        this.openingSoon = false;
      }
      return true;
    } else {
      if (current_hour + 1 == parseInt(opening_hour, 10)) {
        //one hour left before opening time
        this.openingSoon = true;
        this.closingSoon = false;
      }
      return false;
    }
  }
}
