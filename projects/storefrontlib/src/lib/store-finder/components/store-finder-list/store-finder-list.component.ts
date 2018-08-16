import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import { SearchConfig } from '../../models/search-config';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';

@Component({
  selector: 'y-store-finder-list',
  templateUrl: './store-finder-list.component.html',
  styleUrls: ['./store-finder-list.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreFinderListComponent implements OnInit {
  @Input() query;

  private locations: any;
  searchConfig: SearchConfig = {
    currentPage: 0
  };
  current_date = new Date();
  closingSoon: boolean;
  openingSoon: boolean;

  @ViewChild('storeMap') storeMap: StoreFinderMapComponent;

  readonly daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  constructor(private store: Store<fromStore.StoresState>) {}

  ngOnInit() {
    this.store.select(fromStore.getAllStores).subscribe(locations => {
      this.locations = locations;
    });
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

  private centerStoreOnMapByIndex(index: number): void {
    this.storeMap.centerMap(
      this.locations.stores[index].geoPoint.latitude,
      this.locations.stores[index].geoPoint.longitude
    );
  }
}
