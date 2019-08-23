import { Input } from '@angular/core';
import { StoreDataService } from '@spartacus/core';

export class AbstractStoreItemComponent {
  @Input()
  location;
  readonly current_date = new Date();

  constructor(protected storeDataService: StoreDataService) {}

  getDirections(location: any): string {
    const google_map_url = 'https://www.google.com/maps/dir/Current+Location/';
    const latitude = this.storeDataService.getStoreLatitude(location);
    const longitude = this.storeDataService.getStoreLongitude(location);
    return google_map_url + latitude + ',' + longitude;
  }

  getClosingTime(location: any): string {
    return this.storeDataService.getStoreClosingTime(
      location,
      this.current_date
    );
  }

  getOpeningTime(location: any): string {
    return this.storeDataService.getStoreOpeningTime(
      location,
      this.current_date
    );
  }

  getFormattedStoreAddress(addressParts: string[]): string {
    return addressParts.filter(Boolean).join(', ');
  }
}
