import { Component, Input, Output, EventEmitter } from '@angular/core';

import { StoreDataService } from '../../../services/store-data.service';

@Component({
  selector: 'y-store-finder-list-item',
  templateUrl: './store-finder-list-item.component.html',
  styleUrls: ['./store-finder-list-item.component.scss']
})
export class StoreFinderListItemComponent {
  @Input() location;
  @Input() locationIndex: number = null;
  @Output() storeItemClick: EventEmitter<number> = new EventEmitter();
  readonly current_date = new Date();

  constructor(private storeDataService: StoreDataService) {}

  getDirections(location: any): string {
    const google_map_url = 'https://www.google.com/maps/dir/Current+Location/';
    const latitude = this.storeDataService.getStoreLatitude(location);
    const longitude = this.storeDataService.getStoreLongitude(location);
    return google_map_url + latitude + ',' + longitude;
  }

  getClosingTime(location: any): Date {
    return this.storeDataService.getStoreClosingTime(
      location,
      this.current_date
    );
  }

  getOpeningTime(location: any): Date {
    return this.storeDataService.getStoreOpeningTime(
      location,
      this.current_date
    );
  }

  isOpen(location: any): boolean {
    return this.storeDataService.isStoreOpen(location, this.current_date);
  }

  handleStoreItemClick() {
    if (this.locationIndex !== null) {
      this.storeItemClick.emit(this.locationIndex);
    }
  }
}
