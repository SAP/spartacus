import { Component, Input } from '@angular/core';
import { StoreDataService } from '../../../services/store-data.service';

@Component({
  selector: 'y-store-finder-list-item',
  templateUrl: './store-finder-list-item.component.html',
  styleUrls: ['./store-finder-list-item.component.scss']
})
export class StoreFinderListItemComponent {
  @Input() location;
  readonly daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  constructor(private storeDataService: StoreDataService) {}

  getCurrentDayIndex(): number {
    const current_date = new Date();
    switch (current_date.getDay()) {
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

  getDirections(location: any): string {
    const google_map_url = 'https://www.google.com/maps/dir/Current+Location/';
    const latitude = this.storeDataService.getStoreLatitude(location);
    const longitude = this.storeDataService.getStoreLongitude(location);
    return google_map_url + latitude + ',' + longitude;
  }

  getClosingTime(location: any): Date {
    return this.storeDataService.getStoreClosingTime(
      location,
      this.getCurrentDayIndex()
    );
  }

  getOpeningTime(location: any): Date {
    return this.storeDataService.getStoreOpeningTime(
      location,
      this.getCurrentDayIndex()
    );
  }

  isOpen(location: any): boolean {
    return this.storeDataService.isStoreOpen(
      location,
      this.getCurrentDayIndex()
    );
  }
}
